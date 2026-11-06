import { toFa } from '@/utils/digits'

export const formatPrice = (n: number) => toFa(n.toLocaleString('en-US'))
export const shortId = (id: string) => id.slice(0, 8)