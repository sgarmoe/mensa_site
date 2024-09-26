
const { MongoClient, ServerApiVersion } = require('mongodb');
import "./globals.css";
import axios from 'axios';
import  { fetchCurrentRosters } from "./api.js";
import { displayPlayerNames, fetchUserTeamNames } from "./api.js";

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
    const users = await fetchUserTeamNames();

    const rosterData = await Promise.all(rosters.map(async (roster) => {
      const players = await displayPlayerNames(roster.players, db);
     
      const user = users.find(user => user.user_id === roster.owner_id);
      const teamName = user?.metadata?.team_name || 'Unknown Team';
      
      return {
        owner_id: roster.owner_id,
        team_name: teamName,
        players: players,
        //team: players.team
      };
    }));


    //console.log('Roster data: ', JSON.stringify(rosterData, null, 2));


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
                name={team.team_name} 
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

  //console.log('Rendering team: ', name, roster);
  return (
    <div className="team-item">
      <h1>{name}</h1>
      <hr className="team-divider" />
      <ul>
        {roster.map((player, index) => (
          <Player key={index} name={player.full_name} position={player.position} team={player.team}/>

        ))}
      </ul>
    </div>
  );
}

function Player({ name, position, team }) {
  return (
    <li>
      {name} - <strong>{position}</strong> - {team}
    </li>
  );
}