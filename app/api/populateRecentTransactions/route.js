import { NextResponse } from "next/server";
import { processTransactionsController } from "../../backend/controllers/processTransactionsController.js";

export async function GET() {
  try {
    console.log("GET /api/populateRecentTransactions called");
    const recentTransactions = await processTransactionsController();
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
