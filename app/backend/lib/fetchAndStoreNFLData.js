import axios from 'axios';

export async function fetchAndStoreNFLData(db) {
    try {
        const collection = db.collection('nfl_players');
      
        const response = await axios.get('https://api.sleeper.app/v1/players/nfl');
        const playerData = response.data;


        //removeable? unsure if actually used or needed for data validation before over write
      if (typeof playerData === 'object' && playerData !== null) {
        const playersArray = Object.keys(playerData).map(playerId => ({
          _id: playerId,
          ...playerData[playerId]
        }));
        
  
        //clear prior data
        await collection.deleteMany({});
        console.log("Initial player data cleared");

        //insert new data into mongo
        await collection.insertMany(Object.values(playerData));
        console.log("Player data inserted");
      } else {
        console.log("No player data found/not in expected format");
      }
    } catch(error) {
        console.error('Did not fetch or store data: ', error);
    }
}