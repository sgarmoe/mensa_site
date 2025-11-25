import { fetchTransactions } from "../lib/fetchSleeperData.js";
import { getPlayersByArray } from "../lib/fetchMongoNFLData.js";

export async function processTransactions() {
    const rawData = await fetchTransactions();
    const playerIds = new Set();

    rawData.forEach(tx => {
        if (tx.adds) {
            Object.keys(tx.adds).forEach(id => playerIds.add(id));
        }
        if (tx.drops) {
            Object.keys(tx.drops).forEach(id => playerIds.add(id));
        }
    });

    const idArray = [...playerIds];

    const players = await getPlayersByArray(idArray);

    const processedData = rawData.map(tx => {
        if (tx.type == "trade") {
            return formatTrade(tx, players);
        }

        if (tx.type == "waiver") {
            return formatFreeAgent(tx, players);
        }

        return null;
    });

    console.dir(processedData, { depth: null });
    return processedData.filter(Boolean);
}

function formatTrade(tx, players) {
    console.log("Entered trade format ");
    
    const adds = Object.entries(tx.adds || {}).map(([playerId, teamId]) => ({
        player: players[playerId]?.full_name || "Unknown player", 
        toTeam: teamId
    }));

    const drops = Object.entries(tx.drops || {}).map(([playerId, teamId]) => ({
        player: players[playerId]?.full_name || "Unknown Player",
        fromTeam: teamId
    }));
    

    return {
        type: "trade",
        transactionId: tx.transaction_id, 
        timestamp: tx.created,
        team: tx.roster_ids?.[0]|| null,
        adds, 
        drops
    };
}

function formatFreeAgent(tx, players) {
    
    const adds = Object.entries(tx.adds || {}).map(([playerId, teamId]) => ({
        player: players[playerId]?.full_name || "Unknown player", 
        toTeam: teamId
    }));

    const drops = Object.entries(tx.drops || {}).map(([playerId, teamId]) => ({
        player: players[playerId]?.full_name || "Unknown Player",
        fromTeam: teamId
    }));
    

    return {
        type: "waiver",
        transactionId: tx.transaction_id, 
        timestamp: tx.created,
        team: tx.roster_ids?.[0]|| null,
        adds, 
        drops
    };


}

processTransactions();