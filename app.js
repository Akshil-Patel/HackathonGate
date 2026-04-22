import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, remove, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAmMmFyJcoctTaH-_w_bVQmdSgRZgibpEA",
    authDomain: "hackathongate.firebaseapp.com",
    projectId: "hackathongate",
    storageBucket: "hackathongate.firebasestorage.app",
    messagingSenderId: "791149919436",
    appId: "1:791149919436:web:66e40b1856a0c1b2c75669",
    databaseURL: "https://hackathongate-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Validation Registry - Mock 150 Teams (TEAM_001 to TEAM_150)
const validTeams = Array.from({length: 150}, (_, i) => `TEAM_${String(i + 1).padStart(3, '0')}`);

// Local State Derived from Firebase Events
let gateData = {
    activityLog: [], 
    teams: {} 
};

// Web Audio API Context
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function initAudio() {
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();
}

function playTone(freq, type, duration, vol = 0.1) {
    if (!audioCtx) return;
    try {
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = type;
        oscillator.frequency.value = freq;
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
        oscillator.stop(audioCtx.currentTime + duration);
    } catch(e) { console.error("Audio playback error", e); }
}

function playSuccess() {
    initAudio();
    playTone(880, 'sine', 0.1, 0.1);
    setTimeout(() => playTone(1108, 'sine', 0.2, 0.1), 100);
}

function playError() {
    initAudio();
    playTone(300, 'sawtooth', 0.3, 0.1);
    setTimeout(() => playTone(300, 'sawtooth', 0.4, 0.1), 150);
}

