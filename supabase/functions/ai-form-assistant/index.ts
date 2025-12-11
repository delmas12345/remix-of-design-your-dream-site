import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an AI assistant helping users fill out a website design questionnaire form. Your role is to:

1. Ask the user what type of website they need (e.g., restaurant, portfolio, e-commerce, blog, business)
2. Ask follow-up questions to understand their specific needs
3. Based on their answers, provide form suggestions in a structured JSON format

When you have enough information, respond with suggestions using this EXACT JSON structure wrapped in <suggestions> tags:

<suggestions>
{
  "websitePurpose": ["business", "ecommerce"], // Array of: personal, business, blog, portfolio, ecommerce, nonprofit
  "pageCount": "5", // Options: 1, 3, 5, 10, 15
  "mainPages": "Home, About, Services, Contact, Portfolio",
  "designStyle": ["modern", "minimalist"], // Array of: modern, classic, minimalist, colorful, corporate, artistic
  "layout": "multi-page", // Options: single-page, multi-page, hybrid
  "typography": "modern", // Options: serif, sans-serif, modern, traditional
  "features": ["contact", "gallery", "social"], // Array of: blog, store, payment, booking, gallery, social, newsletter, contact, login, search, chat
  "contentProvider": "agency", // Options: client, agency, mixed
  "media": ["professional-photos", "custom-graphics"], // Array of: stock-photos, professional-photos, custom-graphics, videos, animations
  "deadline": "2-4-weeks", // Options: asap, 2-4-weeks, 1-2-months, flexible
  "budget": "1000-3000" // Options: under-500, 500-1000, 1000-3000, 3000-5000, over-5000
}
</suggestions>

Always be helpful, friendly, and professional. Ask clarifying questions to understand the user's needs better before providing suggestions. When providing suggestions, explain why you chose each option based on their requirements.

IMPORTANT: Always respond in English.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Error in ai-form-assistant:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
