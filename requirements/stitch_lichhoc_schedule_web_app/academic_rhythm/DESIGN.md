---
name: Academic Rhythm
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#444656'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#747687'
  outline-variant: '#c4c5d9'
  surface-tint: '#2749ec'
  primary: '#002dc7'
  on-primary: '#ffffff'
  primary-container: '#2547eb'
  on-primary-container: '#cfd4ff'
  inverse-primary: '#bac3ff'
  secondary: '#006c4a'
  on-secondary: '#ffffff'
  secondary-container: '#82f5c1'
  on-secondary-container: '#00714e'
  tertiary: '#6c3800'
  on-tertiary: '#ffffff'
  tertiary-container: '#8f4c00'
  on-tertiary-container: '#ffcca6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dee0ff'
  primary-fixed-dim: '#bac3ff'
  on-primary-fixed: '#000f5c'
  on-primary-fixed-variant: '#002ecb'
  secondary-fixed: '#85f8c4'
  secondary-fixed-dim: '#68dba9'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Be Vietnam Pro
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Be Vietnam Pro
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Be Vietnam Pro
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2.5rem
  space-2xs: 0.25rem
  space-xs: 0.375rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-base: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
---

## Brand & Style

This design system targets modern university students, academic advisors, and self-directed learners who require clarity under time pressure. The visual identity rejects sterile, bureaucratic portal aesthetics in favor of a focused, energetic, and highly legible workspace. It conveys competence, punctuality, and calm motivation.

The interface adheres to **Modern Editorial & Functional Minimalist** design movements:
- **Clean surfaces & crisp boundaries:** Generous white and near-white canvas zones isolate high-density academic information.
- **Vibrant semantic accents:** Royal blue anchors authority and schedule structure, while emerald green and amber provide instant visual triage for class statuses (upcoming, ongoing, room changes, assignment deadlines).
- **Time-grid visual rhythm:** Calendar matrices and list rows act as structured architectural modules, eliminating cognitive fatigue during intensive daily schedule checks.

## Colors

The palette balances deep focus with rapid visual scanning:

- **Primary (`#2547eb` - Royal Indigo):** Anchors primary actions, current week indicator, selected timetable slots, active navigation tabs, and major schedule headlines.
- **Secondary (`#059669` - Emerald Mint):** Used for "Confirmed Class", "Normal Session", "Lab Session", on-time status tags, and success toasts.
- **Tertiary (`#d97706` - Warm Amber):** Reserved for urgent reminders, upcoming deadlines, makeup classes ("Học bù"), exam alerts, and impending schedule clashes.
- **Neutral (`#0f172a` - Slate Obsidian):** Deep slate ensures stark contrast for body typography and structural divider rules.

### Background & Surface Hierarchy
- **Canvas Base:** `#f8fafc` (Ultra-soft cool slate, reduces eye strain compared to harsh `#ffffff`).
- **Surface Container (Cards & Modals):** `#ffffff` with subtle contrast borders.
- **Surface Muted / Time Track:** `#f1f5f9` for time-axis gutters and inactive calendar slots.
- **Critical / Danger Accent:** `#dc2626` strictly for canceled classes ("Nghỉ học") or system errors.

## Typography

**Be Vietnam Pro** is used uniformly across display, body, and micro-labels. Its native Vietnamese diacritics vertical alignment prevents clipping across compact calendar rows and fixed-height scheduling chips.

- **Headlines:** Set in semi-bold and bold weights with tight negative tracking (`-0.01em` to `-0.02em`) to deliver authority in current dates, course names, and section titles.
- **Numbers and Timestamps:** Course codes (e.g., `IT001.M21`), classroom identifiers (e.g., `B1-302`), and start-finish times utilize tabular numbers where possible (`tnum`) to keep timetable grids strictly aligned.
- **Readability & Diacritics:** Line heights are maintained at a minimum of 1.4x body size to ensure Vietnamese tonal marks (sắc, huyền, hỏi, ngã, nặng) never collide with adjacent lines or card top bounds.

## Layout & Spacing

The system leverages a strict **8-point grid rhythm**, downscaled to 4px increments (`space-2xs`, `space-xs`) for micro-elements such as timetable tags, badge padding, and course code indicators.

### Viewport Adaptation & Breakpoints
- **Mobile (< 768px):** 4-column fluid layout with `margin: 1rem`. Schedules default to an agenda-list view or single-day sliding time-track. Fixed bottom navigation bar provides instant jumping between "Hôm nay" (Today), "Tuần này" (Week), and "Học phần" (Courses).
- **Tablet (768px – 1023px):** 8-column layout with `margin: 1.5rem`. Enables 3-day split calendar views and compact side drawers for course details.
- **Desktop (≥ 1024px):** 12-column layout with `margin: 2.5rem` and fixed max-width container of `1440px`. Full 7-day visual matrix (Monday to Sunday) with a persistent left-rail filter (semester selector, credit status, teacher contacts).