// Toast Notifications
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    toast.className = `transform transition-all duration-300 translate-y-[-150%] opacity-0 rounded-lg shadow-lg px-4 py-3 flex items-center gap-3 w-full border font-label-bold pointer-events-auto`;
    
    if (type === 'success') {
        toast.classList.add('bg-green-50', 'text-green-800', 'border-green-300');
        toast.innerHTML = `<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">check_circle</span> <span>${message}</span>`;
        playSuccess();
    } else if (type === 'error') {
        toast.classList.add('bg-red-50', 'text-red-800', 'border-red-300');
        toast.innerHTML = `<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">error</span> <span>${message}</span>`;
        playError();
    } else if (type === 'info') {
        toast.classList.add('bg-blue-50', 'text-blue-800', 'border-blue-300');
        toast.innerHTML = `<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">info</span> <span>${message}</span>`;
        playSuccess();
    }
    
    container.appendChild(toast);
    
    requestAnimationFrame(() => { toast.classList.remove('translate-y-[-150%]', 'opacity-0'); });
    
    setTimeout(() => {
        toast.classList.add('translate-y-[-150%]', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Data Sync Logic
onValue(ref(db, 'events'), (snapshot) => {
    const eventsObj = snapshot.val();
    
    // Reset local state to recompute from log
    let newTeams = {};
    let newActivityLog = [];
    
    if (eventsObj) {
        // Sort events chronologically to compute correctly
        const sortedEvents = Object.keys(eventsObj).map(key => ({
            eventId: key,
            ...eventsObj[key]
        })).sort((a, b) => a.timestamp - b.timestamp);
        
        sortedEvents.forEach(evt => {
            const teamId = evt.teamId;
            let teamState = newTeams[teamId];
            if (!teamState) {
                teamState = { lastStatus: 'OUT', lastInTimestamp: null, accumulatedTimeMs: 0 };
            }
            
            if (evt.type === 'IN') {
                teamState.lastStatus = 'IN';
                teamState.lastInTimestamp = evt.timestamp;
            } else if (evt.type === 'OUT') {
                if (teamState.lastStatus === 'IN') {
                    teamState.lastStatus = 'OUT';
                    teamState.accumulatedTimeMs += (evt.timestamp - teamState.lastInTimestamp);
                    teamState.lastInTimestamp = null;
                }
            }
            newTeams[teamId] = teamState;
            newActivityLog.unshift(evt); // newest first
        });
    }
    
    gateData.teams = newTeams;
    gateData.activityLog = newActivityLog;
    
    renderActivityLog();
    if (currentMainTab === 'stats') {
        renderLeaderboard();
    }
});

// Process Check IN / OUT
window.processTeamEntry = function(teamId) {
    initAudio(); // Required to unlock audio context on iOS/Android from click
    
    if (!teamId || teamId.trim() === '') return;
    teamId = teamId.trim().toUpperCase();

    if (!validTeams.includes(teamId)) {
        showToast(`Invalid Team ID: ${teamId}`, 'error');
        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
        return;
    }

    const now = Date.now();
    let teamState = gateData.teams[teamId];
    let isCurrentlyIn = (teamState && teamState.lastStatus === 'IN');
    
    const newEventType = isCurrentlyIn ? 'OUT' : 'IN';
    
    // Push event to Firebase
    push(ref(db, 'events'), {
        teamId: teamId,
        type: newEventType,
        timestamp: now
    }).then(() => {
        if (newEventType === 'IN') {
            showToast(`${teamId} Checked IN`, 'success');
            if (navigator.vibrate) navigator.vibrate([100]);
        } else {
            showToast(`${teamId} Checked OUT`, 'info');
            if (navigator.vibrate) navigator.vibrate([100]);
        }
    }).catch(err => {
        showToast(`Failed to sync data! Check connection.`, 'error');
        console.error(err);
    });
}

// Undo Functionality
window.undoEvent = function(eventId) {
    initAudio();
    if(confirm("Are you sure you want to undo this scan action?")) {
        remove(ref(db, `events/${eventId}`))
            .then(() => showToast("Action undone.", "info"))
            .catch(() => showToast("Failed to undo.", "error"));
    }
}

// QR Code Scanner Integration
let html5QrCode = null;

window.startScanner = function() {
    initAudio(); // Unlock audio
    if (!html5QrCode) {
        html5QrCode = new Html5Qrcode("qr-reader");
    }
    
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        if(html5QrCode.getState() === Html5QrcodeScannerState.SCANNING) {
            html5QrCode.pause();
            window.processTeamEntry(decodedText);
            
            setTimeout(() => {
                if(html5QrCode.getState() === Html5QrcodeScannerState.PAUSED) {
                    html5QrCode.resume();
                }
            }, 2500);
        }
    };

    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback)
        .then(() => {
            document.getElementById('camera-overlay').classList.add('hidden');
            document.getElementById('camera-status-dot').classList.replace('bg-gray-400', 'bg-green-500');
            document.getElementById('camera-status-dot').classList.add('animate-pulse');
            document.getElementById('camera-status-text').innerText = 'Camera Active';
        })
        .catch(err => {
            console.error("Camera start failed", err);
            showToast("Failed to start camera. Check browser permissions.", "error");
        });
}

window.stopScanner = function() {
    if (html5QrCode && html5QrCode.getState() !== Html5QrcodeScannerState.NOT_STARTED) {
        html5QrCode.stop().then(() => {
            document.getElementById('camera-overlay').classList.remove('hidden');
            document.getElementById('camera-status-dot').classList.replace('bg-green-500', 'bg-gray-400');
            document.getElementById('camera-status-dot').classList.remove('animate-pulse');
            document.getElementById('camera-status-text').innerText = 'Camera Inactive';
        }).catch(err => console.error("Failed to stop camera", err));
    }
}

// View Logic
let currentMainTab = 'scanner'; 

window.switchMainTab = function(tab) {
    currentMainTab = tab;
    
    if (tab !== 'scanner') {
        window.stopScanner();
    }

    ['scanner', 'manual', 'stats'].forEach(t => {
        document.getElementById(`nav-${t}`).classList.remove('nav-item-active');
    });
    document.getElementById(`nav-${tab}`).classList.add('nav-item-active');

    document.getElementById('view-scanner').classList.add('hidden-view');
    document.getElementById('view-manual').classList.add('hidden-view');
    document.getElementById('view-stats').classList.add('hidden-view');

    if (tab === 'stats') {
        document.getElementById('recent-activity-section').classList.add('hidden-view');
        document.getElementById('view-stats').classList.remove('hidden-view');
        renderLeaderboard();
    } else {
        document.getElementById('recent-activity-section').classList.remove('hidden-view');
        document.getElementById(`view-${tab}`).classList.remove('hidden-view');
    }
}

window.switchView = function(subView) {
    window.switchMainTab(subView);
}

window.toggleActivityDropdown = function() {
    const content = document.getElementById('activity-dropdown-content');
    const chevron = document.getElementById('activity-chevron');
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        chevron.style.transform = 'rotate(180deg)';
    } else {
        content.classList.add('hidden');
        chevron.style.transform = 'rotate(0deg)';
    }
}

// UI Handlers
window.handleManualSubmit = function() {
    initAudio();
    const input = document.getElementById('team-id');
    const val = input.value;
    if (val) {
        window.processTeamEntry(val);
        input.value = '';
    }
}

window.handleManualSubmitEnter = function(event) {
    if (event.key === 'Enter') {
        window.handleManualSubmit();
    }
}

