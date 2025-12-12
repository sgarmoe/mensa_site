import { NextResponse } from "next/server";
import { matchupsController } from "../../backend/controllers/weeklyMatchupsController.js";

export async function GET() {
    try {
        console.log("GET /api/matchupsController called");
        const weeklyMatchups = await matchupsController();
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