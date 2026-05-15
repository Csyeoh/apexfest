# Responsive Design — Progress Tracker

## Agent Assignments
- **Agent A** — Home.tsx hero + banner (Changes 1, 2)
- **Agent B** — Page headings + timelines (Changes 3, 4, 5)
- **Agent C** — BoothDisplay, StampScanner, StampCard, Stamps (Changes 6, 7, 8, 10)
- **Commander (main)** — Navbar (Change 9), QC all agents, verify build

## Status: ALL DONE

### Change 1: Home.tsx — Hero illustration scaling [Agent A]
- [x] Container: add `w-[80vw] sm:w-full`
- [x] All child images: convert fixed px to proportional %
- [x] Hero text column: remove/reduce negative margin on mobile

### Change 2: Home.tsx — Banner logo centering [Agent A]
- [x] Remove `translateX(8px)` from banner logo

### Change 3: 4 pages — Heading font clamp() [Agent B]
- [x] TechFest.tsx L38: `56px` → `clamp(2rem, 8vw, 3.5rem)`
- [x] GameFest.tsx L39: `56px` → `clamp(2rem, 8vw, 3.5rem)`
- [x] About.tsx L30: `56px` → `clamp(2rem, 8vw, 3.5rem)`
- [x] Sponsors.tsx L41: `56px` → `clamp(2rem, 8vw, 3.5rem)`

### Change 4: TechFest.tsx — Timeline venue stacking [Agent B]
- [x] Time col: `w-[90px]` → `w-[70px] sm:w-[90px]`
- [x] Venue col: `hidden sm:flex w-[120px]`
- [x] Add mobile venue text inside event column

### Change 5: GameFest.tsx — Timeline narrower time [Agent B]
- [x] Time col: `w-[90px]` → `w-[70px] sm:w-[90px]`

### Change 6: BoothDisplay.tsx — Responsive QR [Agent C]
- [x] QR img: `width={260} height={260}` + `className="max-w-full"`

### Change 7: StampScanner.tsx — Responsive scanner [Agent C]
- [x] Scanner box: use `min(280px, calc(100vw - 48px))`
- [x] Scanner region: same
- [x] CSS video override: same

### Change 8: StampCard.tsx — Responsive stamps [Agent C]
- [x] Container: `clamp(70px, 20vw, 88px)`
- [x] SVG wrapper: `clamp(62px, 18vw, 80px)`
- [x] SVG element: `width="100%" height="100%"`

### Change 9: Navbar.tsx — Logo text scaling [Commander]
- [x] Logo font: `clamp(13px, 3.5vw, 17px)`

### Change 10: Stamps.tsx — Flexible flip card [Agent C]
- [x] Card height: `minHeight: '340px'`

## Verification
- [x] `npx tsc --noEmit` passes
- [x] `npm run dev` starts without errors
- [ ] Visual check: hero images don't overflow on mobile viewport
- [ ] Visual check: QR codes fit on 320px screen
- [ ] Visual check: headings scale down on mobile
