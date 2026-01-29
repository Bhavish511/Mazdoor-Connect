import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

const PENDING_VERIFICATIONS = [
    { id: "v1", name: "Ahmed Raza", category: "Electrician", phone: "03001234567", appliedAt: "Jan 24, 2026" },
    { id: "v2", name: "Gul Khan", category: "Plumber", phone: "03217654321", appliedAt: "Jan 23, 2026" },
    { id: "v3", name: "Irfan Ali", category: "Carpenter", phone: "03459876543", appliedAt: "Jan 21, 2026" },
];

export default function VerificationQueuePage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1 py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-8">Verification Queue</h1>

                    <Card>
                        <CardHeader>
                            <CardTitle>Pending Worker Applications</CardTitle>
                            <CardDescription>Review CNIC and police character certificates for new workers.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Worker</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Applied Date</TableHead>
                                        <TableHead>Documents</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {PENDING_VERIFICATIONS.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <div className="font-medium">{item.name}</div>
                                                <div className="text-xs text-muted-foreground">{item.phone}</div>
                                            </TableCell>
                                            <TableCell>{item.category}</TableCell>
                                            <TableCell>{item.appliedAt}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Badge variant="secondary" className="cursor-pointer hover:bg-muted">CNIC</Badge>
                                                    <Badge variant="secondary" className="cursor-pointer hover:bg-muted">Police Cert.</Badge>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => toast.error("Verification rejected.")}>
                                                        <XCircle className="h-4 w-4 mr-1" />
                                                        Reject
                                                    </Button>
                                                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => toast.success("Worker verified successfully!")}>
                                                        <CheckCircle className="h-4 w-4 mr-1" />
                                                        Approve
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
}
