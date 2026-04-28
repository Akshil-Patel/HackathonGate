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

// Validation Registry - 138 Teams (TEAM_001 to TEAM_138)

const teamRegistry = {
    TEAM_001: { name: 'SUSTAINIQ', leader: 'ZEENATH MISBA JANGUBHAI' },
    TEAM_002: { name: 'INNOVATIVEX', leader: 'DEEPA C SHET' },
    TEAM_003: { name: '', leader: 'AMEER HAMZA MOMIN' },
    TEAM_004: { name: '', leader: 'SUJAL SINGH RATHORE' },
    TEAM_005: { name: 'HELLFIRE HACKERS', leader: 'BALAJI BHAGIRATH M BODDUCHERLA' },
    TEAM_006: { name: 'CODE STOM', leader: 'KRUPA' },
    TEAM_007: { name: 'CODE WARRIORS', leader: 'ABHISHEK ANNIGERI' },
    TEAM_008: { name: 'CTRL+ALT+ELITE', leader: 'ASHIFALI NADAF' },
    TEAM_009: { name: '', leader: 'MONISHA JADHAV' },
    TEAM_010: { name: 'PEAKY CODERS', leader: 'MALLIKARJUN JADI' },
    TEAM_011: { name: '', leader: 'NAGARAJ SURAGOND' },
    TEAM_012: { name: '', leader: 'SAYED KHALEEL AHMED R' },
    TEAM_013: { name: '', leader: 'ROHIT V GOKARNAKAR' },
    TEAM_014: { name: 'TECH TITANS', leader: 'HARSH V SANU' },
    TEAM_015: { name: 'VIBECODERS 6SEVEN', leader: 'SAYED KHALEEL AHMED R' },
    TEAM_016: { name: 'ALGORIFT', leader: 'BHAVANI DENGI' },
    TEAM_017: { name: 'CODE AXIS', leader: 'SONU PARASHURAM BALAGAVI' },
    TEAM_018: { name: 'HACK HORIZON', leader: 'ANJUM KAGINALLI' },
    TEAM_019: { name: 'CODEX', leader: 'NITYANAND PATIL' },
    TEAM_020: { name: '', leader: 'RUDRESH I G' },
    TEAM_021: { name: '4LOOPS', leader: 'RUMMAN KHAN' },
    TEAM_022: { name: 'RUNTIME TERROR', leader: 'KOUSARJAHA NADAF' },
    TEAM_023: { name: 'HACKOHOLICS', leader: 'SHARANUKUMAR I BEVINAMARAD' },
    TEAM_024: { name: 'INNOVENTURES', leader: 'SANJEEV KADAKOL' },
    TEAM_025: { name: '', leader: 'VARSHA KAMATH' },
    TEAM_026: { name: '', leader: 'KAUSHAL L KARKERA' },
    TEAM_027: { name: '', leader: 'MAHALAXMI VISHNU SHANBHAG' },
    TEAM_028: { name: 'V3S CODERS', leader: 'SAMARTH SUDESH KAMATH' },
    TEAM_029: { name: 'ECONEXUS', leader: 'KALI KUMARI' },
    TEAM_030: { name: 'COLLEGE COLLAB', leader: 'OJASVI TIWARI' },
    TEAM_031: { name: 'BITFORGE', leader: 'AFNAN PASHA' },
    TEAM_032: { name: 'TEAM KURONAMI', leader: 'ARNAV GUPTA' },
    TEAM_033: { name: 'TEAM ARAXYS', leader: 'ARANYA BANDHU' },
    TEAM_034: { name: 'NEXUS', leader: 'SRUJAN DABADI' },
    TEAM_035: { name: 'GMU SPARK', leader: 'POORNIMA B' },
    TEAM_036: { name: '', leader: 'AARZU TAHEREEM' },
    TEAM_037: { name: 'TEAM CIPHER', leader: 'POOJITHA SAI K' },
    TEAM_038: { name: 'ALTERNATIVES', leader: 'SHRINIVAS SAMNEKAR' },
    TEAM_039: { name: 'RICE', leader: 'DHANUSH SHISANALLI' },
    TEAM_040: { name: 'CODEX', leader: 'SUSHMITA NISHANDAR' },
    TEAM_041: { name: 'CODE BLOODED', leader: 'SHIVAKUMAR B C' },
    TEAM_042: { name: 'TECH TITANS', leader: 'SANKALPA SARAGANACHARI' },
    TEAM_043: { name: 'NISHCHAYA', leader: 'PARASHARAM GURAV' },
    TEAM_044: { name: 'INFINITE LOOPERS', leader: 'ULLAS M' },
    TEAM_045: { name: 'BEGINNERS', leader: 'MAILARI CHATRAGUDI' },
    TEAM_046: { name: 'CORE CODERS', leader: 'NAMRATHA .S' },
    TEAM_047: { name: 'ECO STACK', leader: 'BHUVANA.B.R' },
    TEAM_048: { name: 'TECH DRIFTERS', leader: 'SAGAL PREET SINGH' },
    TEAM_049: { name: 'TECH MINDS', leader: 'JYOTI RAKTADE' },
    TEAM_050: { name: 'RESONANCE', leader: 'AJIT HUDED' },
    TEAM_051: { name: 'GHOST PROTOCOL', leader: 'OMKAR SHIRVALKAR' },
    TEAM_052: { name: 'HACK LORDS', leader: 'PRATHAM WADIYAR' },
    TEAM_053: { name: 'QUANTANIONS', leader: 'KSHITIJ ACHARI' },
    TEAM_054: { name: 'TEAM DARWIN', leader: 'PRATHMESH REDEKAR' },
    TEAM_055: { name: 'AISERS', leader: 'SUJEET PAWAR' },
    TEAM_056: { name: 'TEAM NEXORA', leader: 'SANIKA PATIL' },
    TEAM_057: { name: 'NEUROLENS', leader: 'S H NUSAIR' },
    TEAM_058: { name: 'HACK HUSTLERS', leader: 'MOHAMMED AIYAN BIJAPUR' },
    TEAM_059: { name: '', leader: 'PRAJWAL A AMARAVATI' },
    TEAM_060: { name: 'CODECOMETS', leader: 'ADITYA RAJESH HANASHI' },
    TEAM_061: { name: 'STRAW_HAT_CODERS', leader: 'SHREYAS UGARGOL' },
    TEAM_062: { name: 'SHADOW NETWORK', leader: 'MOHAMMED KHASIM' },
    TEAM_063: { name: '', leader: 'PRATIK PATIL' },
    TEAM_064: { name: 'TECH TITANS', leader: 'RAKSHITA RAJUR' },
    TEAM_065: { name: 'QUANTUMREALM', leader: 'SRIKRISHNA HIREHOLI' },
    TEAM_066: { name: '', leader: 'ANJALI' },
    TEAM_067: { name: '', leader: 'PARTHA B N' },
    TEAM_068: { name: 'THE A-TEAM', leader: 'CHAITRA VADDAR' },
    TEAM_069: { name: 'GRIT FORGE', leader: 'VIJAYALAXMI MG' },
    TEAM_070: { name: 'MANBANDHU', leader: 'HARISH BHADRAKALI' },
    TEAM_071: { name: 'SOCIETALFLY', leader: 'SANKET KHADI' },
    TEAM_072: { name: 'AQUA LOGIC', leader: 'SHUBHAM BASAVARAJ BAGODI' },
    TEAM_073: { name: 'TEAM VAMOS', leader: 'CHINMAYA KULKARNI' },
    TEAM_074: { name: 'SYNTAXION', leader: 'MOHAMMED ARSH KOTWAL' },
    TEAM_075: { name: 'CODE CREW', leader: 'KRUTIKA D BENAKANNAVAR' },
    TEAM_076: { name: 'CODE CA CATSLYSTS', leader: 'SAMPRADA M SHINDHE' },
    TEAM_077: { name: 'BITWISE', leader: 'SWAYAM KENNURKAR' },
    TEAM_078: { name: 'HACK PLUS', leader: 'SWATI N JAGATAP' },
    TEAM_079: { name: 'QUBIT', leader: 'NAVEENGOUDA BEVINAMARAD' },
    TEAM_080: { name: 'CODE PIRATES', leader: 'SUMUKH R CHAVAN' },
    TEAM_081: { name: 'VISION HACKERS', leader: 'NAKSHATRA DEVAKAR' },
    TEAM_082: { name: 'CODERS OF THE CARIBBEAN', leader: 'SANJANA DHAWALE' },
    TEAM_083: { name: 'VISION CODERS', leader: 'ANUSHREE C BARAKER' },
    TEAM_084: { name: 'TECH SPARK', leader: 'SHOAIB AHMED PATHAN' },
    TEAM_085: { name: '', leader: 'TEJAS S WAJVE' },
    TEAM_086: { name: '', leader: 'DICKEN KUMAR K' },
    TEAM_087: { name: '', leader: 'HARSHITHA K S' },
    TEAM_088: { name: '', leader: 'KISHAN S SHETTY' },
    TEAM_089: { name: '', leader: 'ADITHI M D' },
    TEAM_090: { name: 'VIBEX', leader: 'MURALIMITHUN C S' },
    TEAM_091: { name: 'TECH BUSTERS', leader: 'NAUMAN SHAH' },
    TEAM_092: { name: 'THE OHMIES', leader: 'RAJAVARDHAN S G' },
    TEAM_093: { name: 'BEESUN', leader: 'SUNAINA BIRADAR' },
    TEAM_094: { name: 'LATENT', leader: 'T G PRANITA YADAV' },
    TEAM_095: { name: 'BYATE CODERS', leader: 'PRAGATI CHOUGALE' },
    TEAM_096: { name: 'BRAINY BOTS', leader: 'MAHERA MUSKAN' },
    TEAM_097: { name: 'POWER RANGERS', leader: 'KEERTHAN' },
    TEAM_098: { name: 'BYTE ALCHEMISTS', leader: 'J SHRAVANI' },
    TEAM_099: { name: 'CODE BLODDED', leader: 'RAJESH KUMAR P' },
    TEAM_100: { name: 'HACK HOUSE', leader: 'SHIVANI MP' },
    TEAM_101: { name: "ZERO 1'S", leader: 'PRIYANKA JAGADEESH LANKEPPANAVAR' },
    TEAM_102: { name: 'COGNITIVE CODERS', leader: 'SUPRIYA S' },
    TEAM_103: { name: 'INNOVATORS', leader: 'TEJASWINI MALI' },
    TEAM_104: { name: 'CODE PHOENIX', leader: 'TEJAS SUTRAVE' },
    TEAM_105: { name: 'CODE SQUAD', leader: 'CHETAN KUBIHAL' },
    TEAM_106: { name: 'TITANS', leader: 'KARAN NAVALAGUND' },
    TEAM_107: { name: 'TECH TITANS', leader: 'KHUSHI JANADRI' },
    TEAM_108: { name: '', leader: 'NAVEEN B GURIKAR' },
    TEAM_109: { name: 'HACKSTACK', leader: 'NISCHITA V JOGUR' },
    TEAM_110: { name: '', leader: 'PRATHAM MANJUNATH HEGDE' },
    TEAM_111: { name: 'CTRL+ALT+LEGENDS', leader: 'SUMANGALA S SIPOY' },
    TEAM_112: { name: '', leader: 'SRUSHTI' },
    TEAM_113: { name: '808 IMPERIUM', leader: 'PRUTHVI SHETTY' },
    TEAM_114: { name: 'HACKAI', leader: 'REYNOL DSOUZA' },
    TEAM_115: { name: 'PHOENIX', leader: 'PRANAV L KAMATH' },
    TEAM_116: { name: 'BIT SQUARE', leader: 'MANOJ KUMAR' },
    TEAM_117: { name: 'RECKONERS', leader: 'GAYATRI KANAVALLI' },
    TEAM_118: { name: 'BELIEVERS', leader: 'ARUNDHATI N' },
    TEAM_119: { name: 'THINK TOGETHER', leader: 'RANJITA TOPANNAVAR' },
    TEAM_120: { name: 'BICODERS', leader: 'MANOJ ANNIGERI' },
    TEAM_121: { name: 'HACK TITANS', leader: 'ANUSHA T' },
    TEAM_122: { name: 'ERROR404', leader: 'VIJAYENDRA G' },
    TEAM_123: { name: 'TEAM OPTIMIZERS', leader: 'SPANDAN M. SATAPUTE' },
    TEAM_124: { name: 'VISION CODERS', leader: 'NOUSHAD AHMED B NADAF' },
    TEAM_125: { name: 'VIBECODERS', leader: 'PREETHESH CARVALHO' },
    TEAM_126: { name: 'DREAMERS', leader: 'MAHEEN ALALKHAN' },
    TEAM_127: { name: 'WEB PIN BITA', leader: 'SAYYED KAIF KAZI' },
    TEAM_128: { name: 'WEB PIN GAMA', leader: 'KAIF ALALKHAN' },
    TEAM_129: { name: 'FUSION 4.O', leader: 'PRADEEP BADIGER' },
    TEAM_130: { name: 'STARCODERS', leader: 'M YASHWANTH' },
    TEAM_131: { name: 'TECH TITANS', leader: 'SANTOSH SANADI' },
    TEAM_132: { name: 'TECH VAULT', leader: 'FATHIMA SHAAZNIYA' },
    TEAM_133: { name: 'DATA DOMINATORS', leader: 'RAJALAXMI CHABBI' },
    TEAM_134: { name: 'TETRATECH', leader: 'SHIVAKUMAR BASAYYA KENJADIMATH' },
    TEAM_135: { name: 'TECH TWINS', leader: '' },
    TEAM_136: { name: 'CORETECH', leader: 'GULNAAZ' },
    TEAM_137: { name: "THE PROMPT ENGINEER'S", leader: 'KRUPA VIJAYPUR' },
    TEAM_138: { name: 'AGADI RULES', leader: '' },
};

