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
    const [history, setHistory] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchHistory() {
            try {
                const res = await fetch (`/api/leagueHistory`);
                if (!res.ok) throw new Error("Failed to acquire league history");

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
            <Header title='League History Page'>
            </Header>
            <p>${history}</p>

        </div>
    )

}