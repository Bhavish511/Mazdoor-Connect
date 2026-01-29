import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useAppSelector } from "@/store/hooks";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, MapPin, Briefcase, Award } from "lucide-react";
import { WORKER_CATEGORIES } from "@/lib/constants";
import { toast } from "sonner";

export default function WorkerProfilePage() {
    const { user } = useAppSelector((state) => state.auth);

    const handleSave = (e) => {
        e.preventDefault();
        toast.success("Worker profile updated successfully!");
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1 py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-3xl font-bold mb-8">Worker Profile Setup</h1>

                    <form onSubmit={handleSave} className="grid gap-8">
                        {/* Header Info */}
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-6">
                                <div className="relative group">
                                    <div className="h-28 w-28 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-4xl font-bold border-4 border-background shadow-md overflow-hidden">
                                        {user?.avatar ? <img src={user.avatar} className="object-cover h-full w-full" /> : (user?.name?.charAt(0) || "W")}
                                    </div>
                                    <button className="absolute -bottom-2 -right-2 p-2 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors">
                                        <Camera className="h-5 w-5" />
                                    </button>
                                </div>
                                <div>
                                    <CardTitle className="text-2xl">{user?.name}</CardTitle>
                                    <CardDescription className="flex items-center gap-2">
                                        <Award className="h-4 w-4 text-yellow-500" />
                                        Verified Professional
                                    </CardDescription>
                                </div>
                            </CardHeader>
                        </Card>

                        <div className="grid gap-8 md:grid-cols-2">
                            {/* Professional Info */}
                            <Card className="md:col-span-2">
                                <CardHeader>
                                    <CardTitle>Professional Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="w-category">Category</Label>
                                            <Select defaultValue={user?.category}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {WORKER_CATEGORIES.map(cat => (
                                                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="w-exp">Years of Experience</Label>
                                            <Input id="w-exp" type="number" defaultValue={user?.experience || 0} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="w-bio">Professional Bio</Label>
                                        <Textarea id="w-bio" rows={4} defaultValue={user?.bio} placeholder="Describe your skills and services..." />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Contact Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Contact & Location</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="w-phone">Work Phone</Label>
                                        <Input id="w-phone" defaultValue={user?.phone} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="w-location">Service Area (City)</Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input id="w-location" className="pl-9" defaultValue={user?.location || "Karachi"} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Verification Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Status</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100 dark:bg-green-950/30">
                                        <span className="text-sm font-medium">Availability</span>
                                        <span className="text-green-600 font-bold">Active</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100 dark:bg-blue-950/30">
                                        <span className="text-sm font-medium">CNIC Verification</span>
                                        <span className="text-blue-600 font-bold">Approved</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Button type="submit" size="lg" className="w-full">Save Profile Changes</Button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}
