# SmartCrop

A mobile-friendly crop population calculator and **Field Studio** for planning hand-planted farms from their actual boundaries.

## Run

No build, account or API key is required. Serve the repository root:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. The original calculator is at `index.html`; choose **Field Studio** or open `field.html` for the map planner. **Farm Desk** (`farm.html`) adds yield, labour, water, weather and crop-health case records. Opening the files directly also works, with a cooperative calculation fallback instead of a worker. Live GPS requires a secure browser context and location permission.

Deploy these static files together to an HTTPS host for installation and offline use. Open the app once online to cache its files. Map tiles require internet and are deliberately not downloaded for offline use. GPS availability depends on the device and permissions. Publishing a Codex environment is separate from hosting this website.

## Field Studio workflow

1. **Bring a boundary:** import KML, KMZ, GeoJSON, or decimal coordinate CSV; paste coordinates; draw ordered corners; or record GPS corners while walking the perimeter. The sample farm is fictional.
2. **Check the shape:** verify location, calculated area and perimeter. Multiple imported polygons become separate selectable blocks. Drag corner handles in Edit corners mode. Exclusions and access paths remain attached to their block.
3. **Set planting rules:** choose a crop, single/double/grouped rows or beds, aligned/staggered plants, spacing, setbacks, additional row-end clearance, and minimum useful row-section length. Draw exclusions or two-point straight access paths.
4. **Compare alternatives:** inspect the sampled highest population, a layout favouring longer and less fragmented rows while retaining at least 90% of that population, and a manually chosen bearing. Tap a row to inspect its count. Identical alternatives are possible.
5. **Take it to the field:** choose a reference corner. Export the diagram (SVG), row-by-row pegging offsets (CSV), every plant coordinate (CSV), boundary/exclusions/rows (KML), or a restorable project backup (JSON). Print to PDF using the browser.

### Boundary input

- KML uses WGS84 **longitude, latitude**, with optional altitude ignored. Polygon inner boundaries become exclusions. MultiGeometry polygons import as separate blocks. Network links are not fetched.
- KMZ is read locally using bundled JSZip. Maximum compressed size 10 MB; declared expanded archive size 32 MB; individual entries 8 MB. Export just the boundary when imagery makes a file too large. Multipart and ZIP64 archives are not supported.
- GeoJSON supports Polygon, MultiPolygon and collections in WGS84 longitude/latitude. Projected metre-based coordinates are not accepted as longitude/latitude.
- Coordinate lists accept one point per line, commas, tabs, spaces or semicolons, with an explicitly selected latitude/longitude column order. A simple header is optional. DMS and projected grid coordinates must first be converted to decimal WGS84.
- Rings must not self-intersect or touch themselves. Closing coordinates and consecutive duplicates are cleaned. Limits: 50 blocks per import, 50 exclusions per block, 2,000 vertices per ring and 2,500 vertices combined per block. Blocks must be under 10 km across and between latitudes −80° and 80°.

### Layout mathematics and limits

WGS84 boundaries are projected into a local metre-based plane around the active block. Areas and offsets are horizontal planning estimates, not cadastral survey results or terrain surface measurements. The north arrow and bearings refer to this local geographic frame, not magnetic north.

For each bearing, row axes are intersected with the field. Exclusion intervals are subtracted; overlapping exclusions are counted only once, and exclusions crossing the outer boundary are clipped to it for area and planting calculations. A Euclidean edge setback is applied to the outer boundary, exclusions and paths. Additional row-end clearance is then applied along each remaining section. Plants share a regular along-row grid; alternate rows can be offset by half the plant spacing. Sections below the user’s minimum length are omitted.

Double/grouped repeat pitch is `(rows − 1) × within-group gap + clear between-group gap`. Bed pitch is `bed width + walkway width`, with row centres evenly distributed within the bed. These are centreline planting plans: complete soil-bed footprints or machinery turning envelopes are not designed. Individual group rows can terminate at different positions along irregular boundaries.

Comparison samples 18 bearings at 10° intervals and three across-row offsets, plus the user’s bearing. “Most plants” is the best of those samples, not a guaranteed continuous global optimum. “Longer, simpler rows” minimises row-section and short-section counts relative to plant population among candidates retaining at least 90% of the sampled maximum. It does not evaluate slope, drainage, contour safety, irrigation hydraulics or agronomic suitability.

