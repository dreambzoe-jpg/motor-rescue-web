import Link from 'next/link'
export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link href="/"><a className="text-xl font-bold">MotorRescue</a></Link>
        <nav className="space-x-4">
          <Link href="/"><a>Home</a></Link>
          <Link href="/dashboard"><a>Dashboard</a></Link>
        </nav>
      </div>
    </header>
  )
}
