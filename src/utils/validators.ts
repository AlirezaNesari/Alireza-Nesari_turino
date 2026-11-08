export function isValidNationalCode(code: string) {
  if (!/^\d{10}$/.test(code) || /^(\d)\1{9}$/.test(code)) return false
  const sum =
    [...code.slice(0, 9)].reduce((s, d, i) => s + Number(d) * (10 - i), 0) % 11
  const check = Number(code[9])
  return sum < 2 ? check === sum : check === 11 - sum
}
