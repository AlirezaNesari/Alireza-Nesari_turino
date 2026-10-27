const FA = '۰۱۲۳۴۵۶۷۸۹'
export const toEn = (s: string) => s.replace(/[۰-۹]/g, (d) => String(FA.indexOf(d)))
export const toFa = (s: string) => s.replace(/\d/g, (d) => FA[+d])