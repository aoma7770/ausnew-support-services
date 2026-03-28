# AUSnew Support Services — Design Brainstorm

<response>
<probability>0.07</probability>
<text>
<idea>
**Design Movement**: Warm Humanist Modernism — inspired by Scandinavian social care design, where warmth and clarity coexist.

**Core Principles**:
1. Human-first typography: large, legible, warm — never clinical
2. Organic shapes and soft curves to convey care and safety
3. Asymmetric layouts that feel dynamic, not institutional
4. Accessibility baked into every visual decision (WCAG AA contrast)

**Color Philosophy**: The AUSnew logo's dark navy (#1B3A5C) and vibrant teal (#2BBFCF) form the foundation. Navy anchors trust and professionalism; teal signals vitality and forward movement. Warm off-white (#F8F6F2) backgrounds prevent the coldness of pure white, while a soft amber accent (#F5A623) adds warmth for CTAs.

**Layout Paradigm**: Staggered card grid with left-anchored hero text and right-side imagery. Service sections use alternating left/right content blocks. The page breathes with generous vertical rhythm.

**Signature Elements**:
1. Curved wave SVG dividers between sections — teal to white transitions
2. Floating stat counters (e.g., "500+ Participants Supported") with animated count-up
3. Organic blob shapes as image frames for team/property photos

**Interaction Philosophy**: Scroll-triggered fade-up animations for every content block. Hover states on service cards reveal a teal underline sweep. CTAs pulse gently on load.

**Animation**: Framer Motion scroll-triggered `fadeInUp` for cards (stagger 0.1s), `scaleIn` for stat numbers, wave SVG path animation on hero load.

**Typography System**: Display — `Nunito` (rounded, friendly, bold 800 for headings). Body — `Source Sans 3` (highly readable, neutral). Hierarchy: 72px hero, 48px section titles, 24px subheadings, 17px body.
</idea>
</text>
</response>

<response>
<probability>0.06</probability>
<text>
<idea>
**Design Movement**: Bold Civic Modernism — inspired by Australian government accessibility design combined with bold editorial typography.

**Core Principles**:
1. High contrast, high legibility — disability-friendly by design
2. Bold typographic hierarchy that guides the eye without confusion
3. Strong color blocking to delineate sections clearly
4. Generous touch targets and clear navigation for all abilities

**Color Philosophy**: Deep navy (#0D2B45) as the primary authority color. Bright teal (#00C2CB) as the action/energy color. Clean white sections alternate with navy hero blocks. A soft sage green (#7BC8A4) signals wellbeing and community.

**Layout Paradigm**: Full-width horizontal bands alternating between navy and white, with content set in a constrained 1200px column. Service cards use a 3-column masonry layout.

**Signature Elements**:
1. Large typographic pull-quotes from mission statement
2. Icon-forward service cards with teal icon backgrounds
3. Sticky navigation bar with a persistent phone number CTA

**Interaction Philosophy**: Smooth section transitions with horizontal slide-in for alternating content blocks. Mobile menu uses a full-screen overlay with large touch targets.

**Animation**: CSS-based scroll reveals using Intersection Observer. Service cards flip on hover to reveal more detail. Hero text types in character by character.

**Typography System**: Display — `Montserrat` (bold 900 for impact). Body — `Open Sans` (clean, accessible). Hierarchy: 80px hero, 44px section, 20px body.
</idea>
</text>
</response>

<response>
<probability>0.08</probability>
<text>
<idea>
**Design Movement**: Empowered Living — a vibrant, optimistic design language that celebrates ability rather than limitation.

**Core Principles**:
1. Joyful but professional — disability care that feels empowering, not clinical
2. Photography-forward design that showcases real community moments
3. Layered depth: subtle card shadows, gradient overlays, parallax sections
4. Mobile-first with thumb-friendly navigation

**Color Philosophy**: The logo's teal (#2BBFCF) and navy (#1B3A5C) are primary. A warm coral (#FF6B6B) accent adds energy for CTAs and highlights. Soft light grey (#F4F7FA) section backgrounds create breathing room without sterility.

**Layout Paradigm**: Diagonal section cuts (clip-path) create visual flow and energy. Hero uses a full-bleed image with a left-side text panel overlay. Services use a horizontal scrolling card strip on mobile, 3-column grid on desktop.

**Signature Elements**:
1. Diagonal/angled section dividers in teal
2. Floating CTA button that follows scroll (bottom-right corner)
3. Property photo gallery with lightbox for accommodation pages

**Interaction Philosophy**: Parallax hero image on scroll. Cards lift on hover with box-shadow transition. Form fields animate their labels to floating placeholders.

**Animation**: Framer Motion `whileInView` for all sections. Hero image has a subtle Ken Burns zoom. Stats section uses animated progress bars.

**Typography System**: Display — `Poppins` (geometric, modern, 700/800 weight). Body — `Inter` (clean for data/pricing tables). Hierarchy: 68px hero, 42px section, 18px body.
</idea>
</text>
</response>

---

## Selected Design: **Empowered Living** (Response 3)

This approach best matches AUSnew's brand — vibrant teal and navy from the logo, photography-forward to showcase real properties, diagonal cuts for visual energy, and a floating CTA for constant conversion opportunity. The Poppins/Inter pairing is modern and accessible.
