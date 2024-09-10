

import "./globals.css";
const leagueID = '1045634813593706496'


const api_url = 'https://api.sleeper.app/v1/user/nastynorwegian';

fetch(api_url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });


 
function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}



export default function HomePage() {

   const teams = new Array(12).fill({ name: "Team Name", roster: [] });
 
  return (
    <div>
      <Header title="Rosters for the Minimally Entertaining Nonchildbearing Sport Advocates (MENSA) Dynasty Football League!" />
      <hr />      

        <div className="container">
          {teams.length > 0 ? (
            teams.map((team, index) => (
              <Team key={index} name={team.name} roster={team.roster} />
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
          <Player key={index} name={player.name} position={player.position} />
        ))}
      </ul>
    </div>
  );
}

function Player() {
  return (
    <li>
      <strong>{name}</strong> - {position}
    </li>
  );
}