import { NextResponse } from "next/server";
import { processPlayoffBrackets } from "../../backend/helpers/processPlayoffBrackets.js";

export const revalidate = 3600;

export async function GET(request) {
    try {
        console.log("GET /api/playoffBrackets called");

        const {searchParams} = new URL(request.url);
        const year = Number(searchParams.get("year"));

        if (!year) {
            return NextResponse.json(
                { error: "Year required "},
                {status: 400 }
            );
        }

        const playoffBrackets = await processPlayoffBrackets(year);
        console.log("Route reached for playoff bracket processing");

        return NextResponse.json(playoffBrackets);
    } catch (error) {
        console.error("API Error: ", error);
        return NextResponse.json( 
            { success: false, error: "Failed to retrieve brackets"},
            { status: 500 }
        );
    }
}