Gross area and excluded area use scanline geometry; for boundaries with more than 600 edges, net area is numerically approximated. Usable area after edge setbacks is always a numerical approximation (600 scanlines). Plant counts come from actual permitted planting positions rather than area × density. Floating-point comparisons use a sub-millimetre tolerance. Up to 250,000 planting positions per layout are supported; split denser or larger farms into smaller blocks.

The interactive map samples plant dots above 5,000 positions. SVG exports sample dots above 20,000. All row totals and plant-coordinate CSV exports include every position. CSV row lengths describe the distance from the first plant to the last plant, not the full cleared run.

### Pegging and GPS

Each pegging CSV row identifies a row section, count, plant spacing, bearing, first/last WGS84 coordinates and their east/north offsets from the chosen boundary reference corner. Numbered corners on the diagram correspond to the reference selector. Establish a reference line with tapes, ropes or suitable survey equipment on site. Phone GPS should not be used to locate closely spaced individual plants.

GPS records explicit corner taps rather than silently sampling a walked route. Each point retains the accuracy returned by the device; the block shows the worst recorded accuracy. Fixes older than 30 seconds are rejected and accuracy worse than 10 m prompts before a point is recorded. These are device-reported estimates, not independent survey validation.

### Material, yield and privacy

Material = `ceil(positions × (1 + extra allowance) ÷ nursery success)`, for one plant per position. Survival affects established plants and yield, not material allowance twice. Yield uses the user-entered gross kg per surviving plant, marketable share and stated yield period. No field yield is guaranteed.

Plans are saved only in browser storage unless exported. Export backups when switching devices, browsers or hosting addresses. KML exports preserve exclusions with SmartCrop metadata on re-import; standard imported KML polygon holes are also supported. Third-party GIS programs display exported exclusions as separate polygons. JSON is the full-fidelity project backup.

The optional online map uses OpenStreetMap tiles with visible attribution and normal browser caching. No map tiles are prefetched or packaged. The visible map location is requested from the tile provider. The app has no server-side boundary upload, analytics or account system.

## Tests

```sh
npm test
```

Node.js 20+ is required. Interface/KML tests also use Python 3’s standard XML parser as a DOM-compatible test adapter. There are no npm installation dependencies. The tests exercise analytic counts, concave boundaries, exclusions and overlapping paths, setback distances, rotations and stagger, coordinate input, KML/KMZ, saved-plan round-trips, CSV/SVG/KML exports and a calculation worker. The interface harness is a **simulated DOM**, not a rendered browser.

A real Chromium download failed in the build environment. Browser appearance, device GPS permission flows, tile delivery, touch editing, printing and PWA installation still need browser/device acceptance testing. These are not reported as verified.

## Files and provenance

- `index.html`: existing population calculator.
- `field.html`, `field.css`, `field.js`: Field Studio interface.
- `field-geometry.js`: independent geometry/layout engine.
- `field-import.js`: boundary/coordinate parsing and KMZ checks.
- `field-worker.js`: off-main-thread layout comparisons.
- `assets/crops.png`: generated transparent botanical plant-and-produce illustrations.
- `vendor/jszip.min.js`: JSZip 3.10.1, MIT; licence included alongside it.
- `sw.js`, `manifest.webmanifest`, `icon.svg`: installable offline shell.

Crop images were generated with OpenAI image generation as a 6 × 4 muted watercolor/pencil botanical atlas. They are illustrative, not cultivar-identification references. Crop spacing presets and yield examples require local agronomic validation.


## Farm Desk: production planning and crop health

Farm Desk can import the current selected Field Studio layout (planting count, plantable area and approximate block centre), or work with manual inputs. A changed field layout invalidates the handoff so old counts are not silently re-used. Existing Farm Desk quantities remain user-editable; changing a field does not silently rewrite activity budgets.

### Yield and labour

Yield can be calculated from gross kg per surviving plant (apply survival and marketable share once) or an already-marketable t/ha benchmark (do not deduct those losses again). Conservative, base and optimistic assumptions and the yield period are explicit. Sale price gives scenario revenue, not profit. User-entered disease/weather observations do not automatically change yield assumptions.

