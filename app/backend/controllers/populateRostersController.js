import { populateBench, populateIR, populateStarters, populateTaxi } from "../utils/populateRosters";
import { fetchCurrentRosters } from "../lib/fetchSleeperData";

//controller that populates all rosters by calling Sleeper API &
//matches IDs w/ player names from mongo

export async function populateRosters() {
    try {
        console.log("Fetching rosters from sleeper");
        const rosters = await fetchCurrentRosters();

        if (!Array.isArray(rosters) || rosters.length === 0) {
            console.log("No rosters found");
            return [];
        }

        console.log(`Processing ${rosters.length} rosters`);

        const populatedRosters = [];

        for (const [index, roster] of rosters.entries()) {
            console.log(`\n Populating # ${index + 1} `);

            const starters = await populateStarters(roster.starters);
            const injuredReserve = await populateIR(roster.reserve);
            const taxi = await populateTaxi(roster.taxi);
            const bench = await populateBench(roster);

            populatedRosters.push({
                owner_id : roster.owner_id,
                starters, 
                injuredReserve, 
                taxi,
                bench
            });
        }

        console.log("All rosters successfully populated");
        return populatedRosters;
    } catch (error) {
        console.log("Error populating rosters: " + error); 
        return [];
    }

}