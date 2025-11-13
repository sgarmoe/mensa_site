import { populateRosters } from "../controllers/populateRostersController.js";

export async function GET(){
    try {
        const populatedRosters = await populateRosters();
        return Response.json(populatedRosters);
    } catch (error) {
        console.error("API Error: ", error);
        return Response.json({ error: "Failed to populate rosters " }, {status: 500});
    }
}