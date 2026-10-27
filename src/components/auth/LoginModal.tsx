'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import OtpInput from 'react18-input-otp'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ArrowRight, X } from 'lucide-react'
import { useAuthModal } from '@/store/useAuthModal'
import { useCountdown } from '@/hooks/useCountdown'
import { checkOtp, sendOtp } from '@/services/auth'
import { getErrorMessage } from '@/utils/error'
import { toEn, toFa } from '@/utils/digits'

const schema = yup.object({
  mobile: yup
    .string()
    .transform((v) => toEn(v ?? ''))
    .required('شماره موبایل را وارد کنید')
    .matches(/^09\d{9}$/, 'شماره موبایل معتبر نیست'),
})

const notifyCode = (code?: string) => {
  if (process.env.NODE_ENV !== 'production' && code) toast.info(`کد تایید (فقط تست): ${code}`)
}

export default function LoginModal() {
  const { open, hide } = useAuthModal()
  const [mobile, setMobile] = useState<string | null>(null)

  if (!open) return null
  const close = () => {
    setMobile(null)
    hide()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center"
      onClick={close}
    >
      <div
        className="relative w-full rounded-t-2xl bg-white p-6 sm:max-w-md sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {mobile ? (
          <button onClick={() => setMobile(null)} aria-label="بازگشت" className="absolute start-4 top-4">
            <ArrowRight size={20} />
          </button>
        ) : (
          <button onClick={close} aria-label="بستن" className="absolute start-4 top-4">
            <X size={20} />
          </button>
        )}
        {mobile ? <OtpStep mobile={mobile} onDone={close} /> : <MobileStep onNext={setMobile} />}
      </div>
    </div>
  )
}

function MobileStep({ onNext }: { onNext: (m: string) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ mobile: string }>({ resolver: yupResolver(schema) })

  const mutation = useMutation({
    mutationFn: sendOtp,
    onSuccess: (res, mobile) => {
      notifyCode(res.code)
      onNext(mobile)
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  })

  return (
    <form onSubmit={handleSubmit(({ mobile }) => mutation.mutate(mobile))} className="mt-6 space-y-4">
      <h2 className="text-center text-xl font-bold">ورود به تورینو</h2>
      <label className="block text-sm">
        شماره موبایل خود را وارد کنید
        <input
          {...register('mobile')}
          inputMode="numeric"
          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-3 outline-none focus:border-primary"
        />
      </label>
      {errors.mobile && <p className="text-sm text-red-600">{errors.mobile.message}</p>}
      <button
        disabled={mutation.isPending}
        className="w-full rounded-lg bg-primary py-3 font-medium text-white disabled:opacity-60"
      >
        {mutation.isPending ? 'در حال ارسال...' : 'ارسال کد تایید'}
      </button>
    </form>
  )
}

function OtpStep({ mobile, onDone }: { mobile: string; onDone: () => void }) {
  const [code, setCode] = useState('')
  const qc = useQueryClient()
  const { left, label, reset } = useCountdown(120)

  const verify = useMutation({
    mutationFn: () => checkOtp(mobile, code),
    onSuccess: ({ user }) => {
      qc.setQueryData(['me'], user)
      toast.success('با موفقیت وارد شدید')
      onDone()
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  })

  const resend = useMutation({
    mutationFn: () => sendOtp(mobile),
    onSuccess: (res) => {
      notifyCode(res.code)
      reset()
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  })

  return (
    <div className="mt-6 space-y-4 text-center">
      <h2 className="text-xl font-bold">کد تایید را وارد کنید.</h2>
      <p className="text-sm">کد تایید به شماره {toFa(mobile)} ارسال شد</p>
      <OtpInput
        value={code}
        onChange={setCode}
        numInputs={6}
        isInputNum
        shouldAutoFocus
        containerStyle={{ direction: 'ltr', justifyContent: 'center', gap: 8 }}
        inputStyle="h-11 w-10 rounded-lg border border-gray-300 text-center outline-none focus:border-primary"
      />
      {left > 0 ? (
        <p className="text-xs text-gray-500">{toFa(label)} تا ارسال مجدد کد</p>
      ) : (
        <button onClick={() => resend.mutate()} className="text-sm text-primary">
          ارسال مجدد کد
        </button>
      )}
      <button
        onClick={() => verify.mutate()}
        disabled={code.length !== 6 || verify.isPending}
        className="w-full rounded-lg bg-primary py-3 font-medium text-white disabled:opacity-60"
      >
        {verify.isPending ? 'در حال بررسی...' : 'ورود به تورینو'}
      </button>
    </div>
  )
}