Labour activities support worker-day, plant/piece, hectare and contract pricing. Quantity × rate × rounds gives cost. Worker-day quantities directly supply effort; other bases need optional productivity in units per worker-day. Dividing known worker-days by crew gives aggregate crew working-days, not a dated schedule. Activities with unknown effort remain visibly unknown rather than being treated as zero effort. This is a planning budget, not payroll.

### Water and weather

Water profiles record source type, sustainable source flow, pump delivery at working head, pumping hours, usable storage, seasonality, quality-assessment status and irrigation type. A simplified daily balance uses ET₀ × Kc minus an assumed effective share of rainfall, then divides by application efficiency. Capacity is the lower of source and pump flow multiplied by pumping hours. Stored water is reported separately and is not assumed to replenish daily. The calculation does not size pipes, determine pump head, model soil moisture/salinity or replace an irrigation design.

Weather is fetched from Open-Meteo at explicitly entered/imported latitude and longitude, with seven daily forecasts, temperature, rain, probability, wind and reference ET₀. The provider timezone, fetch timestamp and stale-cache status are shown. Forecasts older than six hours cannot be applied with the shortcut. Network failures do not produce fabricated weather. The weather endpoint is not a local sensor or a disease-prediction model. Provider null values remain missing.

The public Open-Meteo endpoint is offered under its published non-commercial API terms. Check a licensed/commercial API arrangement before a commercial release; this repository does not contain a paid weather credential or a commercial subscription. Data attribution is displayed. An external weather request sends the coordinate, not the full boundary.

### Crop-health records and reference coverage

Users can capture crop, country, region, district, date, affected parts, growth stage, field pattern, extent, symptoms, recent inputs and up to two photos. Photos are resized locally to JPEG, removing original photo metadata from the transmitted derivative, and retained with case records in IndexedDB. Cases include treatment actually applied, adviser confirmation details, follow-up date and observations. Exported case JSON includes the photos and can be shared manually with an adviser; the app does not send messages to anyone.

**Coverage is deliberately limited.** Initial source-linked profiles cover maize fall-armyworm screening, tomato early-blight differential, cabbage diamondback-moth differential, systemic/planting-material concerns for cassava/yam/plantain/banana, and pepper bacterial-spot and root/crown-rot differentials. Other crops get case capture and an unresolved-problem workflow, not an invented disease list. Country/region/district input supplies context; it does not establish pest occurrence. There is no live district outbreak feed or validated location-specific pest model. California extension references are labelled as general identification/IPM references, not Ghana pesticide registrations or Ghana occurrence evidence.

The symptom-reference button is keyword matching, explicitly labelled as such; it never claims to analyse images. Management guidance is source-linked and prioritises observation, clean material, cultural management and adviser confirmation. The crop-health section leads with a “look out for” watchlist: signs, likely cause, checks, first steps and treatment options selected by organic or conventional cropping system. Conventional cards list source-backed active ingredients and mode-of-action groups where vetted; unavailable ingredient guidance stays explicit. The library does not verify current local product registration. Organic eligibility is formulation- and certifier-specific. No doses or spray schedules are supplied. Cropping system persists in plan backups and adviser case reports; photo screening uses the current curated cards, rather than AI-generated pesticide advice. Before pesticide decisions, verify diagnosis, registration, exact product label, PPE, re-entry and pre-harvest intervals, and local resistance guidance.

### Connecting photo screening

Photo capture and local case storage work without an AI service. Actual photo screening requires hosting the backend and supplying **server-only** configuration:

```
OPENAI_API_KEY=your-provider-key
VISION_MODEL=an-available-vision-model-supporting-strict-json-schema
DIAGNOSIS_ACCESS_TOKEN=a-strong-private-farm-access-code
APP_ORIGIN=https://your-app.example
```

Use `.env.example` as a template; `.env` is ignored by git. Never commit keys. For local use, set environment variables then run `npm start`, or run `node --env-file=.env server.cjs` with a supported Node version. Static `python3 -m http.server` or GitHub Pages cannot execute the image backend. The default OpenAI REST endpoint is used; no provider SDK or installation dependency is required. On a compatible host such as Vercel, configure the variables in the host's environment settings. No hosting deployment or live provider credential was created by this change.

