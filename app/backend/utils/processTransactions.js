import { fetchTransactions } from "../lib/fetchSleeperData.js";
import { getPlayersByArray } from "../lib/fetchMongoNFLData.js";

const limit = 100;

export async function processTransactions() {
    const rawData = await fetchTransactions();
    
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
            return formatTrade(tx, playerLookup);
        }

        if (tx.type == "waiver") {
            return formatWaiver(tx, playerLookup);
        }

        if (tx.type == "free_agent") {
            return formatFreeAgent(tx, playerLookup);
        }

        return {
            type: tx.type,
            transactionId: tx.transaction_id,
            timestamp: tx.created,
            team: tx.roster_ids?.[0] || null,
            adds: [],
            drops: []
        };
    });

    
    processedData.sort((a, b) => b.timestamp - a.timestamp);


    console.dir(processedData.slice(0, 100), { depth: null });
    return processedData;
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

function formatWaiver(tx, players) {
    
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
        type: "Free Agent",
        transactionId: tx.transaction_id, 
        timestamp: tx.created,
        team: tx.roster_ids?.[0]|| null,
        adds, 
        drops
    };


}


processTransactions();