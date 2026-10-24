import { ServiceItem } from "./service-types";

export const servicesPart1: ServiceItem[] = [
  // ============================================================================
  // CATEGORY 1: WATER TANK & WATER CARE (10 Services)
  // ============================================================================
  {
    id: "overhead-water-tank-cleaning",
    slug: "overhead-water-tank-cleaning",
    name: "Overhead Water Tank Cleaning",
    categoryId: "water-tank-and-water-care",
    categoryName: "Water Tank & Water Care",
    shortDescription:
      "Thorough draining, sludge removal, high-pressure wall scrubbing and hygienic rinsing for domestic and society overhead water tanks.",
    fullDescription:
      "Overhead storage tanks gradually accumulate sediment, biofilm, algae and rust particles from municipal or tanker water supply. Our structured cleaning process drains residual water, removes settled silt, scrubs internal walls and ceilings, and rinses the tank thoroughly so your household water storage stays clean and hygienic.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "starting_at",
    samplePrice: 649,
    priceApproved: true,
    unit: "per tank up to 1,000L",
    
    image: {
      src: "/images/water-tank.webp",
      alt: "Clean white residential overhead water storage tanks and piping on a sunlit terrace",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Independent homeowners and duplex residences in Viman Nagar and nearby areas",
      "Apartment societies scheduling periodic domestic tank maintenance",
      "PGs, hostels, clinics and small commercial buildings",
    ],
    includedScope: [
      "Inspection of tank exterior, manhole lid condition and inlet/outlet connections",
      "Dewatering of remaining water below the outlet pipe level",
      "Manual and mechanical removal of bottom sludge, mud and sediment",
      "High-pressure brushing and scrubbing of internal walls, floor and roof underside",
      "Clean-water rinse and vacuum extraction of residual slurry",
    ],
    exclusions: [
      "Structural crack waterproofing or masonry tank reconstruction",
      "Confined-space entry into unsafe or structurally compromised tanks without proper ventilation",
      "Refilling water supply via water tankers (tank refills via customer's regular supply)",
    ],
    relatedServices: [
      {
        serviceId: "tds-measurement",
        relationshipType: "add-on",
        priority: 1,
        reason: "Check dissolved solids at the tap and storage outlet during the same visit.",
      },
      {
        serviceId: "tank-overflow-alarm-installation",
        relationshipType: "complementary",
        priority: 3,
        reason: "Prevent pump overflow and daily water wastage after tank maintenance.",
      },
    ],
    faqs: [
      {
        question: "How often should an overhead water tank be cleaned?",
        answer:
          "For most homes and apartments in Pune, cleaning every 6 months is recommended—or every 3 to 4 months if your building relies frequently on tanker water supply.",
      },
      {
        question: "Should we empty the tank before the team arrives?",
        answer:
          "Yes, we recommend turning off the inlet pump and using down the stored water to about 15–20% capacity before the appointment to minimize water wastage.",
      },
    ],
  },
  {
    id: "underground-sump-cleaning",
    slug: "underground-sump-cleaning",
    name: "Underground Sump Cleaning",
    categoryId: "water-tank-and-water-care",
    categoryName: "Water Tank & Water Care",
    shortDescription:
      "Dewatering, silt extraction and internal wall cleaning for underground concrete or masonry water sumps, subject to access and safety checks.",
    fullDescription:
      "Underground sumps are the first collection point for municipal and tanker deliveries, meaning heavy silt and debris settle here before reaching overhead tanks. We perform submersible dewatering, sludge removal and wall scrubbing after verifying safe manhole access, ventilation and electrical isolation.",
    importantNotice:
      "Safety & Equipment Requirement: Underground sump cleaning is strictly subject to prior site assessment for manhole opening size, ventilation, depth, electrical pump isolation and safe entry conditions.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "starting_at",
    samplePrice: 1799,
    priceApproved: true,
    unit: "up to 5,000L",
    
    image: {
      src: "/images/underground-sump.webp",
      alt: "Water storage sump piping, control valves and filtration unit on a clean utility platform",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Independent bungalows and row houses with underground water sumps",
      "Co-operative housing societies and apartment blocks",
      "Commercial buildings, hostels and restaurants",
    ],
    includedScope: [
      "Pre-work check of manhole access, ventilation and pump power isolation",
      "Pumping out residual water using a submersible dewatering pump",
      "Extraction of accumulated bottom silt, sand and settled debris",
      "Scrubbing of internal concrete/tiled sump walls and floor",
      "Final rinse and complete slurry extraction",
    ],
    exclusions: [
      "Entry into deep, unventilated or hazardous confined spaces that do not meet safety requirements",
      "Civil repair, internal plastering, tile grouting or waterproofing",
      "Foot-valve or submersible motor rewinding",
    ],
    relatedServices: [
      {
        serviceId: "overhead-water-tank-cleaning",
        relationshipType: "complementary",
        priority: 1,
        reason: "Clean both underground and overhead tanks together so silt does not re-enter the system.",
      },
    ],
    faqs: [
      {
        question: "Why does underground sump cleaning require a site or photo check?",
        answer:
          "Underground sumps vary widely in depth, opening size and ventilation. Confirming these details beforehand ensures our team brings the right pump capacity, hoses and safety gear.",
      },
    ],
  },
  {
    id: "tds-measurement",
    slug: "tds-measurement",
    isAddOnOnly: true,
    name: "TDS Measurement",
    categoryId: "water-tank-and-water-care",
    categoryName: "Water Tank & Water Care",
    shortDescription:
      "On-site digital measurement of Total Dissolved Solids (TDS) across your kitchen tap, purifier outlet and storage tank supply.",
    fullDescription:
      "Our technician measures Total Dissolved Solids (expressed in ppm / mg/L) across your incoming municipal/borewell line, overhead tank outlet and drinking water purifier output. This helps you check whether an existing RO membrane is functioning properly or whether your water source has shifted between municipal and borewell supply.",
    importantNotice:
      "Important Water Safety Note: TDS measurement only indicates the concentration of dissolved minerals and salts—it is NOT a complete test of drinking-water safety and cannot detect bacteria, viruses, heavy metals, pesticides or chemical contaminants. We never automatically recommend a water purifier solely based on a TDS reading.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "fixed",
    samplePrice: 69,
    priceApproved: true,
    unit: "per visit (complimentary with tank cleaning)",
    
    image: {
      src: "/images/water-testing.webp",
      alt: "Clear glass of drinking water with a digital handheld TDS water quality meter on a clean counter",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Homeowners checking whether their existing RO purifier filter or membrane needs attention",
      "Tenants moving into a new flat in Viman Nagar or Kharadi comparing tap vs. purifier readings",
      "Societies mixing PMC municipal supply with borewell or tanker water",
    ],
    includedScope: [
      "Calibrated digital TDS meter reading of raw input water (tank/tap)",
      "TDS reading of drinking water purifier outlet (if installed)",
      "Clear explanation of what the reading means without sales pressure",
    ],
    exclusions: [
      "Microbiological (E. coli / coliform) or full chemical potability certification (requires laboratory testing)",
      "Heavy metal, pesticide or pH/hardness laboratory analysis",
    ],
    relatedServices: [
      {
        serviceId: "overhead-water-tank-cleaning",
        relationshipType: "complementary",
        priority: 3,
        reason: "Keep storage tanks clean alongside periodic water checks.",
      },
    ],
    faqs: [
      {
        question: "Does a low TDS reading mean water is safe to drink?",
        answer:
          "No. Water with low TDS can still contain harmful bacteria, viruses or chemical contaminants. Conversely, moderately mineralised water may be safe if free of pathogens and toxic chemicals. Always use laboratory testing when assessing potability.",
      },
    ],
  },
  {
    id: "tank-overflow-alarm-installation",
    slug: "tank-overflow-alarm-installation",
    name: "Tank Overflow Alarm Supply & Installation",
    categoryId: "water-tank-and-water-care",
    categoryName: "Water Tank & Water Care",
    shortDescription:
      "Supply and installation of wired voice/bell water tank overflow alarms to alert you when your overhead tank reaches full capacity.",
    fullDescription:
      "Overflowing overhead tanks waste ratusan of litres of treated water, stain building facades and cause terrace dampness. We supply and install reliable water-level overflow alarms with stainless-steel/corrosion-resistant contact sensors inside the tank and an audible unit near your pump switch.",
    fulfillmentType: "product",
    fulfillmentLabel: "Supply & Installation",
    priceMode: "starting_at",
    samplePrice: 899,
    priceApproved: true,
    unit: "sensor unit, siren & fitting",
    
    image: {
      src: "/images/tank-alarm.webp",
      alt: "Overhead water tank sensor wiring and brass valve assembly on a clean terrace",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Independent houses and row houses operating manual borewell or sump pumps",
      "Small apartment buildings and PGs looking to prevent daily tank overflow",
    ],
    includedScope: [
      "Supply of tested water-tank overflow alarm unit",
      "Placement of level sensor probes at the top overflow mark inside the overhead tank",
      "Neat routing of sensor cable to the indoor alarm placement near the motor switch",
      "Live test of the alarm trigger before handover",
    ],
    exclusions: [
      "Fully automatic pump motor starter controllers unless specifically requested and quoted",
      "Concealed wall chiselling for internal wiring",
    ],
    relatedServices: [
      {
        serviceId: "overhead-water-tank-cleaning",
        relationshipType: "complementary",
        priority: 2,
        reason: "Install the sensor cleanly right after your overhead tank is scrubbed and rinsed.",
      },
    ],
    faqs: [
      {
        question: "Is there any risk of electric shock in the water tank?",
        answer:
          "Quality overflow alarms use safe, isolated extra-low-voltage sensing circuits at the tank probe. We verify proper unit isolation during installation.",
      },
    ],
  },

  // ============================================================================
  // CATEGORY 2: SOFA & UPHOLSTERY CARE (7 Services)
  // ============================================================================
  {
    id: "sofa-deep-cleaning",
    slug: "sofa-deep-cleaning",
    name: "Sofa Deep Cleaning",
    categoryId: "sofa-and-upholstery-care",
    categoryName: "Sofa & Upholstery Care",
    shortDescription:
      "Multi-stage dry vacuuming, fabric-safe shampooing, gentle agitation and wet vacuum extraction for fabric and leatherette sofas.",
    fullDescription:
      "Sofas collect body oils, airborne dust, food crumbs and pet dander deep within cushion fibres. Our sofa care process begins with high-suction dry vacuuming of crevices, followed by fabric-appropriate foam/shampoo treatment, soft-bristle brushing and powerful wet-vacuum extraction that lifts embedded grime without over-wetting your cushions.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "starting_at",
    samplePrice: 449,
    priceApproved: true,
    unit: "3-seater (₹799 for 5-seater / L-shape)",
    
    image: {
      src: "/images/sofa-cleaning.webp",
      alt: "Pristine light-beige fabric sectional sofa and cushions in a sunlit modern living room",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Fabric, linen-blend, microfiber, velvet and leatherette sofas",
      "Homes preparing for guests, festivals or seasonal allergy reduction",
      "Furnished rental apartments in Viman Nagar and Kharadi between tenants",
    ],
    includedScope: [
      "Fabric type check and colourfastness spot test in an inconspicuous area",
      "Dry vacuuming of seat cushions, backrests, armrests and under-cushion crevices",
      "Application of upholstery-safe cleaning solution and gentle mechanical brushing",
      "Wet-vacuum moisture and dirt extraction for faster drying",
      "Cushion pillows included when specified in the quotation",
    ],
    exclusions: [
      "Permanent ink, dye transfer, bleach marks or aged chemical stains that have altered fabric pigment",
      "Dry-clean-only raw silk or delicate vintage textiles incompatible with moisture extraction",
      "Structural sofa spring, foam padding or carpentry repairs",
    ],
    relatedServices: [
      {
        serviceId: "mattress-deep-cleaning",
        relationshipType: "complementary",
        priority: 1,
        reason: "Clean bedroom mattresses during the same upholstery equipment visit.",
      },
    ],
    faqs: [
      {
        question: "How long does the sofa take to dry after wet extraction?",
        answer:
          "Because our extraction machine removes most of the moisture, sofas typically dry within 3 to 5 hours under a ceiling fan in Pune's climate.",
      },
      {
        question: "Will every stain come out completely?",
        answer:
          "Most surface dirt, food spills and water rings lift significantly. However, old stains, turmeric/dye marks or bleached spots may leave a faint shadow if the fabric fibres themselves are permanently dyed.",
      },
    ],
  },
  {
    id: "mattress-deep-cleaning",
    slug: "mattress-deep-cleaning",
    name: "Mattress Deep Cleaning",
    categoryId: "sofa-and-upholstery-care",
    categoryName: "Sofa & Upholstery Care",
    shortDescription:
      "High-suction dust-mite and dead-skin extraction, surface spot cleaning and low-moisture shampooing for single, queen and king mattresses.",
    fullDescription:
      "Mattresses trap fine dust, dead skin cells, sweat salts and allergens beneath bedsheets. We perform thorough dual-side dry vacuuming, treat surface stains and perspiration rings with fabric-safe cleanser, and extract moisture so your mattress feels fresh and clean.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "starting_at",
    samplePrice: 649,
    priceApproved: true,
    unit: "Single bed (₹999 for Queen/King)",
    
    image: {
      src: "/images/mattress-cleaning.webp",
      alt: "Spotless white diamond-quilted orthopedic mattress on a modern wooden bed frame",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Homeowners and allergy-sensitive individuals seeking dust and allergen removal",
      "Families with young children or pets",
      "Tenants moving into a furnished flat with pre-existing mattresses",
    ],
    includedScope: [
      "Intensive high-suction dry vacuuming of top, bottom and side quilted panels",
      "Spot treatment on sweat marks, beverage spills or water rings",
      "Low-moisture foam shampooing and wet-vacuum extraction",
    ],
    exclusions: [
      "Complete removal of aged yellow oxidation stains that have permanently discoloured cotton ticking",
      "Deep-soaked liquid spills that have penetrated into inner memory-foam cores",
    ],
    relatedServices: [
      {
        serviceId: "sofa-deep-cleaning",
        relationshipType: "complementary",
        priority: 1,
        reason: "Combine sofa and mattress cleaning in a single home visit.",
      },
    ],
    faqs: [
      {
        question: "Can we sleep on the mattress the same night?",
        answer:
          "Yes, if the service is completed in the morning or early afternoon and the room is ventilated with a ceiling fan running for 4–5 hours.",
      },
    ],
  },
  {
    id: "office-chair-cleaning",
    slug: "office-chair-cleaning",
    name: "Office Chair Cleaning",
    categoryId: "sofa-and-upholstery-care",
    categoryName: "Sofa & Upholstery Care",
    shortDescription:
      "Deep vacuuming, fabric/mesh seat extraction and base wiping for work-from-home task chairs and corporate office seating.",
    fullDescription:
      "Ergonomic mesh and fabric office chairs see 8–10 hours of daily use. We vacuum dust from mesh weaves, shampoo and extract padded seat cushions, and wipe down armrests, gas-lift cylinders and caster wheel bases.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "starting_at",
    samplePrice: 199,
    priceApproved: true,
    unit: "per chair (₹129 for 10+ chairs)",
    
    image: {
      src: "/images/office-chair.webp",
      alt: "Clean ergonomic black mesh and fabric office chairs beside a modern wood workstation",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Work-from-home professionals with ergonomic task chairs",
      "Coworking spaces, startups and clinics in Viman Nagar and Kharadi",
    ],
    includedScope: [
      "Dry vacuuming of backrest mesh and seat cushion seams",
      "Wet shampoo extraction of fabric seat pads",
      "Wiping and sanitizing of armrests, adjustment levers and 5-star wheel base",
    ],
    exclusions: [
      "Hydraulic gas-lift replacement or wheel hardware repair",
    ],
    relatedServices: [
      {
        serviceId: "office-and-coworking-cleaning",
        relationshipType: "complementary",
        priority: 1,
        reason: "Pair chair cleaning with complete office workstation and floor cleaning.",
      },
      {
        serviceId: "sofa-deep-cleaning",
        relationshipType: "add-on",
        priority: 2,
        reason: "Add your home-office chair when booking living room sofa cleaning.",
      },
    ],
    faqs: [
      {
        question: "Is there a minimum chair count for office bookings?",
        answer:
          "For standalone office chair visits, a minimum booking threshold applies; however, 1 or 2 chairs can easily be added onto any home sofa or mattress cleaning booking.",
      },
    ],
  },

  // ============================================================================
  // CATEGORY 3: BATHROOM CARE (6 Services)
  // ============================================================================
  {
    id: "bathroom-deep-cleaning",
    slug: "bathroom-deep-cleaning",
    name: "Bathroom Deep Cleaning",
    categoryId: "bathroom-care",
    categoryName: "Bathroom Care",
    shortDescription:
      "Comprehensive top-to-bottom cleaning and descaling of bathroom wall tiles, floor grout, glass partitions, WC, basin, taps and exhaust fan.",
    fullDescription:
      "Pune's water supply frequently leaves stubborn white hard-water scale on glass partitions, chrome taps and shower tiles, while soap scum builds up in corners and grout lines. Our bathroom deep cleaning systematically treats and scrubs every accessible surface—from the exhaust fan and wall tiles down to the floor drains and sanitaryware—without using raw industrial acids that ruin chrome plating or tile glaze.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "starting_at",
    samplePrice: 499,
    priceApproved: true,
    unit: "per bathroom (₹899 for 2 baths)",
    
    image: {
      src: "/images/bathroom-cleaning.webp",
      alt: "Sparkling clean modern walk-in bathroom with clear glass partition, porcelain tiles and wooden vanity",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Apartments and homes needing periodic hygiene and scale removal",
      "Tenants moving into or vacating a flat",
      "Guest bathrooms before family gatherings",
    ],
    includedScope: [
      "Dry dusting of ceiling corners, geyser exterior and exhaust fan blades/louvres",
      "Scrubbing of wall tiles and floor tiles up to reachable height",
      "Descaling of shower glass partition, mirror, taps, showerhead and health faucet",
      "Deep cleaning and sanitization of WC (commode), washbasin and drain traps",
      "Wiping of bathroom door, cabinets (exterior) and towel rails",
    ],
    exclusions: [
      "Removal of permanent etching where harsh acids were previously used on tiles or chrome",
      "Re-grouting with new epoxy compound (available as a separate tile/grout assessment)",
      "Internal geyser descaling or concealed plumbing blockages",
    ],
    relatedServices: [
      {
        serviceId: "bathroom-tile-and-grout-cleaning",
        relationshipType: "add-on",
        priority: 1,
        reason: "Add intensive mechanical grout-line restoration for heavily discoloured floor joints.",
      },
      {
        serviceId: "hard-water-deposit-removal",
        relationshipType: "add-on",
        priority: 2,
        reason: "Recommended for thick calcified buildup on shower glass and dark tiles.",
      },
    ],
    faqs: [
      {
        question: "Do you use harsh hydrochloric acid (harpic/muriatic acid) on tiles and taps?",
        answer:
          "No. Raw muriatic acid corrodes chrome fixtures, turns stainless steel black and eats away tile grout. We use formulated bathroom descalers and non-scratch scrub pads.",
      },
      {
        question: "How long does one bathroom deep cleaning take?",
        answer:
          "Depending on size and hard-water deposit levels, a single bathroom typically takes 60 to 90 minutes.",
      },
    ],
  },
  {
    id: "bathroom-tile-and-grout-cleaning",
    slug: "bathroom-tile-and-grout-cleaning",
    name: "Bathroom Tile & Grout Cleaning",
    categoryId: "bathroom-care",
    categoryName: "Bathroom Care",
    shortDescription:
      "Focused scrubbing of porous tile joints, corner mould stains and soap-scum film on bathroom walls and wet-area floors.",
    fullDescription:
      "Tile surfaces may wipe clean easily, but recessed cement grout lines trap moisture, soap residue and mildew. We apply targeted grout cleaners and use narrow crevice brushes to lift surface discolouration and restore clean definition to your bathroom tiles.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "starting_at",
    samplePrice: 369,
    priceApproved: true,
    unit: "per bathroom",
    
    image: {
      src: "/images/bathroom-tiles.webp",
      alt: "Spotless light-grey porcelain bathroom shower wall tiles and clean floor joints",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Shower enclosures with darkened or pinkish/black mildew in tile joints",
      "Textured anti-skid bathroom floor tiles holding trapped dirt",
    ],
    includedScope: [
      "Pre-treatment of grout joints and textured floor tiles",
      "Detail brushing along grout lines, corners and floor-to-wall junctions",
      "Rinse and squeegee dry",
    ],
    exclusions: [
      "Scraping out cracked/missing cement grout and refilling with new epoxy grout",
      "Sub-surface water seepage stains coming from behind the tile",
    ],
    relatedServices: [
      {
        serviceId: "bathroom-deep-cleaning",
        relationshipType: "complementary",
        priority: 1,
        reason: "Best performed as part of a complete bathroom deep cleaning.",
      },
      {
        serviceId: "hard-water-deposit-removal",
        relationshipType: "complementary",
        priority: 2,
        reason: "Pair grout detailing with hard-water mineral scale removal.",
      },
    ],
    faqs: [
      {
        question: "What if the grout is physically missing between tiles?",
        answer:
          "Cleaning removes surface grime, but if cement grout has washed away, water can seep behind the tiles. We will point out any missing grout areas during inspection.",
      },
    ],
  },
  {
    id: "hard-water-deposit-removal",
    slug: "hard-water-deposit-removal",
    name: "Hard-Water Deposit Removal",
    categoryId: "bathroom-care",
    categoryName: "Bathroom Care",
    shortDescription:
      "Specialized descaling treatment for white calcium/mineral crusts on shower glass partitions, dark tiles, buckets and bathroom fixtures.",
    fullDescription:
      "Borewell and mixed society water in Pune often leaves chalky white mineral deposits on glass shower cubicles, dark ceramic tiles and around tap bases. We use controlled descaling compounds and non-scratch detailing pads to break down mineral scale progressively.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "starting_at",
    samplePrice: 419,
    priceApproved: true,
    unit: "glass partition & tiles",
    
    image: {
      src: "/images/bathroom-cleaning.webp",
      alt: "Crystal-clear frameless glass shower partition and descaled bathroom fixtures",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Cloudy or water-spotted glass shower partitions",
      "Dark slate, black or navy bathroom tiles showing white mineral haze",
    ],
    includedScope: [
      "Spot test on glass/tile surface to assess mineral crust vs. permanent glass etching",
      "Dwell-time application of descaling agent and careful non-scratch agitation",
      "Thorough neutralization rinse and microfiber buffing",
    ],
    exclusions: [
      "Permanent glass 'clouding' or silica etching caused by years of uncleaned hard water",
    ],
    relatedServices: [
      {
        serviceId: "bathroom-deep-cleaning",
        relationshipType: "complementary",
        priority: 2,
        reason: "Combine with full bathroom deep cleaning for complete results.",
      },
    ],
    faqs: [
      {
        question: "Can 100% of white stains on old shower glass be removed?",
        answer:
          "Recent mineral scale lifts very well (typically 75–95% improvement). If hard water has sat on glass for years, minerals can chemically etch microscopic pits into the glass itself, which improves significantly but may leave a slight haze.",
      },
    ],
  },

  // ============================================================================
  // CATEGORY 4: KITCHEN CARE (2 Services)
  // ============================================================================
  {
    id: "kitchen-deep-cleaning",
    slug: "kitchen-deep-cleaning",
    name: "Kitchen Deep Cleaning",
    categoryId: "kitchen-care",
    categoryName: "Kitchen Care",
    shortDescription:
      "Thorough degreasing and sanitization of kitchen countertops, backsplash tiles, cabinets, stove exterior, sink, floor and exhaust fan.",
    fullDescription:
      "Indian cooking naturally releases fine oil vapour and spice residue that settles on upper cabinets, wall tiles, switches and appliances. Our kitchen deep cleaning methodically degreases surfaces, scrubs tiled backsplashes, cleans cabinet exteriors (and interiors when emptied), polishes the stainless steel sink and leaves your cooking space fresh and hygienic.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "starting_at",
    samplePrice: 1299,
    priceApproved: true,
    unit: "standard modular kitchen",
    
    image: {
      src: "/images/kitchen-cleaning.webp",
      alt: "Spotless contemporary modular kitchen with gleaming white quartz countertop, stainless steel chimney and sink",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Modular and traditional home kitchens in need of periodic degreasing",
      "Move-in / move-out apartment handovers",
      "Pre-festival or post-renovation kitchen cleanup",
    ],
    includedScope: [
      "Degreasing of wall tiles / backsplash and granite or quartz countertops",
      "Cleaning of modular cabinet shutters, handles, loft exteriors and trolley fronts",
      "Internal cabinet and cutlery trolley wiping (if emptied prior to service)",
      "External cleaning of hob/gas stove, microwave, refrigerator and water purifier",
      "Sink, faucet, drain strainer and kitchen floor scrubbing",
      "Exhaust fan and accessible window Cleaning inside the kitchen",
    ],
    exclusions: [
      "Unloading and reloading fragile crockery or open food containers unless specifically arranged",
      "Deep internal oven/chimney motor dismantling unless chimney cleaning is added",
      "Pest control gel/spray application",
    ],
    relatedServices: [
      {
        serviceId: "kitchen-grease-removal",
        relationshipType: "add-on",
        priority: 1,
        reason: "Target tough grease on stovetop surrounds and backsplashes.",
      },
    ],
    faqs: [
      {
        question: "Do we need to empty the kitchen cabinets before the team arrives?",
        answer:
          "If you only want external shutter and countertop degreasing, cabinets can remain full. If you want internal shelves and trolleys cleaned, emptying them beforehand allows thorough edge-to-edge cleaning.",
      },
    ],
  },
  {
    id: "kitchen-grease-removal",
    slug: "kitchen-grease-removal",
    name: "Grease Removal from Suitable Surfaces",
    categoryId: "kitchen-care",
    categoryName: "Kitchen Care",
    shortDescription:
      "Targeted breakdown of polymerized cooking oil and sticky grease film from kitchen tiles, stove surrounds, steel racks and washable cabinet finishes.",
    fullDescription:
      "Over months of cooking, airborne oil polymerizes into a tacky amber film on loft tops, backsplash tiles around the stove and exhaust grilles. We apply surface-safe alkaline degreasers with controlled dwell time to emulsify grease without scratching acrylic, laminate or stainless steel finishes.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "starting_at",
    samplePrice: 499,
    priceApproved: true,
    unit: "stovetop & backsplash area",
    
    image: {
      src: "/images/kitchen-chimney.webp",
      alt: "Clean backsplash tiles, gas hob and stainless steel range hood free of oil residue",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Rental kitchens after long tenancies with heavy cooking grease",
      "Cooking zones around gas hobs, exhaust fans and upper cabinet tops",
    ],
    includedScope: [
      "Surface compatibility check (ceramic tile, stainless steel, glass, laminate, acrylic)",
      "Emulsification and removal of sticky oil buildup",
      "Clean-water rinse and microfiber wipe-down",
    ],
    exclusions: [
      "Unsealed porous distemper paint walls where oil has soaked into the plaster",
      "Peeling laminate or heat-blistered cabinet foil",
    ],
    relatedServices: [
      {
        serviceId: "kitchen-deep-cleaning",
        relationshipType: "complementary",
        priority: 1,
        reason: "Upgrade to a full kitchen deep clean for complete floor-to-ceiling care.",
      },
    ],
    faqs: [
      {
        question: "Will degreasing damage glossy acrylic modular shutters?",
        answer:
          "We never use steel wool or harsh abrasive powders on glossy acrylic or PU shutters. We use soft microfiber cloths and diluted surface-safe degreasers.",
      },
    ],
  },
];

