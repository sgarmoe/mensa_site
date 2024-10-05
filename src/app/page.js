
const { MongoClient, ServerApiVersion } = require('mongodb');
import "./globals.css";
import axios from 'axios';
import  { createBench, displayStarters, fetchCurrentRosters } from "./api.js";
import { displayPlayerNames, fetchUserTeamNames } from "./api.js";

import Link from 'next/link';

const leagueID = '1045634813593706496' //sleeper league ID
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



export default function HomePage() {
  return (
    <div>
      <h1>Home Page for MENSA FFL</h1>
      <Link href="/Rosters"> Rosters
      </Link>
    </div>
  );
}




export async function RostersPage() { //default page when opening site
  try{ 
    await client.connect();
    console.log("Connected to MongoDB"); //verify connection to mongo before proceeding
    const db = client.db('nfl_data');
    const collection = db.collection('nfl_players'); //collection of all NFL players over last ~10 years 

    const rosters = await fetchCurrentRosters(); //fetches live rosters from Sleeper API
    //console.log(rosters);
    const users = await fetchUserTeamNames(); //fetches fantasy team names from Sleeper

    const rosterData = await Promise.all(rosters.map(async (roster) => {
      const players = await displayPlayerNames(roster.players, db); //matches players from Sleeper rosters to those stored in Mongo; verifies rosters have current nfl players
      const user = users.find(user => user.user_id === roster.owner_id); //matches Sleeper ID of the user to the owner of the roster
      const teamName = user?.metadata?.team_name || 'Unknown Team'; //associates User ID to the team name fetched above
      const starters = await displayStarters(roster.starters, db); //returns array of STARTERS for each fantasy team
      const taxi = await displayStarters(roster.taxi, db); //returns array of TAXI SQUAD for each fantasy team
      const reserve = await displayStarters(roster.reserve, db); //returns array of INJURED RESERVE for each fantasy team
      const bench = createBench(roster);  //returns Player IDs of the BENCH for each fantasy team; populated by remaining players not in previous 3 arrays
      const benchNames = await displayStarters(bench, db);  //matches bench IDs to player names


      //return all for display in roster format 
      return {
        starters: starters,
        taxi: taxi,
        reserve: reserve,
        bench: benchNames, 
        owner_id: roster.owner_id,
        team_name: teamName,
        players: players,
      };
    }));

  
//BEGIN REACT DISPLAY
  return (
    <div>
      <Header title="Rosters Page" />
      <hr />   

        <div className="container">
          {rosterData.length > 0 ? (  //verify roster is not empty
            rosterData.map((team, index) => ( //pass in all roster info and the index of each team, ordered by Sleeper 
              <Team 
                //className="team-name" 
                key={index} 
                name={team.team_name} 
                starters={team.starters}
                bench={team.bench}
                reserve={team.reserve}
                taxi={team.taxi}
                roster={team.players} 
                />
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

//organization of how team is rendered
function Team({ name, starters, taxi, reserve, bench }) {

  return (
    <div className="team-item">
      <h1>{name}</h1>

      <hr className="team-divider" />
      <h2>STARTERS</h2>
        <ul>
        {starters.map((starter, index ) => ( //mapping players passed in from the starter array
          <Player 
            key={index} 
            name={starter.full_name} 
            position={starter.position} 
            team={starter.team}
            className={`position-${starter.position.toLowerCase()}`} //made lower to help color the positions as shown in page
            />
        ))}
      </ul> 

      <hr className="team-divider" />
      <h2>BENCH</h2>
        <ul>
          {bench.map((bench, index) => ( //mapping players passed in from the bench array
            <Player 
              key={index} 
              name={bench.full_name} 
              position={bench.position} 
              team={bench.team} 
              className={`position-${bench.position.toLowerCase()}`}
            />
          )
        )}
        </ul>

      <hr className="team-divider" />
      <h2>INJURED RESERVE</h2>
        <ul>
        {reserve.map((reserve, index) => (    //mapping IR players
          <Player 
            key={index} 
            name={reserve.full_name} 
            position={reserve.position} 
            team={reserve.team} 
            className={`position-${reserve.position.toLowerCase()}`}
          />
        )
      )}
        </ul>

        <hr className="team-divider" />
        <h2>TAXI SQUAD</h2>
        <ul>
        {taxi.map((taxi, index) =>  (   //mapping taxi players
          <Player 
            key={index} 
            name={taxi.full_name} 
            position={taxi.position} 
            team={taxi.team} 
            className={`position-${taxi.position.toLowerCase()}`}
          />
        ))}
        </ul>
    </div>
  );
}

//player as individuals will be rendered 
function Player({ name, position, team, className}) {
  return (
    <li>
      {name} - <span className={className}>{position}</span> - {team}
    </li>
  );
}
