'use client'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import DatePicker from '@/components/ui/DatePicker'
import { btnOutline, btnPrimary, inputCls } from '@/components/ui/styles'
import { useMe } from '@/hooks/useMe'
import { useUpdateProfile } from '@/hooks/useUpdateProfile'
import { formatJalali } from '@/utils/date'
import { toEn, toFa } from '@/utils/digits'
import { isValidNationalCode } from '@/utils/validators'
import type { User } from '@/types/auth'

const BIRTH_YEARS: [number, number] = [1300, 1410]

export default function ProfileView() {
  const { data: user, isPending } = useMe()

  if (isPending)
    return (
      <div className="space-y-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-36 animate-pulse rounded-xl bg-gray-100" />
        ))}
      </div>
    )
  if (!user)
    return (
      <p className="py-10 text-center text-gray-500">
        برای مشاهده‌ی پروفایل وارد شوید.
      </p>
    )

  return (
    <div className="space-y-4">
      <AccountCard user={user} />
      <PersonalCard user={user} />
      <BankCard user={user} />
    </div>
  )
}

function Card({
  title,
  action,
  children,
}: {
  title: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}

function Row({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex flex-col gap-1 py-2 text-sm sm:flex-row sm:items-center">
      <span className="text-gray-500 sm:w-44">{label}</span>
      <span className="font-medium">{value || '—'}</span>
    </div>
  )
}

const EditBtn = ({
  onClick,
  label = 'ویرایش اطلاعات',
}: {
  onClick: () => void
  label?: string
}) => (
  <button onClick={onClick} className="text-sm text-sky-600">
    {label}
  </button>
)

const Err = ({ msg }: { msg?: string }) =>
  msg ? <p className="mt-1 text-xs text-red-600">{msg}</p> : null

function FormActions({
  pending,
  onCancel,
}: {
  pending: boolean
  onCancel: () => void
}) {
  return (
    <div className="mt-4 flex gap-3 border-t border-gray-100 pt-4">
      <button disabled={pending} className={btnPrimary}>
        {pending ? 'در حال ذخیره...' : 'تایید'}
      </button>
      <button type="button" onClick={onCancel} className={btnOutline}>
        انصراف
      </button>
    </div>
  )
}

/* ---------- حساب کاربری ---------- */
const emailSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('ایمیل معتبر نیست')
    .required('ایمیل را وارد کنید'),
})

function AccountCard({ user }: { user: User }) {
  const [editing, setEditing] = useState(false)
  const update = useUpdateProfile(() => setEditing(false))
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(emailSchema),
    defaultValues: { email: user.email ?? '' },
  })

  return (
    <Card
      title="اطلاعات حساب کاربری"
      action={
        !editing && (
          <EditBtn
            onClick={() => setEditing(true)}
            label={user.email ? 'ویرایش' : 'افزودن'}
          />
        )
      }
    >
      <Row label="شماره موبایل" value={toFa(user.mobile)} />
      {editing ? (
        <form onSubmit={handleSubmit((v) => update.mutate(v))}>
          <input
            {...register('email')}
            dir="ltr"
            placeholder="آدرس ایمیل"
            className={inputCls}
          />
          <Err msg={errors.email?.message} />
          <FormActions
            pending={update.isPending}
            onCancel={() => {
              reset()
              setEditing(false)
            }}
          />
        </form>
      ) : (
        <Row label="ایمیل" value={user.email} />
      )}
    </Card>
  )
}

