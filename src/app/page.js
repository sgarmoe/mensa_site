
import "./globals.css";

const { retrievePlayerData } = require('./api');

//API WORK BELOW
const leagueID = '1045634813593706496'
const api_url = 'https://api.sleeper.app/v1/user/nastynorwegian';


//TESTING ABILITY TO GET PLAYER DATA FROM API FILE
// async function test() {
//   try {
//     const players = await retrievePlayerData(); 
//     console.log("Players retrieved: ", players);

//   } catch (error) {
//     console.error('Error: ', error);
//   }
// }

// test();


//DELETE AFTER ROSTERS ARE FETCHED IN API FILE
// //Fetch roster data for MENSA and test outputs
// fetch(roster_url)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log(data[0]);
//     console.log("Mark end of API Roster Call");

//     const fpts = data[11].settings;
//     console.log(fpts);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });


 
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