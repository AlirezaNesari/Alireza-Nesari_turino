import jalaali from 'jalaali-js'
import { toFa } from '@/utils/digits'

const pad = (n: number) => String(n).padStart(2, '0')

export const MONTHS = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
export const WEEKDAYS = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه']

export function isoToJalali(iso: string) {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number)
  return jalaali.toJalaali(y, m, d)
}

export function jalaliToIso(jy: number, jm: number, jd: number) {
  const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd)
  return `${gy}-${pad(gm)}-${pad(gd)}`
}

export function todayJalali() {
  const n = new Date()
  return jalaali.toJalaali(n.getFullYear(), n.getMonth() + 1, n.getDate())
}

export function weekdayIndex(jy: number, jm: number, jd: number) {
  const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd)
  return (new Date(Date.UTC(gy, gm - 1, gd)).getUTCDay() + 1) % 7
}

export function formatJalali(iso: string) {
  const { jy, jm, jd } = isoToJalali(iso)
  return toFa(`${jy}/${pad(jm)}/${pad(jd)}`)
}

export function formatJalaliLong(iso: string) {
  const { jy, jm, jd } = isoToJalali(iso)
  return toFa(`${jd} ${MONTHS[jm - 1]} ${jy}`)
}

export function formatJalaliFull(iso: string) {
  const { jy, jm, jd } = isoToJalali(iso)
  return `${WEEKDAYS[weekdayIndex(jy, jm, jd)]} ${formatJalaliLong(iso)}`
}

export const monthName = (iso: string) => MONTHS[isoToJalali(iso).jm - 1]

export function tourDuration(start: string, end: string) {
  const diff = Math.round((Date.parse(end.slice(0, 10)) - Date.parse(start.slice(0, 10))) / 86400000)
  const days = Math.max(diff, 1)
  return { days, nights: Math.max(days - 1, 0) }
}

export function formatDateTime(iso: string) {
  const d = new Date(iso)
  const { jy, jm, jd } = jalaali.toJalaali(d.getFullYear(), d.getMonth() + 1, d.getDate())
  return toFa(`${jy}/${pad(jm)}/${pad(jd)} - ${pad(d.getHours())}:${pad(d.getMinutes())}`)
}