`GET /api/diagnose` reports whether the service is configured. `POST /api/diagnose` requires the farm access code, explicit upload consent, crop, location context, symptoms and one or two JPEG/PNG/WebP data images. Exact farm coordinates are not sent by the client. The browser access code is not included in plan or case backups. A farm access code is not individual user authentication; add proper account access and platform-level request limits/provider budgets before exposing paid inference broadly.

The server requests structured observations, uncertain differential IDs, questions and review urgency. It filters suggestions against the selected crop and attaches reference guidance from the curated library. Unusable photos do not produce disease suggestions. Unknown and out-of-library causes remain unresolved. This is screening, not confirmed diagnosis or a validated plant-pathology model. Provider refusals, bad outputs, timeouts and missing configuration return explicit errors; no diagnosis is fabricated. Case details changed during an in-flight request invalidate that result.

### Validation limits

New calculation, API-boundary and simulated-interface tests cover yield-loss accounting, labour bases, water/source bottlenecks, missing weather, crop/location coverage, consent and image limits, provider configuration/auth/failure states, photo-case storage and exports, and plan handoffs. Provider responses and weather were mocked for repeatability. A live paid image request, live weather delivery, real-device photo decoding, IndexedDB behaviour and browser rendering remain unverified in this environment. Earlier browser-download restrictions still apply.

### Shared interface
Calculator, Field Studio and Farm Desk share navigation, spacing, typography, colour theme and controls through `app.css` and `app.js`. Action notices appear as soft popups for five seconds (eight for errors), pause on hover/focus and support dismissal or Escape. Validation results, GPS accuracy, forecast freshness and agronomic caveats remain inline. The theme choice persists across modules.

### Botanical health artwork and compact actions
Six transparent botanical symptom illustrations in `assets/health.png` accompany the curated crop-health cards. These generated examples are labelled illustrative and are not diagnostic photographs. Farm Desk reuses the existing crop atlas. Calculator actions are icons at the top right; the save panel holds named plans and import/export. Icons carry accessible names and tooltips.

## Shared crop cycles and farm operations

All three screens now select the same local farm/block/crop-cycle record through the bar below navigation. Module inputs autosave after a short pause and before leaving a page; **Save cycle** makes an explicit save. A new cycle keeps operating records separate. Export/restore a complete cycle JSON to move devices; restores create a separate copy. This is local browser storage, not account/cloud sync. Storage failures are reported and concurrent edits in another tab pause saving rather than overwrite a newer revision. Existing standalone saved plans remain available through their older controls/imports. First-use Farm Desk can migrate the earlier saved plan; previously saved plans are not deleted.

The cycle holds separate calculator, boundary/layout and Farm Desk snapshots, shared crop/area/count context, and the following records:

- **Calendar:** farm, block, variety, planting-material source, sowing and field dates, nursery duration, field age, expected harvest window and dated activities with completion status. Days-to-harvest and the local planting window are user/adviser inputs, not validated regional recommendations. Positive/negative activity offsets use an explicit sowing or planting anchor.
- **Suitability:** texture, drainage, slope, preceding crop/family, pH, EC, soil-test date/reference and adviser notes. Missing checks, waterlogging, steep slopes and rotation concerns are surfaced. These checks do not produce a certified suitability score, a lime rate, a contour design or automatically approved density.
- **Budget:** planned variable and allocated fixed expenses; actual spending; scenario revenue, gross margin, surplus after entered fixed costs, break-even price/yield and payment-month cash needs. Existing Labour Plan costs are included once. Nutrition entries calculate into planned expenses once. The unspent budget estimate subtracts recorded spending from planned cost and is not a supplier-payables ledger. Omitted costs and financing/taxes are not inferred. Monetary records retain a currency context; changing the display currency does not convert them.
- **Nutrition:** adviser/report source, crop stage, anchored application date, product kg/ha, as-applied nutrient analysis and price. Product mass, total N/P2O5/K2O and cost use the current plantable area. Total nutrient content is not assumed to equal seasonal availability, particularly for organic amendments. Dry-matter recommendations require conversion before entry. No automatic fertiliser prescription is supplied.
- **Actual production:** initial established plants, replacements, deaths, dated harvest grades/marketability and separate sales. Plant counts reconcile against positions; harvest and sales are not added together as production. Remaining stock, marketable harvest against forecast and recorded cash balance are shown. Sales exceeding recorded harvest prompt reconciliation, not invented opening stock. Logs can be removed and re-entered to correct mistakes.
- **Treatment safety:** exact product/formulation, ingredients, target, application timestamp and local-label reference. Explicitly verified PHI days and REI hours calculate per-application and latest block-wide dates. A missing/unverified interval or crop mismatch prevents a combined date. Treatment records apply to the entire selected block; split treated areas into separate cycles. Harvest-date overlaps prompt checking exact timestamps. Calculated intervals do not establish residue compliance or authorise harvest.

