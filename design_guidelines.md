# Maison Noir - Coming Soon 2026 Design Guidelines

## Design Approach
**Reference-Based Approach**: Luxury brand aesthetic inspired by high-end fashion and creative agencies (similar to Chanel, Saint Laurent digital presence), combined with contemporary Parisian sophistication. The design must evoke mystery, prestige, and cinematic elegance.

## Core Design Elements

### Color Palette
**Dark Mode Primary Palette:**
- Background: Deep Black `#0a0a0a` (10 0% 4%)
- Primary Text: Silver `#e5e5e5` (0 0% 90%)
- Accent: Soft Gold `#c6a664` (41 42% 59%)

**Color Usage:**
- Deep black dominates as the canvas
- Silver text for all body content and secondary elements
- Soft gold exclusively for subtle accents, hover states, and emphasis
- No additional colors - maintain strict three-color restraint

### Typography
**Font Families:**
- **Display/Titles**: Playfair Display (serif, capitalized for "MAISON NOIR")
- **Body Text**: Inter (clean, modern sans-serif)

**Hierarchy:**
- Logo/Title: Large, capitalized Playfair Display
- Tagline: Elegant, medium-sized with refined spacing
- Dropdown Headers: Playfair Display with subtle weight
- Body Content: Inter with generous line-height for readability
- Quote: Italic styling, poetic presentation
- Footer: Small, minimal Inter

### Layout System
**Spacing Primitives**: Use Tailwind units of 4, 8, 12, 16, and 24
- Vertical rhythm: py-12, py-16, py-24 for section spacing
- Component spacing: gap-4, gap-8, gap-12
- Container padding: px-8, px-12, px-16

**Structure:**
- Centered, vertically-flowing single-column layout
- Maximum width constraints for readability (max-w-4xl for content)
- Generous whitespace to create breathing room
- Full viewport height for hero section (min-h-screen)

### Component Library

**Core Elements:**
- **Logo Section**: Centered with smooth fade-in animation, followed by "MAISON NOIR" title
- **Tagline**: "Là où la rose noire fait éclore les légendes" with progressive appearance
- **Animated Dropdowns** (3): HeadlessUI-based with smooth expand/collapse
  - À propos (agency introduction)
  - Philosophie et vision (philosophy and vision)
  - Nos pôles créatifs (creative divisions: NOIR STUDIO, NOIR RECORDS, NOIR DIGITAL)
- **Project Status Text**: Explanation of development progress
- **Signature Quote**: Poetic, italic-styled quote signed by Maison Noir
- **Minimalist Footer**: "© 2026 Maison Noir. Tous droits réservés."

### Animations & Interactions
**Animation Library**: Framer Motion

**Effects to Implement:**
- Logo: Smooth fade-in on page load
- Title: Slow, progressive appearance
- Tagline: Elegant reveal after title
- Dropdowns: Subtle rotation on toggle, slide-down/up content with fade
- Quote: Gentle fade-in effect
- Hover states: Soft gold color transitions
- All animations: Slow, deliberate timing (0.6-1s duration)

**Interaction Principles:**
- Cinematic pacing - never rushed
- Fluid transitions between states
- Subtle hover feedback with gold accent
- Smooth scroll behavior

### Images
**Logo Placement**: `/public/logo.png` - centered at top with animation, treat as hero element

**No Large Hero Image**: This design relies on typographic elegance and the logo as the primary visual anchor, not photographic imagery.

### Responsive Behavior
- **Desktop**: Centered layout with comfortable max-width
- **Mobile**: Full-width with appropriate padding, stacked layout maintained
- **Dropdowns**: Touch-friendly on mobile with adequate tap targets
- **Typography**: Scale down appropriately for mobile screens

### Accessibility & Quality Standards
- High contrast maintained between silver text and black background
- Gold accents used sparingly for emphasis, never for critical information
- Keyboard navigation for all dropdowns
- Smooth, non-jarring animations (respect prefers-reduced-motion)
- Semantic HTML structure
- Clear visual hierarchy through typography and spacing

### Brand Essence
The interface must communicate that Maison Noir is:
- A prestigious creative house, not just an agency
- Where emerging talents become legends
- The intersection of art, mystery, and strategic excellence
- Parisian sophistication meets contemporary innovation
- A place where "the black rose blooms in darkness"