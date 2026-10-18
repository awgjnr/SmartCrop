/* Source-linked, editable layout starting points; not local suitability certification. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.LayoutPresets=api;})(globalThis,()=>{
const reviewed='2026-10-18';
const sources={
  "osu": {
    "title": "Oklahoma State University · Garden Planning Guide, HLA-6004 (2021), Tables 1A–1B",
    "url": "https://extension.okstate.edu/fact-sheets/oklahoma-garden-planning-guide",
    "scope": "US home-garden row guidance; verify local cultivar and commercial conditions.",
    "kind": "Extension"
  },
  "pepper": {
    "title": "UF/IFAS · Pepper Production, CV130, Table 2",
    "url": "https://ask.ifas.ufl.edu/publication/CV130",
    "scope": "Florida pepper reference; cultivar and production-system dependent, not a Ghana habanero validation.",
    "kind": "Extension"
  },
  "maize": {
    "title": "IITA · Maize production manual for smallholder farmers in Tanzania (2020), spacing table",
    "url": "https://biblio.iita.org/documents/U20ManBaijukyaMaizeNothomDev.pdf-3f35d5868118011f5184c20202bda6e9.pdf",
    "scope": "Tanzania; rainfall class and variety stature determine the choice.",
    "kind": "Extension"
  },
  "rice": {
    "title": "Frontiers in Environmental Science (2022), doi:10.3389/fenvs.2022.869194",
    "url": "https://www.frontiersin.org/journals/environmental-science/articles/10.3389/fenvs.2022.869194/full",
    "scope": "Indian Himalayan rice experiment; SRI treatment, one seedling per hill. Requires the wider SRI management package.",
    "kind": "Research treatment"
  },
  "sorghum": {
    "title": "Journal of Experimental Botany 73 (2022), 5730; field methods",
    "url": "https://academic.oup.com/jxb/article/73/16/5730/6590854",
    "scope": "Experimental sorghum spacing; a trial reference, not a universal optimum.",
    "kind": "Research treatment"
  },
  "cassava": {
    "title": "IITA · Cassava system cropping guide, spacing section",
    "url": "https://www.iita.org/wp-content/uploads/2016/06/Cassava_system_cropping_guide.pdf",
    "scope": "Sole-crop square arrangement; intercrops require a separate design.",
    "kind": "Extension"
  },
  "yam": {
    "title": "Plant Production Science (2018), doi:10.1080/1343943X.2018.1540278",
    "url": "https://www.tandfonline.com/doi/full/10.1080/1343943X.2018.1540278",
    "scope": "Staked Dioscorea rotundata field trials at IITA Ibadan; verify species and sett size.",
    "kind": "Research treatment"
  },
  "yamseed": {
    "title": "TAAT/IITA · Climate-smart and market-preferred yam varieties, implementation",
    "url": "https://e-catalogs.taat-africa.org/gov/technologies/climate-smart-and-market-preferred-yam-varieties",
    "scope": "Seed-yam minisett production, not a ware-yam recommendation.",
    "kind": "Extension"
  },
  "sweet": {
    "title": "CIP · Sweetpotato Seed Systems, Topic 5, pp.19 and 53",
    "url": "https://cipotato.org/wp-content/uploads/2023/05/202305-SweetpotatoSeedSystems.pdf",
    "scope": "Ridge system; distinguish storage-root production from vine multiplication.",
    "kind": "Extension"
  },
  "musa": {
    "title": "IITA PROPaS · Spacing and Stand Management in Banana and Plantain",
    "url": "https://propas.iita.org/en/solutions/spacing-and-stand-management-in-banana-and-plantain/153/details/",
    "scope": "Cultivar stature, rainfall, soil fertility and stand management govern density.",
    "kind": "Extension"
  },
  "pineapple": {
    "title": "TFNet · Pineapple Agronomy (2016), Field Planting",
    "url": "https://www.itfnet.org/v1/2016/05/pineapple-agronomy/",
    "scope": "Double-row 30–60–90 cm system; 90 cm is the clear gap between pairs.",
    "kind": "Published technical guidance"
  },
  "cocoa": {
    "title": "FAO · Cocoa, Better Farming Series, Chapter 3",
    "url": "https://www.fao.org/4/ad220e/AD220E03.htm",
    "scope": "Legacy extension range; shade trees and access need separate planning.",
    "kind": "Extension"
  },
  "palm": {
    "title": "FAO · Oil palm, Planting out the seedlings",
    "url": "https://www.fao.org/4/t0309e/T0309E03.htm",
    "scope": "9 m equilateral triangular grid; row separation is 9 × √3/2, about 7.8 m.",
    "kind": "Extension"
  },
  "groundnut": {
    "title": "CSIR-SARI · Groundnut varietal response to spacing, Ghana, Growth and yield",
    "url": "https://cspace.csirgh.com/items/show/2072",
    "scope": "Ghana Guinea savanna experiment, six varieties; treatment choice is not a universal yield ranking.",
    "kind": "Research treatment"
  },
  "cowpea": {
    "title": "Kusi et al. (2020), International Journal of Agronomy, doi:10.1155/2020/8869334",
    "url": "https://onlinelibrary.wiley.com/doi/10.1155/2020/8869334",
    "scope": "Ghana resistance-screening trial, thinned to one plant per station; not the two-plants-per-hill system.",
    "kind": "Research treatment"
  },
  "soy": {
    "title": "IITA · Guide to Soybean Production in Northern Nigeria, Plant spacing and sowing",
    "url": "https://www.iita.org/wp-content/uploads/2020/07/Guide-to-Soybean-Production-in-Northern-Nigeria..pdf",
    "scope": "Early-maturing varieties; 50 cm rows and 5–10 cm within-row range.",
    "kind": "Extension"
  },
  "soytrial": {
    "title": "KNUST Journal of Science and Technology · Medium-maturing soybean lines, doi:10.4314/just.v26i2.704",
    "url": "https://journal.knust.edu.gh/index.php/just/article/view/704",
    "scope": "Ghana medium-maturity soybean experiment; trial spacing, not a universal optimum.",
    "kind": "Research treatment"
  },
  "papaya": {
    "title": "Trinidad and Tobago Ministry of Agriculture · Papaya Production Manual, plant spacing",
    "url": "https://agriculture.gov.tt/wp-content/uploads/2017/11/Papaya-_Production_Manual.pdf",
    "scope": "Published range: 2–2.5 m within rows, 2.5–3 m between rows. Verify cultivar and drainage.",
    "kind": "Extension"
  }
};
const entries=[
  {
    "id": "maize-short",
    "crop": "Maize",
    "label": "Higher rainfall · short varieties",
    "pattern": "single",
    "rowGap": 0.75,
    "spacing": 0.25,
    "alignment": "aligned",
    "source": "maize",
    "note": "One plant per station."
  },
  {
    "id": "maize-tall",
    "crop": "Maize",
    "label": "Higher rainfall · tall varieties",
    "pattern": "single",
    "rowGap": 0.75,
    "spacing": 0.3,
    "alignment": "aligned",
    "source": "maize",
    "note": "One plant per station."
  },
  {
    "id": "maize-dry",
    "crop": "Maize",
    "label": "Low rainfall · wider rows",
    "pattern": "single",
    "rowGap": 0.9,
    "spacing": 0.3,
    "alignment": "aligned",
    "source": "maize",
    "note": "One plant per station."
  },
  {
    "id": "rice-sri",
    "crop": "Rice (transplanted)",
    "label": "SRI trial · single-seedling square",
    "pattern": "single",
    "rowGap": 0.25,
    "spacing": 0.25,
    "alignment": "aligned",
    "source": "rice",
    "note": "25 × 25 cm; one seedling, not a multi-seedling hill."
  },
  {
    "id": "sorghum-trial",
    "crop": "Sorghum",
    "label": "Grain sorghum · published trial",
    "pattern": "single",
    "rowGap": 0.75,
    "spacing": 0.2,
    "alignment": "aligned",
    "source": "sorghum",
    "note": ""
  },
  {
    "id": "tomato-1",
    "crop": "Tomato",
    "label": "Row reference · closer within range",
    "pattern": "single",
    "rowGap": 1.2192,
    "spacing": 0.6096,
    "alignment": "aligned",
    "source": "osu",
    "note": "Converted from published feet/inches; selected range endpoint."
  },
  {
    "id": "tomato-2",
    "crop": "Tomato",
    "label": "Row reference · wider within range",
    "pattern": "single",
    "rowGap": 1.2192,
    "spacing": 0.9144,
    "alignment": "aligned",
    "source": "osu",
    "note": "Converted from published feet/inches; selected range endpoint."
  },
  {
    "id": "pepper-1",
    "crop": "Pepper / habanero",
    "label": "Single-row pepper reference",
    "pattern": "single",
    "rowGap": 0.9144,
    "spacing": 0.6096,
    "alignment": "aligned",
    "source": "osu",
    "note": "Converted from published feet/inches; selected range endpoint."
  },
  {
    "id": "cabbage-1",
    "crop": "Cabbage",
    "label": "Closer head spacing",
    "pattern": "single",
    "rowGap": 0.9144,
    "spacing": 0.3048,
    "alignment": "aligned",
    "source": "osu",
    "note": "Converted from published feet/inches; selected range endpoint."
  },
  {
    "id": "cabbage-2",
    "crop": "Cabbage",
    "label": "Wider head spacing",
    "pattern": "single",
    "rowGap": 0.9144,
    "spacing": 0.4572,
    "alignment": "aligned",
    "source": "osu",
    "note": "Converted from published feet/inches; selected range endpoint."
  },
  {
    "id": "lettuce-1",
    "crop": "Lettuce",
    "label": "Head lettuce · closer rows",
    "pattern": "single",
    "rowGap": 0.3048,
    "spacing": 0.3048,
    "alignment": "aligned",
    "source": "osu",
    "note": "Converted from published feet/inches; selected range endpoint."
  },
  {
    "id": "lettuce-2",
    "crop": "Lettuce",
    "label": "Head lettuce · wider rows",
    "pattern": "single",
    "rowGap": 0.4572,
    "spacing": 0.3048,
    "alignment": "aligned",
    "source": "osu",
    "note": "Converted from published feet/inches; selected range endpoint."
  },
  {
    "id": "lettuce-3",
    "crop": "Lettuce",
    "label": "Leaf lettuce · row reference",
    "pattern": "single",
    "rowGap": 0.4572,
    "spacing": 0.0762,
    "alignment": "aligned",
    "source": "osu",
    "note": "Converted from published feet/inches; selected range endpoint."
  },
  {
    "id": "onion-1",
    "crop": "Onion",
    "label": "Bulb onion · closer rows",
    "pattern": "single",
    "rowGap": 0.3048,
    "spacing": 0.1016,
    "alignment": "aligned",
    "source": "osu",
    "note": "Converted from published feet/inches; selected range endpoint."
  },
  {
    "id": "onion-2",
    "crop": "Onion",
    "label": "Bulb onion · wider rows",
    "pattern": "single",
    "rowGap": 0.4572,
    "spacing": 0.1016,
    "alignment": "aligned",
    "source": "osu",
    "note": "Converted from published feet/inches; selected range endpoint."
  },
  {
    "id": "okra-1",
    "crop": "Okra",
    "label": "Closer rows",
    "pattern": "single",
    "rowGap": 0.6096,
    "spacing": 0.4572,
    "alignment": "aligned",
    "source": "osu",
    "note": "Converted from published feet/inches; selected range endpoint."
  },
  {
    "id": "okra-2",
    "crop": "Okra",
    "label": "Wider rows",
    "pattern": "single",
    "rowGap": 0.9144,
    "spacing": 0.4572,
    "alignment": "aligned",
    "source": "osu",
    "note": "Converted from published feet/inches; selected range endpoint."
  },
  {
    "id": "cucumber-1",
    "crop": "Cucumber",
    "label": "Ground-grown · closer spacing",
    "pattern": "single",
    "rowGap": 0.9144,
    "spacing": 0.6096,
    "alignment": "aligned",
    "source": "osu",
    "note": "Converted from published feet/inches; selected range endpoint."
  },
  {
    "id": "cucumber-2",
    "crop": "Cucumber",
    "label": "Ground-grown · wider spacing",
    "pattern": "single",
    "rowGap": 1.524,
    "spacing": 0.9144,
    "alignment": "aligned",
    "source": "osu",
    "note": "Converted from published feet/inches; selected range endpoint."
  },
  {
    "id": "watermelon-1",
    "crop": "Watermelon",
    "label": "Vine rows · closer range endpoint",
    "pattern": "single",
    "rowGap": 1.524,
    "spacing": 1.524,
    "alignment": "aligned",
    "source": "osu",
    "note": "Converted from published feet/inches; selected range endpoint."
  },
  {
    "id": "watermelon-2",
    "crop": "Watermelon",
    "label": "Vine rows · wider range endpoint",
    "pattern": "single",
    "rowGap": 2.4384,
    "spacing": 2.4384,
    "alignment": "aligned",
    "source": "osu",
    "note": "Converted from published feet/inches; selected range endpoint."
  },
  {
    "id": "pepper-double",
    "crop": "Pepper / habanero",
    "label": "Mulched double rows · pepper reference",
    "pattern": "double",
    "within": 0.4572,
    "between": 1.3716,
    "spacing": 0.381,
    "alignment": "aligned",
    "source": "pepper",
    "note": "72 in pair centres, 18 in within pair, 15 in between plants. Between-pair clear gap = 72 − 18 = 54 in."
  },
  {
    "id": "cassava-square",
    "crop": "Cassava",
    "label": "Sole crop · square",
    "pattern": "single",
    "rowGap": 1,
    "spacing": 1,
    "alignment": "aligned",
    "source": "cassava",
    "note": ""
  },
  {
    "id": "yam-ware",
    "crop": "Yam",
    "label": "Staked white yam · trial grid",
    "pattern": "single",
    "rowGap": 1,
    "spacing": 1,
    "alignment": "aligned",
    "source": "yam",
    "note": ""
  },
  {
    "id": "yam-seed",
    "crop": "Yam",
    "label": "Seed-yam minisett multiplication",
    "pattern": "single",
    "rowGap": 1,
    "spacing": 0.25,
    "alignment": "aligned",
    "source": "yamseed",
    "note": "Seed material production; not interchangeable with ware yam."
  },
  {
    "id": "sweet-root",
    "crop": "Sweet potato",
    "label": "Storage-root production · ridges",
    "pattern": "single",
    "rowGap": 1,
    "spacing": 0.3,
    "alignment": "aligned",
    "source": "sweet",
    "note": ""
  },
  {
    "id": "sweet-vine",
    "crop": "Sweet potato",
    "label": "Vine multiplication · ridges",
    "pattern": "single",
    "rowGap": 1,
    "spacing": 0.15,
    "alignment": "aligned",
    "source": "sweet",
    "note": "Closer spacing favours vines rather than storage roots; enter a vine-production yield basis separately."
  },
  {
    "id": "plantain-standard",
    "crop": "Plantain",
    "label": "Cooking / larger types · square",
    "pattern": "single",
    "rowGap": 3,
    "spacing": 3,
    "alignment": "aligned",
    "source": "musa",
    "note": ""
  },
  {
    "id": "plantain-large",
    "crop": "Plantain",
    "label": "Very large types · wider square",
    "pattern": "single",
    "rowGap": 4,
    "spacing": 4,
    "alignment": "aligned",
    "source": "musa",
    "note": ""
  },
  {
    "id": "banana-standard",
    "crop": "Banana",
    "label": "Cooking / larger types · square",
    "pattern": "single",
    "rowGap": 3,
    "spacing": 3,
    "alignment": "aligned",
    "source": "musa",
    "note": ""
  },
  {
    "id": "banana-dwarf",
    "crop": "Banana",
    "label": "Dwarf types · closer square",
    "pattern": "single",
    "rowGap": 2,
    "spacing": 2,
    "alignment": "aligned",
    "source": "musa",
    "note": ""
  },
  {
    "id": "banana-large",
    "crop": "Banana",
    "label": "Very large types · wider square",
    "pattern": "single",
    "rowGap": 4,
    "spacing": 4,
    "alignment": "aligned",
    "source": "musa",
    "note": ""
  },
  {
    "id": "pineapple-double",
    "crop": "Pineapple",
    "label": "Double rows · 30–60–90 cm",
    "pattern": "double",
    "within": 0.6,
    "between": 0.9,
    "spacing": 0.3,
    "alignment": "aligned",
    "source": "pineapple",
    "note": ""
  },
  {
    "id": "cocoa-square",
    "crop": "Cocoa",
    "label": "Wider square · 3 m",
    "pattern": "single",
    "rowGap": 3,
    "spacing": 3,
    "alignment": "aligned",
    "source": "cocoa",
    "note": ""
  },
  {
    "id": "cocoa-closer",
    "crop": "Cocoa",
    "label": "Closer square · 2.5 m",
    "pattern": "single",
    "rowGap": 2.5,
    "spacing": 2.5,
    "alignment": "aligned",
    "source": "cocoa",
    "note": ""
  },
  {
    "id": "palm-triangle",
    "crop": "Oil palm",
    "label": "Equilateral triangular · 9 m",
    "pattern": "single",
    "rowGap": 7.794228634059947,
    "spacing": 9,
    "alignment": "staggered",
    "source": "palm",
    "note": "True equilateral layout: alternate rows offset by 4.5 m."
  },
  {
    "id": "groundnut-1",
    "crop": "Groundnut",
    "label": "Ghana trial · 30 × 15 cm",
    "pattern": "single",
    "rowGap": 0.3,
    "spacing": 0.15,
    "alignment": "aligned",
    "source": "groundnut",
    "note": ""
  },
  {
    "id": "groundnut-2",
    "crop": "Groundnut",
    "label": "Ghana trial · 40 × 10 cm",
    "pattern": "single",
    "rowGap": 0.4,
    "spacing": 0.1,
    "alignment": "aligned",
    "source": "groundnut",
    "note": ""
  },
  {
    "id": "groundnut-3",
    "crop": "Groundnut",
    "label": "Ghana trial · 50 × 10 cm",
    "pattern": "single",
    "rowGap": 0.5,
    "spacing": 0.1,
    "alignment": "aligned",
    "source": "groundnut",
    "note": ""
  },
  {
    "id": "cowpea-single",
    "crop": "Cowpea",
    "label": "Ghana trial · one plant per station",
    "pattern": "single",
    "rowGap": 0.6,
    "spacing": 0.2,
    "alignment": "aligned",
    "source": "cowpea",
    "note": ""
  },
  {
    "id": "soy-early5",
    "crop": "Soybean",
    "label": "Early maturity · 5 cm in row",
    "pattern": "single",
    "rowGap": 0.5,
    "spacing": 0.05,
    "alignment": "aligned",
    "source": "soy",
    "note": ""
  },
  {
    "id": "soy-early10",
    "crop": "Soybean",
    "label": "Early maturity · 10 cm in row",
    "pattern": "single",
    "rowGap": 0.5,
    "spacing": 0.1,
    "alignment": "aligned",
    "source": "soy",
    "note": ""
  },
  {
    "id": "soy-medium",
    "crop": "Soybean",
    "label": "Medium maturity · Ghana trial",
    "pattern": "single",
    "rowGap": 0.75,
    "spacing": 0.05,
    "alignment": "aligned",
    "source": "soytrial",
    "note": ""
  },
  {
    "id": "papaya-closer",
    "crop": "Papaya",
    "label": "Closer range endpoint",
    "pattern": "single",
    "rowGap": 2.5,
    "spacing": 2,
    "alignment": "aligned",
    "source": "papaya",
    "note": ""
  },
  {
    "id": "papaya-wider",
    "crop": "Papaya",
    "label": "Wider range endpoint",
    "pattern": "single",
    "rowGap": 3,
    "spacing": 2.5,
    "alignment": "aligned",
    "source": "papaya",
    "note": ""
  }
];
function forCrop(crop){crop=crop==='Oil palm (triangular)'?'Oil palm':crop;return entries.filter(p=>p.crop===crop).map(p=>({...p,reference:sources[p.source]}));}
function get(id){const p=entries.find(x=>x.id===id);return p?{...p,reference:sources[p.source]}:null;}
function density(p){const pitch=p.pattern==='double'?p.within+p.between:p.rowGap;return (p.pattern==='double'?2:1)/(pitch*p.spacing);}
return{reviewed,sources,entries,forCrop,get,density};
});
