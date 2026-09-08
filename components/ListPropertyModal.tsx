'use client';

import React, { useState } from 'react';
import { Property, PropertyType, ListingStatus } from '@/types/property';
import { HAMILTON_MAPS_LINK } from '@/data/properties';
import { 
  X, 
  PlusCircle, 
  Upload, 
  CheckCircle2, 
  Building2, 
  MapPin, 
  Sun, 
  ShieldCheck 
} from 'lucide-react';

interface ListPropertyModalProps {
  onClose: () => void;
  onAddProperty: (property: Property) => void;
}

export const ListPropertyModal: React.FC<ListPropertyModalProps> = ({
  onClose,
  onAddProperty,
}) => {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [type, setType] = useState<PropertyType>('house');
  const [status, setStatus] = useState<ListingStatus>('sale');
  const [priceUSD, setPriceUSD] = useState<number | ''>('');
  const [area, setArea] = useState('Hamilton Peninsula');
  const [address, setAddress] = useState('');
  const [bedrooms, setBedrooms] = useState<number | ''>(3);
  const [bathrooms, setBathrooms] = useState<number | ''>(3);
  const [townLots, setTownLots] = useState<number | ''>(2);
  const [power, setPower] = useState('EDSA Grid + Solar Inverter Backup');
  const [water, setWater] = useState('Guma Valley Water + Backup Storage Tanks');
  const [titleStatus, setTitleStatus] = useState('Conveyance Deed Registered at OARG');
  const [description, setDescription] = useState('');
  const [agentName, setAgentName] = useState('');
  const [agentPhone, setAgentPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !priceUSD || !address || !agentPhone) return;

    // Pick appropriate architectural image based on type
    const sampleImages: Record<PropertyType, string[]> = {
      villa: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'],
      apartment: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'],
      house: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80'],
      duplex: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'],
      land: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'],
      commercial: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'],
    };

    const newProperty: Property = {
      id: `usr-${Date.now()}`,
      title,
      tagline: tagline || `${type.toUpperCase()} in ${area}, Freetown`,
      type,
      status,
      priceUSD: Number(priceUSD),
      rentPeriod: status === 'rent' ? 'year' : undefined,
      negotiable: true,
      location: {
        area,
        subDistrict: area,
        city: 'Freetown',
        country: 'Sierra Leone',
        googleMapsUrl: HAMILTON_MAPS_LINK,
        address,
        coordinates: {
          lat: 8.3694,
          lng: -13.2562,
        },
      },
      specs: {
        bedrooms: bedrooms !== '' ? Number(bedrooms) : undefined,
        bathrooms: bathrooms !== '' ? Number(bathrooms) : undefined,
        townLots: townLots !== '' ? Number(townLots) : 2,
        sqm: townLots !== '' ? Number(townLots) * 405 : 400,
        parkingSpaces: 3,
        furnishing: 'Semi-Furnished',
      },
      utilities: {
        power,
        water,
        security: 'Perimeter Wall with Razor Wire & Gate',
        roadAccess: 'Paved highway connector',
      },
      titleDeed: {
        status: titleStatus,
        cadastralSurvey: true,
        diasporaVerified: true,
      },
      amenities: [
        'Secure Gated Compound',
        'Paved Parking Bay',
        'Balcony Access',
        'Solar Power Inverter Support',
      ],
      images: sampleImages[type] || sampleImages.house,
      description: description || `Newly listed property in ${area}, Freetown with Kam Buy & Rent Property oversight.`,
      featuresList: [
        'Verified ownership credentials and surveyor beacons',
        'Accessible via main Peninsular Highway',
        'Ready for inspection with Kam Buy & Rent Property',
      ],
      featured: true,
      diasporaFavorite: true,
      seaView: area.toLowerCase().includes('hamilton') || area.toLowerCase().includes('sussex') || area.toLowerCase().includes('tokeh'),
      agent: {
        name: agentName || 'Kam Buy & Rent Property Desk',
        phone: agentPhone || '+232 78 889 450',
        whatsapp: agentPhone.replace(/[^0-9]/g, '') || '23278889450',
        email: 'listings@kambuyrent.sl',
        role: 'Verified Property Owner / Partner',
      },
    };

    onAddProperty(newProperty);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold">List Your Property in Sierra Leone</h3>
              <p className="text-[11px] text-slate-300">Kam Buy & Rent Property • Hamilton Peninsula</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-black text-slate-900">Property Listed Successfully!</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Your property has been added to the live catalog with a <strong>Featured</strong> badge. Our Hamilton Peninsula team will contact your number to verify physical cadastral beacons and deed records.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
            >
              Close & View in Listings
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Listing Purpose</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ListingStatus)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Property Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as PropertyType)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="villa">Luxury Villa</option>
                  <option value="house">House / Residence</option>
                  <option value="duplex">Duplex</option>
                  <option value="apartment">Apartment</option>
                  <option value="land">Land / Town Lots</option>
                  <option value="commercial">Commercial Site</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Property Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Modern 4-Bedroom Villa with Ocean Breeze"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Price in USD ($) *</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 150000"
                  value={priceUSD}
                  onChange={(e) => setPriceUSD(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Area / Corridor</label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Hamilton Peninsula">Hamilton Peninsula</option>
                  <option value="Sussex & River No. 2">Sussex & River No. 2</option>
                  <option value="Lakka & Ogoo Farm">Lakka & Ogoo Farm</option>
                  <option value="Regent & Hill Station">Regent & Hill Station</option>
                  <option value="Tokeh Beach">Tokeh Beach</option>
                  <option value="Lumley & Aberdeen">Lumley & Aberdeen</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Specific Address / Road *</label>
              <input
                type="text"
                required
                placeholder="e.g. Off Peninsular Highway, Hamilton Beach Road"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Bedrooms</label>
                <input
                  type="number"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Bathrooms</label>
                <input
                  type="number"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Town Lots</label>
                <input
                  type="number"
                  step="0.5"
                  value={townLots}
                  onChange={(e) => setTownLots(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Power / Solar Setup</label>
                <input
                  type="text"
                  value={power}
                  onChange={(e) => setPower(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Title Deed Status</label>
                <input
                  type="text"
                  value={titleStatus}
                  onChange={(e) => setTitleStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Captain Mustapha"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your WhatsApp / Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="+232 78 123 456"
                  value={agentPhone}
                  onChange={(e) => setAgentPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Description / Notes</label>
              <textarea
                rows={2}
                placeholder="Give details about building condition, finishes, road access, and price flexibility..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-900/10 flex items-center justify-center gap-2 transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Submit Property to Kam Buy & Rent</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