// Build a case-insensitive lookup: scanned name -> TEAM_XXX
// QR codes contain team name or leader name (if team name is empty)
const nameLookup = {};
for (const [teamId, info] of Object.entries(teamRegistry)) {
    // Add team name to lookup (if available)
    if (info.name && info.name.trim() !== '') {
        nameLookup[info.name.trim().toUpperCase()] = teamId;
    }
    // Add leader name to lookup (if available)
    if (info.leader && info.leader.trim() !== '') {
        nameLookup[info.leader.trim().toUpperCase()] = teamId;
    }
}

// Resolve a scanned value (team name or leader name) to a TEAM_XXX id
function resolveTeamId(scannedValue) {
    if (!scannedValue) return null;
    const key = scannedValue.trim().toUpperCase();
    // Direct name/leader match
    if (nameLookup[key]) return nameLookup[key];
    // Also accept TEAM_XXX format as fallback
    if (teamRegistry[key]) return key;
    return null;
}

// Helper: get display name for a team
function getTeamDisplayName(teamId) {
    const entry = teamRegistry[teamId];
    if (!entry) return teamId;
    if (entry.name && entry.name.trim() !== '') return entry.name;
    if (entry.leader && entry.leader.trim() !== '') return entry.leader;
    return teamId;
}

// Local State Derived from Firebase Events
let gateData = {
    activityLog: [], 
    teams: {} // { teamId: { membersInside: 0, accumulatedTimeMs: 0, lastInTimestamp: null, inCount: 0 } }
};

