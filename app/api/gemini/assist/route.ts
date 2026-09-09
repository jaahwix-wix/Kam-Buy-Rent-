import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const query = typeof body?.query === 'string' ? body.query : 'general inquiry';
    const propertyContext = body?.propertyContext || null;

    const apiKey = process.env.GEMINI_API_KEY;

    // Context information about Kam Buy & Rent Property in Sierra Leone
    const systemInstruction = `
You are "Kam Property Assistant", the expert real estate AI advisor for "Kam Buy & Rent Property Sierra Leone", located at Hamilton Peninsula, Freetown, Sierra Leone (Western Area Peninsula).
You assist home buyers, diaspora investors (from UK, USA, Canada, Europe, West Africa), tenants, and property developers.

Key Real Estate Knowledge in Sierra Leone & Hamilton Peninsula:
1. "Kam Buy & Rent Property":
   - Headquartered at Hamilton Peninsula, Freetown, Sierra Leone.
   - Specializes in verified property sales, executive diaspora rentals, and secure land acquisitions (town lots) along the Peninsula (Hamilton, Sussex, Lakka, River No. 2, Tokeh, Lumley, Regent).
   - Google Maps location: https://maps.app.goo.gl/3Cr142AXBBbFowA6A
2. Town Lots Measurement:
   - In Sierra Leone, residential and commercial land is measured in "Town Lots".
   - 1 Town Lot = ~4,356 square feet (approx 0.1 Acre or ~405 square meters).
   - Typical sizes: 2 to 3 town lots are ideal for a spacious 4-bedroom villa with compound parking and garden; 1 town lot accommodates a compact duplex or residential flat.
3. Land Titles & Conveyance:
   - Always stress "Conveyance Deed" registered at the Office of the Administrator and Registrar General (OARG) and certified with Cadastral Survey plan from the Ministry of Lands, Housing and Country Planning.
   - Kam Buy & Rent guarantees legal verification before any transaction.
4. Utilities in Freetown & Peninsula:
   - Electricity is provided by EDSA (Electricity Distribution and Supply Authority). Most premium properties feature Solar Hybrid Inverters (Victron/Growatt) and soundproof generator backups.
   - Water is provided by Guma Valley Water Company, supplemented by overhead poly tanks (5,000L-20,000L) or freshwater boreholes.
5. Diaspora Services:
   - Live HD WhatsApp video inspections across all time zones.
   - Milestone-based escrow construction oversight.
   - Complete legal conveyance transfer with power of attorney support.
6. Tone:
   - Warm, knowledgeable, professional, and reassuring.
   - Answer directly and concisely in 2-4 short paragraphs or easy-to-read bullet points.
   - Include prices in both USD ($) and Sierra Leonean Leones (NLe at ~22.5 NLe per USD) when applicable.
`;

    if (!apiKey) {
      // Graceful fallback if GEMINI_API_KEY is not configured yet
      const fallbackResponse = generateLocalFallback(query);
      return NextResponse.json({ answer: fallbackResponse, isFallback: true });
    }

    const ai = new GoogleGenAI({ apiKey });

    const promptText = `
User Question: "${query}"

${propertyContext ? `Currently viewed property context: ${JSON.stringify(propertyContext)}` : ''}

Please provide helpful, tailored, and accurate advice for this Sierra Leone real estate inquiry.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: promptText }],
        },
      ],
      config: {
        systemInstruction: {
          parts: [{ text: systemInstruction }],
        },
        temperature: 0.7,
      },
    });

    const answer = response.text || "Thank you for reaching out to Kam Buy & Rent Property Sierra Leone. How else may we assist you with our Hamilton Peninsula listings?";

    return NextResponse.json({ answer, isFallback: false });
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback on error to guarantee smooth user experience
    const fallbackResponse = generateLocalFallback("general inquiry");
    return NextResponse.json({ answer: fallbackResponse, isFallback: true });
  }
}

function generateLocalFallback(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("town lot") || q.includes("size") || q.includes("acre")) {
    return `In Sierra Leone, land is predominantly measured in **Town Lots**. One standard town lot measures approximately **4,356 square feet** (~405 square meters or 0.1 acre). A typical 4-bedroom villa with a private compound, parking for 3 cars, and garden usually requires **2 to 3 town lots**. Beachfront plots in Hamilton Peninsula typically range from $40,000 to $60,000 per town lot with verified conveyance deeds.`;
  }

  if (q.includes("diaspora") || q.includes("remote") || q.includes("video") || q.includes("uk") || q.includes("usa")) {
    return `Kam Buy & Rent Property provides a dedicated **Diaspora Concierge Service**. We schedule scheduled live HD WhatsApp video walkthroughs across UK (GMT/BST), North America (EST/PST), and European time zones. Our legal partners verify deeds directly at the Sierra Leone Registrar General (OARG) and Ministry of Lands before you commit any funds, with milestone-based settlement.`;
  }

  if (q.includes("hamilton") || q.includes("location") || q.includes("peninsula")) {
    return `The **Hamilton Peninsula** is one of the most sought-after coastal corridors in Greater Freetown. Positioned along the scenic Peninsular Highway, it provides quick access to Hamilton Beach, Sussex, River No. 2, and Lakka, while being just 25-30 minutes from Lumley and Goderich. Our physical office is located directly on Hamilton Peninsula (viewable on Google Maps: https://maps.app.goo.gl/3Cr142AXBBbFowA6A).`;
  }

  if (q.includes("power") || q.includes("solar") || q.includes("water") || q.includes("edsa") || q.includes("guma")) {
    return `Reliable utilities are central to all Kam Buy & Rent properties. Our homes feature **EDSA electricity grid connections backed by 5kVA–15kVA Solar Hybrid Inverter systems** with Lithium batteries for continuous 24/7 power. Water is piped via the **Guma Valley Water Company** combined with multi-thousand-liter overhead backup storage tanks and pressure pumps.`;
  }

  return `Welcome to **Kam Buy & Rent Property Sierra Leone**! We are based at Hamilton Peninsula, Freetown, offering verified luxury villas, executive rentals, and titled town lots across Hamilton, Sussex, Lakka, Tokeh, and Regent. You can schedule an in-person or live diaspora video inspection, chat with our brokers directly on WhatsApp (+232 78 889 450), or explore our curated listings above.`;
}
