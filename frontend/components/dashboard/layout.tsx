import React from "react"

export default function DashboardPageLayout({ header, children }: { header?: any; children: React.ReactNode }) {
  return (
    <div>
      {header && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{header.title}</h1>
          <p className="text-muted-foreground">{header.description}</p>
        </div>
      )}
      {children}
    </div>
  )
}
