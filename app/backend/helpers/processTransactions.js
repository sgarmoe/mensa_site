import { fetchTransactions } from "../lib/fetchSleeperData.js";
import { getPlayersByArray } from "../lib/fetchMongoNFLData.js";
import { matchRosterIdsToUser } from "./matchRosterIdsToUser.js";
import { SEASONS } from "../config/seasons.js";


export async function processTransactions(year, week) {

    if (!SEASONS[year]) { //guard for invalid year input
        throw new Error(`No year detected for ${year}`);
    }

    const { leagueId, regularWeeks } = SEASONS[year];
    const profiles = await matchRosterIdsToUser(leagueId);
    const allWeeks = Array.from({ length: regularWeeks }, (_, i) => i + 1);

    const weekResults = await Promise.all(
        allWeeks.map(async (w) => {
            try {
                const weeklyData = await fetchTransactions(leagueId, w);
                return Array.isArray(weeklyData) ? weeklyData : [];
            } catch (err) {
                console.warn(`No transactions available for ${year} week ${w}`);
                return [];
            }
        })
    );

    const rawData = weekResults.flat();
    
    const playerIds = [];

    rawData.forEach(tx => {
        if (tx.adds) {
            playerIds.push(...Object.keys(tx.adds));
        }
        if (tx.drops) {
            playerIds.push(...Object.keys(tx.drops));
        }
    });

    const uniqueIds = [...new Set(playerIds)];

    const players = await getPlayersByArray(uniqueIds);

    const playerLookup = {};
    players.forEach(p => {
        playerLookup[p.player_id] = p;
    });

    const processedData = rawData.map(tx => {
        if (tx.type == "trade") {
            return formatTrade(tx, playerLookup, profiles);
        }

        if (tx.type == "waiver") {
            return formatWaiver(tx, playerLookup, profiles);
        }

        if (tx.type == "free_agent") {
            return formatFreeAgent(tx, playerLookup, profiles);
        }

        return {
            type: tx.type,
            transactionId: tx.transaction_id,
            timestamp: tx.created,
            team: tx.roster_ids?.[0] || null,
            team_name: profiles.get(tx.roster_ids?.[0]) ?? "No team found",
            avatar: profiles.get(tx.roster_ids?.[0]) ?? "No avatar located",
            adds: [],
            drops: []
        };
    });
    processedData.sort((a, b) => b.timestamp - a.timestamp);
    //console.dir(processedData.slice(0, 100), { depth: null });
    return processedData;
}

function formatTrade(tx, players, profiles) {
    //console.log("Entered trade format ");
    
    const adds = Object.entries(tx.adds || {}).map(([playerId, teamId]) => ({
        player: players[playerId]?.full_name || "Unknown player", 
        toTeam: teamId
    }));

    const drops = Object.entries(tx.drops || {}).map(([playerId, teamId]) => ({
        player: players[playerId]?.full_name || "Unknown Player",
        fromTeam: teamId
    }));

    return {
        type: "Trade",
        transactionId: tx.transaction_id, 
        timestamp: tx.created,
        team: tx.roster_ids?.[0]|| null,
        team_name: profiles.get(tx.roster_ids?.[0]) ?? "No team found",
        adds, 
        drops
    };
}

function formatWaiver(tx, players, profiles) {
    
    const adds = Object.entries(tx.adds || {}).map(([playerId, teamId]) => ({
        player: players[playerId]?.full_name || "Unknown player", 
        toTeam: teamId
    }));

    const drops = Object.entries(tx.drops || {}).map(([playerId, teamId]) => ({
        player: players[playerId]?.full_name || "Unknown Player",
        fromTeam: teamId
    }));
    
    return {
        type: "Waiver",
        transactionId: tx.transaction_id, 
        timestamp: tx.created,
        team: tx.roster_ids?.[0]|| null,
        team_name: profiles.get(tx.roster_ids?.[0]) ?? "No team found",
        avatar: profiles.get(tx.roster_ids?.[0]) ?? "No avatar located",
        adds, 
        drops
    };
}

function formatFreeAgent(tx, players, profiles ) {
    
    const adds = Object.entries(tx.adds || {}).map(([playerId, teamId]) => ({
        player: players[playerId]?.full_name || "Unknown player", 
        toTeam: teamId
    }));

    const drops = Object.entries(tx.drops || {}).map(([playerId, teamId]) => ({
        player: players[playerId]?.full_name || "Unknown Player",
        fromTeam: teamId
    }));
    
    return {
        type: "Free Agent",
        transactionId: tx.transaction_id, 
        timestamp: tx.created,
        team: tx.roster_ids?.[0]|| null,
        team_name: profiles.get(tx.roster_ids?.[0]) ?? "No team found",
        avatar: profiles.get(tx.roster_ids?.[0]) ?? "No avatar located",
        adds, 
        drops
    };
}
