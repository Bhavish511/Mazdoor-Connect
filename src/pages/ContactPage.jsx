import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Message sent! We will get back to you shortly.");
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1 py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid gap-12 lg:grid-cols-3">
                        {/* Info Column */}
                        <div className="lg:col-span-1 space-y-8">
                            <div>
                                <h1 className="text-3xl font-bold mb-4">Get in Touch</h1>
                                <p className="text-muted-foreground">
                                    Have questions or need assistance? Our support team is here to help you 24/7.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <Phone className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Call Us</p>
                                        <p className="font-bold">+92 300 1234567</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Email Us</p>
                                        <p className="font-bold">support@mazdoorconnect.pk</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Office</p>
                                        <p className="font-bold">DHA Phase 6, Karachi, Pakistan</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="lg:col-span-2">
                            <Card className="border shadow-lg">
                                <CardHeader>
                                    <CardTitle>Send a Message</CardTitle>
                                    <CardDescription>Fill out the form below and we'll respond within 60 minutes.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="c-name">Full Name</Label>
                                                <Input id="c-name" placeholder="Enter your name" required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="c-phone">Phone Number</Label>
                                                <Input id="c-phone" placeholder="+92 3XX XXXXXXX" required />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="c-subject">Subject</Label>
                                            <Input id="c-subject" placeholder="What is this regarding?" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="c-message">Message</Label>
                                            <Textarea id="c-message" placeholder="Type your message here..." rows={6} required />
                                        </div>
                                        <Button type="submit" className="w-full h-12 text-lg">
                                            <Send className="mr-2 h-5 w-5" />
                                            Send Message
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
