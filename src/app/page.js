

import "./globals.css";
import axios from 'axios';
import Roster from './Rosters';


const { retrievePlayerData } = require('./api');
const leagueID = '1045634813593706496'

function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}


export default function HomePage() {

   const teams = new Array(12).fill({ name: "Team ", roster: ["testing roster", "2", "check", "position 4"] });
 
  return (
    <div>
      <Header title="Rosters for the Minimally Entertaining Nonchildbearing Sport Advocates (MENSA) Dynasty Football League!" />
      <hr />      

        <div className="container">
          {teams.length > 0 ? (
            teams.map((team, index) => (
              <Team className="team-name" key={index} name={team.name} roster={team.roster} />
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
      <hr />
      <ul>
        {roster.map((player, index) => (
          <Player key={index} name={player} />
        ))}
      </ul>
       
    </div>
  );
}

function Player({ name }) {
  return (
    <li>
      {name}
    </li>
  );
}