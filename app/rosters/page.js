"use client"
import { useEffect, useState } from "react";
import SectionHeader from "../components/general/SectionHeader.js";
import { Box } from '@mui/material';
import "../globals.css";

//TODO
//sort players on starter/bench/taxi/ir by position & alphabet
//redesign data display instead of team & section

const YEAR = 2026;

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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
            <SectionHeader>Rosters Page</SectionHeader>
              <div className="container">
                {rosters.map((team, i) => (
                  <Team key={i} team={team} />
                ))}
              </div>
      
        </Box>
        
    );
}


function Team({ team }) {
  const [reserveCollapsed, setReserveCollapsed] = useState(true);

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

      <StartersSection players={team.starters} />
      <hr className='team-divider'/>
      <button
        onClick={() => setReserveCollapsed(c => !c)}
        className="text-gray-400 hover:text-gray-200 text-xs border border-gray-600 rounded px-2 py-0.5 my-2"
      >
        {reserveCollapsed ? "Show Bench / IR / Taxi" : "Hide Bench / IR / Taxi"}
      </button>
      {!reserveCollapsed && (
        <>
          <Section title="Bench" players={team.bench} />
          <hr className='team-divider'/>
          <Section title="Injured Reserve" players={team.injuredReserve} />
          <hr className='team-divider'/>
          <Section title="Taxi Squad" players={team.taxi} />
        </>
      )}
    </div>
  );
}

function StartersSection({ players }) {
  return (
    <div className="mb-3 w-full">
      <h3 className="text-lg text-center font-semibold mt-2">Starters</h3>
      {players.length === 0 ? (
        <p className="text-gray-400 text-sm">No players listed.</p>
      ) : (
        <ul className="mt-1 w-full">
          {players.map((p, i) => (
            <StarterRow key={i} {...p} />
          ))}
        </ul>
      )}
    </div>
  );
}

function StarterRow({ slot, full_name, position, team }) {
  const positionClass = position ? `position-${position.toUpperCase()}` : "";
  return (
    <li className="flex items-center gap-2 py-0.5 text-sm border-b border-gray-100 last:border-0">
      <span className="w-12 text-xs font-bold text-gray-500 shrink-0">{slot}</span>
      <span className="flex-1 font-medium">{full_name}</span>
      <span className={`text-xs ${positionClass}`}>{position}</span>
      <span className="text-xs text-gray-500 w-8 text-right shrink-0">{team}</span>
    </li>
  );
}

function Section({ title, players }) {
  return (
    <div className="mb-3 w-full">
      <h3 className="text-lg text-center font-semibold mt-2">{title}</h3>
      {players.length === 0 ? (
        <p className="text-gray-400 text-sm">No players listed.</p>
      ) : (
        <ul className="mt-1 w-full">
          {players.map((p, i) => (
            <BenchRow key={i} {...p} />
          ))}
        </ul>
      )}
    </div>
  );
}

function BenchRow({ full_name, position, team }) {
  const positionClass = position ? `position-${position.toUpperCase()}` : "";
  return (
    <li className="flex items-center gap-2 py-0.5 text-sm border-b border-gray-100 last:border-0">
      <span className="flex-1 font-medium">{full_name}</span>
      <span className={`text-xs ${positionClass}`}>{position}</span>
      <span className="text-xs text-gray-500 w-8 text-right shrink-0">{team}</span>
    </li>
  );
}