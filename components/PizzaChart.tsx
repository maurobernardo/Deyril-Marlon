'use client'

import React from 'react'

interface Skill {
  name: string
  level: number
  color: string
}

interface PizzaChartProps {
  skills: Skill[]
}

export default function PizzaChart({ skills }: PizzaChartProps) {
  // Calculate angles for each segment
  let currentAngle = -90 // Start from top
  const total = skills.reduce((sum, skill) => sum + skill.level, 0)
  
  const segments = skills.map((skill, index) => {
    const percentage = (skill.level / total) * 100
    const angle = (skill.level / total) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle
    currentAngle = endAngle

    // Calculate path for pie slice
    const startAngleRad = (startAngle * Math.PI) / 180
    const endAngleRad = (endAngle * Math.PI) / 180
    const x1 = 50 + 50 * Math.cos(startAngleRad)
    const y1 = 50 + 50 * Math.sin(startAngleRad)
    const x2 = 50 + 50 * Math.cos(endAngleRad)
    const y2 = 50 + 50 * Math.sin(endAngleRad)
    const largeArcFlag = angle > 180 ? 1 : 0

    const pathData = [
      `M 50 50`,
      `L ${x1} ${y1}`,
      `A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `Z`
    ].join(' ')

    return {
      ...skill,
      pathData,
      percentage,
      startAngle,
      endAngle,
      midAngle: (startAngle + endAngle) / 2,
    }
  })

  // Calculate label positions
  const labelRadius = 65
  const labels = segments.map((segment) => {
    const midAngleRad = (segment.midAngle * Math.PI) / 180
    const x = 50 + labelRadius * Math.cos(midAngleRad)
    const y = 50 + labelRadius * Math.sin(midAngleRad)
    return {
      ...segment,
      labelX: x,
      labelY: y,
    }
  })

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
      {/* Chart */}
      <div className="relative w-64 h-64">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {segments.map((segment, index) => (
            <g key={index}>
              <path
                d={segment.pathData}
                fill={segment.color}
                stroke="white"
                strokeWidth="0.5"
                className="hover:opacity-80 transition-opacity"
              />
            </g>
          ))}
          {/* Labels on chart */}
          {labels.map((label, index) => {
            const midAngleRad = (label.midAngle * Math.PI) / 180
            const textX = 50 + 35 * Math.cos(midAngleRad)
            const textY = 50 + 35 * Math.sin(midAngleRad)
            return (
              <text
                key={index}
                x={textX}
                y={textY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[3px] fill-white font-semibold"
              >
                {label.percentage.toFixed(0)}%
              </text>
            )
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {skills.map((skill, index) => {
          const segment = segments[index]
          return (
            <div key={index} className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: skill.color }}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {skill.name}
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white ml-4">
                    {skill.level}%
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}




