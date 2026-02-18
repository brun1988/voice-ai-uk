# Synthflow AI - UX Research Document

**Date:** February 18, 2026  
**Researcher:** Sub-agent (UX Researcher)  
**Source:** Public marketing website (synthflow.ai)

---

## ⚠️ Important Note

**Access Limitation:** The actual Synthflow application dashboard requires authentication and was not publicly accessible. This research is based on:
1. The public marketing website
2. Interactive demo elements visible on the landing page
3. Product screenshots and UI descriptions in marketing materials

---

## 1. Observed UI Elements (From Interactive Demo)

### Navigation Structure
- **Tabs:** "Flow View" / "Prompt View" toggle for agent configuration
- **Mode Selection:** Clear tab-based navigation for switching views
- **Section Headers:** Global Settings, Knowledge Base, Actions

### Card-Based Layouts
The demo interface uses card-based components:

- **Agent Cards:** Display agent type (e.g., "Lead Qualification · Buyer")
- **Feature Tags:** #Real-Time Booking, #Lead Qualification, #Receptionist
- **Knowledge Base Cards:** Upload Files, Web Content Import, Connect CRM
- **Action Cards:** Real-Time Booking, Warm Transfer, IVR (toggle-enabled)

### Visual Style (From Demo UI)
- **Clean, modern aesthetic** with clear visual hierarchy
- **Toggle switches** for enabling/disabling features
- **Form-like sections** for configuration (Who You Are, Greeting Message, etc.)
- **Accordion-style expandable sections** for flow logic

---

## 2. Color Scheme (Inferred from Marketing Site)

Based on the website branding:

| Element | Color |
|---------|-------|
| Primary Brand | Deep Purple/Violet (#6B46C1 approx) |
| Accent | Bright Blue/Cyan |
| Background | White (#FFFFFF) with light gray sections |
| Text | Dark gray (#1A202C) for headings |
| Secondary Text | Medium gray (#4A5568) |
| Tags/Badges | Teal, Purple, Blue variations |

### CTA Button Colors
- **Primary:** Solid purple/violet with white text
- **Secondary:** Outlined buttons with purple border
- **Hover States:** Slight darkening on buttons

---

## 3. Typography

- **Headings:** Bold, modern sans-serif (likely Inter, SF Pro, or similar)
- **Body:** Clean sans-serif, good readability
- **Code/Prompts:** Monospace font for prompt editor view

---

## 4. Observed Page Structures

### Landing Page Sections
1. Hero with product value proposition
2. Interactive demo section (Flow Preview)
3. Feature highlights (BELL Framework)
4. Industry use cases (cards)
5. Pricing calculator
6. FAQ accordion

### Interactive Demo Interface
- Left panel: Agent configuration (flow steps)
- Right panel: Live preview/testing
- Tab navigation: Flow View | Prompt View

---

## 5. Mobile Responsiveness

**Status:** Could not verify from available data

The marketing site appears responsive, but the actual app dashboard mobile experience could not be verified without access.

---

## 6. Key UI Patterns Observed

### Toggle Switches
Used for enabling features (Actions section)
```
[Enabled] Real-Time Booking
[Enabled] Warm Transfer
[Enabled] IVR
```

### Expandable Sections
- "Select a mode" with dropdown/tabs
- Collapsible flow logic sections

### Form Inputs
- Text areas for prompts (Who You Are)
- Clear labels and placeholders

### Card Grid
- Industry use cases displayed in card grid
- Each card: icon + title + description + CTA

---

## 7. Recommendations for Voice AI UK Implementation

Based on Synthflow's observed patterns:

### Navigation
- Use **tab-based navigation** for different views (Flow/Prompt)
- Consider **sidebar navigation** for main dashboard sections

### Cards
- Use **card-based layouts** for agent templates
- Include **tag badges** for categorization

### Forms
- Use **clear section headers** (Global Settings, etc.)
- Include **toggle switches** for feature enablement

### Visual Style
- Clean, modern aesthetic with purple/violet accent
- Generous whitespace
- Clear visual hierarchy

---

## 8. What Could Not Be Verified

- ❌ Actual app dashboard login/auth flow
- ❌ Main navigation (sidebar vs top nav)
- ❌ Exact button styles (border-radius, shadows)
- ❌ Mobile responsive behavior
- ❌ Dashboard home screen layout
- ❌ Analytics/reporting UI

---

## 9. Suggested Next Steps

To complete this UX research:

1. **Get dashboard access:** Create a trial account to explore the actual app
2. **Screen recording:** Capture the full dashboard for detailed analysis
3. **Mobile testing:** Access on mobile device or responsive mode
4. **Ask Synthflow:** Contact their sales team for demo access

---

*Document created by UX Researcher sub-agent*
