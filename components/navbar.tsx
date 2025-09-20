"use client"

import Link from "next/link"
import {useState} from "react"
import {usePathname} from "next/navigation"
import {Button} from "@/components/ui/button"
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import {Menu} from "lucide-react"
import {ModeToggle} from "./mode-toggle"

export default function Navbar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null)

    const navItems = [
        {name: "Home", href: "/"},
        {name: "Recruitment", href: "/recruitment"},
        {name: "Contact", href: "/contact"},
    ]

    const aboutUsDropDown = [
        {name: "About Us", href: "/about"},
        {name: "Principle's Desk", href: "/principle-desk"},
        {name: "Objective & Features", href: "/objective"},
        {name: "Admission Procedure", href: "/admission-procedure"},
    ]

    const galleryDropDown = [
        {name: "Photo Gallery", href: "/gallery-photo-photo"},
        {name: "Video Gallery", href: "/gallery-photo-video"},
    ]
    const managementDropDown = [
        {name: "Committee", href: "/committee"},
    ]

    const CoCurricularDropDown = [
        {name: "House System", href: "/house-system"},
        {name: "Club In Action", href: "/club-in-action"},
        {name: "In House Events", href: "/house-in-events"},
        {name: "House Competition", href: "/house-competition"},
        {name: "CBSE Initiatives", href: "/cbse-initiatives"},
        {name: "Assembly Schedules", href: "/assembly-schedules"},
        {name: "Enrichment Programmes", href: "/enrichment-programmes"},
        {name: "Student Councils", href: "/student-councils"},
    ]
    const InfoPointDropDown = [
        {name: "Code Of Conduct", href: "/code-of-conduct"},
        {name: "School Timings", href: "/school-timings"},
        {name: "List Of Holidays", href: "/list-of-holidays"},
        {name: "Bell Timings", href: "/bell-timings"},
        {name: "Circular", href: "/circular"},
    ];


    const academicDropDown = [
        {name: "Result", href: "/result"},
        {name: "TC", href: "/tc"},
        {name: "Academic Calendar", href: "/calendar"},
        {name: "Prospectus", href: "/prospectus"},
    ]
    const staffDropDown = [
        {name: "Staff Position", href: "/staff"},
    ]

    const noticesDropDown = [
        {name: "Notice", href: "/notices"},

    ]
    const achieversDropDown = [
        {name: "Achievers", href: "/achievers"},
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
            <div
                className="w-full flex items-center justify-between px-4 lg:px-8 border-b-4 font-sans text-black dark:text-white">

                <div className="flex-shrink-0">
                    <img
                        src="https://files.edgestore.dev/qrpzodiuv5ggrw1l/publicFiles/_public/emrs_logo.png"
                        alt="Eklavya Model Residential School Logo"
                        className="h-24 w-24 object-contain"
                    />
                </div>

                <div className="flex-grow text-center md:mx-4 md:my-2 md:my-0 text-fuchsia-900 text-sm">
                    <h2 className="text-sm font-bold leading-tight md:text-2xl">
                        Eklavya Model Residential School <span className="font-normal text-black dark:text-white">Bojhiya Bahraich</span>
                        <span
                            className="font-normal">(U.P)</span>
                    </h2>
                    <p className="text-xs md:text-sm mt-1 hidden md:block">
                        (Under National Education Society For Tribal Students, New Delhi) | (An Autonomous Body Under
                        Ministry Of Tribal Affairs)
                    </p>
                    <p className="text-xs md:text-sm mt-1">
                        CBSE Affiliation No : <span
                        className="font-normal text-black dark:text-white"> 2120154 </span> | School Code : <span
                        className="font-normal text-black dark:text-white"> 72153</span> | UDISE CODE : <span
                        className="font-normal text-black dark:text-white"> 09501105603 </span>
                    </p>
                </div>

                <div className="flex-shrink-0 md:flex items-center gap-2 mt-2 md:mt-0 hidden">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/e/ee/Azadi-Ka-Amrit-Mahotsav-Logo.png"
                        alt="Azadi Ka Amrit Mahotsav"
                        className="h-12 w-auto object-contain"
                    />
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/8/84/Government_of_India_logo.svg"
                        alt="Government of India"
                        className="h-12 w-auto object-contain"
                    />
                </div>
            </div>

            <header
                className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full">
                <div className="container flex h-16 items-center justify-between">
                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-4 w-full justify-between">

                        <Link
                            href="/"
                            className={`text-sm font-medium transition-colors hover:text-primary`}
                        >
                            Home
                        </Link>


                        {renderDropdown("About Us", aboutUsDropDown)}
                        {renderDropdown("Co Curricular", CoCurricularDropDown)}
                        {renderDropdown("Gallery", galleryDropDown)}
                        {renderDropdown("Staff", staffDropDown)}
                        {renderDropdown("Academics", academicDropDown)}
                        {renderDropdown("Notices", noticesDropDown)}
                        {renderDropdown("Info Point", InfoPointDropDown)}
                        {renderDropdown("Management", managementDropDown)}
                        {renderDropdown("Achievers", achieversDropDown)}

                        <Link
                            href="/recruitment"
                            className={`text-sm font-medium transition-colors hover:text-primary`}
                        >
                            Recruitment
                        </Link>

                        <Link
                            href="/contact"
                            className={`text-sm font-medium transition-colors hover:text-primary`}
                        >
                            Contact
                        </Link>

                        <ModeToggle/>
                        <Button asChild variant="default">
                            <Link href="/admin">Admin</Link>
                        </Button>
                    </nav>

                    {/* Mobile Navigation */}
                    <div className="flex items-center justify-between w-full gap-2 lg:hidden">
                        <ModeToggle/>
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Menu className="h-5 w-5"/>
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="overflow-y-auto max-h-screen">
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
                                        <div className="text-base font-semibold mb-1"> Co Curricular</div>
                                        {
                                            CoCurricularDropDown.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    href={subItem.href}
                                                    className="block px-2 py-1 text-sm hover:text-primary"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))
                                        }

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
                                        <div className="text-base font-semibold mb-1">Info Point</div>
                                        {InfoPointDropDown.map((subItem) => (
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
                                    <div className="mt-2">
                                        <div className="text-base font-semibold mb-1">Achievers</div>
                                        {
                                            achieversDropDown.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    href={subItem.href}
                                                    className="block px-2 py-1 text-sm hover:text-primary"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))
                                        }
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
