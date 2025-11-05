const uri = process.env.MONGODB_URI;
const roster_url = 'https://api.sleeper.app/v1/league/1180198267141128192/rosters'
const users_url = 'https://api.sleeper.app/v1/league/1180198267141128192/users'
const players_url = 'https://api.sleeper.app/v1/players/nfl';

//verify rosters fetched from Sleeper match with valid players in DB
export async function displayPlayerNames (playerIds, db) {
  try {
    const collection = db.collection('nfl_players'); 
    //console.log("Player IDs in the display player names function: ");
    //console.log(playerIds);
    const players = [];

    for (const playerId of playerIds) {
      const player = await collection.findOne({ player_id: playerId }); //for each player ID in Sleeper data, match with ID in mongo

      if (player) {   //push player info to store in players array for display 
        players.push({
          full_name: player.full_name,
          position: player.position, 
          team: player.team
          });
        //console.log(`Player ID: ${playerId}, Name: ${player.full_name}`);
      } else {
        //console.log(`Player ID: ${playerId} not found`);
      }
    }

    return players;

    } catch (error) {
      console.error('Error fetching player names: ', error);
      return [];
    }
  }