

import "./globals.css";
import axios from 'axios';
import Roster from './Rosters';


const { retrievePlayerData } = require('./api');
const leagueID = '1045634813593706496'

function Header({ title }) {
  return( 
    <h1 style={{ textAlign: 'center'}}>
    {title ? title : 'Default title'}
    </h1>
    );
}


export default function HomePage() {

//THIS IS WHERE THE ROSTERS WILL GO WHEN IMPORTED
   const teams = new Array(12).fill(null).map((_, index) => ({
    name: `Team ${index +1}`,
    roster: Array.from({ length: 15}, (_, playerIndex) => ({
      name: `Player ${playerIndex + 1}`,
      position: `Position ${playerIndex + 1}`,

    }))
   }));

  return (
    <div>
      <Header title="Rosters Page" />
      <hr />   

        <div className="container">
          {teams.length > 0 ? (
            teams.map((team, index) => (
              <Team 
                className="team-name" 
                key={index} 
                name={team.name} 
                roster={team.roster} />
            ))
            
          ) : ( 
            <p>Loading teams</p>
          )}
          </div>
        </div>
  );
}


function Team({ name, roster }) {
  return (
    <div className="team-item">
      <h1>{name}</h1>
      <hr className="team-divider" />
      <ul>
        {roster.map((player, index) => (
          <Player key={index} name={player.name} position={player.position}/>
          
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