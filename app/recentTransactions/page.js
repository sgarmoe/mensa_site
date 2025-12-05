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



export default function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        async function fetchTransactions() {
            try {
                const res = await fetch ("/api/populateRecentTransactions");
                if (!res.ok) throw new Error("Failed to populate transactions");

                const data = await res.json();
                console.log("TX Data: ", data);

                setTransactions(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchTransactions();
    }, []);

if (loading) return <p className="text-center mt-8">Loading Transactions...</p>;
    if (error) return <p className="text-center mt-8">Error: {error} </p>;

    return (
        <div className="p-4 max-w-5xl mx-auto">

            <Header title='Recent Transactions Page' />
              <div className="container">
                {transactions.map((tx, i) => (
                  <Transaction key={i} tx={tx} />
                ))}
              </div>
        </div>
    );
}


function Transaction ({ tx }) {
    return ( 
        <div className="bg-white shadow-md rounded-lg p-4 border">
      <div className="flex justify-between items-center mb-2">
        <p className="font-bold text-lg">{tx.type}</p>
        <p className="text-sm text-gray-500">
          {new Date(tx.timestamp).toLocaleString()}
        </p>
      </div>

      <p className="text-sm text-gray-600 mb-2">Team: {tx.team}</p>

      {/* Adds */}
      {tx.adds.length > 0 && (
        <div className="mb-2">
          <p className="font-semibold text-green-700">Adds:</p>
          <ul className="list-disc ml-5">
            {tx.adds.map((a, idx) => (
              <Add key={idx} add={a} />
            ))}
          </ul>
        </div>
      )}

      {/* Drops */}
      {tx.drops.length > 0 && (
        <div>
          <p className="font-semibold text-red-700">Drops:</p>
          <ul className="list-disc ml-5">
            {tx.drops.map((d, idx) => (
              <Drop key={idx} drop={d} />
            ))}
          </ul>
        </div>
      )}
    </div>
    )
}


function Drop({ drop }) {

    return (
        <li className="text-green-600">
            {drop.player}  Team {drop.fromTeam}
        </li>

    );
}

function Add({ add }) {

    return (
        <li className="text-red-600">
            {add.player}  Team {add.fromTeam}
        </li>
    )
}



