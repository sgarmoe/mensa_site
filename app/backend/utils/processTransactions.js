import { fetchTransactions } from "../lib/fetchSleeperData.js";
import { getPlayersByArray } from "../lib/fetchMongoNFLData.js";

export async function processTransactions(playerIds) {
    const rawData = await fetchTransactions();
    //console.log(rawData);
    const players = getPlayersByArray(playerIds);

    const processedData = rawData.map(tx => {
        if (tx.type == "trade") {
            return formatTrade(tx, players);
        }

        if (tx.type == "drop" || tx.type == "add") {
            return formatFreeAgent(tx, players);
        }

        return null;
    });
    //console.log(processedData);
    return processedData.filter(Boolean);
}

function formatTrade(tx, players) {
    console.log("Entered trade format ");
    const adds = [];
    const drops = [];

    for (const [playerId, teamId] of Object.entries(tx.adds || {} )) {
        adds.push({ 
            player: players[playerId]?.full_name || "unknown player",
            toTeam: teamId
        });
    }

    for (const [playerId, teamId] of Object.entries(tx.drops || {})) {
        drops.push({
            player: players[playerId]?.full_name || "Unknown player",
            fromTeam: teamId
        });
    }

    return {
        type: "trade",
        transactionId: tx.transactionId, 
        timestamp: tx.timestamp,
        adds,
        drops
    };
}

function formatFreeAgent(tx, players) {
    console.log("Entered free agent format");
    const info = [];

    for (const [playerId, teamId] of Object.entries(tx.adds || {})) {
        info.push({
            type: "add",
            team: teamId,
            player: players[playerId]?.full_name || "Unknown player",
            timestamp: tx.created
        });
    }

    for (const [playerId, teamId] of Object.entries(tx.drops || {})) {
        info.push({
            type: "drop", 
            team: teamId,
            player: players[playerId]?.full_name || "Unknown Player",
            timestamp: tx.created
        });
    }

    return info;
}



processTransactions();