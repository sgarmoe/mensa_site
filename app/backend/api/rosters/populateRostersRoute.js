import { NextResponse } from "next/server";
import { populateRosters } from "@/app/backend/controllers/populateRostersController.js";

export async function GET() {
  try {
    console.log("GET /api/rosters called");
    const populatedRosters = await populateRosters();

    return NextResponse.json({ success: true, data: populatedRosters });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to populate rosters" },
      { status: 500 }
    );
  }
}
