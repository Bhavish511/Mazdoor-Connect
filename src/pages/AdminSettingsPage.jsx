import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Shield, Coins, Globe, Bell } from "lucide-react";

export default function AdminSettingsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1 py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-3xl font-bold mb-8">Platform Settings</h1>

                    <div className="grid gap-8">
                        {/* Financial Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Coins className="h-5 w-5" />
                                    Fee Management
                                </CardTitle>
                                <CardDescription>Configure service fees and platform commissions.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Flat Platform Fee (Rs.)</Label>
                                        <Input type="number" defaultValue={200} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Worker Commission (%)</Label>
                                        <Input type="number" defaultValue={5} />
                                    </div>
                                </div>
                                <Button onClick={() => toast.success("Financial settings updated.")}>Save Financial Config</Button>
                            </CardContent>
                        </Card>

                        {/* Marketplace Controls */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Globe className="h-5 w-5" />
                                    Marketplace Controls
                                </CardTitle>
                                <CardDescription>Global switches for the platform operations.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <p className="font-medium">Force Police Verification</p>
                                        <p className="text-sm text-muted-foreground">Workers cannot go live without police clearance</p>
                                    </div>
                                    <Button variant="outline">Enabled</Button>
                                </div>
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <p className="font-medium">New User Registration</p>
                                        <p className="text-sm text-muted-foreground">Allow new customers and workers to join</p>
                                    </div>
                                    <Button variant="outline">Active</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
