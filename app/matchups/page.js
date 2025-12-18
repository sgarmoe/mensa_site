"use client"
import { useEffect, useState } from "react";
import "../globals.css";

function Header({ title }) {
    return(
        <h1 style={{ textAlign: 'center'}}>
            {title ? title : 'Default'}
        </h1>
    );
}

export default function MatchupsPage() {
    const [matchups, setMatchups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        async function fetchMatchups() {
            try {
                const res = await fetch ("api/weeklyMatchups");
                if (!res.ok) throw new Error("Failed to populate matchups");
                
                const data = await res.json();
                //console.log("Matchup data: ", data);
            
                setMatchups(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchMatchups();
    }, []);



if (loading) return <p className="text-center mt-8">Loading Matchups</p>;
if (error) return <p className="text-center mt-8">Error: {error}</p>;

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <Header title='Weekly Matchups Page'/>
                <div className="container">
                    {matchups.map((match, i) => (
                        <Matchup key={i} match={match} />
                    ))}
                </div>
        </div>
    );
}


function Matchup({ match }) {
    const {week, matchup_id, teams} = match;

    return (
        
        <li>
            <p>Week: {week}</p>
            <p>Matchup ID: {matchup_id}</p>{}
            <p>Team 1: {teams.teamA.team_name}</p>
            <p>Team 2: {teams.teamB.team_name}</p>
        </li>
    )
}