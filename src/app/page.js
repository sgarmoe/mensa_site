
const { MongoClient, ServerApiVersion } = require('mongodb');
import "./globals.css";
import axios from 'axios';
import  { fetchCurrentRosters } from "./api.js";
import { displayPlayerNames } from "./api.js";

const leagueID = '1045634813593706496'
const uri = "mongodb+srv://samgarmoe:RMNh3YV1GOiHouua@cluster0.lu9fe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


function Header({ title }) {
  return( 
    <h1 style={{ textAlign: 'center'}}>
    {title ? title : 'Default title'}
    </h1>
    );
}


export default async function HomePage() {
  try{ 
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db('nfl_data');

    const rosters = await fetchCurrentRosters();
    

    const rosterData = await Promise.all(rosters.map(async (roster) => {
      const players = await displayPlayerNames(roster.players, db);
      return {
        owner_id: roster.owner_id,
        players: players,
      };
    }));

    console.log('Roster data: ', JSON.stringify(rosterData, null, 2));

  //   const teams = new Array(12).fill(null).map((_, index) => ({
  //   name: `Team ${index +1}`,
  //   roster: Array.from({ length: 15}, (_, playerIndex) => ({
  //     name: `Player ${playerIndex + 1}`,
  //     position: `Position ${playerIndex + 1}`,
  //   }))
  //  }));

  return (
    <div>
      <Header title="Rosters Page" />
      <hr />   

        <div className="container">
          {rosterData.length > 0 ? (
            rosterData.map((team, index) => (
              <Team 
                className="team-name" 
                key={index} 
                name={team.owner_id} 
                roster={team.players} />
            ))
            
          ) : ( 
            <p>Loading teams</p>
          )}
          </div>
        </div>
  );
} catch (error) {
  console.error('Error fetching data: ', error);
  return <p>Error loading data</p>;
} finally {
  await client.close();
}
}






function Team({ name, roster }) {

  console.log('Rendering team: ', name, roster);
  return (
    <div className="team-item">
      <h1>{name}</h1>
      <hr className="team-divider" />
      <ul>
        {roster.map((player, index) => (
          <Player key={index} name={player.full_name} position={player.position}/>

        ))}
      </ul>
    </div>
  );
}

function Player({ name, position }) {
  return (
    <li>
      {name} - <strong>{position}</strong>
    </li>
  );
}