import { connectToDatabase } from "../config/mongoClient.js";

//fetch single player
export async function getPlayerById(playerId) {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('nfl_players');
        const player = await collection.findOne(
            { player_id: String(playerId) },
            { projection: { full_name: 1, position: 1, team: 1, player_id: 1, _id: 0 } }
        );
        return player;
    } catch (error) {
        console.log(`Player ${playerId}  not found in MongoDB: `, error);
    }
}

//fetch many players by array 
export async function getPlayersByArray(playerIds) {
    //console.log("Entered get players by array");
    try {
        if (!Array.isArray(playerIds) || playerIds.length === 0) return [];
        //console.log("array is populated");

            const normalizedIds = playerIds.map(String);
            //console.log("normalized ids: " + normalizedIds);
            const db = await connectToDatabase();
            const collection = db.collection('nfl_players');

            const players = await collection 
            .find(
                { player_id : { $in: normalizedIds }},
                { projection: { full_name: 1, position: 1, team: 1, player_id: 1, _id: 0 } }
            )
            .toArray();
            //console.log("players: " + players);
        return players; 
    } catch (error) {
        console.log("Error fetching players w array of IDs: " , error);
        return [];
    }
}