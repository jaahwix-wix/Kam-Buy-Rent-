export type PropertyType = 'villa' | 'apartment' | 'house' | 'duplex' | 'land' | 'commercial';
export type ListingStatus = 'sale' | 'rent';
export type Currency = 'USD' | 'NLE';

export interface Property {
  id: string;
  title: string;
  tagline: string;
  type: PropertyType;
  status: ListingStatus;
  priceUSD: number;
  rentPeriod?: 'year' | 'month';
  negotiable?: boolean;
  location: {
    area: string;
    subDistrict: string;
    city: string;
    country: string;
    googleMapsUrl: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  specs: {
    bedrooms?: number;
    bathrooms?: number;
    townLots?: number; // 1 Town Lot = ~4356 sq ft (~405 sq m)
    sqm?: number;
    parkingSpaces?: number;
    furnishing: 'Furnished' | 'Semi-Furnished' | 'Unfurnished' | 'N/A';
  };
  utilities: {
    power: string; // e.g. 'EDSA Grid + 5kVA Solar Hybrid Backup'
    water: string; // e.g. 'Guma Valley Water + 3x 5,000L Overhead Tanks'
    security: string; // e.g. 'Perimeter Wall with Razor Wire + CCTV & Guard Post'
    roadAccess: string; // e.g. 'Paved Access off Main Peninsular Highway'
  };
  titleDeed: {
    status: string; // e.g. 'Conveyance Deed Registered at Registrar General Office'
    cadastralSurvey: boolean;
    diasporaVerified: boolean;
  };
  amenities: string[];
  images: string[];
  description: string;
  featuresList: string[];
  featured?: boolean;
  diasporaFavorite?: boolean;
  seaView?: boolean;
  agent: {
    name: string;
    phone: string;
    whatsapp: string;
    email: string;
    role: string;
  };
}

export interface FilterState {
  searchQuery: string;
  purpose: 'all' | 'sale' | 'rent' | 'land';
  propertyType: 'all' | PropertyType;
  locationArea: string;
  minPrice: number;
  maxPrice: number;
  minBedrooms: number;
  verifiedOnly: boolean;
  seaViewOnly: boolean;
}

export interface InspectionBooking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  type: 'in-person' | 'diaspora-video';
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  preferredDate: string;
  preferredTime: string;
  timeZone: string;
  notes?: string;
  createdAt: string;
}
