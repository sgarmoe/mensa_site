import "./globals.css";

 
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
          {teams.map((team, index) => (
            <Team key={index} name={`${team.name} ${index + 1}`} roster={team.roster} />
          ))}
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
          <li key={index}>{player}</li>
        ))}
      </ul>
    </div>
  );
}