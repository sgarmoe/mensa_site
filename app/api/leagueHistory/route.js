import { NextResponse } from "next/server";
import { processAllTimeData } from "../../backend/controllers/leagueHistoryController.js";

export const dynamic = "force-dynamic";

export async function GET(request) {
    try {
        console.log("GET /api/league history called");

        const allTimeData = await processAllTimeData();
        return NextResponse.json(allTimeData);
    } catch (error) {
        console.error("ATD Routing Error: ", error);
        return NextResponse.json(
            {success: false, error: "failed to produce all time data"},
            { status: 500}
        );
    }
}