// CSV Export
window.exportCSV = function() {
    let csv = 'Team ID,Total Working Time (Formatted),Total Milliseconds\n';
    
    const now = Date.now();
    const teamStats = Object.keys(gateData.teams).map(teamId => {
        const t = gateData.teams[teamId];
        let totalMs = t.accumulatedTimeMs;
        if (t.lastStatus === 'IN') {
            totalMs += (now - t.lastInTimestamp);
        }
        return { teamId, totalMs };
    });
    
    teamStats.sort((a, b) => b.totalMs - a.totalMs);
    
    teamStats.forEach(stat => {
        csv += `${stat.teamId},${formatDuration(stat.totalMs)},${stat.totalMs}\n`;
    });
    
    csv += '\n\nRaw Activity Log\n';
    csv += 'Timestamp,Date,Time,Team ID,Action\n';
    
    const reversedLog = [...gateData.activityLog].reverse(); // chronological
    reversedLog.forEach(act => {
        const d = new Date(act.timestamp);
        csv += `${act.timestamp},${d.toLocaleDateString()},${d.toLocaleTimeString()},${act.teamId},${act.type}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Hackathon_Data_${new Date().getTime()}.csv`;
    a.click();
}

// Bind Export button manually since module mode causes issues with inline listeners created late
document.addEventListener('DOMContentLoaded', () => {
    const exportBtn = document.getElementById('export-csv-btn');
    if (exportBtn) exportBtn.addEventListener('click', window.exportCSV);
});


// Rendering
function formatTimeAgo(timestamp) {
    const diff = Math.floor((Date.now() - timestamp) / 1000);
    if (diff < 60) return `${diff} sec ago`;
    const min = Math.floor(diff / 60);
    if (min < 60) return `${min} min ago`;
    const hr = Math.floor(min / 60);
    return `${hr} hr ago`;
}

function formatDuration(ms) {
    const totalSecs = Math.floor(ms / 1000);
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
}

function renderActivityLog() {
    const list = document.getElementById('activity-list');
    const noAct = document.getElementById('no-activity');
    if(!list || !noAct) return;
    list.innerHTML = '';
    
    if (gateData.activityLog.length === 0) {
        noAct.classList.remove('hidden');
    } else {
        noAct.classList.add('hidden');
        gateData.activityLog.slice(0, 15).forEach(act => {
            const li = document.createElement('li');
            li.className = "min-h-[64px] flex items-center justify-between px-md py-sm hover:bg-surface-container-low";
            
            const isOut = act.type === 'OUT';
            const iconConfig = isOut 
                ? `<div class="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant"><span class="material-symbols-outlined">logout</span></div>`
                : `<div class="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container"><span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">check_circle</span></div>`;
                
            const badgeConfig = isOut
                ? `<div class="bg-[#fef08a] text-[#854d0e] px-3 py-1 rounded-full font-caption font-medium">OUT</div>`
                : `<div class="bg-[#dcfce7] text-[#166534] px-3 py-1 rounded-full font-caption font-medium">IN</div>`;

            li.innerHTML = `
                <div class="flex items-center gap-md flex-1">
                    ${iconConfig}
                    <div>
                        <p class="font-label-bold text-on-surface">${act.teamId}</p>
                        <p class="font-caption text-on-surface-variant">${formatTimeAgo(act.timestamp)}</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    ${badgeConfig}
                    <button onclick="undoEvent('${act.eventId}')" class="text-error hover:bg-red-50 p-2 rounded-full flex items-center justify-center transition-colors" title="Undo">
                        <span class="material-symbols-outlined text-[20px]">undo</span>
                    </button>
                </div>
            `;
            list.appendChild(li);
        });
    }
}

function renderLeaderboard() {
    const list = document.getElementById('leaderboard-list');
    const noStats = document.getElementById('no-stats');
    if(!list || !noStats) return;
    list.innerHTML = '';
    
    const now = Date.now();
    const teamStats = Object.keys(gateData.teams).map(teamId => {
        const t = gateData.teams[teamId];
        let totalMs = t.accumulatedTimeMs;
        if (t.lastStatus === 'IN') {
            totalMs += (now - t.lastInTimestamp);
        }
        return { teamId, totalMs, isWorking: t.lastStatus === 'IN' };
    });
    
    if (teamStats.length === 0) {
        noStats.classList.remove('hidden');
        return;
    }
    
    noStats.classList.add('hidden');
    teamStats.sort((a, b) => b.totalMs - a.totalMs);
    
    teamStats.forEach((stat, index) => {
        const li = document.createElement('li');
        li.className = "flex items-center justify-between p-4";
        
        let rankColor = "text-on-surface-variant";
        if (index === 0) rankColor = "text-yellow-600 font-bold";
        else if (index === 1) rankColor = "text-slate-400 font-bold";
        else if (index === 2) rankColor = "text-amber-700 font-bold";

        li.innerHTML = `
            <div class="flex items-center gap-4">
                <span class="w-6 text-center ${rankColor}">#${index + 1}</span>
                <div>
                    <div class="flex items-center gap-2">
                        <p class="font-label-bold text-on-surface">${stat.teamId}</p>
                        ${stat.isWorking ? `<span class="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="Currently Working"></span>` : ''}
                    </div>
                    <p class="font-caption text-on-surface-variant">Working Time</p>
                </div>
            </div>
            <div class="font-mono font-medium text-on-surface">
                ${formatDuration(stat.totalMs)}
            </div>
        `;
        list.appendChild(li);
    });
}

setInterval(() => {
    if (currentMainTab === 'stats') {
        renderLeaderboard();
    } else {
        renderActivityLog();
    }
}, 1000);
