'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { KamBuyRentLocationSection } from '@/components/KamBuyRentLocationSection';
import { HAMILTON_MAPS_LINK } from '@/data/properties';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Car,
  Navigation
} from 'lucide-react';

export default function ContactPage() {
  const { showNotification } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Buying Town Lots');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showNotification('Thank you! Your message has been routed to our Hamilton Peninsula desk.');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Breadcrumb & Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <Link href="/" className="hover:text-emerald-600 font-medium">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Contact & Hamilton HQ</span>
          </div>

          <a
            href={HAMILTON_MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-emerald-700 font-bold hover:underline"
          >
            <span>Google Maps Location</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>Hamilton Peninsula Headquarters</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Contact Kam Buy & Rent Property
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Drop by our physical showroom on the Peninsular Highway or reach our diaspora acquisitions team via WhatsApp, phone, or email.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/23278889450?text=Hello%20Kam%20Buy%20%26%20Rent%20Property,%20I%20would%20like%20to%20reach%20your%20Hamilton%20office"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Instant WhatsApp (+232 78 889 450)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content: Office Location + Inquiry Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Contact & Office Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <h2 className="text-xl font-extrabold text-slate-900">
                Hamilton Office Details
              </h2>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Physical Address</h4>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">
                      Kam Buy & Rent Property Sierra Leone, Peninsular Highway, Hamilton Peninsula, Western Area Rural, Freetown, Sierra Leone.
                    </p>
                    <a
                      href={HAMILTON_MAPS_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:underline font-bold inline-flex items-center gap-1 mt-1 text-xs"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Telephone Lines</h4>
                    <p className="text-slate-600 mt-0.5">
                      Main Desk: +232 78 889 450<br />
                      Land Office: +232 79 334 890
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Email Address</h4>
                    <p className="text-slate-600 mt-0.5">
                      inquiries@kambuyrent-sl.com<br />
                      legal@kambuyrent-sl.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Office Working Hours</h4>
                    <p className="text-slate-600 mt-0.5">
                      Monday – Friday: 8:30 AM – 6:00 PM (GMT)<br />
                      Saturday: 9:00 AM – 4:00 PM<br />
                      Sunday: By Appointment (Inspection Tours)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Driving directions snippet */}
            <div className="bg-emerald-950 text-white rounded-3xl p-6 border border-emerald-800 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Car className="w-4 h-4" />
                <span>Driving Directions</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                How to Reach Us from Lumley
              </h3>
              <p className="text-xs text-emerald-200 leading-relaxed">
                Take the Peninsular Highway south from Lumley Beach towards Goderich and Lakka. Continue for approximately 12 km past the Lakka junction. Our Kam Buy & Rent compound sits on the beachfront side of the highway with visible entrance signage.
              </p>
            </div>
          </div>

          {/* Right Column: Send Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
              <div className="mb-6">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Direct Inquiries
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">
                  Send a Message to our Team
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Have questions about a parcel, pricing, or need a customized site visit? Fill out the form below.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-lg font-bold text-slate-900">Inquiry Received!</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Thank you, {name || 'valued client'}. A Kam Buy & Rent property specialist will review your request and contact you within 24 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Samuel Koroma"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. samuel@example.com"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        WhatsApp / Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +232 78 123 456 or +44 79..."
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Inquiry Topic
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white font-medium"
                      >
                        <option value="Buying Town Lots">Buying Town Lots / Land</option>
                        <option value="Buying a Villa">Purchasing a Beach Villa</option>
                        <option value="Executive Rental">Executive Long-term Rental</option>
                        <option value="Diaspora Legal Audit">Diaspora Title Due Diligence</option>
                        <option value="Property Listing">Listing my Property for Sale</option>
                        <option value="Other">General Question</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Message / Specific Requirements *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please tell us about your budget, preferred location (Hamilton, Sussex, Lakka), number of town lots, or inspection availability..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Transmit Inquiry to Hamilton Desk</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Location Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <KamBuyRentLocationSection />
      </div>
    </div>
  );
}
