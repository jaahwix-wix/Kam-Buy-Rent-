import { jsPDF } from 'jspdf';
import { Property, Currency } from '@/types/property';
import { EXCHANGE_RATE_USD_TO_NLE } from '@/data/properties';

export function generatePropertyPdf(property: Property, currency: Currency): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182mm
  let y = margin;

  // Header Background Banner
  doc.setFillColor(5, 150, 105); // emerald-600
  doc.rect(margin, y, contentWidth, 20, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('KAM BUY & RENT PROPERTY SIERRA LEONE', margin + 6, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('Hamilton Peninsula, Peninsular Highway, Freetown • Tel: +232 78 889 450', margin + 6, y + 14);

  y += 24;

  // Meta bar: Property ID & Status & Date
  doc.setFillColor(241, 245, 249); // slate-100
  doc.rect(margin, y, contentWidth, 8, 'F');

  doc.setTextColor(15, 23, 42); // slate-900
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text(`PROPERTY ID: ${property.id}`, margin + 4, y + 5.5);

  const statusText = property.status === 'sale' ? 'FOR SALE' : 'FOR RENT';
  doc.setTextColor(5, 150, 105);
  doc.text(`STATUS: ${statusText}`, margin + 55, y + 5.5);

  doc.setTextColor(100, 116, 139); // slate-500
  doc.setFont('helvetica', 'normal');
  const nowStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  doc.text(`ISSUED: ${nowStr} (Offline Summary Sheet)`, margin + 105, y + 5.5);

  y += 13;

  // Property Title & Location
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  const titleLines = doc.splitTextToSize(property.title, contentWidth - 45);
  doc.text(titleLines, margin, y);

  // Price on the right
  const nlePrice = property.priceUSD * EXCHANGE_RATE_USD_TO_NLE;
  const priceDisplay = currency === 'NLE' 
    ? `NLe ${nlePrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}` 
    : `$${property.priceUSD.toLocaleString()} USD`;
  
  doc.setTextColor(5, 150, 105);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text(priceDisplay, pageWidth - margin, y, { align: 'right' });

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  const altPrice = currency === 'NLE'
    ? `Approx. $${property.priceUSD.toLocaleString()} USD`
    : `Approx. NLe ${nlePrice.toLocaleString()} NLe`;
  doc.text(altPrice, pageWidth - margin, y + 5, { align: 'right' });

  y += (titleLines.length * 6) + 4;

  // Address
  doc.setTextColor(71, 85, 105);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Location: ${property.location.address} • Area: ${property.location.area}`, margin, y);
  y += 7;

  // Key Specifications Grid
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.rect(margin, y, contentWidth, 16, 'FD');

  const colWidth = contentWidth / 4;
  const specs = [
    { label: 'BEDROOMS', value: property.specs.bedrooms !== undefined ? `${property.specs.bedrooms} Beds` : 'N/A' },
    { label: 'BATHROOMS', value: property.specs.bathrooms !== undefined ? `${property.specs.bathrooms} Baths` : 'N/A' },
    { label: 'LAND SIZE', value: property.specs.townLots !== undefined ? `${property.specs.townLots} Town Lots (${property.specs.sqm || 405} m²)` : `${property.specs.sqm || 'N/A'} m²` },
    { label: 'PARKING / FURNISH', value: property.specs.parkingSpaces ? `${property.specs.parkingSpaces} Bays` : property.specs.furnishing },
  ];

  specs.forEach((item, index) => {
    const xPos = margin + index * colWidth + 4;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(item.label, xPos, y + 5.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(item.value, xPos, y + 11.5);
  });

  y += 21;

  // Utilities & Infrastructure Reliability Audit
  doc.setFillColor(236, 253, 245); // emerald-50
  doc.setDrawColor(167, 243, 208); // emerald-200
  doc.rect(margin, y, contentWidth, 24, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(6, 95, 70); // emerald-800
  doc.text('UTILITIES & INFRASTRUCTURE RELIABILITY AUDIT (VERIFIED ON SITE)', margin + 4, y + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(30, 41, 59);

  doc.setFont('helvetica', 'bold');
  doc.text('Power / Grid:', margin + 4, y + 11);
  doc.setFont('helvetica', 'normal');
  doc.text(property.utilities.power, margin + 26, y + 11);

  doc.setFont('helvetica', 'bold');
  doc.text('Water Supply:', margin + 4, y + 16.5);
  doc.setFont('helvetica', 'normal');
  doc.text(property.utilities.water, margin + 26, y + 16.5);

  doc.setFont('helvetica', 'bold');
  doc.text('Security:', margin + 4, y + 22);
  doc.setFont('helvetica', 'normal');
  doc.text(property.utilities.security, margin + 26, y + 22);

  y += 29;

  // Legal Title & Conveyance Verification
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(margin, y, contentWidth, 14, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(52, 211, 153); // emerald-400
  doc.text('LEGAL TITLE & CONVEYANCE VERIFICATION (OARG & MINISTRY OF LANDS)', margin + 4, y + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(241, 245, 249);
  doc.text(`Title Status: ${property.titleDeed.status} • Cadastral Survey: Cleared • Ministry Registration: Verified`, margin + 4, y + 10.5);

  y += 19;

  // Description Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('PROPERTY SUMMARY & CONTEXT', margin, y);
  y += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  const descLines = doc.splitTextToSize(property.description, contentWidth);
  const maxDescLines = descLines.slice(0, 5); // keep to 5 lines for clean 1-page fit
  doc.text(maxDescLines, margin, y);
  y += (maxDescLines.length * 4.2) + 4;

  // Key Highlights & Amenities
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('KEY HIGHLIGHTS & FEATURES', margin, y);
  y += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  const half = Math.ceil(property.featuresList.length / 2);
  const col1 = property.featuresList.slice(0, 4);
  const col2 = property.featuresList.slice(4, 8);

  col1.forEach((f, idx) => {
    doc.text(`• ${f}`, margin + 2, y + (idx * 4));
  });
  col2.forEach((f, idx) => {
    doc.text(`• ${f}`, margin + contentWidth / 2 + 2, y + (idx * 4));
  });

  y += (Math.max(col1.length, col2.length) * 4) + 6;

  // Agent Contact Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.rect(margin, y, contentWidth, 18, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`DEDICATED AGENT: ${property.agent.name.toUpperCase()} (${property.agent.role})`, margin + 4, y + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`Direct Phone: ${property.agent.phone}   |   WhatsApp: +${property.agent.whatsapp}   |   Email: ${property.agent.email}`, margin + 4, y + 10.5);
  doc.text('Kam Buy & Rent Property HQ: Peninsular Highway, Hamilton, Freetown, Sierra Leone', margin + 4, y + 14.5);

  // Footer Disclaimer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184); // slate-400
  const footerText = 'Official Property Sheet • Kam Buy & Rent Property Sierra Leone • Generated for offline inspection & verification. To book a live diaspora video tour or on-site walk-through, contact +232 78 889 450.';
  doc.text(footerText, margin, 290);

  // Save the document
  const sanitizedTitle = property.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 25);
  doc.save(`KamBuyRent_${property.id}_${sanitizedTitle}.pdf`);
}
