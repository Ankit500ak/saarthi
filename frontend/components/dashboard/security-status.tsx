import React from "react"

export default function SecurityStatus({ statuses }: { statuses: any[] }) {
  return (
    <div className="bg-card rounded-xl p-6 shadow border border-border">
      <h2 className="text-lg font-bold mb-4">Security Status</h2>
      <ul>
        {statuses?.map((s, i) => (
          <li key={i}>{s.status}</li>
        ))}
      </ul>
    </div>
  )
}
