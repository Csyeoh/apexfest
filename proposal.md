# Responsive Design Fix Proposal

## Context
The site is not responsive. Fixed pixel widths cause overflow, clipping, and visual breakage on mobile/small screens. Hero illustration images, page headings, QR codes, timeline columns, and scanner boxes all use hardcoded pixel values that don't scale.

---

## Change 1: Hero Illustration — Scale images proportionally
**File:** `src/pages/Home.tsx`
**Lines:** 36-141 (HeroIllustration function)

**Problem:** Container is `max-w-[520px]` with `aspect-ratio: 1/1`. All child images use fixed pixel widths (500px, 300px, 280px, 180px, 150px, 90px, 55px, 50px). On mobile, the container shrinks but images don't, causing massive overflow.

**Fix:** Use CSS `clamp()` or percentage-based widths so images scale with the container. The container itself should also be constrained on mobile.

- Line 36: Change `max-w-[520px]` → keep, but add `w-[80vw] sm:w-full` so it's not wider than viewport
- Lines 46, 57, 66, 75, 93, 102, 111, 120, 129, 138: Convert all fixed `width` values to use a scaling approach (e.g., `clamp()` or percentage of container)

**Specific values to use (keeping visual proportions):**

| Image | Current | New |
|-------|---------|-----|
| logo (L46) | `180px` | `34%` |
| bg1 (L57) | `280px` | `54%` |
| bg2 (L66) | `300px` | `58%` |
| shadow2/penguin (L75) | `500px` | `96%` |
| firebase (L93) | `150px` | `29%` |
| flutter (L102) | `150px` | `29%` |
| gemini (L111) | `90px` | `17%` |
| yellowdot (L120) | `55px` | `10%` |
| bluedot (L129) | `55px` | `10%` |
| lightdot (L138) | `50px` | `10%` |

Also fix hero text column negative margin:
- Line 160: Change `marginTop: '-48px'` → `marginTop: '-24px'` and add `md:mt-[-48px]` via className or make it `0` on mobile

---

## Change 2: Hero Banner Logo — Center on mobile
**File:** `src/pages/Home.tsx`
**Line:** 328

**Problem:** `transform: 'translateX(8px)'` shifts the banner logo off-center. On mobile this is noticeable.

**Fix:** Remove the `translateX(8px)`, or make it responsive. Simplest: remove the transform entirely.

---

## Change 3: Page Headings — Use clamp() instead of fixed 56px
**Files & Lines:**
- `src/pages/TechFest.tsx` line 38
- `src/pages/GameFest.tsx` line 39
- `src/pages/About.tsx` line 30
- `src/pages/Sponsors.tsx` line 41

**Problem:** All use `fontSize: '56px'` — too large on mobile.

**Fix:** Replace `fontSize: '56px'` with `fontSize: 'clamp(2rem, 8vw, 3.5rem)'` (scales from 32px to 56px fluidly).

---

## Change 4: TechFest Timeline — Stack venue on mobile
**File:** `src/pages/TechFest.tsx`
**Lines:** 229-254

**Problem:** Time column (90px) + venue column (120px) = 210px consumed, leaving only ~62px for event text on a 320px screen.

**Fix:** Hide venue column on small screens, show it inline below event text on mobile. Use responsive classes:
- Line 231: `w-[90px]` → `w-[70px] sm:w-[90px]`
- Line 248: `w-[120px]` → `hidden sm:flex w-[120px]`
- Add venue text inside the Event Column for mobile: `sm:hidden` span showing venue

---

## Change 5: GameFest Timeline — Narrower time column on mobile
**File:** `src/pages/GameFest.tsx`
**Lines:** 319-326

**Problem:** Time column `w-[90px]` squeezes event text on mobile.

**Fix:** Line 320: `w-[90px]` → `w-[70px] sm:w-[90px]`

---

## Change 6: BoothDisplay QR — Scale on mobile
**File:** `src/pages/BoothDisplay.tsx`
**Line:** 173

**Problem:** QR image is `width={300} height={300}`. On a 320px screen with 48px padding, this overflows.

**Fix:** Change to `width={260} height={260}` and add `className="max-w-full"` so it never exceeds container width.

---

## Change 7: StampScanner — Responsive scanner box
**File:** `src/components/StampScanner.tsx`
**Lines:** 176-178, 184-186, 354-355

**Problem:** Scanner box and video are hardcoded at 280px. Overflows on 320px screens.

**Fix:**
- Lines 176-177: `width: '280px', height: '280px'` → `width: 'min(280px, calc(100vw - 48px))', height: 'min(280px, calc(100vw - 48px))'`
- Lines 184-185: Same change for scanner region
- Lines 354-355: Same change for CSS video override

---

## Change 8: StampCard — Responsive size
**File:** `src/components/StampCard.tsx`
**Lines:** 15, 24, 30-31

**Problem:** All dimensions hardcoded at 88px/80px. Doesn't scale on small screens.

**Fix:**
- Line 15: `width: '88px', height: '88px'` → `width: 'clamp(70px, 20vw, 88px)', height: 'clamp(70px, 20vw, 88px)'`
- Line 24: `width: '80px', height: '80px'` → `width: 'clamp(62px, 18vw, 80px)', height: 'clamp(62px, 18vw, 80px)'`
- Lines 30-31: `width="80" height="80"` → `width="100%" height="100%"` (let viewBox handle scaling)

---

## Change 9: Navbar Logo — Prevent overlap on narrow screens
**File:** `src/components/Navbar.tsx`
**Lines:** 451, 461

**Problem:** Logo text "GDGoC USM // APEXFEST" at fixed 17px can collide with hamburger button on 320px screens.

**Fix:**
- Line 461: `fontSize: '17px'` → `fontSize: 'clamp(13px, 3.5vw, 17px)'`
- Add `truncate` or `whitespace-nowrap` class to the logo link

---

## Change 10: Stamps Flip Card — Flexible height
**File:** `src/pages/Stamps.tsx`
**Line:** 243

**Problem:** Fixed `height: '380px'` — may be too tall or too short depending on content on mobile.

**Fix:** `height: '380px'` → `minHeight: '340px'` with `height: 'auto'`, or use `h-auto min-h-[340px] sm:h-[380px]` approach.

---

## Summary Table

| # | File | Severity | What changes |
|---|------|----------|-------------|
| 1 | Home.tsx | HIGH | Hero images scale with container (%) |
| 2 | Home.tsx | LOW | Remove translateX on banner logo |
| 3 | TechFest, GameFest, About, Sponsors | MEDIUM | Heading font clamp() |
| 4 | TechFest.tsx | HIGH | Timeline venue stacks on mobile |
| 5 | GameFest.tsx | HIGH | Timeline time column narrower on mobile |
| 6 | BoothDisplay.tsx | HIGH | QR image responsive |
| 7 | StampScanner.tsx | HIGH | Scanner box uses min() for width |
| 8 | StampCard.tsx | MEDIUM | Stamp size uses clamp() |
| 9 | Navbar.tsx | LOW | Logo font clamp() |
| 10 | Stamps.tsx | MEDIUM | Flip card flexible height |
