import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import {
    Search,
    CalendarCheck,
    UserCheck,
    Settings,
    ShieldCheck,
    Clock,
    CheckCircle2
} from "lucide-react";

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1">
                <section className="py-16 md:py-24 bg-primary/5 text-center">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl font-bold md:text-5xl mb-6">How Mazdoor Connect Works</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Connecting you with verified professionals in 3 easy steps.
                        </p>
                    </div>
                </section>

                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid gap-12 md:grid-cols-3">
                            <div className="text-center space-y-4">
                                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <Search className="h-8 w-8" />
                                </div>
                                <h3 className="text-2xl font-bold">1. Find a Worker</h3>
                                <p className="text-muted-foreground">
                                    Browse through our verified worker profiles. Filter by category, rating, and location to find the right person for the job.
                                </p>
                            </div>
                            <div className="text-center space-y-4">
                                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <CalendarCheck className="h-8 w-8" />
                                </div>
                                <h3 className="text-2xl font-bold">2. Book Appointment</h3>
                                <p className="text-muted-foreground">
                                    Select a convenient time slot and provide your address. Our platform coordinates with the worker instantly.
                                </p>
                            </div>
                            <div className="text-center space-y-4">
                                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <CheckCircle2 className="h-8 w-8" />
                                </div>
                                <h3 className="text-2xl font-bold">3. Get Work Done</h3>
                                <p className="text-muted-foreground">
                                    The worker arrives on time, completes the job with professional quality, and you pay after confirmation.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-24 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Our Safety Standard</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {[
                                { title: "CNIC Verified", desc: "Every worker must provide a valid CNIC for identity verification.", icon: <UserCheck /> },
                                { title: "Police Clearance", desc: "Background checks performed via local police department records.", icon: <ShieldCheck /> },
                                { title: "Skill Tested", desc: "Workers undergo a basic skill assessment before joining our network.", icon: <Settings /> },
                                { title: "On-Time Arrival", desc: "We track performance to ensure workers respect your schedule.", icon: <Clock /> },
                            ].map((item, i) => (
                                <Card key={i} className="border-none shadow-sm">
                                    <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                                        <div className="text-primary h-10 w-10">
                                            {item.icon}
                                        </div>
                                        <h4 className="font-bold">{item.title}</h4>
                                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
