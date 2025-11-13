"use client"
import { useEffect, useState } from "react";

export default function RostersPage() {
    const [rosters, setRosters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchRosters() {
            try {
                const res = await fetch ("../backend/api/populateRostersRoute.js");
                console.log(res);
                if (!res.ok) throw new Error("Failed to fetch rosters");
                const data = await res.json();
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
    if (error) return <p className="text-center mt-8">Error: {error} </p>; //first point of issue

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6"> League Rosters</h1>

            {rosters.map((team, i) => (
                <Team key={i} team={team} />
            ))}
        </div>
    );
}


function Team({ team }) {
  return (
    <div className="bg-gray-900 text-white p-4 mb-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-2">{team.team_name}</h2>
      <p className="text-sm text-gray-400 mb-4">Owner ID: {team.owner_id}</p>

      <Section title="Starters" players={team.starters} />
      <Section title="Bench" players={team.bench} />
      <Section title="Injured Reserve" players={team.injuredReserve} />
      <Section title="Taxi Squad" players={team.taxi} />
    </div>
  );
}

function Section({ title, players }) {
  return (
    <div className="mb-3">
      <h3 className="text-lg font-semibold mt-2">{title}</h3>
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
  return (
    <li className="bg-gray-800 px-3 py-2 rounded-lg text-sm flex justify-between">
      <span>{full_name}</span>
      <span className="text-gray-400">{position}</span>
      <span className="text-gray-500">{team}</span>
    </li>
  );
}