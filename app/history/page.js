"use client"
import { useEffect, useState } from "react";
import "../globals.css";

function Header({ title }) {
    return( 
      <h1 style={{ textAlign: 'center'}}>
      {title ? title : 'Default title'}
      </h1>
      );
  }


export default function LeagueHistoryPage() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchHistory() {
            try {
                //ISSUE W RES
                const res = await fetch (`/api/leagueHistory`);
                if (!res.ok) throw new Error("Failed to acquire league history: ", Error);

                const data = await res.json();


                setHistory(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchHistory();
    }, []);

if (loading) return <p className="text-center mt-8">Loading history...</p>;
    if (error) return <p className="text-center mt-8">Error: {error} </p>;


    return (
        <div className="p-4 max-w-5xl mx-auto">
            <Header title='League History Page' />
                <div className="container">
                    {history.map((hx, i) => (
                        <TeamHistory key={i} hx={hx} />
                    ))}
                </div>
            <pre>{JSON.stringify(history, null, 2)}</pre>

        </div>
    );

}


function TeamHistory ({ hx }) {
    return (
    <div className="bg-white shadow-md rounded-lg p-4 border">
        <div className="flex justify-between items-center mb-2">
            <p className="font-bold text-lg">{hx.team}</p>
        </div>
    </div>
    );
}