Layout changes flag previous quantities as provisional until a new layout is selected. Labour quantities remain editable and require review when counts/area change. Calculator counts are estimates; they do not replace an irregular field layout without flagging it. Health cases carry their cycle ID; older unlinked cases remain accessible. Health photos are stored separately and are not bundled into the cycle export—export the health case to preserve those photos. The earlier Farm Desk plan backup format remains supported as an older plan import.

New automated checks cover cycle isolation/revision conflicts, calendar date arithmetic, cost accounting, nutrient contributions, establishment/harvest/sales reconciliation, missing and overlapping treatment intervals, currency mismatch, the shared Farm Desk bridge and the operating-record workflow in a simulated DOM. Live browser/device appearance, real storage quotas and cross-device migration still require acceptance testing.

### Counted yield and unit sales
Farm Desk supports gross harvested units per surviving plant in addition to kg/plant and marketable t/ha. Name the unit (cobs, heads, fruits, fingers, bunches, etc.), enter conservative/base/optimistic units per plant, and price per unit. Survival and marketable share apply once; counted scenario totals round down to whole units. Revenue and break-even use that same unit. Actual harvest and sale records can use kilograms or a named counted unit; each unit is reconciled separately and never converted to weight implicitly. Unit names must match the forecast (for example `cobs`); kg records and differently named units are not compared as the same yield.

## Published crop-specific layout presets

Calculator and Field Studio include the same source-linked dropdown backed by `layout-presets.js`: 45 starting layouts for all 23 named crops, plus custom settings. Crop changes select the first published option; restoring an existing plan preserves its settings. Manually changing geometry removes a source label unless the resulting settings match a published preset. Each option exposes publisher/title, source link, scope, evidence category, review date and theoretical planting positions per hectare before access deductions.

Sources include IITA/CGIAR crop guides, CIP, FAO, university extension, Ghana CSIR-SARI and KNUST publications, and peer-reviewed field studies. The full bibliography and per-preset applicability are in the data module and appear alongside each selection. Extension references, experimental treatments and published technical guidance are distinguished. US vegetable garden ranges are explicitly labelled as US references; selected range endpoints are not claimed to be Ghana commercial recommendations. Rice uses a single-seedling SRI treatment; cowpea uses a one-plant-per-station Ghana trial so a multi-plant hill is not silently counted as one individual. Specialised seed-yam and sweetpotato vine multiplication options are separated from food/root production.

Values are stored in metres, with exact feet/inch conversion where relevant. For double rows, repeat pitch is within-pair spacing plus the clear gap to the next pair; a source bed-centre distance is not added again as a clear gap. Oil palm is a 9 m equilateral triangular grid, represented in Field Studio by 9 m within-row spacing, `9 × √3/2` m between rows and half-spacing stagger. Calculator uses its equivalent triangular geometry.

Presets alter spacing and arrangement, not crop yield assumptions, soil suitability, safe contour design or irrigation design. Local cultivar, rainfall, fertility, drainage and labour/access requirements still need review. Theoretical density is not a promise of field-fit plant count or production. Preset assets are cached for offline use; external source links need internet.

## Personalisation and block growth tracking

The profile/settings control is available on every screen. Users can select Modern Botanical (warm palette and desktop side navigation), Precision Agriculture (compact panels and data typography) or Field Companion (larger touch controls and spacing), plus light/dark mode and text size. Individual profiles use a display name and optional image; corporate identity adds an organisation name, logo, contact and role. These are local identity settings, not authenticated accounts or shared staff access. Profile images are resized locally before browser storage. Profile JSON export/restore is separate from crop-cycle export. Area-unit and currency preferences supply new Farm Desk defaults without converting existing monetary records.

