import React from "react"

export default function DashboardStat(props: any) {
  return (
    <div className="bg-card rounded-xl p-6 shadow border border-border flex flex-col items-start">
      <span className="text-sm text-muted-foreground mb-2">{props.label}</span>
      <span className="text-3xl font-bold text-foreground">{props.value}</span>
      <span className="text-xs text-muted-foreground">{props.description}</span>
    </div>
  )
}
