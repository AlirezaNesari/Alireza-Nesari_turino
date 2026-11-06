import ProfileSidebar from '@/components/profile/ProfileSidebar'

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-[240px_1fr] md:items-start">
      <ProfileSidebar />
      <div>{children}</div>
    </div>
  )
}