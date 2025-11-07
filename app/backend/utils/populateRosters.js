import { getPlayersByArray } from "../lib/fetchMongoNFLData.js";

export async function populateStarters(starterIds) {
    const starters = await getPlayersByArray(starterIds);
    return starters.map(player => ({
        full_name : player.full_name,
        position : player.position,
        team : player.team
    }));
}


export async function populateIR(reserveIds) {
    const injuredReserve = await getPlayersByArray(reserveIds);
    return injuredReserve.map(player => ({
        full_name : player.full_name,
        position : player.position,
        team : player.team
    }));
}

export async function populateTaxi(taxiIds) {
    const taxi = await getPlayersByArray(taxiIds);
    return taxi.map(player => ({
        full_name : player.full_name,
        position : player.position,
        team : player.team
    }));
}

export async function populateBench(roster){
    try {
        const { starters, taxi, injuredReserve, reserve, players } = roster;

        const nonBenchIds = [
            ...(starters || []),
            ...(taxi || []),
            ...(injuredReserve || [])
        ];
        

        const benchIds = (players || []).filter(id => !nonBenchIds.includes(id));

        const bench = await getPlayersByArray(benchIds);

        return bench.map(player => ({
            full_name : player.full_name, 
            position : player.position, 
            team : player.team
        }));
    } catch (error) {
        console.log("Error populating bench: " , error); 
        return [];
    }
}