Farm Desk has block-specific environment setup for open field, net/screen house, greenhouse/tunnel and shade house. Growing systems include soil, raised beds, containers/bags, substrate and hydroponics. Conditional sections expose water regime, ground preparation, mesh specification, separate shade layer, ventilation, covering, internal dimensions, border/aisle/column deductions, support height, container count/volume, substrate composition, emitters/flow, tanks/zones, EC/pH observations and adviser references. Protected structure area is an arithmetic estimate, not a bed-fitting or engineering design. Applying calculated area or container count is explicit and flags an existing field layout for review. No automatic protected-cropping yield uplift or nutrient recipe is supplied.

Each crop cycle can hold user/adviser-defined expected stage windows and observed milestones. The timeline is categorical stage versus weeks from sowing, field planting or a separately dated ratoon start. Ratoon generation and timing source are explicit. Overlapping stages are supported; missing timing windows remain unknown. Changes of crop, variety or environment prompt review of previously entered windows. Observed milestone dates can be earlier, within or later than an expected window and do not silently rewrite expectations. An observation may include a locally resized field-photo preview (up to 12 per cycle). These previews are included in the cycle export; storage/quota errors are reported.

`assets/stages.png` is a generated transparent six-cell botanical atlas for germination, establishment, vegetative growth, flowering, fruiting and harvest. It is representative broadleaf/pepper-like artwork, not species/cultivar identification or a validated crop model. It was produced with the built-in image-generation tool using a muted watercolor/pencil botanical stage-symbol prompt. The graph does not represent measured biomass or predicted yield. For a meaningful current expected stage, enter locally appropriate stage ranges and their source; none are inferred by dividing a crop duration into arbitrary phases.

New checks cover usable structure area, container/emitter arithmetic, sowing versus field age, initial versus ratoon clocks, overlapping stage windows and honest missing-stage behaviour. Appearance, camera/file decoding, native dialogs and real-device storage still need browser/device acceptance testing.

## Farm Desk navigation

Farm Desk now opens to a live Overview and shows one view at a time: Field setup; Growth & calendar; Yield & sales; Costs & labour; Water & weather; and Crop health. Desktop uses a section menu and smaller screens use a labelled section picker. Hash URLs support direct links and browser Back/Forward. Older links such as `#profile`, `#labour`, `#weather` and `#cycle-operations` map to the appropriate views.

Forms stay mounted while hidden, so switching sections does not destroy unsaved inputs or reset the crop-cycle selection. Overview reads the selected cycle and current Farm Desk values: planned positions, age, base forecast, next activities, expected growth and missing-setup checks. It does not invent weather, yield distributions or measured crop growth. Existing save/export controls remain available above the view workspace. Printing includes the active view. Navigation/record preservation is checked with a simulated DOM; real browser/device rendering remains to be reviewed.

Field Studio's **Map view** selector offers an offline planning grid, OpenStreetMap streets, Esri topographic terrain and Esri satellite imagery. Layer choice is remembered on the device and included in field-plan exports. Online layers require internet access and send tile requests to their providers; tiles are not prefetched or stored by the service worker. Imagery capture dates and resolution vary, and topographic maps are a reference rather than a slope survey. Provider attribution stays visible. The legacy Esri topographic service is scheduled to retire in December 2029 and will need replacement before then. Tile loading failures leave the field geometry available with a message to choose another view.

### Account interface preview

`login.html` and `signup.html` provide responsive account screens, individual/organisation selection, field validation, password visibility and a `login.html#reset` recovery view. Entry links appear in all three app headers. These are explicitly **interface previews**: no authentication provider, database, email delivery, account creation, login session or cloud sync is connected. Form submissions make no network requests or storage writes, clear sample passwords after valid submission and report that the service is unavailable. Do not use real credentials in the preview. The app remains usable without an account. Before enabling real accounts, connect a secure authentication service, verified email/recovery flows, session handling and server-enforced access to account-owned data; replace the preview handlers and their availability notices together. Corporate selection currently describes an identity only, not staff access or shared data.

