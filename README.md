# SmartCrop

A mobile-friendly crop population calculator and **Field Studio** for planning hand-planted farms from their actual boundaries.

## Run

No build, account or API key is required. Serve the repository root:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. The original calculator is at `index.html`; choose **Field Studio** or open `field.html` for the map planner. Opening the files directly also works, with a cooperative calculation fallback instead of a worker. Live GPS requires a secure browser context and location permission.

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
