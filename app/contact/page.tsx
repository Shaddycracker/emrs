import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const contactInfo = [
    {
        title: "General",
        details: [
            { icon: <Mail className="w-5 h-5 text-orange-500" />, label: "Email Address", value: "emrsbojhiya2017@gmail.com" },
            { icon: <Phone className="w-5 h-5 text-orange-500" />, label: "Phone Number", value: "(+91) 9415825890" },
            { icon: <MapPin className="w-5 h-5 text-orange-500" />, label: "Address", value: "Bojhiya Bahraich, U.P." },
        ]
    },
    {
        title: "Admissions",
        details: [
            { icon: <Mail className="w-5 h-5 text-orange-500" />, label: "Email Address", value: "admission@emrsbehraichup.in" },
        ]
    },
    {
        title: "Emergency",
        details: [
            { icon: <Mail className="w-5 h-5 text-orange-500" />, label: "Email Address", value: "emergency@emrsbehraichup.in" },
        ]
    }
];

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-background">
            <Navbar />
            <main className="container mx-auto py-12 px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Contact Us</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">We'd love to hear from you. Here's how you can reach us.</p>
                </div>

                {/* Contact Information Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {contactInfo.map((info, index) => (
                        <Card key={index} className="shadow-lg rounded-xl">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-white">{info.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {info.details.map((detail, detailIndex) => (
                                        <div key={detailIndex} className="flex items-start gap-4">
                                            <div className="flex-shrink-0">{detail.icon}</div>
                                            <div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{detail.label}</p>
                                                <p className="font-semibold text-gray-700 dark:text-gray-200">{detail.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Contact Form */}
                <Card className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 shadow-lg rounded-xl">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">Send us a Message</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
                                    <Input id="name" placeholder="Enter your name" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                                    <Input id="email" type="email" placeholder="Enter your email" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Subject</label>
                                <Input id="subject" placeholder="Enter the subject" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Message</label>
                                <Textarea id="message" placeholder="Type your message here." className="min-h-[150px]" />
                            </div>
                            <div className="text-center">
                                <Button type="submit" size="lg" className="w-full md:w-auto">Send Message</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    )
}
