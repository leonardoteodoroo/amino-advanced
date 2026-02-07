# DESIGN SYSTEM — CLINICAL VITALITY THEME (2026) 🏥✨

## 1. PHILOSOPHY
**Trust, Clarity, and Vitality.**
*   **Target Audience**: Seniors 60+ (Requires high contrast, larger types, clear affordances).
*   **Core Vibe**: "Medical Authority" meets "Renewed Energy".
*   **Migration**: Moved from "red/danger" signals to "orange/vitality" for positive reinforcement.

---

## 2. SEMANTIC TOKEN SYSTEM (The Source of Truth)
*Strictly use these tokens instead of hardcoded hex/tailwind colors.*

### 🎨 Foreground (Text & Icons)
| Token | Color | Usage |
| :--- | :--- | :--- |
| **`text-fg-primary`** | `#1e293b` (Slate 800) | Main headings, body text, high-priority reading. |
| **`text-fg-secondary`** | `#475569` (Slate 600) | Supporting paragraphs, testimonials, descriptions. |
| **`text-fg-brand`** | `#1e3a8a` (Blue 900) | **Brand Identity**. Main headings, logos, "Clinical" emphasis. |
| **`text-fg-accent`** | `#ea580c` (Orange 600) | **Vitality**. Key highlights (e.g., "Unlock", "Energy"). |
| **`text-fg-muted`** | `#64748b` (Slate 500) | Meta info, labels, footnotes. (Upgraded from Slate 400 for WCAG). |
| **`text-fg-inverted`** | `#ffffff` (White) | Text on dark backgrounds (buttons, dark cards). |

### 🖌️ Backgrounds (Surfaces)
| Token | Color | Usage |
| :--- | :--- | :--- |
| **`bg-page`** | `#f8fafc` (Slate 50) | Main application background. Paper-like, soft. |
| **`bg-card`** | `#ffffff` (White) | Content contentainers. |
| **`bg-surface-section`** | `#e2e8f0` (Slate 200) | Section dividers or secondary backgrounds. |
| **`bg-fg-brand`** | `#1e3a8a` (Blue 900) | **Hero/Dark Sections**. Replaces "harsh black". |
| **`bg-warning-bg`** | `#fff7ed` (Orange 50) | Alert backgrounds (High visibility, low alarm). |

### 🚀 Interactive (Buttons & Links)
| Token | Color | Usage |
| :--- | :--- | :--- |
| **`bg-cta-primary`** | `#1e3a8a` (Blue 900) | **Trust Actions**. "Learn More", "See Evidence". |
| **`bg-cta-accent`** | `#ea580c` (Orange 600) | **Conversion/Vitality**. "Get The Formula", "Check Price". |
| **`bg-cta-accent-hover`**| `#c2410c` (Orange 700) | Hover state for accent buttons. |
| **`bg-cta-disabled`** | `#cbd5e1` (Slate 300) | Disabled state. |

### 🛡️ Feedback & Status
| Token | Color | Usage |
| :--- | :--- | :--- |
| **`text-feedback-warning`**| `#f59e0b` (Amber 500) | Alerts (e.g., "Muscle Health Alert"). Visible but calm. |
| **`text-feedback-success`**| `#10b981` (Green 500) | Success, Guarantee checks, Verified badges. |

---

## 3. TYPOGRAPHY (60+ Optimized)

**Fonts**:
*   **Headings**: `Playfair Display` (Serif) — Authority, Tradition, Medical credibility.
*   **Body**: `Inter` (Sans) — Maximum readability, modern clean look.

**Scale (Boosted for Readability)**:
*   `text-xs`: **14px** (Not 12px) — Smallest readable text.
*   `text-sm`: **16px** (Not 14px) — Secondary details.
*   `text-base`: **18px** (Not 16px) — **Standard Body Copy**.
*   `text-lg`: **20px** — Intros, large paragraphs.
*   `text-xl`: **24px** — Section subheaders.

---

## 4. UI PATTERNS & COMPONENTS

### Buttons
*   **Shape**: Rounded Full (Pill).
*   **Padding**: Generous (py-4 px-8) for easy clicking/tapping.
*   **Shadow**: `shadow-lg` for lift.
*   **Focus**: `ring-4 ring-focus-ring` (Blue 30% opacity) for accessibility.

### Cards
*   **Style**: "Clean Clinical" or "Glassmorphism" (Subtlety).
*   **Border**: `border border-border-subtle`.
*   **Shadow**: Soft, diffuse properties.

### Icons (Semantics Matter)
*   **Library**: `lucide-react`.
*   **Rules**:
    *   🛡️ **Shield**: Protection, Safety.
    *   ⚡ **Zap**: Energy, Speed.
    *   📈 **TrendingUp**: Growth, Utilization.
    *   🧠 **Brain**: Signaling, Intelligence.
    *   ❌ **No Trash Icons**: Do not use "Trash" or negative icons for positive concepts like "kidney protection".

---

## 5. ACCESSIBILITY RULES (WCAG AA/AAA)
1.  **Contrast**: Navy (`fg-brand`) on White = 12.8:1 (AAA). Orange (`fg-accent`) on White = >4.5:1 (AA).
2.  **No Low-Contrast Gray**: Use `fg-muted` (Slate 500) minimum, never Slate 300/400 for text.
3.  **Language**: `lang="en"` (SEO/Screen Readers).
4.  **Buttons**: Always distinct textual labels (e.g., "See Options" > "Click Here").

---
*Last Updated: 2026-02-06*
