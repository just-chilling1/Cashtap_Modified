import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
    console.log(">>> [API/STATS] Fetching dashboard stats");
    try {
        // Fetch all 3 counts in parallel from Supabase
        const [searchesRes, analysisRes, variationsRes] = await Promise.allSettled([
            supabase.from("search_history").select("*", { count: "exact", head: true }),
            supabase.from("analysis_results").select("keyword", { count: "exact", head: true }),
            supabase.from("keyword_variations").select("*", { count: "exact", head: true }),
        ]);

        const totalSearches = searchesRes.status === "fulfilled" ? searchesRes.value.count ?? 0 : 0;
        const nichesAnalyzed = analysisRes.status === "fulfilled" ? analysisRes.value.count ?? 0 : 0;
        const keywordVariations = variationsRes.status === "fulfilled" ? variationsRes.value.count ?? 0 : 0;

        return NextResponse.json({
            totalSearches,
            nichesAnalyzed,
            keywordVariations,
        });
    } catch (error: any) {
        console.error("Stats Error:", error);
        return NextResponse.json({
            totalSearches: 0,
            nichesAnalyzed: 0,
            keywordVariations: 0,
        });
    }
}
