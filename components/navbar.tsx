"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { LanguageToggle } from "./language-toggle"

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Notices", href: "/notices" },
    { name: "Achievers", href: "/achievers" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ]

  const academicDropdown = [
    { name: "Result", href: "/result" },
    { name: "TC", href: "/tc" },
    { name: "Academic Calendar", href: "/calendar" },
    { name: "Teaching Staff", href: "/staff" },
    { name: "Prospectus", href: "/prospectus" },
  ]

  return (
      <>
        <div className="w-full bg-white flex items-center justify-center">
          <img
              src="https://www.emrssukma.in/wp-content/uploads/2025/04/full-width-banner-sukma-3000-x-400.png"
              alt="NESTS Logo"
              style={{ width: "100%", height: "100px" }}
          />
        </div>

        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold">EMRS</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                  <Link
                      key={item.name}
                      href={item.href}
                      className={`text-sm font-medium transition-colors hover:text-primary ${
                          pathname === item.href ? "text-primary font-semibold" : ""
                      }`}
                  >
                    {item.name}
                  </Link>
              ))}

              {/* Academics Dropdown */}
              <div
                  className="relative"
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
              >
                <div className="text-sm font-medium cursor-pointer hover:text-primary px-2 py-1">
                  Academics
                </div>

                {showDropdown && (
                    <div className="absolute bg-background/95 left-0 shadow-lg rounded-md z-50 w-48">
                      {academicDropdown.map((subItem) => (
                          <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={`block px-4 py-2 text-sm hover:bg-blue-400 ${
                                  pathname === subItem.href ? "text-primary font-semibold" : ""
                              }`}
                          >
                            {subItem.name}
                          </Link>
                      ))}
                    </div>
                )}
              </div>

              <ModeToggle/>
              <LanguageToggle/>
              <Button asChild variant="default">
                <Link href="/admin">Admin</Link>
              </Button>
            </nav>

            {/* Mobile Navigation */}
            <div className="flex items-center gap-2 md:hidden">
              <ModeToggle/>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5"/>
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col gap-4 mt-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-lg font-medium transition-colors hover:text-primary"
                            onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                    ))}
                    {/* Academics sub-items for mobile */}
                    <div className="mt-2">
                      <div className="text-base font-semibold mb-1">Academics</div>
                      {academicDropdown.map((subItem) => (
                          <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-2 py-1 text-sm hover:text-primary"
                              onClick={() => setIsOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                      ))}
                    </div>

                    <Button asChild variant="default" className="mt-4">
                      <Link href="/admin" onClick={() => setIsOpen(false)}>
                        Admin
                      </Link>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>
      </>
  )
}
