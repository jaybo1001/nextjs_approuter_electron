import React from 'react'
import { AlertCircle } from 'lucide-react'

type StatusIndicatorProps = {
  icon1Color?: 'red' | 'yellow' | 'green'
  icon2?: React.ReactNode
  label: string
}

export default function Component({
  icon1Color = 'green',
  icon2 = <AlertCircle className="h-5 w-5 text-red-500" />,
  label = 'System Status'
}: StatusIndicatorProps) {
  return (
    <div className="inline-flex items-center bg-transparent text-white h-8 px-1 rounded whitespace-nowrap ">
      <div className="flex items-center justify-center w-4 h-4 mr-0">
        <div className={`w-4 h-4 rounded-full bg-${icon1Color}-500`} />
      </div>
      <div className="flex items-center justify-center w-8 h-8 mr-0">
        {icon2}
      </div>
      <div className="text-sm">{label}</div>
    </div>
  )
}