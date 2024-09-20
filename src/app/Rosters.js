'use client';

import React from 'react';

function Roster({ rosters, players}) {
    return (
        <div>
            <h2>Roster for Owner: {rosters.owner_id}</h2>
            <ul>
                {rosters.players.map(playerID => {
                    const player = players[playerId];
                    return player ? (
                        <li key={playerId}>{player.full_name}</li>
                    ) : (
                        <li key={playerId}>Player ID: {playerId} not found</li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Roster;