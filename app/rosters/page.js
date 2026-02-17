"use client"
import { useEffect, useState } from "react";
import "../globals.css";

//TODO
//sort players on starter/bench/taxi/ir by position & alphabet
//redesign data display instead of team & section

const YEAR = 2026;

function Header({ title }) {
    return( 
      <h1 style={{ textAlign: 'center'}}>
      {title ? title : 'Default title'}
      </h1>
      );
  }



export default function RostersPage() {
    const [rosters, setRosters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchRosters() {
            try {
                const res = await fetch (`/api/populateRosters?year=${YEAR}`);
                if (!res.ok) throw new Error("Failed to fetch rosters");

                const data = await res.json()
                console.log("API Data: ", data);

                setRosters(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchRosters();
    }, []);

    if (loading) return <p className="text-center mt-8">Loading Rosters...</p>;
    if (error) return <p className="text-center mt-8">Error: {error} </p>;

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <h2> Rosters Page </h2>
              <div className="container">
                {rosters.map((team, i) => (
                  <Team key={i} team={team} />
                ))}
              </div>
        </div>
    );
}


function Team({ team }) {
  
  const fullUrl = team.avatar?.startsWith('http');

  const avatarUrl = fullUrl
    ? team.avatar
    : `https://sleepercdn.com/avatars/thumbs/${team.avatar}`;


  //fallback to profile image if league-specific avatar fails
  const handleImageError = (e) => {
    e.target.src = "https://sleepercdn.com";
    e.target.onerror = null;
  }

  return (
    <div className='team-item'>
      <img 
        src={avatarUrl || "https.//sleepercdn.com"}
        alt={`${team.team_name} avatar`}
        onError={handleImageError}
        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
        />
      <h3>{team.team_name} </h3>

      <Section title="Starters" players={team.starters} />
      <hr className='team-divider'/>
      <Section title="Bench" players={team.bench} />
      <hr className='team-divider'/>
      <Section title="Injured Reserve" players={team.injuredReserve} />
      <hr className='team-divider'/>
      <Section title="Taxi Squad" players={team.taxi} />
    </div>
  );
}

function Section({ title, players }) {
  return (
    <div className="mb-3">
      <h3 className="text-lg text-center font-semibold mt-2">{title}</h3>
      {players.length === 0 ? (
        <p className="text-gray-400 text-sm">No players listed.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-1">
          {players.map((p, i) => (
            <Player key={i} {...p} />
          ))}
        </ul>
      )}
    </div>
  );
}

function Player({ full_name, position, team }) {
  const positionClass = `position-${position.toUpperCase()}`;

  return (
    <li>
      {full_name} - <span className={positionClass}>{position}</span> - {team} 
    </li>
  );
}