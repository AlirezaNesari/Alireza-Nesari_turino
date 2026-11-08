'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CheckCircle2, User } from 'lucide-react'
import { toast } from 'sonner'
import DatePicker from '@/components/ui/DatePicker'
import { btnOutline, btnPrimary, inputCls } from '@/components/ui/styles'
import { createOrder, getBasket } from '@/services/tours'
import { getErrorMessage } from '@/utils/error'
import { tourDuration } from '@/utils/date'
import { formatPrice } from '@/utils/format'
import { toEn, toFa } from '@/utils/digits'
import { isValidNationalCode } from '@/utils/validators'

const BIRTH_YEARS: [number, number] = [1300, 1410]

const schema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required('نام و نام خانوادگی را وارد کنید')
    .min(3, 'نام و نام خانوادگی معتبر نیست'),
  nationalCode: yup
    .string()
    .transform((v) => toEn(v ?? ''))
    .required('کد ملی را وارد کنید')
    .test('nc', 'کد ملی معتبر نیست', (v) => isValidNationalCode(v ?? '')),
  birthDate: yup.string().required('تاریخ تولد را انتخاب کنید'),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'جنسیت را انتخاب کنید')
    .required('جنسیت را انتخاب کنید'),
})

export default function CheckoutView() {
  const qc = useQueryClient()
  const [success, setSuccess] = useState<string | null>(null)
  const {
    data: tour,
    isPending,
    isError,
  } = useQuery({ queryKey: ['basket'], queryFn: getBasket })
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<yup.InferType<typeof schema>>({ resolver: yupResolver(schema) })

  const order = useMutation({
    mutationFn: createOrder,
    onSuccess: (res) => {
      setSuccess(res.message)
      qc.setQueryData(['basket'], null)
      qc.invalidateQueries({ queryKey: ['userTours'] })
      qc.invalidateQueries({ queryKey: ['transactions'] })
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  })

  if (success)
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-20 text-center">
        <CheckCircle2 size={64} className="text-primary" />
        <h1 className="text-xl font-bold">{success}</h1>
        <p className="text-sm text-gray-500">خرید شما با موفقیت ثبت شد.</p>
        <div className="flex gap-3">
          <Link href="/profile/tours" className={btnPrimary}>
            تورهای من
          </Link>
          <Link href="/" className={btnOutline}>
            صفحه اصلی
          </Link>
        </div>
      </div>
    )

  if (isPending)
    return (
      <div className="mx-auto h-64 max-w-7xl animate-pulse rounded-xl bg-gray-100 md:m-8" />
    )

  if (isError)
    return (
      <p className="py-20 text-center text-red-600">
        خطا در دریافت اطلاعات خرید. دوباره تلاش کنید.
      </p>
    )

  if (!tour)
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <p>سبد خرید شما خالی است.</p>
        <Link href="/" className={btnPrimary}>
          مشاهده‌ی تورها
        </Link>
      </div>
    )

  const { days, nights } = tourDuration(tour.startDate, tour.endDate)

  return (
    <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 md:grid-cols-[1fr_300px] md:items-start">
      <form
        id="passenger-form"
        onSubmit={handleSubmit((v) => order.mutate(v))}
        className="rounded-xl border border-gray-200 bg-white p-4"
      >
        <h1 className="mb-4 flex items-center gap-2 text-lg font-bold">
          <User size={20} /> مشخصات مسافر
        </h1>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <input
              {...register('fullName')}
              placeholder="نام و نام خانوادگی"
              className={inputCls}
            />
            <Err msg={errors.fullName?.message} />
          </div>
          <div>
            <input
              {...register('nationalCode')}
              inputMode="numeric"
              placeholder="کدملی"
              className={inputCls}
            />
            <Err msg={errors.nationalCode?.message} />
          </div>
          <div>
            <Controller
              control={control}
              name="birthDate"
              render={({ field }) => (
                <DatePicker
                  value={{ start: field.value || null, end: null }}
                  onChange={(v) => field.onChange(v.start ?? '')}
                  placeholder="تاریخ تولد"
                  yearRange={BIRTH_YEARS}
                />
              )}
            />
            <Err msg={errors.birthDate?.message} />
          </div>
          <div>
            <select
              {...register('gender')}
              defaultValue=""
              className={inputCls}
            >
              <option value="" disabled>
                جنسیت
              </option>
              <option value="male">مرد</option>
              <option value="female">زن</option>
            </select>
            <Err msg={errors.gender?.message} />
          </div>
        </div>
        {order.isError && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {getErrorMessage(order.error)}
          </p>
        )}
      </form>

      <aside className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">{tour.title}</h2>
          <span className="text-xs text-gray-500">
            {toFa(String(days))} روز و {toFa(String(nights))} شب
          </span>
        </div>
        <div className="my-4 flex items-center justify-between border-t border-dashed border-gray-300 pt-4 text-sm">
          <span>قیمت نهایی</span>
          <p>
            <span className="text-xl font-bold text-sky-600">
              {formatPrice(tour.price)}
            </span>{' '}
            <span className="text-xs text-gray-500">تومان</span>
          </p>
        </div>
        <button
          form="passenger-form"
          disabled={order.isPending}
          className={`${btnPrimary} w-full py-3`}
        >
          {order.isPending ? 'در حال ثبت...' : 'ثبت و خرید نهایی'}
        </button>
      </aside>
    </div>
  )
}

function Err({ msg }: { msg?: string }) {
  return msg ? <p className="mt-1 text-xs text-red-600">{msg}</p> : null
}
