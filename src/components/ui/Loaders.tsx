'use client'
import { Oval, ThreeDots } from 'react-loader-spinner'

export function PageLoader({
  label = 'در حال بارگذاری...',
}: {
  label?: string
}) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-3 py-16 text-sm text-gray-500"
    >
      <Oval
        height={44}
        width={44}
        color="#28a745"
        secondaryColor="#d4f5dc"
        strokeWidth={4}
        strokeWidthSecondary={4}
        ariaLabel="loading"
      />
      {label}
    </div>
  )
}

export function ButtonLoader() {
  return (
    <ThreeDots
      height={20}
      width={40}
      color="#ffffff"
      ariaLabel="loading"
      wrapperClass="justify-center"
    />
  )
}
