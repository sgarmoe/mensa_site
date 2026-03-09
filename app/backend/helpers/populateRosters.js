import { getPlayersByArray } from "../lib/fetchMongoNFLData.js";

const POSITION_ORDER = ["QB", "RB", "WR", "TE", "FLEX", "K", "DEF"];

function sortByPosition(players) {
    return [...players].sort((a, b) => {
        const ai = POSITION_ORDER.indexOf(a.position);
        const bi = POSITION_ORDER.indexOf(b.position);
        const aOrder = ai === -1 ? 99 : ai;
        const bOrder = bi === -1 ? 99 : bi;
        if (aOrder !== bOrder) return aOrder - bOrder;
        return (a.full_name || "").localeCompare(b.full_name || "");
    });
}

// Preserves slot order from Sleeper and attaches slot label to each starter
export async function populateStarters(starterIds, slotLabels = []) {
    if (!Array.isArray(starterIds) || starterIds.length === 0) return [];
    const players = await getPlayersByArray(starterIds);
    const playerMap = new Map(players.map(p => [String(p.player_id), p]));
    return starterIds.map((id, i) => {
        const player = playerMap.get(String(id));
        return {
            slot: slotLabels[i] ?? "",
            full_name: player?.full_name ?? "Empty",
            position: player?.position ?? "",
            team: player?.team ?? "",
        };
    });
}

export async function populateIR(reserveIds) {
    const injuredReserve = await getPlayersByArray(reserveIds);
    return sortByPosition(injuredReserve.map(player => ({
        full_name: player.full_name,
        position: player.position,
        team: player.team
    })));
}

export async function populateTaxi(taxiIds) {
    const taxi = await getPlayersByArray(taxiIds);
    return sortByPosition(taxi.map(player => ({
        full_name: player.full_name,
        position: player.position,
        team: player.team
    })));
}

export async function populateBench(roster) {
    try {
        const { starters, taxi, injuredReserve, reserve, players } = roster;
        const nonBenchIds = [
            ...(starters || []),
            ...(taxi || []),
            ...(reserve || [])
        ];
        const benchIds = (players || []).filter(id => !nonBenchIds.includes(id));
        const bench = await getPlayersByArray(benchIds);
        return sortByPosition(bench.map(player => ({
            full_name: player.full_name,
            position: player.position,
            team: player.team
        })));
    } catch (error) {
        console.log("Error populating bench: ", error);
        return [];
    }
}