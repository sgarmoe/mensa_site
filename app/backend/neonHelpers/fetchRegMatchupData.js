import { calculateAllTimeStatistics, calculateAllTimeWins } from "../helpers/processAllTimeData.js";
import { processWeeklyMatchupData } from "../helpers/processWeeklyMatchupData.js";

export async function processMatchupDataForNeon(year) {
    if (!year) {
        throw new Error("A league ID is required to fetch matchup data");
    }

    console.log("in processMatchupDataforNeon ", year);
    const matchups = await processWeeklyMatchupData(year);
    //console.log(matchups[1]);

    if (!Array.isArray(matchups)) {
        throw new Error("Invalid matchup data response");
    }

    return matchups.flatMap(({ roster_id, games }) => {
        if (!Array.isArray(games)) {
            throw new Error(`Invalid games data for roster ${roster_id}`);
        }

        return games.map((game) => ({
            roster_id,
            season: game.year,
            week: game.week,
            opponent_id: game.opponent_roster_id,
            pf: game.pf,
            pa: game.pa,
            result: game.result,
            matchupId: game.matchup_id
        }));
    });

    console.log("testing matchup map: ", matchupDataMap);

    return matchups;
}








