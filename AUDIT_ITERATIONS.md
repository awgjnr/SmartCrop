# SmartCrop improvement iterations

## Iteration 1 — reliable local saving (18 October 2026)

### Audit scope and evidence

Reviewed the static app shell, crop-cycle persistence/controller, Field Studio saving and exports, Farm Desk routing, personalisation, account interfaces, service worker, README and automated workflow tests. This is a source and simulated-interface audit; it is not a production security assessment or rendered browser/device acceptance test.

### Confirmed problems addressed

- `cycle-ui.js` previously returned success when saving was paused after a conflicting change in another tab. Save buttons could therefore announce success without writing anything.
- Operating-record submission changed the in-memory record before persistence. A failed write left that record in memory while retaining the form; retrying could append a duplicate.
- Cycle export required a successful storage write. Full or unavailable storage therefore also blocked the recovery route.
- Autosave had no persistent pending/error indicator, and navigation after a failed write could lose edits without a browser warning.

### Implemented

- Persistent saved, pending and error states in the shared crop-cycle bar. Errors include a recovery action and remain visible rather than relying on an expiring toast.
- Blocked writes return failure. Conflicting tabs preserve the newer stored cycle and explain that the user should export their local version before reloading.
- Failed operating-record additions, removals, activity completion changes and controller updates roll back their in-memory operation. Failed form submissions retain entered values for retry.
- Recovery export captures the current cycle, current module inputs and profile fields without a storage write. It uses the existing cycle-backup format, restoring as a separate cycle, with additional recovery metadata.
- New-cycle, switch-cycle and restore actions stop if current edits cannot be saved. Failed switches return the selector to the current cycle.
- Pending cycle edits are saved on navigation where possible. A failed save or blocked cycle asks the browser to warn before leaving. Browser/platform support determines whether a warning is displayed; this is not a replacement for export.

### Validation

87 automated checks pass. New failure-injection cases cover storage quota failures, rollback and retry without duplicate records, recovery export during storage failure, conflicting tabs, navigation after failed persistence, successful navigation-time saving, and recovery-file restore as a separate cycle. Existing calculator, geometry, import/export, growth, account preview and farm workflow checks remain passing.

### Limits and open findings

- Recovery copies cover one cycle and the current module view. Unsubmitted activity/expense/production forms, unsaved environment/stage forms, health cases/photos and the entire browser's other cycles are not included. Their existing save/export flows remain separate.
- Real authentication, email recovery, account-owned cloud storage and corporate roles are not connected. Account screens correctly identify themselves as previews.
- Browser layout, mobile touch/GPS, external tiles, printing, installation and offline upgrade behaviour still need rendered browser/device acceptance. This environment has no installed Playwright Chromium executable.
- Agronomic and health reference coverage remains limited and explicitly labelled. There is no validated district disease surveillance or image-diagnosis service configured.
- There is no whole-workspace backup covering all local stores and IndexedDB photos. This remains a high-priority improvement.

## Candidate priorities for iterations 2–10

Reassess these against findings and user feedback at the start of each iteration; these items are not yet implemented.

2. Guide a new user from farm/block setup through boundary, crop, layout and usable plan; label examples and incomplete setup clearly.
3. Provide whole-workspace backup and safe restore, including cycle records and health-case photos, with a readable contents summary.
4. Review cross-module crop/area/position handoffs and prevent contradictory or stale planning figures.
5. Improve yield, selling-unit and cost assumptions and communicate incomplete budgets consistently.
6. Improve Field Studio interaction and accessibility on actual small screens and touch devices.
7. Make water-source capacity, irrigation assumptions and weather freshness easier to assess together.
8. Strengthen health watchlists and adviser case handoff using verified sources and clearly bounded treatment guidance.
9. Connect production authentication and account-owned storage once hosting/provider configuration is available; verify access isolation and recovery.
10. Complete browser/device, offline/PWA upgrade, accessibility and performance acceptance for release.
