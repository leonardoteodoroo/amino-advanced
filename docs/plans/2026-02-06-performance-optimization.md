# Performance Optimization Plan
> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reduce TBT (Total Blocking Time) to <500ms and CLS (Cumulative Layout Shift) to 0 by optimizing images and JS execution.

**Architecture:** 
- Explicit dimensions for images to reserve layout space.
- Lazy loading for heavy components below the fold.
- Optimization of Framer Motion animations to use GPU-accelerated properties.

**Tech Stack:** React, Vite, Tailwind, Framer Motion.

---

### Task 1: Fix CLS in PricingOptions
**Files:**
- Modify: `components/PricingOptions.tsx`

**Step 1: Identify Image Dimensions**
- Inspect usage of `1bottle.webp`, `3bottles.webp`, `6bottles.webp`.
- Determine native resolution or appropriate aspect ratio.

**Step 2: Add width/height attributes**
- Add `width` and `height` props to `<img>` tags.
- Ensure CSS `aspect-ratio` is set if responsive sizing overrides width/height.

### Task 2: Implement Code Splitting
**Files:**
- Modify: `App.tsx`

**Step 1: Lazy Load Heavy Components**
- Replace static imports with `React.lazy` for:
  - `Carousel3D`
  - `FAQ`
  - `ClinicalEvidence`
  - `DoctorSection`
- Wrap them in `Suspense` with a lightweight fallback (e.g., a simple spinner or skeleton).

**Step 2: Verify Functionality**
- Ensure components load correctly on scroll.

### Task 3: Optimize Hero Animations
**Files:**
- Modify: `components/sections/Hero.tsx`

**Step 1: Audit Framer Motion**
- Replace layout-triggering properties (width/height/top/left) with transform properties (scale/x/y) where possible.
- Add `will-change-transform` css class to animated elements.
- Verify `viewport={{ once: true }}` is used for entrance animations to avoid re-running them.

---
**Critérios de Sucesso:**
- TBT < 500ms.
- Zero CLS on pricing images.
