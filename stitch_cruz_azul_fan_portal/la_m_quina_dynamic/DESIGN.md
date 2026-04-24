---
name: La Máquina Dynamic
colors:
  surface: '#fdf8f8'
  surface-dim: '#ddd9d8'
  surface-bright: '#fdf8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f2f2'
  surface-container: '#f1edec'
  surface-container-high: '#ece7e7'
  surface-container-highest: '#e6e1e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#43474f'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#737780'
  outline-variant: '#c3c6d1'
  surface-tint: '#3c5f94'
  primary: '#001b3d'
  on-primary: '#ffffff'
  primary-container: '#003063'
  on-primary-container: '#7899d2'
  inverse-primary: '#a9c7ff'
  secondary: '#5d5f5f'
  on-secondary: '#ffffff'
  secondary-container: '#e2e3e2'
  on-secondary-container: '#636565'
  tertiary: '#420003'
  on-tertiary: '#ffffff'
  tertiary-container: '#690108'
  on-tertiary-container: '#f76d63'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#a9c7ff'
  on-primary-fixed: '#001b3d'
  on-primary-fixed-variant: '#22477b'
  secondary-fixed: '#e2e3e2'
  secondary-fixed-dim: '#c6c7c6'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#ffdad6'
  tertiary-fixed-dim: '#ffb4ac'
  on-tertiary-fixed: '#410003'
  on-tertiary-fixed-variant: '#891c1b'
  background: '#fdf8f8'
  on-background: '#1c1b1b'
  surface-variant: '#e6e1e1'
typography:
  display-2xl:
    fontFamily: Lexend
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-xl:
    fontFamily: Lexend
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Lexend
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  stat-lg:
    fontFamily: Lexend
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  element-gap: 16px
  gutter: 24px
  margin-mobile: 16px
  section-gap: 80px
  container-max: 1280px
---

## Brand & Style
The brand personality is **Athletic, Passionate, and Institutional**. It captures the intensity of professional sports while maintaining a structured, premium fan experience. 

The design style is **Corporate / Modern with Bold Accents**. It utilizes a clean, systematic layout inspired by Material Design but injects "sporty" energy through aggressive typography (all-caps displays), high-contrast tertiary accents, and a "thick-border" interaction model that feels tactile and durable. The interface is designed to evoke a sense of stadium grandeur, using deep gradients and large-scale imagery balanced by precise, functional white-space.

## Colors
The palette is built around the "Cruz Azul" identity. 
- **Primary (#003063):** A deep, institutional navy used for core brand elements, headers, and primary actions.
- **Secondary (#5D5F5F):** A neutral slate-grey used for secondary labels and metadata.
- **Tertiary (#680007):** A dark "Passion Red" used sparingly for high-alert items, live indicators, and decorative borders to provide a striking contrast against the blue.
- **Neutral (#1C1B1B):** Pure off-black for maximum readability.

The system uses a refined light mode with "Surface Container" tiers (#F6F3F2 to #E5E2E1) to create subtle sectional separation without relying on heavy borders.

## Typography
The typography system relies on **Lexend** for all brand-heavy and "active" content. It is used in heavy weights (700-800) and often in uppercase for display titles to mimic sports broadcasting aesthetics. 

**Inter** serves as the utilitarian workhorse for body copy and metadata, providing a clean, neutral counterpoint to the aggressive headline style. High-priority labels utilize increased letter spacing (0.05em) and bold weights to maintain visibility against complex backgrounds.

## Layout & Spacing
The system utilizes a **Fixed Grid** approach for desktop, centered within a 1280px container. 

- **Rhythm:** A 4px base unit controls all internal spacing.
- **Sections:** Large vertical gaps (80px) separate major content areas, allowing the high-impact imagery to breathe.
- **Bento Grids:** Content blocks (like News) use a 3-column grid system where featured items can span 2 columns, creating a dynamic visual hierarchy.
- **Overlap:** Negative margins (e.g., -64px) are used on primary feature cards to overlap hero sections, creating a sense of physical depth and connectivity between sections.

## Elevation & Depth
Depth is communicated through **Tonal Layering** and **Subtle Shadows**:

- **Layer 0:** Background surface (#FCF9F8).
- **Layer 1:** Raised cards with `shadow-sm` and a subtle 1px border (#003063 at 10% opacity).
- **Layer 2:** High-impact "Floating" cards with `shadow-lg` and deep blue/navy tints in the shadow (e.g., `rgba(0, 48, 99, 0.1)`).
- **Gradients:** Hero sections use multi-stop gradients (from Primary Navy to Transparent) to ensure text legibility over photography.

## Shapes
The shape language is primarily **Soft-Geometric**. 
- **Standard Radius:** 4px (0.25rem) for buttons and small elements to maintain a crisp, professional look.
- **Container Radius:** 12px (0.75rem) to 16px (1rem) for news cards and match modules, softening the overall layout.
- **Pill Shapes:** Used exclusively for status chips (e.g., "Live") and secondary tags to distinguish them from interactive buttons.
- **Interaction Border:** Primary buttons use a distinctive right-side border (2px to 4px) in a contrasting tertiary color to simulate a "3D" edge.

## Components
- **Buttons:** Primary buttons are solid Navy (#003063) with white text. Hero buttons are White with a 4px `border-r` in Passion Red (#680007). All buttons feature a hover state that includes a 1-2px vertical translation (-translate-y-1).
- **Match Cards:** Use a three-pane layout (Home-Info-Away). The central "Match Info" section is delineated by vertical borders in `outline-variant` (#C2C6D2).
- **Chips/Badges:** Live status indicators must include a pulsing animation and a small circular dot icon. Tags use `primary-container` backgrounds with 10px bold text.
- **Bento Cards:** Feature cards must include a gradient overlay covering at least 60% of the image height to ensure headline contrast.
- **Navigation:** The top bar is sticky with a `backdrop-blur-sm` and a subtle `border-b`. Active links are marked by a 2px `border-b` in Tertiary Red.