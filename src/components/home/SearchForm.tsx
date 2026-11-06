'use client'
import { useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Globe, MapPin } from 'lucide-react'
import DatePicker, { type DateValue } from '@/components/ui/DatePicker'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { DESTINATIONS, ORIGINS } from '@/constants/tour'
import type { City } from '@/types/tour'
import type { TourFilters } from '@/lib/api-types'

const fieldCls = 'flex w-full items-center gap-2 rounded-xl border border-gray-300 px-3 py-3 text-sm md:border-0'

export default function SearchForm({ initial }: { initial: TourFilters }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [originId, setOriginId] = useState(initial.originId ?? '')
  const [destinationId, setDestinationId] = useState(initial.destinationId ?? '')
  const [date, setDate] = useState<DateValue>({ start: initial.startDate ?? null, end: initial.endDate ?? null })

  const hasFilter = !!(originId || destinationId || date.start)

  function search(e?: React.FormEvent) {
    e?.preventDefault()
    const qs = new URLSearchParams()
    if (originId) qs.set('originId', originId)
    if (destinationId) qs.set('destinationId', destinationId)
    if (date.start) qs.set('startDate', date.start)
    if (date.end) qs.set('endDate', date.end)
    startTransition(() => router.push(qs.size ? `/?${qs}` : '/'))
  }

  function clear() {
    setOriginId('')
    setDestinationId('')
    setDate({ start: null, end: null })
    startTransition(() => router.push('/'))
  }

  return (
    <form
      onSubmit={search}
      className="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-3 md:flex md:items-center md:gap-0 md:rounded-2xl md:border md:border-gray-200 md:p-2"
    >
      <div className="md:flex-1 md:border-e md:border-gray-200">
        <CityField icon={<MapPin size={16} />} label="مبدا" options={ORIGINS} value={originId} onChange={setOriginId} />
      </div>
      <div className="md:flex-1 md:border-e md:border-gray-200">
        <CityField icon={<Globe size={16} />} label="مقصد" options={DESTINATIONS} value={destinationId} onChange={setDestinationId} />
      </div>
      <div className="col-span-2 md:col-span-1 md:flex-1">
        <DatePicker mode="range" value={date} onChange={setDate} placeholder="تاریخ" className={fieldCls} />
      </div>
      <button disabled={pending} className="col-span-2 rounded-xl bg-primary px-8 py-3 font-medium text-white disabled:opacity-60 md:col-span-1">
        {pending ? 'در حال جستجو...' : 'جستجو'}
      </button>
      {hasFilter && (
        <button type="button" onClick={clear} className="col-span-2 text-sm text-gray-500 underline md:hidden">
          حذف فیلترها
        </button>
      )}
    </form>
  )
}

function CityField({
  icon,
  label,
  options,
  value,
  onChange,
}: {
  icon: React.ReactNode
  label: string
  options: City[]
  value: string
  onChange: (id: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useOutsideClick(ref, () => setOpen(false))
  const selected = options.find((o) => o.id === value)

  const choose = (id: string) => {
    onChange(id)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((o) => !o)} className={fieldCls}>
        <span className="text-gray-500">{icon}</span>
        <span className={selected ? '' : 'text-gray-500'}>{selected?.name ?? label}</span>
      </button>
      {open && (
        <ul className="absolute start-0 top-full z-30 mt-2 min-w-44 rounded-lg border border-gray-200 bg-white py-1 text-sm shadow-lg">
          <li className="bg-gray-50 px-3 py-1.5 text-xs text-gray-500">پرتردد</li>
          {value && (
            <li>
              <button type="button" onClick={() => choose('')} className="w-full px-3 py-2 text-start text-gray-500 hover:bg-gray-50">
                همه
              </button>
            </li>
          )}
          {options.map((o) => (
            <li key={o.id}>
              <button type="button" onClick={() => choose(o.id)} className="w-full px-3 py-2 text-start hover:bg-gray-50">
                {o.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}