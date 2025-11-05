import { connectToDatabase } from "../config/mongoClient";

const uri = process.env.MONGODB_URI;
const roster_url = 'https://api.sleeper.app/v1/league/1180198267141128192/rosters'
const users_url = 'https://api.sleeper.app/v1/league/1180198267141128192/users'
const players_url = 'https://api.sleeper.app/v1/players/nfl';

//fetch single player
export async function getPlayerById(playerId) {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('nfl_players');
        const player = await collection.findOne(
            { playerid: String(playerId) },
            { projection: { full_name: 1, position: 1, team: 1, player_id: 1, _id: 0 } }
        );
        return player;
    } catch (error) {
        console.log(`Player ${playerId}  not found in MongoDB: `, error);
    }
}

//fetch many players by array 
export async function getPlayersByArray(playerIds) {
    try {
        if (!Array.isArray(playerIds) || playersIds.length() == 0) return [];

            const normalizedIds = playerIds.map(String);
            const db = await connectToDatabase();
            const collection = db.collection('nfl_players');

            const players = await collection 
            .find(
                { playerid : { $in: normalizedIds }},
                { projection: { full_name: 1, position: 1, team: 1, player_id: 1, _id: 0 } }
            )
            .toArray();
        return players; 
    } catch (error) {
        console.log("Error fetching players w array of IDs: " , error);
        return [];
    }
}