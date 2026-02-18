# Synthflow UX Research

> Research Date: February 18, 2026
> Source: synthflow.ai (Marketing site + CSS analysis)

---

## Overview

Synthflow is a Voice AI platform for automating phone calls. The marketing site is built on **Webflow** and provides insights into their design system. Note: The actual app dashboard (at fine-tuner.ai/auth) was not directly accessible for deep inspection, but the marketing site reveals the core design language.

---

## Color Palette

### Primary Colors
| Name | Hex | Usage |
|------|-----|-------|
| Dark Purple | `#110229` | Primary text, dark backgrounds |
| Darker Purple | `#1e0a45` | Hero sections, gradients |
| Violet | `#5b0dd5` | Primary accent, CTAs |
| Violet-600 | `#502d95` | Secondary accents |
| Violet-1 (Light) | `#f3f2f5` | Light backgrounds |

### Neutral Colors
| Name | Hex | Usage |
|------|-----|-------|
| Pure White | `#ffffff` | Cards, content backgrounds |
| Grey 3 | `#e3e3e3` | Borders, dividers |
| Dark Grey | `#A0A0A0` | Secondary text |
| Text Dark Grey | `#110229` | Primary text |

### Gradient Examples
- Hero backgrounds: `linear-gradient(176deg, #1e0a45, #200b4b 23%, #502d95 73%, #7e5ac6 100%)`
- Dark sections: Purple-to-darker purple gradients

---

## Typography

### Font Families
- **Primary Body**: `Geist, Arial, sans-serif`
- **Mono/Label**: `"Reddit Mono", Arial, sans-serif`

### Type Scale (Desktop)
| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | 48px (large: 50px) | 600+ | 1.1 |
| H2 | 36px | 600+ | 1.2 |
| H3 | 28px | 500+ | 1.3 |
| Body Large | 20px | 400 | 1.5 |
| Body | 16px | 400 | 1.5 |
| Small | 14px | 400 | 1.4 |
| Mono | 11-13px | 400 | - |

### Type Scale (Mobile - 767px breakpoint)
| Element | Size |
|---------|------|
| H1 | 40px |
| H2 | 32px |
| H3 | 28px |
| Body | 16px |

---

## Navigation Structure

### Desktop Navigation
- **Type**: Top navbar with dropdown menus
- **Layout**: Horizontal links with hamburger on mobile
- **Items**: Solutions, Features, Pricing, Resources, Case Studies
- **CTA**: "Talk to Sales" button (primary), "Log in" link

### Mobile Navigation
- **Hamburger menu**: Collapses to hamburger icon
- **Full-screen overlay**: Dropdown menus slide in
- **Touch-friendly**: Large tap targets (min 44px)

---

## Button Styles

### Primary Button
```css
/* Example from CSS */
padding: 1.375rem 2.5rem;  /* Large padding */
border-radius: 0.5rem;      /* Rounded corners */
font-weight: 500;
transition: all 0.2s ease;
```

### Button Variants
- **Primary**: Violet background (`#5b0dd5`), white text
- **Secondary**: White background, violet border
- **Ghost**: Transparent, violet text
- **Full-width (mobile)**: 100% width on mobile

### Button States
- Hover: Slight brightness increase
- Active: Scale down slightly (0.98)
- Focus: Visible outline for accessibility

---

## Card Designs

### Feature Cards
- Background: White (`#ffffff`)
- Border: Light grey (`#e3e3e3`)
- Border-radius: `1rem` (16px)
- Padding: `2rem`
- Shadow: `0 4px 12px -4px rgba(0,0,0,0.07)` (subtle)

### Use Case Cards
- Border-radius: `1.25rem` (20px)
- Hover: Lift effect with shadow increase
- Icon: 40-48px with rounded container

### Testimonial Cards
- Border-radius: `1rem`
- Shadow: Subtle, layered
- Avatar: 64px circular

---

## Layout & Spacing

### Container Max Widths
- Standard content: `1200px`
- Wide sections: Full width with max constraint

### Spacing System (8px base)
| Name | Value |
|------|-------|
| gap-5 | 5px |
| gap-10 | 10px |
| gap-16 | 16px |
| gap-24 | 24px |
| gap-32 | 32px |
| gap-40 | 40px |
| gap-60 | 60px |
| gap-80 | 80px |

### Section Padding
- Standard: `80px` vertical
- Large: `120px` vertical
- Mobile: `60px` vertical

---

## Mobile Responsiveness

### Breakpoints
| Name | Width |
|------|-------|
| Mobile | < 480px |
| Landscape Mobile | < 767px |
| Tablet | < 991px |
| Desktop | >= 991px |

### Mobile Adaptations

1. **Navigation**
   - Hamburger menu at `767px`
   - Full-width dropdowns
   - Touch-friendly tap targets (44px+)

2. **Layout Changes**
   - Grid columns reduce: 3-col → 2-col → 1-col
   - `grid-template-columns: 1fr` for full-width stacking
   - Padding reduces from 40px to 20px

3. **Typography**
   - H1: 48px → 40px (mobile)
   - Body: 16px stays consistent
   - Line heights tighten on mobile

4. **Buttons**
   - Full-width on mobile: `width: 100%`
   - Height: `3rem` (48px) minimum for touch
   - Padding reduces: `padding: 0.5rem 1rem`

5. **Cards**
   - Stack vertically
   - Border-radius maintained but margins reduce
   - No horizontal scroll required

6. **Touch Optimization**
   - Swipeable carousels (Swiper.js)
   - Large tap targets
   - No hover-dependent interactions

---

## UI Patterns

### Dropdowns
- Animated open/close (transform + opacity)
- Backdrop blur on overlays
- Chevron rotation on open

### Forms
- Input height: `3rem` (48px)
- Border-radius: `0.5rem`
- Focus: Violet border glow

### Modals
- Centered with backdrop blur
- Max-width: `600px`
- Slide-in animation

### Tabs
- Horizontal scrollable on mobile
- Active state: Underline + bold

### Cards Grid
- CSS Grid: `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`
- Gap: `24px` to `40px`

---

## Key Takeaways for Implementation

1. **Use CSS Variables** for theming consistency
2. **8px spacing grid** aligns with modern practices
3. **Mobile-first breakpoints** at 480px, 767px, 991px
4. **Touch targets minimum 44px** for accessibility
5. **Rounded corners** (`0.5rem` - `1.25rem`) for friendly feel
6. **Purple gradient accents** for premium tech feel
7. **Geist font** for modern, clean typography

---

## Notes

- This research covers the **marketing website** design
- The actual app (dashboard) may differ - fine-tuner.ai/auth was not accessible
- Webflow provides the underlying framework with custom CSS overrides
- Consider requesting access to the actual app for deeper dashboard UI analysis
