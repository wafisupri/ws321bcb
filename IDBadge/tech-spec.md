# Tech Spec — BFI Access Card Portal

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| gsap | ^3.12 | 3D card scroll animation, ScrollTrigger plugin |
| lucide-react | ^0.400 | Icons (Shield, Download, FileText, ChevronRight, etc.) |

No additional UI framework — this is a content-heavy single-page site with standard tab and table components that are simpler to build directly than to configure from a component library.

## Component Inventory

### Layout

| Component | Source | Reuse | Notes |
|-----------|--------|-------|-------|
| Navbar | Custom | Single | Fixed nav with scroll-triggered shadow, IntersectionObserver-driven active link |
| Footer | Custom | Single | 3-column grid with quick links and contact |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | 2-column layout (text left, card right). Contains Card3D. |
| ProcessSection | Custom | Hosts tab state and renders TabContent sub-components. |

### Reusable Components

| Component | Source | Used By | Notes |
|-----------|--------|---------|-------|
| Card3D | Custom | HeroSection | CSS 3D transform container with front/back faces. GSAP-animated. |
| TabBar | Custom | ProcessSection | Horizontal tabs with sliding active indicator. |
| TabContent | Custom | ProcessSection | Fade-in wrapper for tab panel content. |
| ProcessSteps | Custom | TabContent (On-Boarding, Off-Boarding) | Numbered vertical step list with timeline connector line. |
| RACITable | Custom | TabContent (RACI Summary) | Condensed RACI matrix with color-coded role badges. |
| DownloadCard | Custom | TabContent (Documents) | File info row with download button. |
| InfoCard | Custom | TabContent (Overview) | White bordered card for department list. |
| NoteBox | Custom | TabContent (On-Boarding, Off-Boarding) | Amber-left-border callout box. |

### Hooks

| Hook | Purpose |
|------|---------|
| useScrollSpy | IntersectionObserver wrapper that reports which section is in viewport. Drives Navbar active link state and section entrance animations. |

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| 3D card scroll rotation | GSAP + ScrollTrigger | ScrollTrigger on hero section, scrub: 1. Timeline: rotateY 0→180°, scale 1→0.85, translateY 0→60px over 0–40% scroll; then rotateY 180→200°, rotateX 0→5°, opacity 1→0.3 over 40–100%. | **High** 🔒 |
| Card entrance on load | GSAP | Single tween: opacity 0→1, y 40→0, rotateY -10°→0°, 800ms, power2.out. Fires once on mount. | Medium |
| Section entrance (global) | CSS + IntersectionObserver | useScrollSpy triggers CSS class toggle. Elements animate opacity 0→1, translateY 30px→0, stagger 100ms via CSS transition-delay. | Medium |
| Tab switch | CSS | Fade-out 150ms → fade-in 300ms with translateY(10px→0). Active indicator: CSS transition on left/width properties. | Low |
| Nav shadow on scroll | CSS + JS | Scroll event listener (throttled) toggles shadow class when scrollY > 50. | Low |
| Hover effects (buttons, table rows, download cards) | CSS | Standard CSS transitions (background-color, transform, box-shadow). | Low |

## State & Logic

### Tab State

ProcessSection holds `activeTab` state (string: one of 5 tab IDs). Tab switching is purely client-side — no routing, no URL sync. Tab content conditionally rendered based on `activeTab`.

### Scroll-Spy Architecture

A single IntersectionObserver (threshold: 0.15) registered in `useScrollSpy` watches all section anchors (hero, process-overview). It returns the currently visible section ID. Two consumers:

1. **Navbar** — reads visible section to highlight the matching nav link
2. **Section entrance animations** — each section registers its DOM elements; when the section enters viewport, the hook adds a `visible` CSS class that triggers entrance animations via CSS transitions

The IntersectionObserver should use `rootMargin: "-80px 0px 0px 0px"` to account for the fixed navbar height.

### 3D Card — GSAP Integration Pattern

The Card3D component uses a `useEffect` + `useRef` pattern:
- On mount: run entrance tween
- On mount: create ScrollTrigger timeline pinned to hero scroll, store ref for cleanup
- On unmount: kill the ScrollTrigger instance and timeline

The card front/back are static images; the 3D effect is purely CSS `transform-style: preserve-3d` + GSAP-driven `rotateY`. No canvas or WebGL needed.

## Key Architectural Decisions

**No shadcn/ui**: The design consists of tabs, tables, and cards with very specific corporate styling (navy/gold palette, custom RACI badges, timeline connectors). Building these custom avoids fighting a component library's default styles. Lucide provides all needed icons.

**CSS animations over Framer Motion**: All animations are either scroll-driven (GSAP) or simple CSS transitions (tab fades, hovers, entrance reveals). Framer Motion adds no value here.

**Single IntersectionObserver for both nav and entrance**: Rather than separate observers for navbar tracking and section reveals, one `useScrollSpy` hook drives both. This avoids duplicate DOM observation overhead.

**No PDF download functionality**: The download cards reference non-existent PDF files. Buttons are present as UI elements but trigger no download. If real files become available, add a download handler.
