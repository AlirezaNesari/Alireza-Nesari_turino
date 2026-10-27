import axios from 'axios'
export const getErrorMessage = (err: unknown) =>
  (axios.isAxiosError(err) && err.response?.data?.message) ||
  'خطایی رخ داد، دوباره تلاش کنید.'
