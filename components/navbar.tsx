"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { ModeToggle } from "./mode-toggle"

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
  ]

  const aboutUsDropDown = [
    { name: "About Us", href: "/about" },
    { name: "Principle's Desk", href: "/principle" },
    { name: "Objective & Features", href: "/objective" },
    { name: "Admission Procedure", href: "/admission-procedure" },
  ]

  const galleryDropDown = [
    { name: "Photo Gallery", href: "/gallery-photo-photo" },
    { name: "Video Gallery", href: "/gallery-photo-video" },
  ]
  const managementDropDown = [
    {name:"Committee", href: "/committee" },
  ]

  const academicDropDown = [
    { name: "Result", href: "/result" },
    { name: "TC", href: "/tc" },
    { name: "Academic Calendar", href: "/calendar" },
    { name: "Prospectus", href: "/prospectus" },
  ]
  const staffDropDown = [
      { name: "Staff Position", href: "/staff" },
  ]

  const noticesDropDown = [
    { name: "Notice", href: "/notices" },

  ]
  const achieversDropDown=[
    { name: "Achievers", href: "/achievers" },
  ]

  const renderDropdown = (title: string, items: { name: string; href: string }[]) => (
      <div
          className="relative"
          onMouseEnter={() => setHoveredDropdown(title)}
          onMouseLeave={() => setHoveredDropdown(null)}
      >
        <div className="text-sm font-medium cursor-pointer hover:text-primary px-2 py-1">
          {title}
        </div>
        {hoveredDropdown === title && (
            <div className="absolute bg-background/95 left-0 shadow-lg rounded-md z-50 w-48">
              {items.map((subItem) => (
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
  )

  return (
      <>
        <div className="w-full bg-white flex items-center justify-center">
          <img
              src="https://www.emrssukma.in/wp-content/uploads/2025/04/full-width-banner-sukma-3000-x-400.png"
              alt="EMRS Banner"
              style={{ width: "100%", height: "100px" }}
          />
        </div>

        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full">
          <div className="container flex h-16 items-center justify-between">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 w-full justify-between">

                  <Link
                      href="/"
                      className={`text-sm font-medium transition-colors hover:text-primary`}
                  >
                    Home
                  </Link>


              {renderDropdown("About Us", aboutUsDropDown)}
              {renderDropdown("Gallery", galleryDropDown)}
              {renderDropdown("Staff", staffDropDown)}
              {renderDropdown("Academics", academicDropDown)}
              {renderDropdown("Notices", noticesDropDown)}
              {renderDropdown("Management", managementDropDown)}
              {renderDropdown("Achievers",achieversDropDown)}

              <Link
                  href="/contact"
                  className={`text-sm font-medium transition-colors hover:text-primary`}
              >
                Contact
              </Link>

              <ModeToggle />
              <Button asChild variant="default">
                <Link href="/admin">Admin</Link>
              </Button>
            </nav>

            {/* Mobile Navigation */}
            <div className="flex items-center justify-between w-full gap-2 md:hidden">
              <ModeToggle />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5" />
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


                    <div className="mt-2">
                      <div className="text-base font-semibold mb-1">About Us</div>
                      {aboutUsDropDown.map((subItem) => (
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
                    <div className="mt-2">
                      <div className="text-base font-semibold mb-1">Staff</div>
                      {staffDropDown.map((subItem) => (
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

                    <div className="mt-2">
                      <div className="text-base font-semibold mb-1">Gallery</div>
                      {galleryDropDown.map((subItem) => (
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

                    <div className="mt-2">
                      <div className="text-base font-semibold mb-1">Academics</div>
                      {academicDropDown.map((subItem) => (
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
                    <div className="mt-2">
                      <div className="text-base font-semibold mb-1">Management</div>
                      {managementDropDown.map((subItem) => (
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

                    <div className="mt-2">
                      <div className="text-base font-semibold mb-1">Notices</div>
                      {noticesDropDown.map((subItem) => (
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
