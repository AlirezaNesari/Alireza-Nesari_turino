import ProfileSidebar from '@/components/profile/ProfileSidebar'

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto grid max-w-7xl gap-4 px-4 py-4 md:grid-cols-[240px_1fr] md:items-start md:gap-6 md:py-8">
      <ProfileSidebar />
      <div>{children}</div>
    </div>
  )
}
