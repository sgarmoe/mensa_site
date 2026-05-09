import { NextResponse } from "next/server";
import { processTransactionsController } from "../../backend/controllers/processTransactionsController.js";

export const revalidate = 3600;

export async function GET(request) {
  try {
    console.log("GET /api/populateRecentTransactions called");

    const { searchParams } = new URL(request.url);
    const year = Number(searchParams.get("year"));
    const weekParam = searchParams.get("week");
    const week = weekParam ? Number(weekParam) : undefined;

    if (!year) {
      return NextResponse.json( 
        { error : "Year required" },
        { status: 400} 
      );
    } 

    const recentTransactions = await processTransactionsController(year, week);
    console.log("Route reached for transactions");

    return NextResponse.json(recentTransactions);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve recent transactions" },
      { status: 500 }
    );
  }
}
