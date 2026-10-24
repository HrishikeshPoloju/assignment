import { ServiceItem } from "./service-types";

export const servicesPart2: ServiceItem[] = [
  // ============================================================================
  // CATEGORY 5: FLOOR & SURFACE CARE (6 Services)
  // ============================================================================
  {
    id: "floor-scrubbing",
    slug: "floor-scrubbing",
    name: "Floor Scrubbing",
    categoryId: "floor-and-surface-care",
    categoryName: "Floor & Surface Care",
    shortDescription:
      "Rotary machine and manual scrubbing of vitrified, ceramic and stone floors to lift embedded foot-traffic grime and mop residue.",
    fullDescription:
      "Daily household mopping often spreads a thin film of detergent and dust across floor pores and edges. Our mechanical and detail floor scrubbing uses surface-appropriate pads and neutral cleaners to lift embedded grime from vitrified tiles, ceramic flooring and natural stone, followed by wet-vacuum slurry extraction.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "starting_at",
    samplePrice: 999,
    priceApproved: true,
    unit: "minimum callout (₹4.50/sq.ft)",
    
    image: {
      src: "/images/floor-scrubbing.webp",
      alt: "Gleaming polished floor reflecting natural sunlight in a spacious modern apartment hallway",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Vitrified, ceramic, Kota stone and granite apartment or villa floors",
      "Post-painting or post-interior-work floor cleanup",
      "Commercial office corridors and reception lobbies",
    ],
    includedScope: [
      "Dry sweeping and vacuuming of loose dust and debris",
      "Machine scrubbing of open floor spans with floor-safe cleaning solution",
      "Manual corner and skirting-board edge detailing",
      "Wet-vacuum extraction and microfiber dry buffing",
    ],
    exclusions: [
      "Diamond-pad grinding or mirror crystallization of worn marble (see Marble & Stone Polishing)",
      "Removal of deep cement mortar lumps without prior site inspection",
    ],
    relatedServices: [
      {
        serviceId: "floor-tile-and-grout-cleaning",
        relationshipType: "add-on",
        priority: 1,
        reason: "Add intensive joint brushing for darkened grout lines between floor tiles.",
      },
      {
        serviceId: "balcony-floor-cleaning",
        relationshipType: "add-on",
        priority: 2,
        reason: "Include semi-open balcony and utility floors during the same visit.",
      },
    ],
    faqs: [
      {
        question: "Will machine scrubbing scratch glossy vitrified tiles?",
        answer:
          "No. We select soft non-abrasive scrubbing pads suited to glazed and vitrified tiles so the factory gloss is preserved.",
      },
    ],
  },
  {
    id: "floor-tile-and-grout-cleaning",
    slug: "floor-tile-and-grout-cleaning",
    name: "Floor Tile & Grout Cleaning",
    categoryId: "floor-and-surface-care",
    categoryName: "Floor & Surface Care",
    shortDescription:
      "Detailed joint-line brushing and stain lifting for darkened grout channels across living room, kitchen and passage floors.",
    fullDescription:
      "Dirty mopping water naturally settles into recessed tile joints, turning white or ivory grout lines dark grey over time. We treat floor joints with specialized cleaners and agitate each grout channel to brighten the overall look of your tiled rooms.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "starting_at",
    samplePrice: 799,
    priceApproved: true,
    unit: "minimum callout (₹5.50/sq.ft)",
    
    image: {
      src: "/images/floor-scrubbing.webp",
      alt: "Clean tiled apartment floor with crisp, spotless grout joints",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Living room, dining and kitchen floors where tile joints have darkened",
      "Move-in / move-out flat turnovers",
    ],
    includedScope: [
      "Targeted application of grout-safe cleaner along floor tile joints",
      "Mechanical and narrow-brush scrubbing of grout lines",
      "Full floor rinse and wet extraction",
    ],
    exclusions: [
      "Epoxy re-grouting or replacement of physically chipped tiles",
    ],
    relatedServices: [
      {
        serviceId: "floor-scrubbing",
        relationshipType: "complementary",
        priority: 1,
        reason: "Combine grout detailing with full-surface rotary floor scrubbing.",
      },
      {
        serviceId: "bathroom-tile-and-grout-cleaning",
        relationshipType: "complementary",
        priority: 2,
        reason: "Extend tile and grout restoration to your bathrooms as well.",
      },
    ],
    faqs: [
      {
        question: "Does grout cleaning restore painted or stained cement grout?",
        answer:
          "It removes accumulated dirt, grease and soap residue. If cement grout was permanently stained by paint or oil years ago, cleaning lightens it significantly though some pigment may remain.",
      },
    ],
  },
  {
    id: "balcony-floor-cleaning",
    slug: "balcony-floor-cleaning",
    name: "Balcony Floor Cleaning",
    categoryId: "floor-and-surface-care",
    categoryName: "Floor & Surface Care",
    shortDescription:
      "Scrubbing of anti-skid balcony tiles, plant-pot soil rings, monsoon moss and drain outlets.",
    fullDescription:
      "Apartment balconies in Pune bear the brunt of construction dust, monsoon algae, flowerpot mud rings and bird droppings. We scrub rough anti-skid balcony tiles, clear drain grates and wipe skirting edges.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "starting_at",
    samplePrice: 399,
    priceApproved: true,
    unit: "per balcony",
    
    image: {
      src: "/images/balcony-cleaning.webp",
      alt: "Clean tiled apartment balcony with glass railing and bright city view",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Apartment balconies and dry-balcony utility areas",
      "Terraces with flowerpot stains or post-monsoon grime",
    ],
    includedScope: [
      "Dry sweeping of leaves, soil and loose dust",
      "Hard-bristle/machine scrubbing of textured balcony floor tiles",
      "Clearing of surface debris from balcony rainwater drain outlets",
    ],
    exclusions: [
      "Leaning outside balcony railings to clean external building facades",
    ],
    relatedServices: [
      {
        serviceId: "balcony-deep-cleaning",
        relationshipType: "complementary",
        priority: 1,
        reason: "Include balcony glass railings, sliding doors and wall surfaces.",
      },
    ],
    faqs: [
      {
        question: "Can you clean balconies that have heavy pigeon droppings?",
        answer:
          "Yes, please mention pigeon-dropping buildup when requesting your quote so our team brings appropriate PPE, disinfectant and scraping tools.",
      },
    ],
  },

  // ============================================================================
  // CATEGORY 6: WINDOW & OUTDOOR CARE (6 Services)
  // ============================================================================
  {
    id: "accessible-window-cleaning",
    slug: "accessible-window-cleaning",
    name: "Accessible Window Cleaning",
    categoryId: "window-and-outdoor-care",
    categoryName: "Window & Outdoor Care",
    shortDescription:
      "Track vacuuming, frame wiping, mesh washing and streak-free glass squeegee cleaning for safely reachable apartment and home windows.",
    fullDescription:
      "Sliding window tracks fill with mud and dust, while glass panes get hazy after rain and traffic pollution. We vacuum sliding aluminium/uPVC tracks, wash removable mosquito screens, wipe window frames and clean all glass surfaces that can be safely reached from inside the room or balcony.",
    importantNotice:
      "Safety Scope Policy: We clean only interior glass and exterior glass surfaces that are safely reachable from inside the room or an adjacent balcony. We do NOT perform high-rise exterior rope-access or hanging window cleaning.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "starting_at",
    samplePrice: 199,
    priceApproved: true,
    unit: "per window (frame, tracks & glass)",
    
    image: {
      src: "/images/window-cleaning.webp",
      alt: "Floor-to-ceiling streak-free sliding glass windows opening onto a sunlit apartment balcony",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Apartment sliding windows, French doors and bay windows",
      "Ground-floor bungalows and offices with reachable exterior windows",
    ],
    includedScope: [
      "Dry vacuuming and wet detailing of sliding window bottom tracks and channels",
      "Cleaning of uPVC, powder-coated aluminium or wooden window frames",
      "Dusting/washing of accessible mosquito mesh shutters",
      "Streak-free glass cleaning on safely reachable sides",
    ],
    exclusions: [
      "High-rise exterior façade glass requiring rope access, cradles, scaffolding or leaning outside windows",
      "Removal of baked-on sun-control tint films or hardened construction silicone without prior testing",
    ],
    relatedServices: [
      {
        serviceId: "balcony-deep-cleaning",
        relationshipType: "complementary",
        priority: 1,
        reason: "Clean the adjacent balcony floor and railing alongside sliding doors.",
      },
    ],
    faqs: [
      {
        question: "Can you clean the outside of fixed glass panels on upper floors?",
        answer:
          "Only if they can be safely reached from a balcony or with a standard indoor extension squeegee without leaning out. We never put technicians at fall risk on high-rise exteriors.",
      },
    ],
  },
  {
    id: "interior-and-partition-glass-cleaning",
    slug: "interior-and-partition-glass-cleaning",
    name: "Glass Cleaning (Interior & Partitions)",
    categoryId: "window-and-outdoor-care",
    categoryName: "Window & Outdoor Care",
    shortDescription:
      "Streak-free cleaning for office glass partitions, cabin doors, mirrors, glass tabletops and reachable storefront glass.",
    fullDescription:
      "Fingerprints, smudges and dust make glass cabin partitions, mirrors and glass railings look cloudy under indoor lighting. We use professional glass squeegees and lint-free microfiber cloths for a crisp, streak-free finish.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "starting_at",
    samplePrice: 269,
    priceApproved: true,
    unit: "per glass partition / door",
    
    image: {
      src: "/images/commercial-office.webp",
      alt: "Spotless floor-to-ceiling interior glass partitions in a bright modern workspace",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Office conference rooms and glass cabin partitions",
      "Home mirrors, glass dining tables, stair railings and wardrobe glass shutters",
      "Ground-level clinic, café and boutique glass storefronts",
    ],
    includedScope: [
      "Removal of fingerprints, tape marks and dust from both sides of interior glass",
      "Squeegee and microfiber buffing for zero streaks",
      "Wiping of metal patch fittings, handles and bottom channels",
    ],
    exclusions: [
      "High-elevation external structural glazing",
    ],
    relatedServices: [
      {
        serviceId: "office-and-coworking-cleaning",
        relationshipType: "complementary",
        priority: 1,
        reason: "Bundle glass partition care with regular or deep office cleaning.",
      },
      {
        serviceId: "accessible-window-cleaning",
        relationshipType: "complementary",
        priority: 2,
        reason: "Include perimeter sliding windows and tracks.",
      },
    ],
    faqs: [
      {
        question: "Can you remove old sticker or cello-tape glue from glass partitions?",
        answer:
          "Yes, we can safely dissolve adhesive residue from clear glass panels during the visit (please avoid using sharp blades on frosted film).",
      },
    ],
  },
  {
    id: "balcony-deep-cleaning",
    slug: "balcony-deep-cleaning",
    name: "Balcony Cleaning",
    categoryId: "window-and-outdoor-care",
    categoryName: "Window & Outdoor Care",
    shortDescription:
      "Complete cleaning of balcony floors, glass/metal railings, ceiling lights, walls and sliding door tracks.",
    fullDescription:
      "Turn a dusty, unused balcony back into a pleasant morning tea spot. Our complete balcony cleaning covers ceiling cobweb removal, wall wiping, railing glass and handrail cleaning, sliding door track vacuuming and thorough floor scrubbing.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "starting_at",
    samplePrice: 549,
    priceApproved: true,
    unit: "per balcony (wash, glass & railing)",
    
    image: {
      src: "/images/balcony-cleaning.webp",
      alt: "Spotless apartment balcony with clean glass railing and tiled floor overlooking greenery",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Sit-out balconies in Viman Nagar and Kharadi apartments",
      "Balconies being prepared before or after pigeon-net installation",
    ],
    includedScope: [
      "Cobweb and dust removal from balcony ceiling, light fixture and walls",
      "Wiping of metal handrail and inner/reachable glass balustrade panels",
      "Scrubbing of balcony floor tiles, skirting and drain outlet",
    ],
    exclusions: [
      "Heavy gardening, repotting plants or disposal of large bags of soil",
    ],
    relatedServices: [
      {
        serviceId: "accessible-window-cleaning",
        relationshipType: "complementary",
        priority: 1,
        reason: "Clean the balcony's sliding glass doors and window tracks at the same time.",
      },
    ],
    faqs: [
      {
        question: "Can you clean balconies that have heavy pigeon droppings?",
        answer:
          "Yes, please mention pigeon droppings when booking so our team brings appropriate protective wear and sanitizing agents.",
      },
    ],
  },

  // ============================================================================
  // CATEGORY 7: COMPLETE HOME CLEANING (6 Services)
  // ============================================================================
  {
    id: "move-in-cleaning",
    slug: "move-in-cleaning",
    name: "Move-In Cleaning",
    categoryId: "complete-home-cleaning",
    categoryName: "Complete Home Cleaning",
    shortDescription:
      "Comprehensive room-by-room deep cleaning of your new flat or house before your furniture and family move in.",
    fullDescription:
      "There is no better time to deep clean a home than when it is empty or freshly handed over before unpacking boxes. Our Move-In Cleaning covers inside-out cabinet wiping, kitchen and bathroom deep cleaning, ceiling fan and light dusting, window track vacuuming, balcony scrubbing and machine floor care so you step into a genuinely fresh home.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "starting_at",
    samplePrice: 3299,
    priceApproved: true,
    unit: "1 BHK (₹4,199 for 2 BHK)",
    
    image: {
      src: "/images/complete-home.webp",
      alt: "Bright, spotless modern apartment living room ready for move-in with gleaming floors and clean glass doors",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Families and professionals moving into a rented or newly purchased flat in Viman Nagar, Kharadi or nearby areas",
      "Homes that have just completed painting or carpentry work",
    ],
    includedScope: [
      "All bedrooms & living area: fans, tube lights, switchboards, doors, wardrobes (inside & out if empty) and floor scrubbing",
      "All bathrooms: full tile scrubbing, descaling of taps/shower/glass and sanitaryware sanitization",
      "Kitchen: countertop, backsplash, sink, exhaust fan, chimney exterior and empty cabinets inside & out",
      "Reachable windows, sliding tracks, mosquito meshes and balconies",
    ],
    exclusions: [
      "Heavy construction rubble removal or scraping thick cement plaster blobs unless quoted as post-construction scope",
      "Wet shampooing of sofas/mattresses (can be added as an optional bundle for furnished flats)",
    ],
    relatedServices: [
      {
        serviceId: "sofa-and-mattress-bundle",
        relationshipType: "add-on",
        priority: 1,
        reason: "Moving into a furnished rental? Sanitize the existing sofa and mattresses on the same day.",
      },
    ],
    faqs: [
      {
        question: "When is the best day to schedule Move-In Cleaning?",
        answer:
          "Ideally 1 to 2 days before your packers and movers deliver your household goods, and after all painting, drilling and electrical work is 100% complete.",
      },
      {
        question: "Do we need electricity and running water in the flat?",
        answer:
          "Yes, our vacuum extractors, scrubbing machines and bathroom/kitchen cleaning processes require active electricity and running water at the property.",
      },
    ],
  },
  {
    id: "move-out-cleaning",
    slug: "move-out-cleaning",
    name: "Move-Out Cleaning",
    categoryId: "complete-home-cleaning",
    categoryName: "Complete Home Cleaning",
    shortDescription:
      "End-of-tenancy apartment cleaning designed to help tenants and landlords complete a smooth, respectful property handover.",
    fullDescription:
      "Leaving a rented flat in clean condition helps prevent handover disputes and prepares the property for the landlord's inspection. Once your belongings are packed out, we clean the kitchen grease, descale bathrooms, wipe empty wardrobes and scrub all floors and balconies.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "starting_at",
    samplePrice: 3199,
    priceApproved: true,
    unit: "1 BHK (₹3,899 for 2 BHK)",
    
    image: {
      src: "/images/move-in-clean.webp",
      alt: "Clean empty apartment interior with polished wooden floors ready for handover inspection",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Outgoing tenants preparing for landlord handover and security-deposit check",
      "Homeowners vacating a property prior to sale handover",
    ],
    includedScope: [
      "Kitchen degreasing (countertop, sink, tiles, exhaust and emptied cabinets)",
      "Full bathroom deep cleaning and descaling",
      "Dusting of fans, windows, tracks, switches and emptied wardrobes",
      "Complete floor and balcony scrubbing",
    ],
    exclusions: [
      "Wall repainting, nail-hole putty touchups or civil repairs",
      "Removal of unwanted furniture, trash bags or packing cartons left behind",
    ],
    relatedServices: [
      {
        serviceId: "sofa-deep-cleaning",
        relationshipType: "add-on",
        priority: 1,
        reason: "Clean landlord-owned sofas if required by your rental agreement.",
      },
      {
        serviceId: "mattress-deep-cleaning",
        relationshipType: "add-on",
        priority: 2,
        reason: "Refresh landlord-provided mattresses prior to checkout.",
      },
    ],
    faqs: [
      {
        question: "Can I book Move-Out Cleaning for my old flat and Move-In Cleaning for my new flat together?",
        answer:
          "Absolutely. Mention both localities and preferred dates in your enquiry so we can coordinate a seamless back-to-back schedule.",
      },
    ],
  },
  {
    id: "empty-flat-cleaning",
    slug: "empty-flat-cleaning",
    name: "Empty-Flat Cleaning",
    categoryId: "complete-home-cleaning",
    categoryName: "Complete Home Cleaning",
    shortDescription:
      "Intensive edge-to-edge deep cleaning for vacant unfurnished apartments—ideal after painting, renovation or a period of vacancy.",
    fullDescription:
      "When a flat has been locked for months or has just undergone painting and woodwork, fine plaster dust, paint splatters and cobwebs coat every corner, window track and cabinet shelf. Because there is no movable furniture in the way, our team can scrub 100% of the floor area and clean inside every cabinet and wardrobe.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "starting_at",
    samplePrice: 2999,
    priceApproved: true,
    unit: "1 BHK (₹3,699 for 2 BHK)",
    
    image: {
      src: "/images/complete-home.webp",
      alt: "Vacant modern apartment with spotless floors, clean walls and bright balcony windows",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Newly purchased or newly painted vacant apartments",
      "NRI or outstation homeowners opening up a locked Pune apartment",
    ],
    includedScope: [
      "Interior and exterior cleaning of all empty kitchen cabinets, lofts and bedroom wardrobes",
      "Careful removal of minor water-based paint drops from floors, switches and glass",
      "Full bathroom and kitchen deep cleaning",
      "Rotary floor scrubbing, window track vacuuming and balcony washing",
    ],
    exclusions: [
      "Heavy post-construction cement/epoxy haze removal without prior site inspection",
    ],
    relatedServices: [
      {
        serviceId: "floor-scrubbing",
        relationshipType: "add-on",
        priority: 1,
        reason: "Mechanized floor scrubbing to remove ground-in construction dust.",
      },
    ],
    faqs: [
      {
        question: "Why is Empty-Flat Cleaning priced differently from occupied home cleaning?",
        answer:
          "Empty flats allow complete inside-out cleaning of all wardrobes and cabinets without furniture shifting, though post-painting flats require extra detailing for paint splatters and fine sanding dust.",
      },
    ],
  },
  {
    id: "kitchen-and-bathroom-bundle",
    slug: "kitchen-and-bathroom-bundle",
    name: "Kitchen & Bathroom Bundles",
    categoryId: "complete-home-cleaning",
    categoryName: "Complete Home Cleaning",
    shortDescription:
      "Our most practical periodic hygiene bundle—combining full kitchen degreasing and all-bathroom deep cleaning in a single coordinated appointment.",
    fullDescription:
      "Most occupied homes don't need bedrooms turned upside down every few months—they need the wet and high-grease zones professionally restored. Our Kitchen & Bathroom Bundle brings a dedicated crew to deep clean your kitchen and all bathrooms in one scheduled visit.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "starting_at",
    samplePrice: 2099,
    priceApproved: true,
    unit: "1 Kitchen + 2 Bathrooms",
    
    image: {
      src: "/images/kitchen-cleaning.webp",
      alt: "Clean contemporary apartment kitchen and wet-zone surfaces",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Occupied family homes wanting a quarterly or festival hygiene refresh",
      "Working professionals who manage daily room sweeping but want expert kitchen & bathroom care",
    ],
    includedScope: [
      "Complete Kitchen Deep Cleaning (countertop, tiles, sink, exhaust fan, stove & cabinet exteriors)",
      "Complete Bathroom Deep Cleaning for all selected bathrooms (tiles, taps, shower glass, WC & basin)",
    ],
    exclusions: [
      "Bedroom/living room floor scrubbing or upholstery cleaning (available as optional add-ons)",
    ],
    relatedServices: [
      {
        serviceId: "kitchen-grease-removal",
        relationshipType: "add-on",
        priority: 1,
        reason: "Deep stovetop and backsplash grease breakdown alongside routine wipe-down.",
      },
      {
        serviceId: "sofa-deep-cleaning",
        relationshipType: "add-on",
        priority: 2,
        reason: "Include living room sofa cleaning during the same team visit.",
      },
    ],
    faqs: [
      {
        question: "How long does a Kitchen + 2 Bathrooms bundle take?",
        answer:
          "With a 2-to-3-person team working in parallel, a kitchen and two bathrooms typically take 3.5 to 4.5 hours.",
      },
    ],
  },
  {
    id: "sofa-and-mattress-bundle",
    slug: "sofa-and-mattress-bundle",
    name: "Combined Sofa & Mattress Cleaning",
    categoryId: "complete-home-cleaning",
    categoryName: "Complete Home Cleaning",
    shortDescription:
      "Coordinated upholstery extraction bundle covering your living room sofa set and bedroom mattresses in a single visit.",
    fullDescription:
      "Since sofa and mattress deep cleaning use the same industrial dry-vacuum and wet-extraction equipment, combining them in one visit saves setup time and refreshes all the soft furnishings your family rests on every day.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "starting_at",
    samplePrice: 1599,
    priceApproved: true,
    unit: "5-seater sofa + Queen/King bed",
    
    image: {
      src: "/images/sofa-cleaning.webp",
      alt: "Freshly cleaned fabric sofa and soft furnishings in a bright home",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Annual or semi-annual allergen and dust-mite reduction at home",
      "Tenants moving into a fully furnished apartment",
    ],
    includedScope: [
      "Complete Sofa Deep Cleaning (dry vacuum, shampooing, gentle brushing & wet extraction)",
      "Complete Mattress Deep Cleaning (both sides dry vacuumed, spot-treated & low-moisture extracted)",
    ],
    exclusions: [
      "Bed linen laundry or dry-clean-only silk fabrics",
    ],
    relatedServices: [
    ],
    faqs: [
      {
        question: "Can we stagger mattress drying if we have multiple bedrooms?",
        answer:
          "Yes—we clean bedroom mattresses first thing in the appointment so they have the maximum number of fan-drying hours before bedtime.",
      },
    ],
  },
  {
    id: "rental-turnover-cleaning",
    slug: "rental-turnover-cleaning",
    name: "Rental-Property Turnover Cleaning",
    categoryId: "complete-home-cleaning",
    categoryName: "Complete Home Cleaning",
    shortDescription:
      "Turnkey between-tenant deep cleaning and maintenance check for landlords, NRI property owners and property managers in Pune.",
    fullDescription:
      "A clean, fresh-smelling apartment rents faster and attracts more responsible tenants. Designed specifically for landlords and property managers around Viman Nagar and Kharadi, our Rental Turnover Cleaning resets the flat between tenancies and flags any minor plumbing, mesh or fixture issues that need attention.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "starting_at",
    samplePrice: 3399,
    priceApproved: true,
    unit: "full turnover reset",
    
    image: {
      src: "/images/move-in-clean.webp",
      alt: "Clean, sunlit rental apartment ready for new tenant viewing and handover",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Landlords and NRI property owners preparing a flat between tenants",
      "Property managers handling furnished or semi-furnished apartments",
    ],
    includedScope: [
      "Full flat deep cleaning (kitchen, bathrooms, floors, windows, balconies and wardrobes)",
      "Appliance interior/exterior wipe-down (fridge, microwave, washing machine drum gasket)",
      "Visual checklist note on any dripping taps, torn window meshes or fused bulbs noticed during cleaning",
    ],
    exclusions: [
      "Civil painting or carpentry repairs (referrals available upon request)",
    ],
    relatedServices: [
      {
        serviceId: "sofa-and-mattress-bundle",
        relationshipType: "add-on",
        priority: 1,
        reason: "Essential for furnished rentals so incoming tenants receive sanitized sofas and mattresses.",
      },
    ],
    faqs: [
      {
        question: "Can you share completion photos on WhatsApp if I live outside Pune?",
        answer:
          "Yes. For outstation landlords, we share clear room-by-room photos on WhatsApp before and after completion.",
      },
    ],
  },

  // ============================================================================
  // CATEGORY 8: COMMERCIAL CLEANING (7 Services)
  // ============================================================================
  {
    id: "office-and-coworking-cleaning",
    slug: "office-and-coworking-cleaning",
    name: "Office & Coworking-Space Cleaning",
    categoryId: "commercial-cleaning",
    categoryName: "Commercial Cleaning",
    shortDescription:
      "Scheduled weekend or after-hours deep cleaning for offices, IT studios and coworking spaces in Viman Nagar, Kharadi and Yerawada.",
    fullDescription:
      "A clean, dust-free workspace supports team focus and leaves a strong impression on visiting clients. We provide structured deep cleaning for workstations, conference rooms, glass partitions, office chairs, pantries and washrooms—scheduled on weekends or outside business hours.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "starting_at",
    samplePrice: 2499,
    priceApproved: true,
    unit: "up to 1,500 sq.ft.",
    
    image: {
      src: "/images/commercial-office.webp",
      alt: "Clean, airy modern coworking office with spotless desks, ergonomic chairs and glass partitions",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Small-to-medium offices, design studios and coworking centres (500 – 10,000+ sq. ft.)",
      "Offices scheduling monthly or quarterly deep cleaning alongside daily housekeeping",
    ],
    includedScope: [
      "Workstation desk, cable tray exterior and meeting table sanitization",
      "Floor scrubbing and/or office carpet vacuuming",
      "Interior glass partition and entrance door cleaning",
      "Office pantry and commercial washroom deep cleaning",
    ],
    exclusions: [
      "Unplugging or dismantling live server racks and sensitive IT hardware",
    ],
    relatedServices: [
      {
        serviceId: "office-chair-cleaning",
        relationshipType: "add-on",
        priority: 1,
        reason: "Deep clean fabric and mesh ergonomic task chairs across the office floor.",
      },
      {
        serviceId: "recurring-commercial-cleaning",
        relationshipType: "follow-up",
        priority: 3,
        reason: "Set up a predictable monthly or fortnightly deep-clean schedule.",
      },
    ],
    faqs: [
      {
        question: "Can you conduct an office cleaning on a Sunday?",
        answer:
          "Yes, commercial office deep cleaning is most commonly scheduled on Saturdays or Sundays so your team returns to a fresh workspace on Monday morning.",
      },
    ],
  },
  {
    id: "pg-and-hostel-cleaning",
    slug: "pg-and-hostel-cleaning",
    name: "PG & Hostel Cleaning",
    categoryId: "commercial-cleaning",
    categoryName: "Commercial Cleaning",
    shortDescription:
      "Room turnover, common-area floor scrubbing, washroom descaling, mattress care and water tank maintenance for PGs and student/working-professional hostels.",
    fullDescription:
      "Viman Nagar and Kharadi host hundreds of student and working-professional PGs and co-living spaces. High occupancy means bathrooms, common kitchens, mattresses and overhead water tanks need dependable periodic deep cleaning. We work with PG owners and operators on room turnovers and building-wide hygiene maintenance.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "starting_at",
    samplePrice: 2999,
    priceApproved: true,
    unit: "corridors, rooms & washrooms",
    
    image: {
      src: "/images/mattress-cleaning.webp",
      alt: "Clean, sanitized bedroom and mattress setup ready for residential occupancy",
      width: 900,
      height: 600,
    },
    idealFor: [
      "PG operators and co-living managers around Symbiosis / Viman Nagar and EON Kharadi",
      "Hostel buildings needing periodic bathroom, mattress and water tank maintenance",
    ],
    includedScope: [
      "Bathroom deep cleaning and hard-water descaling across shared/attached washrooms",
      "Room floor scrubbing, wardrobe wiping, fan dusting and window cleaning during room turnovers",
      "Common dining/kitchen and corridor floor cleaning",
    ],
    exclusions: [
      "Daily maid/cooking staff placement",
    ],
    relatedServices: [
      {
        serviceId: "overhead-water-tank-cleaning",
        relationshipType: "complementary",
        priority: 1,
        reason: "Keep hostel overhead water tanks and drinking water purifiers clean.",
      },
      {
        serviceId: "mattress-deep-cleaning",
        relationshipType: "add-on",
        priority: 2,
        reason: "Sanitize PG mattresses between resident checkouts.",
      },
    ],
    faqs: [
      {
        question: "Can we book batch cleaning for 5–10 bathrooms or mattresses at once?",
        answer:
          "Yes, we provide customized batch quotations for PGs and hostels when multiple rooms, bathrooms or mattresses are scheduled together.",
      },
    ],
  },
  {
    id: "restaurant-and-cafe-cleaning",
    slug: "restaurant-and-cafe-cleaning",
    name: "Restaurant & Café Cleaning",
    categoryId: "commercial-cleaning",
    categoryName: "Commercial Cleaning",
    shortDescription:
      "Deep cleaning of dining areas, upholstered booth seating, washrooms, glass fronts and kitchen prep surfaces for cafés and restaurants.",
    fullDescription:
      "In Viman Nagar's vibrant dining scene, spotless glass fronts, fresh-smelling guest washrooms, clean upholstered booths and degreased prep zones are essential. We schedule non-disruptive morning or late-evening deep cleaning tailored to food and beverage venues.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "starting_at",
    samplePrice: 3499,
    priceApproved: true,
    unit: "dining area & kitchen wash",
    
    image: {
      src: "/images/commercial-cafe.webp",
      alt: "Clean, inviting contemporary lounge and dining seating area",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Specialty cafés, bakeries, casual dining restaurants and cloud kitchens",
    ],
    includedScope: [
      "Dining floor scrubbing, glass facade cleaning and lighting/fan dusting",
      "Upholstered booth, sofa and dining chair extraction (when included in scope)",
      "Customer washroom deep descaling and sanitization",
      "Kitchen floor and tiled wall degreasing",
    ],
    exclusions: [
      "Inside-duct HVAC or chimney motor disassembly",
    ],
    relatedServices: [
      {
        serviceId: "floor-scrubbing",
        relationshipType: "complementary",
        priority: 1,
        reason: "Mechanized single-disc floor scrubbing for high-footfall dining floors.",
      },
    ],
    faqs: [
      {
        question: "Can you clean early in the morning before our café opens at 10 AM?",
        answer:
          "Yes, early-morning or post-closing slots can be arranged upon prior confirmation.",
      },
    ],
  },
  {
    id: "gym-and-studio-cleaning",
    slug: "gym-and-studio-cleaning",
    name: "Gym & Studio Cleaning",
    categoryId: "commercial-cleaning",
    categoryName: "Commercial Cleaning",
    shortDescription:
      "Hygienic floor scrubbing, mirror polishing, locker/shower room descaling and upholstery wiping for gyms, yoga and dance studios.",
    fullDescription:
      "Fitness centres, pilates studios and dance academies require sweat-free equipment upholstery, streak-free wall mirrors, sanitized rubber/wood flooring and clean shower/changing rooms. We deliver thorough periodic deep cleaning that keeps your members confident in your facility's hygiene.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "starting_at",
    samplePrice: 2799,
    priceApproved: true,
    unit: "workout floor & equipment wipe",
    
    image: {
      src: "/images/commercial-gym.webp",
      alt: "Bright, spotless commercial studio space with clean glass and flooring",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Boutique gyms, yoga/pilates studios, martial arts and dance studios",
      "Residential society clubhouse gyms",
    ],
    includedScope: [
      "Rubber mat, vinyl or wooden studio floor cleaning with surface-safe disinfectants",
      "Full-wall mirror and glass partition streak-free polishing",
      "Shower cubicle, locker exterior and washroom deep cleaning",
      "Wiping of bench pads, AC vents and high ledges",
    ],
    exclusions: [
      "Internal mechanical servicing or lubrication of motorized treadmills/cable machines",
    ],
    relatedServices: [
      {
        serviceId: "bathroom-deep-cleaning",
        relationshipType: "complementary",
        priority: 1,
        reason: "Keep member shower stalls and washrooms free of hard-water scale and odour.",
      },
    ],
    faqs: [
      {
        question: "Are your floor cleaners safe for interlocking rubber gym mats?",
        answer:
          "Yes, we use neutral, non-corrosive cleaners that sanitize rubber flooring without leaving a slippery residue or degrading the rubber.",
      },
    ],
  },
  {
    id: "clinic-and-commercial-cleaning",
    slug: "clinic-and-commercial-cleaning",
    name: "Clinic & Small Commercial-Property Cleaning",
    categoryId: "commercial-cleaning",
    categoryName: "Commercial Cleaning",
    shortDescription:
      "Meticulous surface, floor, waiting-area seating, glass and washroom deep cleaning for dental clinics, diagnostics, salons and retail boutiques.",
    fullDescription:
      "Patients and walk-in clients immediately notice the cleanliness of waiting room seating, reception desks, glass doors, floor corners and washrooms. We provide quiet, detail-focused deep cleaning for clinics, pharmacies, salons and boutique commercial properties.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "starting_at",
    samplePrice: 2199,
    priceApproved: true,
    unit: "sanitization & clinic floors",
    
    image: {
      src: "/images/commercial-clinic.webp",
      alt: "Spotless, calm modern clinic reception and waiting lounge with clean floors and seating",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Dental, skin, physiotherapy and general medical clinics",
      "Diagnostic centres, optical stores, salons and retail showrooms",
    ],
    includedScope: [
      "Reception, waiting lounge and consultation room floor scrubbing and surface wiping",
      "Waiting-area sofa and chair upholstery cleaning",
      "Glass storefront, partition and mirror cleaning",
      "Clinic washroom and sink deep sanitization",
    ],
    exclusions: [
      "Biohazard medical waste disposal or autoclave sterilization of surgical instruments",
    ],
    relatedServices: [
      {
        serviceId: "sofa-deep-cleaning",
        relationshipType: "add-on",
        priority: 1,
        reason: "Clean waiting-room sofas and patient chairs.",
      },
    ],
    faqs: [
      {
        question: "Can cleaning be scheduled during clinic weekly off-days?",
        answer:
          "Yes, we schedule around your clinic's closed hours or weekly off-day for zero patient disruption.",
      },
    ],
  },
  {
    id: "housing-society-maintenance",
    slug: "housing-society-maintenance",
    name: "Housing-Society Maintenance",
    categoryId: "commercial-cleaning",
    categoryName: "Commercial Cleaning",
    shortDescription:
      "Coordinated overhead/underground tank cleaning, parking pressure washing, clubhouse cleaning and water testing for co-operative housing societies.",
    fullDescription:
      "Managing vendor coordination for a residential society can be time-consuming for committee members. AquaShine offers a single, accountable point of contact for periodic society maintenance—combining water tank & sump cleaning, laboratory water testing, stilt parking pressure washing and clubhouse/gym deep cleaning.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct & Coordinated Partner Network",
    priceMode: "starting_at",
    samplePrice: 4999,
    priceApproved: true,
    unit: "common lobbies, stairs & water tanks",
    
    image: {
      src: "/images/housing-society.webp",
      alt: "Clean residential apartment society rooftop water tanks and maintained common infrastructure",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Co-operative housing societies (CHS) and apartment associations in Viman Nagar, Kharadi, Wadgaon Sheri and Dhanori",
      "Standalone apartment buildings (10 to 200+ flats)",
    ],
    includedScope: [
      "Site inspection with the society manager or committee representative",
      "Itemized quotation covering overhead tanks, underground sumps, parking bays, staircases or clubhouse",
      "Scheduled wing-by-wing execution with minimal water supply interruption",
    ],
    exclusions: [
      "Daily sweeping/garbage collection staff deployment unless part of a custom facility scope",
    ],
    relatedServices: [
      {
        serviceId: "overhead-water-tank-cleaning",
        relationshipType: "complementary",
        priority: 1,
        reason: "Schedule bi-annual society overhead and sump tank cleaning.",
      },
    ],
    faqs: [
      {
        question: "Do you provide proper GST / formal quotations for society committee approval?",
        answer:
          "Yes, we provide clear, itemized written quotations detailing tank capacities, areas and inclusions so the managing committee can review and approve them easily.",
      },
    ],
  },
  {
    id: "recurring-commercial-cleaning",
    slug: "recurring-commercial-cleaning",
    name: "Recurring Commercial Cleaning Quotations",
    categoryId: "commercial-cleaning",
    categoryName: "Commercial Cleaning",
    shortDescription:
      "Fortnightly, monthly or quarterly scheduled deep-cleaning plans for offices, clinics, cafés, PGs and housing societies.",
    fullDescription:
      "Instead of searching for a vendor every time floors dull, washrooms scale up or tanks need cleaning, set up a recurring maintenance calendar with AquaShine. We assess your premises, agree on a realistic checklist and frequency, and deliver consistent care at predictable rates.",
    fulfillmentType: "direct",
    fulfillmentLabel: "Direct by AquaShine",
    priceMode: "starting_at",
    samplePrice: 7999,
    priceApproved: true,
    unit: "monthly scheduled maintenance",
    
    image: {
      src: "/images/commercial-office.webp",
      alt: "Well-maintained commercial office interior on a scheduled cleaning plan",
      width: 900,
      height: 600,
    },
    idealFor: [
      "Offices, clinics, cafés and gyms wanting consistent hygiene year-round",
      "Landlords and PG operators managing multiple rental units",
    ],
    includedScope: [
      "Custom checklist combining floor scrubbing, washroom descaling, upholstery care, glass cleaning and water care",
      "Priority slot booking on your preferred day of the month",
      "Transparent per-visit or periodic billing after scope confirmation",
    ],
    exclusions: [
      "Unverified lock-in contracts—plans are flexible and transparent",
    ],
    relatedServices: [
      {
        serviceId: "office-and-coworking-cleaning",
        relationshipType: "complementary",
        priority: 1,
        reason: "Start with a one-time office deep clean before moving to a recurring schedule.",
      },
      {
        serviceId: "housing-society-maintenance",
        relationshipType: "complementary",
        priority: 2,
        reason: "Ideal for annual society tank and common-area calendars.",
      },
    ],
    faqs: [
      {
        question: "Can we book a single visit first before deciding on a recurring plan?",
        answer:
          "Yes—in fact, we encourage booking a single deep-cleaning visit first so you can experience our work quality and fine-tune the scope.",
      },
    ],
  },
];

