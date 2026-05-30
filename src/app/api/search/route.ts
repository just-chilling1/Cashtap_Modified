import { NextResponse } from "next/server";
import { expandKeywords } from "@/lib/llm";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
    console.log(">>> [API/SEARCH] Incoming Request");
    try {
        const body = await req.json();
        const { keyword } = body;

        if (!keyword) {
            return NextResponse.json({ error: "Niche keyword required" }, { status: 400 });
        }

        // Step 1: Get keyword variations (with cache) — this is the ONLY thing we do here
        let variations: string[] = [];
        const { data: existingVariations } = await supabase
            .from("keyword_variations")
            .select("variations")
            .eq("parent_keyword", keyword)
            .single();

        if (existingVariations) {
            console.log(">>> [API/SEARCH] Variations Cache Hit for:", keyword);
            variations = existingVariations.variations;
        } else {
            console.log(">>> [API/SEARCH] Variations Cache Miss. Calling LLM...");
            variations = await expandKeywords(keyword);
            await supabase.from("keyword_variations").insert([{
                parent_keyword: keyword,
                variations: variations
            }]);
        }

        // Persist search to history
        await supabase.from("search_history").insert([{ keyword }]);

        // Return ONLY variations — posts are lazy-loaded per chip on the feed page
        return NextResponse.json({ variations });
    } catch (error: any) {
        console.error("Search Error:", error);
        return NextResponse.json(
            { error: error.message || "Search failed. Please try again." },
            { status: 500 }
        );
    }
}
