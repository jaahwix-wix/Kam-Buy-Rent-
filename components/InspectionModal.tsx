'use client';

import React, { useState } from 'react';
import { Property, InspectionBooking } from '@/types/property';
import { 
  X, 
  Calendar, 
  Video, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Globe, 
  Phone, 
  MessageSquare,
  Building2
} from 'lucide-react';

interface InspectionModalProps {
  property: Property | null;
  onClose: () => void;
  onConfirmBooking: (booking: InspectionBooking) => void;
}

export const InspectionModal: React.FC<InspectionModalProps> = ({
  property,
  onClose,
  onConfirmBooking,
}) => {
  const [inspectionType, setInspectionType] = useState<'in-person' | 'diaspora-video'>('diaspora-video');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('14:00');
  const [timeZone, setTimeZone] = useState('GMT (Sierra Leone / UK)');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!clientName.trim()) {
      setFormError('Please enter your name.');
      return;
    }
    if (!clientPhone.trim()) {
      setFormError('Please enter your WhatsApp or phone number so we can reach you.');
      return;
    }
    if (!preferredDate) {
      setFormError('Please select a preferred inspection date.');
      return;
    }

    const booking: InspectionBooking = {
      id: `insp-${Date.now()}`,
      propertyId: property ? property.id : 'general-peninsula',
      propertyTitle: property ? property.title : 'Hamilton Peninsula Property Tour',
      type: inspectionType,
      clientName,
      clientEmail,
      clientPhone,
      preferredDate,
      preferredTime,
      timeZone,
      notes,
      createdAt: new Date().toISOString(),
    };

    onConfirmBooking(booking);
    setSubmitted(true);
  };

  const propertyName = property ? property.title : 'Hamilton Peninsula Portfolio Consultation';
  const whatsappBookingMessage = encodeURIComponent(
    `Hello Kam Buy & Rent Property Sierra Leone, I have scheduled a ${inspectionType === 'diaspora-video' ? 'Diaspora Live Video Inspection' : 'In-Person Site Visit'} for "${propertyName}".\nName: ${clientName}\nDate: ${preferredDate} at ${preferredTime} (${timeZone})\nPhone: ${clientPhone}`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Schedule Property Inspection</h3>
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
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-black text-slate-900">Inspection Scheduled!</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong>{clientName}</strong>. Your {inspectionType === 'diaspora-video' ? 'live WhatsApp video walkthrough' : 'in-person inspection'} has been lodged with our Hamilton Peninsula desk for <strong>{preferredDate}</strong> at <strong>{preferredTime} ({timeZone})</strong>.
            </p>

            <div className="pt-2">
              <a
                href={`https://wa.me/23278889450?text=${whatsappBookingMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Confirm Instantly on WhatsApp (+232 78 889 450)
              </a>
            </div>

            <button
              onClick={onClose}
              className="py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              Done & Return to Listings
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-4">
            {formError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                <span>{formError}</span>
              </div>
            )}
            {/* Property summary */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Target Property / Area
              </span>
              <div className="font-bold text-slate-900 line-clamp-1">{propertyName}</div>
              {property && (
                <div className="text-slate-500 text-[11px] mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  {property.location.address}
                </div>
              )}
            </div>

            {/* Inspection Type Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Inspection Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setInspectionType('diaspora-video')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-colors ${
                    inspectionType === 'diaspora-video'
                      ? 'bg-emerald-50/80 border-emerald-500 text-emerald-950'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Video className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold">Diaspora Video</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Live HD WhatsApp video call</span>
                </button>

                <button
                  type="button"
                  onClick={() => setInspectionType('in-person')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-colors ${
                    inspectionType === 'in-person'
                      ? 'bg-emerald-50/80 border-emerald-500 text-emerald-950'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold">In-Person Visit</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Meet agent at Hamilton site</span>
                </button>
              </div>
            </div>

            {/* Contact details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Koroma"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  WhatsApp / Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +232 78... or +44 7..."
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="samuel@example.com"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Time Slot
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="10:00">10:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="17:30">05:30 PM (Sunset View)</option>
                </select>
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Timezone
                </label>
                <select
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="GMT (Sierra Leone / UK)">GMT (SL / UK)</option>
                  <option value="BST (UK Summer)">BST (UK Summer)</option>
                  <option value="EST / EDT (US East)">US Eastern (EST)</option>
                  <option value="PST / PDT (US West)">US Pacific (PST)</option>
                  <option value="CET (Central Europe)">Europe (CET)</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Specific Questions / Focus (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Please verify boundary beacons, test solar inverter, check beach pathway..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-900/10 flex items-center justify-center gap-2 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Confirm & Schedule Inspection</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
