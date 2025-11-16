import { NextResponse } from "next/server";
import { populateAllRosters } from "../../backend/controllers/populateRostersController.js";

export async function GET() {
  try {
    console.log("GET /api/rosters called");
    const populatedRosters = await populateAllRosters();
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
