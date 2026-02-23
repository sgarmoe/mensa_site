'use client'
import { useEffect, useState } from "react";

const YEAR = 2025; //brackets for prior season

export default function PlayoffBrackets() {

    const [playoffBracket, setPlayoffBracket] = useState([]);
    const [loading, setLoading] =useState(true);

    //ONLY ONE ROUTE TO BACKEND NEEDED
    //W AND L BRACKETS ARE RETURNED TOGETHER FROM BRACKET CONTROLLER FILE
    useEffect(() => {
        async function fetchPlayoffBrackets() {
            try {
                const res = await fetch (`/api/playoffBrackets?year=${YEAR}`);
                if (!res.ok) throw new Error("Failed to fetch brackets");

                const data = await res.json();
                console.log("playoff brackets: ", data)
                setPlayoffBracket(data);
            } catch (err) {
                console.error("Fetch error: ", err);
            } finally {
                setLoading(false);
            }
        }
        fetchPlayoffBrackets();
    }, []);
}
