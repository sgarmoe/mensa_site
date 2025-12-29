import { NextResponse } from "next/server";
import { matchupsController } from "../../backend/controllers/weeklyMatchupsController.js";

export const dynamic = "force-dynamic";

export async function GET(request) {
    try {
        console.log("GET /api/matchupsController called");

        const { searchParams } = new URL(request.url);
        const year = Number(searchParams.get("year"));
        const weekParam = searchParams.get("week");
        const week = weekParam ? Number(weekParam) : undefined;

        const weeklyMatchups = await matchupsController(year);
        console.log("Weekly Matchups route reached");

        return NextResponse.json(weeklyMatchups);
    } catch (error) {
        console.error("API Error: ", error);
        return NextResponse.json(
            { success: false, error: "Failed to retrieve matchups"}, 
            { status: 500}
        );
    }
}