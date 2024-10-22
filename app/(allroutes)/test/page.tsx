import { getUserSession } from '@/lib/getsessionuser'

export default async function Home() {
  const user = await getUserSession()
  console.log(user)
  return <main className="mt-20">{JSON.stringify(user)}</main>
}