/* ---------- اطلاعات شخصی ---------- */
const personalSchema = yup.object({
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

function PersonalCard({ user }: { user: User }) {
  const [editing, setEditing] = useState(false)
  const update = useUpdateProfile(() => setEditing(false))
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ')
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(personalSchema),
    defaultValues: {
      fullName,
      nationalCode: user.nationalCode ?? '',
      birthDate: user.birthDate?.slice(0, 10) ?? '',
      gender: (user.gender ?? '') as 'male' | 'female',
    },
  })

  function onSubmit(v: yup.InferType<typeof personalSchema>) {
    const [firstName, ...rest] = v.fullName.trim().split(/\s+/)
    update.mutate({
      firstName,
      lastName: rest.join(' '),
      nationalCode: v.nationalCode,
      birthDate: v.birthDate,
      gender: v.gender as 'male' | 'female',
    })
  }

  return (
    <Card
      title="اطلاعات شخصی"
      action={!editing && <EditBtn onClick={() => setEditing(true)} />}
    >
      {editing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
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
              <select {...register('gender')} className={inputCls}>
                <option value="" disabled>
                  جنسیت
                </option>
                <option value="male">مرد</option>
                <option value="female">زن</option>
              </select>
              <Err msg={errors.gender?.message} />
            </div>
          </div>
          <FormActions
            pending={update.isPending}
            onCancel={() => {
              reset()
              setEditing(false)
            }}
          />
        </form>
      ) : (
        <>
          <Row label="نام و نام خانوادگی" value={fullName} />
          <Row
            label="کدملی"
            value={user.nationalCode && toFa(user.nationalCode)}
          />
          <Row
            label="تاریخ تولد"
            value={user.birthDate && formatJalali(user.birthDate)}
          />
          <Row
            label="جنسیت"
            value={
              user.gender === 'male'
                ? 'مرد'
                : user.gender === 'female'
                  ? 'زن'
                  : undefined
            }
          />
        </>
      )}
    </Card>
  )
}

/* ---------- اطلاعات بانکی ---------- */
const digits = (v?: string) => toEn((v ?? '').replace(/[\s-]/g, ''))
const bankSchema = yup.object({
  debitCard_code: yup
    .string()
    .transform(digits)
    .required('شماره کارت را وارد کنید')
    .matches(/^\d{16}$/, 'شماره کارت باید ۱۶ رقم باشد'),
  shaba_code: yup
    .string()
    .transform((v) => digits(v).toUpperCase())
    .required('شماره شبا را وارد کنید')
    .matches(/^(IR)?\d{24}$/, 'شماره شبا معتبر نیست (۲۴ رقم)'),
  accountIdentifier: yup
    .string()
    .transform(digits)
    .required('شماره حساب را وارد کنید')
    .matches(/^\d{6,20}$/, 'شماره حساب معتبر نیست'),
})

function BankCard({ user }: { user: User }) {
  const [editing, setEditing] = useState(false)
  const update = useUpdateProfile(() => setEditing(false))
  const p = user.payment
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bankSchema),
    defaultValues: {
      debitCard_code: p?.debitCard_code ?? '',
      shaba_code: p?.shaba_code ?? '',
      accountIdentifier: p?.accountIdentifier ?? '',
    },
  })

  return (
    <Card
      title="اطلاعات حساب بانکی"
      action={!editing && <EditBtn onClick={() => setEditing(true)} />}
    >
      {editing ? (
        <form onSubmit={handleSubmit((v) => update.mutate({ payment: v }))}>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <input
                {...register('debitCard_code')}
                inputMode="numeric"
                placeholder="شماره کارت"
                className={inputCls}
              />
              <Err msg={errors.debitCard_code?.message} />
            </div>
            <div>
              <input
                {...register('shaba_code')}
                dir="ltr"
                placeholder="شماره شبا"
                className={inputCls}
              />
              <Err msg={errors.shaba_code?.message} />
            </div>
            <div>
              <input
                {...register('accountIdentifier')}
                inputMode="numeric"
                placeholder="شماره حساب"
                className={inputCls}
              />
              <Err msg={errors.accountIdentifier?.message} />
            </div>
          </div>
          <FormActions
            pending={update.isPending}
            onCancel={() => {
              reset()
              setEditing(false)
            }}
          />
        </form>
      ) : (
        <>
          <Row
            label="شماره کارت"
            value={p?.debitCard_code && toFa(p.debitCard_code)}
          />
          <Row label="شماره شبا" value={p?.shaba_code} />
          <Row
            label="شماره حساب"
            value={p?.accountIdentifier && toFa(p.accountIdentifier)}
          />
        </>
      )}
    </Card>
  )
}
