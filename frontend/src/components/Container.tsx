import React from 'react'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className = '', ...props }: ContainerProps) {
  return (
    <div className={`max-w-[1280px] mx-auto px-5 sm:px-8 md:px-14 ${className}`} {...props}>
      {children}
    </div>
  )
}
