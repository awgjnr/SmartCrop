# SmartCrop

A mobile-friendly plant population, spacing and yield planning calculator.

## Run

Open `index.html` directly, or serve the repository root with `python3 -m http.server 8000` and visit http://localhost:8000. No build or dependencies are required.

For installation and offline caching, host all files on HTTPS (or localhost), open the app online once, then use Install app / Add to Home Screen when supported. Saved plans stay in the browser; use Export saved plans for backups.

## Features

- 23 crops with transparent botanical plant-and-produce illustrations.
- Single, double, grouped, bed and triangular layouts; optional staggered rows.
- Area-based estimates or rectangular field fit with margins and row direction.
- Material allowances, survival, marketable yield and editable yield scenarios.
- Manual nutrient-target mass balance, saved-plan editing, duplication, JSON backup, sharing and printing.

## Calculation assumptions

Area mode uses area times density, rounded down. Rectangle mode uses length/width, equal margins on four sides and the selected row direction; percentage deductions are ignored. Internal obstacles require separate planning. Half a plant spacing is reserved at row ends. Single/triangular rows reserve half a row interval at side boundaries. Groups fit complete row spans; beds fit their entire width, with clear gaps between groups/beds and no compulsory outer walkway. Staggered rows offset alternate rows by half the plant spacing and may lose an end position. These explicit placement conventions can yield a different total from area times density.

YIELD
Yield = fitted or area-based positions x survival x gross yield per surviving plant x marketable share x scenario factor. The yield period is user-selected. Preset benchmarks are illustrative, not locally verified recommendations; confirm variety, period and conditions. Higher density does not guarantee proportionally higher yield. Harvest-to-land results remain area-based and require a separate rectangle fit check.

NUTRIENTS
No default fertiliser rates or automatic soil-test adjustments are supplied. Enter agronomist-approved nutrient targets. Mineral quantities are mass balances using urea 46% N, TSP 46% P2O5 and MOP 60% K2O, not agronomic application instructions. Organic amendment quantities need separate composition and availability data.


## Verification

32 isolated logic checks, 40 simulated-DOM checks and all 24 image selections passed. Real-browser layout, clipboard, printing and PWA installation remain unverified because the browser runtime was unavailable.

## Image provenance

Crop illustrations were generated using OpenAI image generation as a 6-column by 4-row botanical watercolor/pencil atlas, showing each plant with harvested produce on transparent backgrounds. They are illustrative and do not identify specific cultivars.
