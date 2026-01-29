import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useAppSelector } from "@/store/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Phone, Mail, MapPin, Camera } from "lucide-react";
import { toast } from "sonner";

export default function CustomerProfilePage() {
    const { user } = useAppSelector((state) => state.auth);

    const handleSave = (e) => {
        e.preventDefault();
        toast.success("Profile updated successfully!");
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1 py-12">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h1 className="text-3xl font-bold mb-8">Personal Profile</h1>

                    <div className="grid gap-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-6">
                                <div className="relative group">
                                    <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold border-4 border-background shadow-md">
                                        {user?.name?.charAt(0) || "U"}
                                    </div>
                                    <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors">
                                        <Camera className="h-4 w-4" />
                                    </button>
                                </div>
                                <div>
                                    <CardTitle className="text-2xl">{user?.name}</CardTitle>
                                    <p className="text-muted-foreground capitalize">{user?.role} Account</p>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSave} className="space-y-6">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="p-name">Full Name</Label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input id="p-name" defaultValue={user?.name} className="pl-9" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="p-phone">Phone Number</Label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input id="p-phone" defaultValue={user?.phone} className="pl-9" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="p-email">Email Address</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input id="p-email" type="email" defaultValue={user?.email || ""} placeholder="your@email.com" className="pl-9" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="p-address">Primary Address</Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input id="p-address" defaultValue={user?.address || ""} placeholder="Full address" className="pl-9" />
                                        </div>
                                    </div>
                                    <Button type="submit" className="w-full">Save Changes</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
