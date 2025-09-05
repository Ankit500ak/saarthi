import React from "react"

export default function RebelsRanking({ rebels }: { rebels: any[] }) {
  return (
    <div className="bg-card rounded-xl p-6 shadow border border-border">
      <h2 className="text-lg font-bold mb-4">Rebels Ranking</h2>
      <ul>
        {rebels?.map((r, i) => (
          <li key={i}>{r.name}</li>
        ))}
      </ul>
    </div>
  )
}