const MAX_MEMBERS = 4; // Max members per team

// Action Modal State
let pendingTeamId = null;

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
                teamState = { membersInside: 0, accumulatedTimeMs: 0, lastInTimestamp: null, inCount: 0 };
            }
            
            if (evt.type === 'IN') {
                teamState.membersInside = Math.min(MAX_MEMBERS, teamState.membersInside + 1);
                // Track when first member enters (for time accumulation)
                if (teamState.membersInside === 1) {
                    teamState.lastInTimestamp = evt.timestamp;
                }
                teamState.inCount++;
            } else if (evt.type === 'OUT') {
                teamState.membersInside = Math.max(0, teamState.membersInside - 1);
                // Accumulate time when last member leaves
                if (teamState.membersInside === 0 && teamState.lastInTimestamp) {
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

// Show action modal for a team (called when QR is scanned or manual entry is submitted)
window.processTeamEntry = function(scannedValue) {
    initAudio(); // Required to unlock audio context on iOS/Android from click
    
    if (!scannedValue || scannedValue.trim() === '') return;
    scannedValue = scannedValue.trim();

    const teamId = resolveTeamId(scannedValue);
    if (!teamId) {
        showToast(`Invalid Team: ${scannedValue}`, 'error');
        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
        return;
    }

    // Show the action modal instead of auto-toggling
    showActionModal(teamId);
}

// Show the Check-In / Check-Out action modal
function showActionModal(teamId) {
    pendingTeamId = teamId;
    const displayName = getTeamDisplayName(teamId);
    const teamState = gateData.teams[teamId];
    const membersInside = teamState ? teamState.membersInside : 0;

    document.getElementById('action-modal-team-name').textContent = displayName;
    document.getElementById('action-modal-team-id').textContent = teamId;

    // Render member dots
    const dotsContainer = document.getElementById('action-modal-dots');
    dotsContainer.innerHTML = '';
    for (let i = 0; i < MAX_MEMBERS; i++) {
        const dot = document.createElement('div');
        dot.className = 'member-dot' + (i < membersInside ? ' inside' : '');
        dotsContainer.appendChild(dot);
    }
    document.getElementById('action-modal-count').textContent = `${membersInside} / ${MAX_MEMBERS}`;

    // Enable/disable buttons based on member count
    const checkinBtn = document.getElementById('action-modal-checkin-btn');
    const checkoutBtn = document.getElementById('action-modal-checkout-btn');
    
    if (membersInside >= MAX_MEMBERS) {
        checkinBtn.classList.add('disabled');
    } else {
        checkinBtn.classList.remove('disabled');
    }
    
    if (membersInside <= 0) {
        checkoutBtn.classList.add('disabled');
    } else {
        checkoutBtn.classList.remove('disabled');
    }

    // Show modal
    document.getElementById('action-modal-backdrop').classList.add('active');
}
window.showActionModal = showActionModal;

// Close the action modal
function closeActionModal() {
    document.getElementById('action-modal-backdrop').classList.remove('active');
    pendingTeamId = null;
}
window.closeActionModal = closeActionModal;

// Confirm check-in or check-out action from the modal
window.confirmAction = function(actionType) {
    if (!pendingTeamId) return;
    
    const teamId = pendingTeamId;
    const displayName = getTeamDisplayName(teamId);
    const now = Date.now();

    // Close modal immediately
    closeActionModal();

    // Push event to Firebase
    push(ref(db, 'events'), {
        teamId: teamId,
        type: actionType,
        timestamp: now
    }).then(() => {
        if (actionType === 'IN') {
            showToast(`${displayName} — Member Checked IN`, 'success');
            if (navigator.vibrate) navigator.vibrate([100]);
        } else {
            showToast(`${displayName} — Member Checked OUT`, 'info');
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
            
            // Resume scanner after modal is closed (check periodically)
            const resumeCheck = setInterval(() => {
                if (!pendingTeamId) { // modal was closed
                    clearInterval(resumeCheck);
                    setTimeout(() => {
                        if(html5QrCode && html5QrCode.getState() === Html5QrcodeScannerState.PAUSED) {
                            html5QrCode.resume();
                        }
                    }, 500);
                }
            }, 300);
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
    let csv = 'Team Name,Team ID,Members Inside\n';
    
    const teamStats = Object.keys(gateData.teams).map(teamId => {
        const t = gateData.teams[teamId];
        return { teamId, membersInside: t.membersInside };
    });
    
    // Sort by members inside (most first), then by team ID
    teamStats.sort((a, b) => b.membersInside - a.membersInside || a.teamId.localeCompare(b.teamId));
    
    teamStats.forEach(stat => {
        const displayName = getTeamDisplayName(stat.teamId);
        csv += `${displayName} ${stat.membersInside},${stat.teamId},${stat.membersInside}\n`;
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
                        <p class="font-caption text-on-surface-variant" style="font-size:11px;">${getTeamDisplayName(act.teamId)}</p>
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
    
    const teamStats = Object.keys(gateData.teams).map(teamId => {
        const t = gateData.teams[teamId];
        return { teamId, membersInside: t.membersInside };
    });
    
    if (teamStats.length === 0) {
        noStats.classList.remove('hidden');
        return;
    }
    
    noStats.classList.add('hidden');
    // Sort by members inside (most first), then by team ID
    teamStats.sort((a, b) => b.membersInside - a.membersInside || a.teamId.localeCompare(b.teamId));
    
    teamStats.forEach((stat, index) => {
        const li = document.createElement('li');
        li.className = "flex items-center justify-between p-4";
        
        // Build member dots
        let dotsHtml = '<div class="flex gap-1">';
        for (let i = 0; i < 4; i++) {
            const isInside = i < stat.membersInside;
            dotsHtml += `<span class="w-2.5 h-2.5 rounded-full ${isInside ? 'bg-green-500' : 'bg-gray-300'}"></span>`;
        }
        dotsHtml += '</div>';

        // Status badge
        const statusBadge = stat.membersInside > 0
            ? `<div class="bg-[#dcfce7] text-[#166534] px-3 py-1 rounded-full font-caption font-bold">${stat.membersInside} / 4</div>`
            : `<div class="bg-gray-100 text-gray-400 px-3 py-1 rounded-full font-caption font-bold">0 / 4</div>`;

        li.innerHTML = `
            <div class="flex items-center gap-4">
                <div>
                    <div class="flex items-center gap-2">
                        <p class="font-label-bold text-on-surface">${getTeamDisplayName(stat.teamId)} ${stat.membersInside}</p>
                        ${stat.membersInside > 0 ? `<span class="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="Members Inside"></span>` : ''}
                    </div>
                    <p class="font-caption text-on-surface-variant" style="font-size:11px;">${stat.teamId}</p>
                    ${dotsHtml}
                </div>
            </div>
            <div class="flex items-center gap-2">
                ${statusBadge}
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
