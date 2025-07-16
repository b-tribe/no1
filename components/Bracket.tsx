import { useState } from "react";
import MatchCard from "./MatchCard";

type Match = { id: number; players: (string | null)[]; };

export default function Bracket({ teams }: { teams: string[] }) {
  const initMatches: Match[][] = [];
  let cur = teams.map((t, i) => ({ id: i, players: [t, null] }));
  initMatches.push(cur);
  while (cur.length > 1) {
    const next: Match[] = [];
    for (let i = 0; i < cur.length; i += 2) {
      next.push({ id: next.length, players: [null, null] });
    }
    initMatches.push(next);
    cur = next;
  }

  const [matches, setMatches] = useState(initMatches);

  const selectWinner = (round: number, matchIdx: number, playerIdx: 0 | 1) => {
    setMatches(prev => {
      const copy = prev.map(r => r.map(m => ({ ...m, players: [...m.players] })));
      const m = copy[round][matchIdx];
      const winner = m.players[playerIdx];
      const nextIdx = Math.floor(matchIdx / 2);
      copy[round + 1][nextIdx].players[matchIdx % 2] = winner;
      copy[round][matchIdx].players = [winner, null];
      return copy;
    });
  };

  return (
    <div className="space-y-8 overflow-auto">
      {matches.map((round, r) => (
        <div key={r} className="flex space-x-4">
          {round.map((m, mi) => (
            <MatchCard
              key={m.id}
              team={m.players[0] ?? m.players[1] ?? undefined}
              isWinner={m.players[1] === null && m.players[0] !== null}
              onClick={() => {
                const idx = m.players[0] === null ? 1 : 0;
                selectWinner(r, mi, idx as 0 | 1);
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
