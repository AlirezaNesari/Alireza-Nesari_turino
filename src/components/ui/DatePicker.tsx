'use client'
import { useRef, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import jalaali from 'jalaali-js'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { MONTHS, formatJalali, isoToJalali, jalaliToIso, todayJalali, weekdayIndex } from '@/utils/date'
import { toFa } from '@/utils/digits'

export type DateValue = { start: string | null; end: string | null }

const WEEK = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']
const defaultCls =
  'flex w-full items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm'

type Props = {
  mode?: 'single' | 'range'
  value: DateValue
  onChange: (v: DateValue) => void
  placeholder: string
  yearRange?: [number, number]
  className?: string
}

export default function DatePicker({ mode = 'single', value, onChange, placeholder, yearRange, className }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useOutsideClick(ref, () => setOpen(false))

  const label = value.start
    ? mode === 'range' && value.end
      ? `${formatJalali(value.start)} - ${formatJalali(value.end)}`
      : formatJalali(value.start)
    : null

  function pick(iso: string) {
    if (mode === 'single') {
      onChange({ start: iso, end: null })
      setOpen(false)
      return
    }
    if (!value.start || value.end) {
      onChange({ start: iso, end: null })
      return
    }
    const [a, b] = iso < value.start ? [iso, value.start] : [value.start, iso]
    onChange({ start: a, end: b })
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((o) => !o)} className={className ?? defaultCls}>
        <CalendarDays size={16} className="shrink-0 text-gray-500" />
        <span className={label ? '' : 'text-gray-500'}>{label ?? placeholder}</span>
      </button>
      {open && <Calendar value={value} onPick={pick} yearRange={yearRange} />}
    </div>
  )
}

function Calendar({
  value,
  onPick,
  yearRange,
}: {
  value: DateValue
  onPick: (iso: string) => void
  yearRange?: [number, number]
}) {
  const [today] = useState(todayJalali)
  const [view, setView] = useState(() => {
    const j = value.start ? isoToJalali(value.start) : todayJalali()
    return { jy: j.jy, jm: j.jm }
  })
  const { jy, jm } = view

  const [from, to] = yearRange ?? [today.jy - 2, today.jy + 2]
  const minY = Math.min(from, jy)
  const years = Array.from({ length: Math.max(to, jy) - minY + 1 }, (_, i) => minY + i)

  const offset = weekdayIndex(jy, jm, 1)
  const length = jalaali.jalaaliMonthLength(jy, jm)

  const move = (d: 1 | -1) =>
    setView(({ jy, jm }) => {
      const n = jm + d
      if (n > 12) return { jy: jy + 1, jm: 1 }
      if (n < 1) return { jy: jy - 1, jm: 12 }
      return { jy, jm: n }
    })

  return (
    <div className="absolute start-0 top-full z-30 mt-2 w-72 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
      <div className="mb-2 flex items-center justify-between">
        <button type="button" onClick={() => move(-1)} aria-label="ماه قبل" className="rounded p-1 hover:bg-gray-100">
          <ChevronRight size={18} />
        </button>
        <div className="flex items-center gap-2 text-sm font-medium">
          <span>{MONTHS[jm - 1]}</span>
          <select
            value={jy}
            onChange={(e) => setView({ jy: Number(e.target.value), jm })}
            className="rounded border border-gray-200 px-1 py-0.5 text-xs"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {toFa(String(y))}
              </option>
            ))}
          </select>
        </div>
        <button type="button" onClick={() => move(1)} aria-label="ماه بعد" className="rounded p-1 hover:bg-gray-100">
          <ChevronLeft size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center text-xs">
        {WEEK.map((w) => (
          <span key={w} className="py-1 text-gray-400">
            {w}
          </span>
        ))}
        {Array.from({ length: offset }, (_, i) => (
          <span key={`e${i}`} />
        ))}
        {Array.from({ length }, (_, i) => {
          const d = i + 1
          const iso = jalaliToIso(jy, jm, d)
          const selected = iso === value.start || iso === value.end
          const inRange = !!value.start && !!value.end && iso > value.start && iso < value.end
          const isToday = today.jy === jy && today.jm === jm && today.jd === d
          const cls = selected ? 'bg-primary text-white' : inRange ? 'bg-primary-soft' : 'hover:bg-gray-100'
          return (
            <button
              key={d}
              type="button"
              onClick={() => onPick(iso)}
              className={`mx-auto size-8 rounded-full text-sm ${cls} ${isToday && !selected ? 'ring-1 ring-primary' : ''}`}
            >
              {toFa(String(d))}
            </button>
          )
        })}
      </div>
    </div>
  )
}