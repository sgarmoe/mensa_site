import { NextResponse } from "next/server";
import { populateAllRosters } from "../../backend/controllers/populateRostersController.js";

export async function GET(request) {
  try {
    console.log("GET /api/rosters called");

    const { searchParams } = new URL(request.url);
    const year = searchParams.get("year");

    if (!year) {
      return NextResponse.json(
        { error : "Year parameter required" }, 
        {status : 400 }
      );
    }
    
    const populatedRosters = await populateAllRosters(year);
    console.log("Route reached");

    return NextResponse.json(populatedRosters);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to populate rosters" },
      { status: 500 }
    );
  }
}