### Save safety and recovery

The shared crop-cycle bar now shows pending, saved or failed local saves. If storage is unavailable/full or another tab changes the cycle, the error remains visible. **Export recovery copy** works without saving and includes the active cycle plus current module/profile inputs. Restore it with **Restore cycle** to create a separate cycle. Unsubmitted forms and health cases/photos are excluded; save/export those separately. Browser navigation warnings are a last resort and may be suppressed by the platform. See `AUDIT_ITERATIONS.md` for iteration 1 findings, test evidence and the proposed remaining review areas.

### Guided setup

Farm Desk now starts with a collapsible five-step guide. Name the farm and block, choose and save the crop/environment, review manual or mapped planting quantities, enter the planned/actual field-planting date, and review sourced yield assumptions. Use **Review & confirm step** after checking each step. Progress belongs to the active cycle, survives cycle export/restore and reopens when relevant inputs change. Default/example figures do not automatically complete setup; Overview counts and forecasts request review until confirmed. Fictional sample boundaries cannot be confirmed as your real mapped field. Setup is a planning checklist, not agronomic approval, and the app remains usable while steps are incomplete.

### Whole-workspace backup and restore

Open **Workspace backup** from the crop-cycle bar, or **Settings → Back up or restore the whole workspace** (`backup.html`). Save current work first. The backup includes all saved crop cycles and embedded growth observations/photos, saved Field Studio projects, saved calculator entries, any legacy Farm Desk plan, profile/display/map preferences, and health cases with their IndexedDB photos. It excludes weather caches, downloaded map tiles, transient layout handoffs, passwords, screening access codes and unsubmitted/unsaved forms or photos.

Choose a JSON file to validate and preview counts and cycle names before importing. Restore adds copies with new IDs; health cases are linked to copied cycles, with an isolated cycle for unmatched cases. Existing cycles remain active when present. Legacy Farm Desk data becomes a separate cycle. Profile/appearance preferences are applied only if explicitly selected; reopen the app to see them. Re-importing the same file deliberately adds another set of copies.

Close other SmartCrop tabs while backing up or restoring. The restore uses atomic photo-database batches and a local recovery journal across the two stores; these stores do not share a single browser transaction. If a write fails, imported copies are rolled back. An interrupted restore can be recovered on the backup page. Recovery refuses to overwrite records changed since the interruption. Do not clear browser data while recovery is pending. Free browser storage is required for the journal as well as the imported records; failure to create the journal changes nothing. Limits: 64 MB per saved workspace, 200 cycles, 500 saved fields, 1,000 calculations and 1,000 health cases with two resized photos each. Both stores must be readable to create a complete backup; photo-store failure does not silently produce a partial file.

These unencrypted backup files can contain precise farm locations, profile/contact details and photographs. Keep them private. Validate that the browser saved the download before deleting local data. File validation is not cryptographic proof of origin: restore only backups you trust. Automated core and simulated-interface failure tests pass; native IndexedDB, downloads, interrupted-tab recovery and mobile browser acceptance remain pending.

### Shared quantities and module handoffs

The crop-cycle bar shows the shared planting count, area in m², and quantity source. Calculator may show a different theoretical spacing estimate from the mapped count; changing yield assumptions alone does not replace mapped quantities. Actual crop/area/count edits update the shared quantities together and mark an existing mapped diagram for review. Small area-conversion rounding differences do not invalidate a layout.

Farm Desk refreshes crop/area/count from the shared cycle on reopening while retaining its saved yield edits. The **Use Calculator yield assumptions** button explicitly copies the cycle's Calculator assumptions after confirmation; price and labour stay as entered. New Farm Desk views can inherit matching Calculator assumptions. Changing the crop discards inherited assumptions from the previous crop unless the editing module supplies new ones.

**Use selected Field Studio layout** accepts only a selection attached to the active cycle whose geometry and shared quantities still match. The old global handoff is no longer read. Older mapped cycles without a bound selection need one fresh Generate/select action in Field Studio. Workspace and single-cycle restores rebind their own selection to the copied cycle; invalid or stale selections still require recalculation. Status and stale-layout messages appear across all three modules. This does not establish that labour quantities, irrigation settings or other operating assumptions remain suitable after a change; review them separately.
