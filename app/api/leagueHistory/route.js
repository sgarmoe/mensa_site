import { NextResponse } from "next/server";
import { calculateAllTimeStatistics } from "../../backend/helpers/processAllTimeData.js";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        console.log("GET /api/league history called");

        const allTimeData = await calculateAllTimeStatistics();
        console.log("Passed all time data fn");

        return NextResponse.json(allTimeData);
    } catch (error) {
        console.error("ATD Routing Error: ", error);
        return NextResponse.json(
            {success: false, error: "failed to produce all time data"},
            { status: 500}
        );
    }
}