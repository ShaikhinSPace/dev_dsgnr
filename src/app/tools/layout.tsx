import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Portfolio
              </Button>
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <h1 className="text-xl font-semibold text-gray-900">Tools Dashboard</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/tools">
              <Button variant="ghost" size="sm">Dashboard</Button>
            </Link>
            <Link href="/tools/shopping">
              <Button variant="ghost" size="sm">Shopping List</Button>
            </Link>
            <Link href="/tools/analytics">
              <Button variant="ghost" size="sm">Analytics</Button>
            </Link>
            <Link href="/tools/settings">
              <Button variant="ghost" size="sm">Settings</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}