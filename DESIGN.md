---
name: Heritage Hearth
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#4e453d'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#80756c'
  outline-variant: '#d2c4ba'
  surface-tint: '#725a42'
  primary: '#33210d'
  on-primary: '#ffffff'
  primary-container: '#4b3621'
  on-primary-container: '#bd9f83'
  inverse-primary: '#e1c1a4'
  secondary: '#735a3e'
  on-secondary: '#ffffff'
  secondary-container: '#fcdab6'
  on-secondary-container: '#775e41'
  tertiary: '#252522'
  on-tertiary: '#ffffff'
  tertiary-container: '#3a3a37'
  on-tertiary-container: '#a6a49f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#fedcbe'
  primary-fixed-dim: '#e1c1a4'
  on-primary-fixed: '#291806'
  on-primary-fixed-variant: '#59422c'
  secondary-fixed: '#ffddb9'
  secondary-fixed-dim: '#e2c19e'
  on-secondary-fixed: '#291803'
  on-secondary-fixed-variant: '#594228'
  tertiary-fixed: '#e5e2dd'
  tertiary-fixed-dim: '#c9c6c2'
  on-tertiary-fixed: '#1c1c19'
  on-tertiary-fixed-variant: '#474743'
  background: '#fcf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  display-lg:
    fontFamily: EB Garamond
    fontSize: 64px
    fontWeight: '500'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: EB Garamond
    fontSize: 48px
    fontWeight: '500'
    lineHeight: 56px
  headline-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 36px
    fontWeight: '500'
    lineHeight: 44px
  headline-md:
    fontFamily: EB Garamond
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  section-gap: 120px
---

## Brand & Style
The design system is anchored in a philosophy of "Sophisticated Warmth." It targets an epicurean audience that values both culinary excellence and the physical atmosphere of a dining space. The visual language balances high-end editorial aesthetics with the tactile comfort of a boutique cafe.

The chosen style is a blend of **Minimalism** and **Tactile/Skeuomorphism**. We utilize generous whitespace and disciplined typography to establish an upscale feel, while incorporating subtle organic textures and soft shadows to ensure the interface feels "cozy" rather than cold. The emotional goal is to evoke the scent of roasted coffee and the quiet hum of a well-appointed bistro.

## Colors
The palette is derived from the natural transition of coffee extraction and steamed milk. 

- **Primary (#4B3621):** "Espresso Roast." Used for high-contrast text, primary buttons, and critical branding elements. It provides the grounding weight for the design system.
- **Secondary (#C2A382):** "Golden Crema." Used for accents, dividers, and active states. This color bridges the gap between the dark wood tones and light fabrics.
- **Tertiary (#F5F2ED):** "Almond Steam." The primary surface color. It is warmer than pure white, reducing eye strain and reinforcing the cozy atmosphere.
- **Neutral (#2C2C2C):** "Charcoal Steel." Used sparingly for functional UI elements like iconography and secondary body text to ensure modern legibility.

## Typography
The typography strategy pairings create a "Modern Heritage" look. **EB Garamond** brings historical authority and grace to headings, while **Hanken Grotesk** ensures that menus and reservation details remain highly legible and professional.

For display text, use tight letter spacing and medium weights to emphasize the serif's character. For body text, prioritize generous line heights (1.5x - 1.6x) to maintain a relaxed reading pace. Labels should always be in Hanken Grotesk with slight tracking (letter spacing) to provide a clean, systematic counterpoint to the decorative headlines.

## Layout & Spacing
The design system utilizes a **Fixed Grid** model on desktop to maintain an editorial, magazine-like feel. 

- **Desktop (1200px+):** A 12-column grid with 24px gutters. Use large "Section Gaps" (120px) to separate the menu from the heritage story, allowing the content to breathe.
- **Tablet:** 8-column grid with 24px margins. Content should reflow into single columns for menu categories.
- **Mobile:** 4-column grid with 20px margins. 

Spacing follows a strict 8px baseline rhythm. High-end hospitality design relies on asymmetrical layouts; for example, images of food should often break the grid or bleed to the edge of the screen to create a sense of immersion.

## Elevation & Depth
Depth is signaled through **Tonal Layers** and **Ambient Shadows**. We avoid harsh, synthetic shadows in favor of "Soft Organic" elevations:

1.  **Level 0 (Base):** The Tertiary "Almond Steam" color serves as the canvas.
2.  **Level 1 (Cards/Floating Elements):** White surfaces (#FFFFFF) with a very diffused, low-opacity shadow (Color: #4B3621 at 5% opacity, Blur: 20px, Y-Offset: 4px). This makes menu items feel like they are printed on thick cardstock.
3.  **Level 2 (Overlays/Modals):** High-contrast "Espresso Roast" containers with gold accents for reservation forms, creating a "dark room" focus effect.

Use low-contrast outlines (1px solid #C2A382 at 30% opacity) for input fields to maintain a delicate, hand-crafted appearance.

## Shapes
This design system uses a **Soft** shape language. 

- **Standard Elements:** 0.25rem (4px) corner radius for buttons and input fields. This provides a hint of approachability without losing the structured "upscale" feel of a formal establishment.
- **Featured Cards:** 0.5rem (8px) for menu item cards and reservation containers.
- **Decorative Elements:** Circular crops for chef portraits or specific food highlights to contrast the otherwise rectangular grid.

## Components
- **Buttons:** 
  - *Primary:* Espresso Roast background, Almond Steam text, 4px radius. Subtle lift on hover.
  - *Secondary:* Transparent background, 1px solid Golden Crema border, Golden Crema text.
- **Menu Cards:** 
  - Use a clean vertical layout. The dish name in EB Garamond (Headline-MD), price in Hanken Grotesk (Label-SM), and description in Hanken Grotesk (Body-MD). Use a dotted leader line to connect the dish name to the price for a classic bistro aesthetic.
- **Reservation Forms:** 
  - High-focus components. Use Tertiary (#F5F2ED) background for the form container. Input fields should have a bottom-border-only style for a more "ledger-like" and sophisticated appearance.
- **Chips/Tags:** 
  - For dietary requirements (e.g., "Vegan", "Gluten-Free"). Use small caps, 12px Hanken Grotesk, with a light Golden Crema background at 15% opacity.
- **The "Signature" Divider:** 
  - A 1px horizontal line in Golden Crema, featuring a small, centered leaf or coffee bean icon to break up long scrolling sections.