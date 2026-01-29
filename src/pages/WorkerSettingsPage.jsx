import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Trash2, Shield, Bell, Smartphone } from "lucide-react";

export default function WorkerSettingsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1 py-12">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h1 className="text-3xl font-bold mb-8">Settings</h1>

                    <div className="space-y-8">
                        {/* Notifications */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bell className="h-5 w-5" />
                                    Notifications
                                </CardTitle>
                                <CardDescription>Manage how you get notified about new job requests.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>SMS Notifications</Label>
                                        <p className="text-sm text-muted-foreground">Receive new lead alerts via SMS</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between border-t pt-6">
                                    <div className="space-y-0.5">
                                        <Label>Call-to-Client</Label>
                                        <p className="text-sm text-muted-foreground">Auto-trigger calls for high priority jobs</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Privacy */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5" />
                                    Privacy & Safety
                                </CardTitle>
                                <CardDescription>Control your profile visibility on the marketplace.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Show Phone in Profile</Label>
                                        <p className="text-sm text-muted-foreground">Allow anyone to see your contact before booking</p>
                                    </div>
                                    <Switch />
                                </div>
                                <div className="flex items-center justify-between border-t pt-6">
                                    <div className="space-y-0.5">
                                        <Label>Public Portfolio</Label>
                                        <p className="text-sm text-muted-foreground">Make your work gallery visible to guests</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Danger Zone */}
                        <Card className="border-destructive/50">
                            <CardHeader>
                                <CardTitle className="text-destructive flex items-center gap-2">
                                    <Trash2 className="h-5 w-5" />
                                    Danger Zone
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">Once you delete your account, all your rating history and job records will be permanently removed.</p>
                                <Button variant="destructive" onClick={() => toast.error("Please contact support to initiate account deletion.")}>
                                    Delete Account
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
