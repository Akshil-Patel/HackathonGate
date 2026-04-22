---
name: Utility Core
colors:
  surface: '#faf8ff'
  surface-dim: '#d9d9e5'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fe'
  surface-container: '#ededf9'
  surface-container-high: '#e7e7f3'
  surface-container-highest: '#e1e2ed'
  on-surface: '#191b23'
  on-surface-variant: '#434655'
  inverse-surface: '#2e3039'
  inverse-on-surface: '#f0f0fb'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#006e2d'
  on-secondary: '#ffffff'
  secondary-container: '#7cf994'
  on-secondary-container: '#007230'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#7ffc97'
  secondary-fixed-dim: '#62df7d'
  on-secondary-fixed: '#002109'
  on-secondary-fixed-variant: '#005320'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#faf8ff'
  on-background: '#191b23'
  surface-variant: '#e1e2ed'
typography:
  h1:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.5'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.2'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  margin-mobile: 20px
  gutter: 16px
  tap-target-min: 48px
---

## Brand & Style

This design system is built for high-stakes utility and rapid interaction in mobile-first environments. The brand personality is functional, authoritative, and dependable, prioritizing clarity over decoration. The target audience consists of users in fast-paced or low-light venue environments where cognitive load must be minimized.

The style is **Corporate / Modern** with a lean toward **Minimalism**. It utilizes heavy whitespace to separate data points and high-contrast color application to signify state changes instantly. The interface evokes a sense of "tool-like" precision, ensuring every tap is intentional and every status is unmistakable.

## Colors

The palette is strictly functional. **Vibrant Blue (#2563eb)** is reserved for "IN" states, primary calls-to-action, and active navigation. **Vibrant Green (#16a34a)** is used exclusively for "OUT" states or successful completions. 

**Neutral Grays** serve as the structural backbone: 
- `#f3f4f6` (Gray 100) is used for surface containers and background layering to differentiate from the pure white page base. 
- `#9ca3af` (Gray 400) is used for inactive states, secondary icons, and placeholder text. 

High contrast ratios (minimum 4.5:1) are maintained for all meaningful text and iconography to ensure legibility in varying venue lighting.

## Typography

This design system utilizes **Inter** for its exceptional legibility and systematic weight distribution. 

- **Headers:** Set in Bold (700) with slight negative letter-spacing to create a strong visual anchor for content sections.
- **Body:** Standardized at 16px to 18px to ensure readability on mobile devices at arm's length.
- **Labels:** High-emphasis labels use Bold (700) and uppercase styling to distinguish metadata from content.
- **Contrast:** Headings should always use the darkest neutral available (close to black) to maintain hierarchy over secondary UI elements.

## Layout & Spacing

The layout philosophy is a **Fluid Grid** optimized for a single-column mobile view. Content spans the full width of the screen with a mandatory **20px side margin** to prevent interaction errors near device edges.

Spacing follows a strict **4px baseline rhythm**. To ensure accessibility in "venue environments," the minimum height for any interactive element (buttons, list items, toggles) is **48px**, though **56px** is preferred for primary actions. Vertical padding between logical groups should be generous (24px or 32px) to allow the "minimal" aesthetic to provide breathing room for the user's eyes.

## Elevation & Depth

This design system uses **Tonal Layers** rather than heavy shadows to signify depth. 
- **Level 0 (Base):** Pure white (#ffffff) for the main application background.
- **Level 1 (Surface):** Light gray (#f3f4f6) for card backgrounds and input fields.
- **Level 2 (Active):** A very subtle, soft shadow (4px Blur, 2px Y-offset, 5% Opacity Black) may be used on primary action buttons to give them a "pressable" tactile feel.

Avoid complex gradients or blurs; depth is primarily communicated through the contrast between the white background and the gray container surfaces.

## Shapes

The shape language is defined by **Rounded (lg)** corners.
- **Standard components:** 0.5rem (8px) radius.
- **Large containers/Cards:** 1rem (16px) radius.
- **Full-width buttons:** 1rem (16px) radius to maintain a friendly yet professional silhouette.

This consistent roundedness softens the high-contrast "utility" nature of the app, making it feel modern and approachable.

## Components

### Buttons
- **Primary Action (IN):** Solid Blue (#2563eb) background with White text. Minimum 56px height.
- **Secondary Action (OUT):** Solid Green (#16a34a) background with White text.
- **Inactive:** Solid Gray (#f3f4f6) background with Gray (#9ca3af) text.

### Cards
Cards use a White background on a Gray surface (or vice-versa) with a 16px corner radius. They should not have borders; use a subtle 1px light gray stroke only if the card is placed on a white background.

### Lists
List items must have a minimum height of 64px to accommodate large tap targets. Use a divider line (1px, #f3f4f6) between items, stopping 20px short of the screen edges.

### Inputs
Text fields should have a light gray (#f3f4f6) background, 8px corner radius, and a 16px internal padding. Labels are positioned above the field in Bold 14px text.

### Chips/Badges
Small, highly rounded (pill-shaped) elements. Use for quick status indicators. "IN" chips use light blue backgrounds with dark blue text; "OUT" chips use light green backgrounds with dark green text.