### Grid Timetable Coordinates
- The 7-day calendar matrix uses uniform 1fr columns with a fixed 64px vertical hour-row rhythm.
- Multi-period lectures (e.g., periods 1-3) span explicitly across the row track using proportional vertical block math.

## Elevation & Depth

Visual hierarchy is maintained through **tonal surface separation combined with soft, directional ambient shadows**, preventing dense schedule data from feeling muddy or cluttered.

- **Level 0 (Canvas Base):** `#f8fafc`. Completely flat, non-elevated background for structural stability.
- **Level 1 (Cards, Course Blocks, Tables):** `#ffffff` container with a subtle structural border: `1px solid rgba(15, 23, 42, 0.08)`. Layered with ambient diffuse shadow: `0 1px 3px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.03)`.
- **Level 2 (Active/Current Class Card & Hover States):** Lifts element on Z-axis with a branded micro-glow: `0 6px 20px rgba(37, 71, 235, 0.08), 0 2px 6px rgba(15, 23, 42, 0.04)`. Border shifts to `rgba(37, 71, 235, 0.3)`.
- **Level 3 (Modals, Conflict Drawers, Popovers):** Elevated surface overlay with `0 16px 40px -8px rgba(15, 23, 42, 0.14)`. Accompanied by a 24% opacity Slate backdrop blur (`backdrop-filter: blur(4px)`).

## Shapes

The design system standardizes on a structured **12px (`0.75rem`) corner radius** for all primary surface containers (class session cards, agenda items, schedule panels). 

- **Primary Cards & Modals:** Standardized to `12px` (`rounded-md` in scale 2 configuration). This balances contemporary softness with maximum space efficiency in tight grid cells.
- **Interactive Schedule Blocks (Calendar Matrix):** `8px` corner radius to maintain crisp alignment along time grid lines.
- **Badges, Status Pills & Micro-tags:** `6px` or fully rounded pill styles (`9999px`) to immediately signal non-interactive metadata versus clickable session tiles.
- **Buttons and Inputs:** `10px` to maintain visual continuity with schedule card envelopes.

## Components

### Class Schedule Cards & Calendar Blocks
- **Card Anatomy:** Exact `12px` border-radius with a 3px vertical accent bar on the left edge denoting subject category (Royal Blue for Lectures, Emerald for Labs, Amber for Seminars/Exams).
- **Header Line:** Course title in `title-md` truncated to 2 lines, followed by credit count in a muted pill (`12px` font).
- **Meta Row:** Compact icon-text pairings for Room (`B1.302`), Lecturer name, and Period sequence (`Tiết 1 - 3: 07:00 - 09:30`).

### Badges & Status Chips
- **"Đang diễn ra" (Ongoing / Now):** Primary blue background with 12% tint (`#eff2fe`), text `#2547eb`, featuring an animated pulse indicator dot.
- **"Sắp tới" (Upcoming):** Amber background with 12% tint (`#fef3c7`), text `#b45309`.
- **"Đã hoàn thành" (Completed):** Soft slate tint (`#f1f5f9`), text `#64748b`.
- **Padding & Shape:** Vertical `2px`, horizontal `8px`, font `label-sm`, rounded-pill or `6px`.

### Timetable / Time-Grid Grid View
- **Time Gutter:** Left column displaying 24-hour markers (`07:00`, `08:00`, ...) in tabular `body-sm` slate-400.
- **Active Time Line:** A distinct 2px horizontal rule in `#2547eb` traversing today's column with a glowing circular node indicating current real-time progress.
- **Conflict Highlighting:** Overlapping courses render side-by-side with diagonal amber/red striped boundary hints.

### Buttons
- **Primary:** Background `#2547eb`, text `#ffffff`, hover `#1d3cd1`, font `label-md`. 10px corner radius, height 40px (desktop) / 44px (mobile touch target).
- **Secondary:** Surface `#ffffff`, border `1px solid rgba(15, 23, 42, 0.12)`, text `#0f172a`, hover background `#f8fafc`.
- **Ghost/Tertiary:** No border, text `#2547eb`, hover background `rgba(37, 71, 235, 0.08)`.

### Form Controls & Filter Inputs
- **Inputs & Selects:** Height 42px, radius 10px, background `#ffffff`, border `1px solid #cbd5e1`. Focus state transitions to `2px solid #2547eb` without jarring layout shift.
- **Semester Selector:** Prominent segmented toggle or dropdown with bold active semester indicators.