export type Payment = {
  shaba_code?: string
  debitCard_code?: string
  accountIdentifier?: string
}

export type User = {
  id: string
  mobile: string
  firstName?: string
  lastName?: string
  email?: string
  gender?: 'male' | 'female'
  birthDate?: string
  nationalCode?: string
  payment?: Payment
}
