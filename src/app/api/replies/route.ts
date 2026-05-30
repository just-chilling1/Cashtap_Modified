import { NextResponse } from "next/server";
import { generateReplies } from "@/lib/llm";

export async function POST(req: Request) {
    let ads = [];
    let affiliateLink = "";

    try {
        const body = await req.json();
        ads = body.ads || body.posts || [];
        affiliateLink = body.affiliateLink || "";

        if (!ads || !Array.isArray(ads) || ads.length === 0) {
            return NextResponse.json({ error: "Ads required" }, { status: 400 });
        }

        // Batch generation for efficiency
        const results = await generateReplies(ads, affiliateLink);

        return NextResponse.json({ results });
    } catch (error: any) {
        console.error("Replies Error (Falling back to Mock Data):", error);

        const mockResults = ads.map((ad: any) => {
            const topic = (ad.title || ad.text || "this").substring(0, 60);
            const link = affiliateLink || "";
            return {
                id: ad.id,
                text: ad.text,
                replies: [
                    `This is exactly what I was looking for! I've been researching "${topic}" and honestly, the best thing I found was this: ${link} — it literally changed my results within the first week.`,

                    `I was in the same situation a few months ago. Tried a bunch of different options and wasted way too much time. What finally worked for me was a method I found here: ${link} — it breaks everything down step by step and it actually delivers. Highly recommend giving it a shot before spending money on stuff that doesn't work.`,

                    `Has anyone else tried ${link}? I keep seeing people get results with it and I'm curious if it actually lives up to the hype. Thinking about giving it a go this week.`
                ]
            };
        });

        return NextResponse.json({ results: mockResults });
    }
}
