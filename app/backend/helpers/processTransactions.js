import { fetchTransactions } from "../lib/fetchSleeperData.js";
import { getPlayersByArray } from "../lib/fetchMongoNFLData.js";
import { matchRosterIdsToUser } from "./matchRosterIdsToUser.js";
import { SEASONS } from "../config/seasons.js";


export async function processTransactions(year, week, limit = null) {

    if (!SEASONS[year]) { //guard for invalid year input
        throw new Error(`No year detected for ${year}`);
    }

    const { leagueId, regularWeeks } = SEASONS[year];
    const profiles = await matchRosterIdsToUser(leagueId);
    const allWeeks = week ? [week] : Array.from({ length: regularWeeks }, (_, i) => i + 1);

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
            return formatPickup(tx, playerLookup, profiles, "Waiver");
        }

        if (tx.type == "free_agent") {
            return formatPickup(tx, playerLookup, profiles, "Free Agent");
        }

        const unknownProfile = profiles.get(tx.roster_ids?.[0]);
        return {
            type: tx.type,
            transactionId: tx.transaction_id,
            timestamp: tx.created,
            team: tx.roster_ids?.[0] || null,
            team_name: unknownProfile?.teamName ?? "No team found",
            avatar: unknownProfile?.avatar ?? null,
            adds: [],
            drops: []
        };
    });
    processedData.sort((a, b) => b.timestamp - a.timestamp);
    return limit ? processedData.slice(0, limit) : processedData;
}

function formatTrade(tx, players, profiles) {
    const sides = (tx.roster_ids || []).map(rosterId => {
        const profile = profiles.get(rosterId);

        const playersReceived = Object.entries(tx.adds || {})
            .filter(([, toRosterId]) => toRosterId === rosterId)
            .map(([playerId]) => players[playerId]?.full_name || "Unknown player");

        const picksReceived = (tx.draft_picks || [])
            .filter(pick => pick.roster_id === rosterId)
            .map(pick => `${pick.season} Round ${pick.round} Pick`);

        return {
            roster_id: rosterId,
            team_name: profile?.teamName ?? "No team found",
            avatar: profile?.avatar ?? null,
            received: [...playersReceived, ...picksReceived]
        };
    });

    return {
        type: "Trade",
        transactionId: tx.transaction_id,
        timestamp: tx.created,
        sides
    };
}

function formatPickup(tx, players, profiles, type) {
    const adds = Object.entries(tx.adds || {}).map(([playerId]) => ({
        player: players[playerId]?.full_name || "Unknown player"
    }));

    const drops = Object.entries(tx.drops || {}).map(([playerId]) => ({
        player: players[playerId]?.full_name || "Unknown player"
    }));

    const profile = profiles.get(tx.roster_ids?.[0]);
    return {
        type,
        transactionId: tx.transaction_id,
        timestamp: tx.created,
        team: tx.roster_ids?.[0] || null,
        team_name: profile?.teamName ?? "No team found",
        avatar: profile?.avatar ?? null,
        adds,
        drops
    };
}
