import type { Metadata } from 'next'
import ProfileView from '@/components/profile/ProfileView'

export const metadata: Metadata = { title: 'پروفایل' }

export default function ProfilePage() {
  return <ProfileView />
}