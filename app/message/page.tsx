import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function Message() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-background">
            <Navbar />
            <main className="container mx-auto py-12 px-4">
                <div className="space-y-16">
                    {/* Director's Message Section */}
                    <Card className="overflow-hidden border-none shadow-none bg-transparent">
                        <div className="md:grid md:grid-cols-12 md:gap-12 items-start">
                            {/* Blue Logo Image */}
                            <div className="md:col-span-4 flex justify-center items-start mb-8 md:mb-0">
                                <div className="w-48 h-48 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                                    <div className="w-32 h-32 bg-blue-500 rounded-full"></div>
                                </div>
                            </div>
                            {/* Director's Text Content */}
                            <div className="md:col-span-8">
                                <CardHeader className="px-0 pt-0">
                                    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Message from Director's Desk</p>
                                    <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">
                                        Mr. L. Venkateshwarlu, IAS
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="px-0">
                                    <div className="text-base text-gray-600 dark:text-gray-300 space-y-4 text-justify">
                                        <p>
                                            Welcome to Eklavya Modern Residential School. Today, the role of a school is not only to pursue academic excellence but also to motivate and empower its students to be lifelong learners, critical thinkers, and productive members of an ever-changing global society. This is exactly what we at St. Michael’s are trying to do. We are striving to provide our students with an atmosphere for multifaceted development where every child is encouraged to channelize his/her potential in the pursuit of excellence. In our curriculum, the primary focus is on the student and every child is involved actively in the learning process.
                                        </p>
                                    </div>
                                </CardContent>
                            </div>
                        </div>
                    </Card>

                    {/* Principal's Message Section */}
                    <Card className="overflow-hidden border-none shadow-none bg-transparent">
                        <div className="md:grid md:grid-cols-12 md:gap-12 items-start">
                            {/* Principal's Text Content */}
                            <div className="md:col-span-8 order-2 md:order-1">
                                <CardHeader className="px-0 pt-0">
                                    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Message from Principal's Desk</p>
                                    <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">
                                        Mr. Upendra Nath Tiwari
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="px-0">
                                    <div className="text-base text-gray-600 dark:text-gray-300 space-y-4 text-justify">
                                        <p>
                                            Today, the role of a school is not only to pursue academic excellence but also to motivate and empower its students to be lifelong learners, critical thinkers, and productive members of an ever-changing global society. More than a decade back Emrs pledged to transform education. The school that is being run under the aegis of well established Management “ministry of tribal affairs government of India” has earned its own niche not only in saurha Lakhimpur khiri but across the globe. At Emrs we provide an atmosphere to our students for multifaceted development, where children are encouraged to channelize their potential in the pursuit of excellence. This can only be possible in a holistic, student-centric environment. The talents, skills, and abilities of each student need to be identified, nurtured, and encouraged so that he / she is able to reach greater heights. Students need to be provided with a platform to think, express, and exhibit their skills. It is necessary to empower them to negotiate several issues that confront them, with the teacher being a facilitator.
                                        </p>
                                        <p>
                                            The school is striving hard to make the best possible efforts to inculcate strong values combining with academics and extra-curricular activities in the children. Converting every individual into a self-reliant and independent citizen, the school provides an amalgam of scholastic and co-scholastic activities.
                                        </p>
                                        <p>
                                            No wonder, a student harnessed in such an atmosphere has every hope and possibility of becoming a responsible, balanced and a mature adult and is able to live in to contribute and to shoulder responsibilities of the society, of which he forms an integral part. Children need a supportive environment at home and at school. They need to set goals, within their reach until they gain confidence and determination. They should reexamine their priorities, set clean goals and make specific plans to achieve what they desire. Focusing on specific goals, helps them move forward purposefully in life. They would, thus, have the pleasure of watching their dreams into reality.
                                        </p>
                                    </div>
                                </CardContent>
                            </div>
                            {/* Principal's Image */}
                            <div className="md:col-span-4 order-1 md:order-2 flex justify-center items-start mb-8 md:mb-0">
                                <div className="relative">
                                    <Avatar className="w-60 h-60 rounded-lg shadow-lg">
                                        <AvatarImage src="https://placehold.co/240x240/EFEFEF/333333?text=Principal's+Photo" alt="Principal Upendra Nath Tiwari" />
                                        <AvatarFallback>UN</AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg text-center">
                                        <p className="font-bold">UPENDRA NATH TIWARI</p>
                                        <p className="text-sm">PRINCIPAL</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    )
}
