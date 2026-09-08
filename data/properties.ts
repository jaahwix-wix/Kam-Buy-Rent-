import { Property } from '@/types/property';

export const HAMILTON_MAPS_LINK = "https://maps.app.goo.gl/3Cr142AXBBbFowA6A";

export const EXCHANGE_RATE_USD_TO_NLE = 22.5; // Current approx market conversion

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'kbr-001',
    title: 'Kam Buy & Rent Signature Oceanview Villa',
    tagline: 'Luxury 6-Bedroom Beachfront Compound with Infinity Pool & Solar Hybrid Power',
    type: 'villa',
    status: 'sale',
    priceUSD: 360000,
    negotiable: true,
    location: {
      area: 'Hamilton Peninsula',
      subDistrict: 'Hamilton Beach Road',
      city: 'Freetown',
      country: 'Sierra Leone',
      googleMapsUrl: HAMILTON_MAPS_LINK,
      address: 'Kam Buy & Rent Estate, Hamilton Peninsula, Off New Peninsular Highway, Freetown',
      coordinates: {
        lat: 8.3694,
        lng: -13.2562
      }
    },
    specs: {
      bedrooms: 6,
      bathrooms: 7,
      townLots: 3.5,
      sqm: 680,
      parkingSpaces: 6,
      furnishing: 'Furnished'
    },
    utilities: {
      power: '24/7 EDSA Grid connection + 15kVA Victron Solar Hybrid System & Backup Gen',
      water: 'Guma Valley Water mains + 20,000L subterranean reservoir with filtration plant',
      security: '10ft Perimeter Wall, Galvanized Razor Wire, Biometric Gates & 8-Cam CCTV',
      roadAccess: 'Tarmac paved private driveway direct from Peninsular Road'
    },
    titleDeed: {
      status: 'Freehold Conveyance Deed registered at Registrar General Office (Vol 842)',
      cadastralSurvey: true,
      diasporaVerified: true
    },
    amenities: [
      'Private Swimming Pool',
      'Panoramic Atlantic Ocean Sunset Views',
      'Solar Hybrid Energy System',
      'Staff Quarters (Boys Quarters)',
      'Modern Granite Top Island Kitchen',
      'Air Conditioning in All Rooms',
      'High Speed Starlink Internet Ready',
      'Expansive Rooftop Terrace'
    ],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A benchmark of architectural excellence on the picturesque Hamilton Peninsula. This custom-built contemporary masterpiece blends modern Caribbean-coastal elegance with robust West African resilience. Designed with diaspora buyers in mind, the estate features autonomous 24/7 solar hybrid energy, continuous pressurized filtered Guma water, and panoramic views of the Atlantic surf. Located 3 minutes from Hamilton Beach and 8 minutes to world-renowned River Number 2 Beach.',
    featuresList: [
      'Direct beach corridor access with soothing ocean breeze',
      'Master suite with wraparound balcony, walk-in closet, and jacuzzi tub',
      'Chef-grade kitchen with integrated gas/electric appliances and wine cooler',
      'Independent 2-bedroom staff quarters with self-contained facilities',
      'Land title verified by Ministry of Lands and registered with Sierra Leone Registrar General'
    ],
    featured: true,
    diasporaFavorite: true,
    seaView: true,
    agent: {
      name: 'Kam Buy & Rent Property Advisory',
      phone: '+232 78 889 450',
      whatsapp: '23278889450',
      email: 'info@kambuyrent.sl',
      role: 'Head Broker - Peninsula Specialist'
    }
  },
  {
    id: 'kbr-002',
    title: 'Executive 3-Bedroom Serviced Apartment with Ocean Breeze',
    tagline: 'Turnkey Furnished Modern Flat with EDSA & Solar Inverter in Hamilton',
    type: 'apartment',
    status: 'rent',
    priceUSD: 4200,
    rentPeriod: 'year',
    negotiable: false,
    location: {
      area: 'Hamilton Peninsula',
      subDistrict: 'Off Peninsula Road',
      city: 'Freetown',
      country: 'Sierra Leone',
      googleMapsUrl: HAMILTON_MAPS_LINK,
      address: 'Peninsula Crest Heights, Hamilton Village, Freetown',
      coordinates: {
        lat: 8.3680,
        lng: -13.2550
      }
    },
    specs: {
      bedrooms: 3,
      bathrooms: 3.5,
      townLots: 1,
      sqm: 195,
      parkingSpaces: 2,
      furnishing: 'Furnished'
    },
    utilities: {
      power: 'Dual EDSA meter with dedicated 5kVA Solar Inverter & Battery Storage',
      water: 'Guma Valley Water connection + 2x 3,000L elevated backup tanks',
      security: '24/7 On-site Security Guards, Automated Gate & Intercom',
      roadAccess: 'Smooth graded road 200m from main Hamilton Highway'
    },
    titleDeed: {
      status: 'Commercial Property Leasehold - Certified Landlord Documentation',
      cadastralSurvey: true,
      diasporaVerified: true
    },
    amenities: [
      'Fully Air-Conditioned',
      'Solar Backup Power System',
      'High Quality European Standard Furnishing',
      'Balcony with Coastal & Mountain Views',
      'Modern Gas Cooker & Frost-Free Fridge',
      'Washing Machine & Laundry Area',
      'Private 1-Car Garage + Guest Bay'
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Immaculate newly built 3-bedroom, 3-bathroom apartment situated in peaceful Hamilton on the Freetown Peninsula. Ideal for diaspora returnees, expatriates, NGO directors, or corporate professionals seeking serene coastal living without utility headaches. Features two en-suite master bedrooms, open concept living and dining, and uninterrupted electricity backed by solar inverters.',
    featuresList: [
      'Turnkey ready for immediate move-in',
      'Spacious living room opening to a breezy sunset veranda',
      'Dedicated remote workspace with fast fiber broadband connectivity',
      'Short 10-minute commute to Lumley Beach dining strip'
    ],
    featured: true,
    diasporaFavorite: true,
    seaView: true,
    agent: {
      name: 'Oladipo Lake (Kam Real Estate Team)',
      phone: '+232 76 542 119',
      whatsapp: '23276542119',
      email: 'rentals@kambuyrent.sl',
      role: 'Senior Rental Consultant'
    }
  },
  {
    id: 'kbr-003',
    title: 'Prime Hamilton Beachfront Land - 3 Town Lots',
    tagline: 'Fenced with Solid Retaining Wall & Cleared Topography Ready to Build',
    type: 'land',
    status: 'sale',
    priceUSD: 174000,
    negotiable: true,
    location: {
      area: 'Hamilton Peninsula',
      subDistrict: 'Beachfront Shoreline',
      city: 'Freetown',
      country: 'Sierra Leone',
      googleMapsUrl: HAMILTON_MAPS_LINK,
      address: 'Hamilton Ocean Front, Western Area Peninsula, Freetown',
      coordinates: {
        lat: 8.3712,
        lng: -13.2595
      }
    },
    specs: {
      townLots: 3,
      sqm: 1215, // ~405 sqm per town lot
      furnishing: 'N/A'
    },
    utilities: {
      power: 'EDSA Power transmission line available at boundary edge',
      water: 'High ground water table ideal for borehole + Guma connection nearby',
      security: 'Fully perimeter fenced with heavy duty reinforced retaining wall',
      roadAccess: 'Direct access from newly resurfaced coastal beach avenue'
    },
    titleDeed: {
      status: 'Clean Conveyance Deed with LS Cadastral Survey Plan (Verified at Registrar General)',
      cadastralSurvey: true,
      diasporaVerified: true
    },
    amenities: [
      'Direct Beachfront Access',
      'Reinforced Sea Retaining Wall Already Erected',
      'Flat Elevated Terrain - Zero Landfill Required',
      'Full Cadastral Survey with Signed Beacon Coordinates',
      'Zoned for Luxury Villa, Eco-Lodge or Boutique Beach Resort'
    ],
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Rare opportunity to acquire 3 town lots (~1,215 sqm) of pristine beachfront land directly along the golden sands of Hamilton. The parcel has already been reinforced with an engineered sea retaining wall and secure boundary fencing, saving the prospective buyer substantial initial construction costs. Complete with signed Sierra Leone cadastral survey beacons and conveyance papers verified at the Registrar Generals office.',
    featuresList: [
      'Unobstructed 180-degree Atlantic Ocean panorama',
      'Immediate access to electricity line and road access',
      'Ideal for diaspora looking to build a private holiday home or boutique Airbnb estate',
      'Rapidly appreciating corridor between Freetown and River No. 2'
    ],
    featured: true,
    diasporaFavorite: true,
    seaView: true,
    agent: {
      name: 'Jen Genet (Kam Land Acquisitions)',
      phone: '+232 79 334 890',
      whatsapp: '23279334890',
      email: 'land@kambuyrent.sl',
      role: 'Land Survey & Conveyance Specialist'
    }
  },
  {
    id: 'kbr-004',
    title: 'Brand New 4-Bedroom Duplex with CCTV & Guard House',
    tagline: 'Contemporary Family Residence in Gated Hamilton Compound',
    type: 'duplex',
    status: 'sale',
    priceUSD: 185000,
    negotiable: true,
    location: {
      area: 'Hamilton Peninsula',
      subDistrict: 'Hamilton Village Valley',
      city: 'Freetown',
      country: 'Sierra Leone',
      googleMapsUrl: HAMILTON_MAPS_LINK,
      address: 'Plot 14, Hamilton Valley View, Western Area Rural, Freetown',
      coordinates: {
        lat: 8.3650,
        lng: -13.2510
      }
    },
    specs: {
      bedrooms: 4,
      bathrooms: 4.5,
      townLots: 2,
      sqm: 340,
      parkingSpaces: 4,
      furnishing: 'Semi-Furnished'
    },
    utilities: {
      power: 'Prepaid EDSA meter + Inverter-ready wiring & transfer switch',
      water: 'Guma Valley line connected + 10,000L poly tanks with pressure pump',
      security: 'Concrete wall with anti-climb spikes, smart CCTV & manned gatehouse',
      roadAccess: 'Gravel road 150m off main Peninsular highway'
    },
    titleDeed: {
      status: 'Conveyance Deed Registered & Stamped at OARG (Office of Administrator and Registrar General)',
      cadastralSurvey: true,
      diasporaVerified: true
    },
    amenities: [
      '4 All En-Suite Bedrooms',
      'Spacious Balcony overlooking lush green hills & ocean glimpse',
      'Granite Kitchen with Fitted Cabinets',
      'Generous Paved Compound with Carport',
      'Self-contained Security/Maid Quarters',
      'Separate Dining & Family Lounge'
    ],
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Modern two-storey duplex offering generous proportions, high ceilings, and quality imported finishes. Located in a tranquil residential enclave of Hamilton, this property is perfect for a family seeking quiet security without sacrificing proximity to beaches and central amenities. The compound is fully paved with interlocked stones and accommodates up to 4 large 4x4 SUVs.',
    featuresList: [
      'Master suite with private dressing room and balcony',
      'Sturdy concrete construction built to endure coastal seasons',
      'Pre-installed air conditioning piping in all main rooms',
      'Ready for immediate title deed handover and occupancy'
    ],
    featured: false,
    diasporaFavorite: true,
    seaView: false,
    agent: {
      name: 'Kam Buy & Rent Property Advisory',
      phone: '+232 78 889 450',
      whatsapp: '23278889450',
      email: 'sales@kambuyrent.sl',
      role: 'Peninsula Property Agent'
    }
  },
  {
    id: 'kbr-005',
    title: 'Scenic Sussex & River No. 2 Hillside Villa',
    tagline: '5-Bedroom Tropical Haven Overlooking the Famous White Sands',
    type: 'house',
    status: 'sale',
    priceUSD: 245000,
    negotiable: true,
    location: {
      area: 'Sussex & River No. 2',
      subDistrict: 'Sussex Hill View',
      city: 'Freetown',
      country: 'Sierra Leone',
      googleMapsUrl: 'https://maps.app.goo.gl/3Cr142AXBBbFowA6A',
      address: 'Sussex Coastal Ridge, 4 mins from River No. 2 Beach, Freetown',
      coordinates: {
        lat: 8.3410,
        lng: -13.2380
      }
    },
    specs: {
      bedrooms: 5,
      bathrooms: 5,
      townLots: 3,
      sqm: 480,
      parkingSpaces: 5,
      furnishing: 'Furnished'
    },
    utilities: {
      power: 'Full Off-Grid Solar 10kVA with Lithium Iron Phosphate batteries + EDSA',
      water: 'Private fresh mountain spring borehole with stainless steel filtration',
      security: 'Perimeter Wall with Security Guard Post & Solar Floodlights',
      roadAccess: 'Engineered scenic hillside road'
    },
    titleDeed: {
      status: 'Registered Conveyance with Cadastral Chart (Freehold Title)',
      cadastralSurvey: true,
      diasporaVerified: true
    },
    amenities: [
      'Spectacular Ocean & Mountain Horizon Views',
      'Expansive Teak Wood Sun Deck',
      'Lush Landscaped Tropical Garden with Fruit Trees',
      'Open Plan Living with Vaulted Ceilings',
      'Solar Powered Hot Water Heaters',
      'High Speed Satellite WiFi'
    ],
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Nestled on the ridge above Sussex and River Number 2, this 5-bedroom tropical villa provides peerless views of Sierra Leones most famous white sand estuary. Built with eco-conscious materials, high-volume cross-ventilation, and high-efficiency solar storage, this home offers peaceful sanctuary with zero reliance on erratic power or water supply.',
    featuresList: [
      '5 minutes from River Number 2 community beach and Sussex seafood restaurants',
      'Extensive outdoor entertaining deck for sunset dinners',
      'Dedicated backup borehole with sweet mountain fresh drinking water',
      'Excellent track record as a high-earning diaspora holiday rental'
    ],
    featured: true,
    diasporaFavorite: true,
    seaView: true,
    agent: {
      name: 'Oladipo Lake (Kam Real Estate Team)',
      phone: '+232 76 542 119',
      whatsapp: '23276542119',
      email: 'info@kambuyrent.sl',
      role: 'Luxury Peninsula Portfolio'
    }
  },
  {
    id: 'kbr-006',
    title: 'Modern 2-Bedroom Coastal Flat in Mambo Peninsula',
    tagline: 'Affordable Serene Living off Main Peninsular Road',
    type: 'apartment',
    status: 'rent',
    priceUSD: 2800,
    rentPeriod: 'year',
    negotiable: false,
    location: {
      area: 'Hamilton Peninsula',
      subDistrict: 'Mambo Village',
      city: 'Freetown',
      country: 'Sierra Leone',
      googleMapsUrl: HAMILTON_MAPS_LINK,
      address: 'Mambo Junction, Off Peninsula Highway, Freetown',
      coordinates: {
        lat: 8.3820,
        lng: -13.2620
      }
    },
    specs: {
      bedrooms: 2,
      bathrooms: 2,
      townLots: 1,
      sqm: 120,
      parkingSpaces: 2,
      furnishing: 'Semi-Furnished'
    },
    utilities: {
      power: 'EDSA Grid + Inverter ready switchboard',
      water: 'Guma Valley Water + 5,000L backup tank with automatic pump',
      security: 'Gated compound with night security guard',
      roadAccess: 'Paved direct from highway'
    },
    titleDeed: {
      status: 'Verified Leasehold Contract with Kam Buy & Rent Property oversight',
      cadastralSurvey: true,
      diasporaVerified: true
    },
    amenities: [
      'Modern Ceramic Tile Flooring',
      'Spacious Open Living & Dining Room',
      'Fitted Kitchen with Granite Tops',
      'Balcony with Coastal Breeze',
      'Water Heaters Installed',
      'Secured Parking Bay'
    ],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502005229762-ae1b460020e2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Clean, airy, and conveniently situated 2-bedroom flat in Mambo, just north of Hamilton village on the Freetown Peninsula. Features a master en-suite bedroom, second guest bedroom, open dining room, and private veranda. Highly attractive for individuals or young families working between the peninsula beaches and central Freetown.',
    featuresList: [
      'Low annual maintenance overhead',
      'Quick transit route into Goderich and Lumley',
      'Clean water supply with reliable elevated storage tanks',
      'Safe gated environment with friendly neighborhood ambiance'
    ],
    featured: false,
    diasporaFavorite: false,
    seaView: false,
    agent: {
      name: 'Kam Buy & Rent Property Advisory',
      phone: '+232 78 889 450',
      whatsapp: '23278889450',
      email: 'rentals@kambuyrent.sl',
      role: 'Leasing Specialist'
    }
  },
  {
    id: 'kbr-007',
    title: 'Commercial Development Site - 2 Town Lots on Highway',
    tagline: 'High-Visibility Main Peninsular Road Frontage in Hamilton',
    type: 'commercial',
    status: 'sale',
    priceUSD: 60000,
    negotiable: true,
    location: {
      area: 'Hamilton Peninsula',
      subDistrict: 'Main Peninsular Highway',
      city: 'Freetown',
      country: 'Sierra Leone',
      googleMapsUrl: HAMILTON_MAPS_LINK,
      address: 'Hamilton Main Peninsular Highway, Western Area Rural, Freetown',
      coordinates: {
        lat: 8.3670,
        lng: -13.2530
      }
    },
    specs: {
      townLots: 2,
      sqm: 810,
      furnishing: 'N/A'
    },
    utilities: {
      power: 'High tension 3-phase EDSA power line at boundary',
      water: 'Guma Valley main supply pipeline running directly in front',
      security: 'Substantial foundation retaining wall started',
      roadAccess: 'Direct frontage onto asphalt Peninsular Highway'
    },
    titleDeed: {
      status: 'Conveyance Deed & Cadastral Survey Plan Registered',
      cadastralSurvey: true,
      diasporaVerified: true
    },
    amenities: [
      'Direct Highway Frontage with 80+ Feet Road Exposure',
      'Existing Reinforced Concrete Slab & Unfinished Ground Structure',
      'Zoned for Commercial Plaza, Supermarket, Pharmacy or Mixed Use',
      'High Traffic Tourist & Commuter Route',
      'Clear Legal Title with Zero Ownership Disputes'
    ],
    images: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A strategic commercial parcel comprising 2 town lots directly along the primary Peninsular Highway in Hamilton. Boasting extensive road frontage, this site is primed for a retail complex, medical clinic, modern supermarket, hospitality center, or apartment block. Features an existing heavy-duty concrete foundation that can be expanded or incorporated into new designs.',
    featuresList: [
      'Exceptional vehicular and commuter visibility',
      'Clean paper trail registered at Registrar General office',
      'Priced competitively with room for negotiation',
      'Rapidly growing local population on the Hamilton corridor'
    ],
    featured: false,
    diasporaFavorite: true,
    seaView: false,
    agent: {
      name: 'Jen Genet (Kam Land Acquisitions)',
      phone: '+232 79 334 890',
      whatsapp: '23279334890',
      email: 'commercial@kambuyrent.sl',
      role: 'Commercial Property Advisor'
    }
  },
  {
    id: 'kbr-008',
    title: 'Lakka Beach Road 4-Bedroom Gated Residence',
    tagline: 'Minutes from Lakka Beach with Landscaped Garden & Solar Backup',
    type: 'house',
    status: 'sale',
    priceUSD: 165000,
    negotiable: true,
    location: {
      area: 'Lakka & Ogoo Farm',
      subDistrict: 'Lakka Beach Corridor',
      city: 'Freetown',
      country: 'Sierra Leone',
      googleMapsUrl: HAMILTON_MAPS_LINK,
      address: 'Lakka Village Road, Western Area Rural, Freetown',
      coordinates: {
        lat: 8.3910,
        lng: -13.2680
      }
    },
    specs: {
      bedrooms: 4,
      bathrooms: 4,
      townLots: 2.2,
      sqm: 320,
      parkingSpaces: 4,
      furnishing: 'Semi-Furnished'
    },
    utilities: {
      power: 'EDSA Grid connected + 5kVA Solar Hybrid Backup with Lithium Battery',
      water: 'Guma Valley Water + Deep Well with submerged electric pump',
      security: '9ft Wall, Anti-Climb Razor Wire, Guard Post and Electric Gate',
      roadAccess: 'Paved road 400m from Lakka junction'
    },
    titleDeed: {
      status: 'Freehold Registered Conveyance with Ministry of Lands Verification',
      cadastralSurvey: true,
      diasporaVerified: true
    },
    amenities: [
      'Large Master Bedroom with Walk-in Closet & Balcony',
      'Fitted Hardwood Kitchen Cabinets',
      'Solar Water Heating throughout',
      'Well-manicured Flower Garden & Patio',
      'Separate Security Gatehouse with Bathroom',
      'Short 4-minute walk to Lakka Beach'
    ],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An enchanting 4-bedroom sanctuary located in the vibrant coastal enclave of Lakka, just north of Hamilton. Built with superior craftsmanship, the home features cool ceramic tiling, extensive natural lighting, and a serene garden backdrop. Perfect for returnees seeking quiet coastal proximity with quick transit to Lumley and Goderich.',
    featuresList: [
      'Close to renowned Lakka beach seafood spots and cultural centers',
      'Dual water system guaranteeing uninterrupted supply',
      'Solar system runs lights, fans, fridge, and TVs seamlessly during outages',
      'Solid steel security doors and reinforced window bars'
    ],
    featured: false,
    diasporaFavorite: true,
    seaView: false,
    agent: {
      name: 'Oladipo Lake (Kam Real Estate Team)',
      phone: '+232 76 542 119',
      whatsapp: '23276542119',
      email: 'sales@kambuyrent.sl',
      role: 'Residential Sales Agent'
    }
  },
  {
    id: 'kbr-009',
    title: 'Regent & Hill Station Diplomatic 5-Bedroom Estate',
    tagline: 'Grand Mountain View Residence with Staff Quarters & Generator House',
    type: 'house',
    status: 'sale',
    priceUSD: 280000,
    negotiable: true,
    location: {
      area: 'Regent & Hill Station',
      subDistrict: 'Regent Road Heights',
      city: 'Freetown',
      country: 'Sierra Leone',
      googleMapsUrl: HAMILTON_MAPS_LINK,
      address: 'Upper Regent Road, Near Hill Station, Freetown',
      coordinates: {
        lat: 8.4410,
        lng: -13.2120
      }
    },
    specs: {
      bedrooms: 5,
      bathrooms: 6,
      townLots: 3.8,
      sqm: 550,
      parkingSpaces: 6,
      furnishing: 'Unfurnished'
    },
    utilities: {
      power: '3-Phase EDSA Grid + 25kVA Perkins Soundproof Diesel Generator',
      water: 'High pressure Guma connection + 15,000L underground concrete cistern',
      security: '12ft Stone Wall, Razor Wire, Guard Post & Automatic Remote Gate',
      roadAccess: 'Tarred direct frontage off Regent Main Road'
    },
    titleDeed: {
      status: 'Registered Conveyance Freehold (Title Clear with Zero Encumbrance)',
      cadastralSurvey: true,
      diasporaVerified: true
    },
    amenities: [
      'Sweeping Mountain & Valley Horizons with Cool Micro-climate',
      'Grand Double-Volume Foyer with Marble Spiral Staircase',
      'Two Massive Living Lounges on Separate Floors',
      'Dedicated Home Office / Library Suite',
      'Separate 2-Bedroom Caretaker / Staff Bungalow',
      'Expansive Courtyard for 6+ Vehicles'
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An executive estate commanding high ground in prestigious Regent, enjoying the famous cool mountain air of Freetown. This property is engineered to diplomatic and executive standards, with vast entertainment halls, high security barriers, and independent utility systems. Ideal for international executives, diaspora families, or embassy leasing.',
    featuresList: [
      'Cool mountain climate typically 4-5 degrees cooler than central Freetown',
      'Only 7 minutes to Hill Station and American Embassy / IMATT corridor',
      'Solid granite masonry retaining structure',
      'Spacious master retreat with private sun deck'
    ],
    featured: true,
    diasporaFavorite: true,
    seaView: false,
    agent: {
      name: 'Kam Buy & Rent Property Advisory',
      phone: '+232 78 889 450',
      whatsapp: '23278889450',
      email: 'regent@kambuyrent.sl',
      role: 'Executive Property Specialist'
    }
  },
  {
    id: 'kbr-010',
    title: 'Tokeh Coastal Beachfront 4 Town Lots',
    tagline: 'White Sand Paradise Parcel next to World-Class Resorts',
    type: 'land',
    status: 'sale',
    priceUSD: 140000,
    negotiable: true,
    location: {
      area: 'Tokeh Beach',
      subDistrict: 'Tokeh Resort Strip',
      city: 'Freetown',
      country: 'Sierra Leone',
      googleMapsUrl: HAMILTON_MAPS_LINK,
      address: 'Tokeh Beachfront Lane, Western Area Peninsula, Freetown',
      coordinates: {
        lat: 8.3120,
        lng: -13.2080
      }
    },
    specs: {
      townLots: 4,
      sqm: 1620,
      furnishing: 'N/A'
    },
    utilities: {
      power: 'Peninsular electric grid expansion along access route',
      water: 'Pristine subterranean freshwater well aquifer',
      security: 'Surveyed corner concrete beacons in place',
      roadAccess: 'Direct access path from coastal bypass road'
    },
    titleDeed: {
      status: 'Registered Land Certificate with Cadastral Chart (Valid conveyance)',
      cadastralSurvey: true,
      diasporaVerified: true
    },
    amenities: [
      'Pristine White Powder Sand Beach Frontage',
      'Gentle Sea Waves and Clear Turquoise Waters',
      'Surrounded by Palm Trees and Coastal Flora',
      'Zero Encroachments - Fully Signed Tribal & Ministry Clearance',
      'Highest Tourism & Holiday Home Rental Potential in West Africa'
    ],
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An exceptional 4-town-lot beachfront parcel on Tokeh Beach, acclaimed as one of the finest natural beaches on the Atlantic coast. With pure white sand and calm ocean waters, this land offers unmatched potential for an eco-luxury beach villa, boutique hotel, or wellness retreat. Completely verified through traditional community council and formal cadastral survey.',
    featuresList: [
      'Prime position on the expanding tourism corridor of Sierra Leone',
      '15 minutes drive from Hamilton via smooth Peninsular Highway',
      'Ideal legacy asset with tremendous capital appreciation prospects',
      'Direct beach frontage with unobstructed Atlantic horizon'
    ],
    featured: false,
    diasporaFavorite: true,
    seaView: true,
    agent: {
      name: 'Jen Genet (Kam Land Acquisitions)',
      phone: '+232 79 334 890',
      whatsapp: '23279334890',
      email: 'land@kambuyrent.sl',
      role: 'Land Specialist'
    }
  }
];

export const NEIGHBORHOODS = [
  {
    id: 'hamilton',
    name: 'Hamilton Peninsula',
    description: 'The premier coastal haven of Freetown with scenic beaches, peaceful villages, and rapid luxury development. Home of Kam Buy & Rent Property.',
    highlight: 'Coastal Luxury & Peace',
    avgPricePlot: '$40,000 - $60,000 / lot',
    beachDistance: '0 - 5 mins',
    freetownCBD: '30 mins via Peninsular Road',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sussex',
    name: 'Sussex & River No. 2',
    description: 'Famed globally for crystal clear rivers meeting pure white sand beaches, seafood beach bars, and hillside tropical villas.',
    highlight: 'Pristine Beaches & Eco-Living',
    avgPricePlot: '$45,000 - $70,000 / lot',
    beachDistance: 'Immediate walking distance',
    freetownCBD: '40 mins',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'lakka',
    name: 'Lakka & Ogoo Farm',
    description: 'A vibrant peninsula town nestled between Goderich and Hamilton. Excellent mix of beach culture, commercial amenities, and family compounds.',
    highlight: 'Accessible Coastal Living',
    avgPricePlot: '$35,000 - $55,000 / lot',
    beachDistance: '2 - 7 mins',
    freetownCBD: '25 mins',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'regent',
    name: 'Regent & Hill Station',
    description: 'Mountain ridge living with cool year-round temperatures, lush rainforest views, and proximity to diplomatic residences and embassies.',
    highlight: 'Cool Climate & Executive Homes',
    avgPricePlot: '$50,000 - $90,000 / lot',
    beachDistance: '20 mins',
    freetownCBD: '15 mins',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tokeh',
    name: 'Tokeh Beach',
    description: 'Exclusive resort-style coastal enclave boasting vast stretches of white sand, luxury beach lodges, and premier vacation investments.',
    highlight: 'Resort Strip & High Appreciation',
    avgPricePlot: '$35,000 - $60,000 / lot',
    beachDistance: '0 - 3 mins',
    freetownCBD: '45 mins',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'lumley',
    name: 'Lumley & Aberdeen',
    description: 'The energetic heart of Freetown coastal nightlife, beach hotels, restaurants, and upscale serviced apartments.',
    highlight: 'Dining, Nightlife & Business Hub',
    avgPricePlot: '$80,000 - $150,000+ / lot',
    beachDistance: '0 - 5 mins',
    freetownCBD: '15 mins',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
  }
];

export const TRUST_PILLARS = [
  {
    title: 'Verified Title Deeds (Conveyance & OARG)',
    description: 'Every property and land parcel listed is vetted against the Ministry of Lands cadastral survey and the Registrar General’s office to prevent dual-sale risks.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Diaspora Video Inspection Service',
    description: 'Living in the UK, US, or Europe? We conduct scheduled live HD WhatsApp video walkthroughs, boundary GPS verifications, and neighborhood flyovers.',
    icon: 'Video'
  },
  {
    title: 'Autonomous Power & Water Auditing',
    description: 'We audit EDSA electricity grid stability, solar inverter backup systems, and Guma Valley water connections so you move in with complete peace of mind.',
    icon: 'SunMedium'
  },
  {
    title: 'Hamilton Peninsula Local Office',
    description: 'Physically established at Hamilton Peninsula, Freetown with deep roots across local village authorities, surveyors, and legal conveyancers.',
    icon: 'MapPin'
  }
];
