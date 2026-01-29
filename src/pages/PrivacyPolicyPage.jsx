import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1 py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                    <div className="prose dark:prose-invert max-w-none text-muted-foreground space-y-6">
                        <p><strong>Effective Date:</strong> January 25, 2026</p>

                        <h2 className="text-2xl font-bold text-foreground">1. Information We Collect</h2>
                        <p>We collect information you provide directly to us when you create an account, such as name, phone number, address, and for workers, your CNIC and identity documents.</p>

                        <h2 className="text-2xl font-bold text-foreground">2. How We Use Your Information</h2>
                        <p>We use the information to connect customers with workers, verify identity, process payments, and improve our services. Location data is used to find workers near your area.</p>

                        <h2 className="text-2xl font-bold text-foreground">3. Sharing of Information</h2>
                        <p>Worker contact information is shared with customers after a booking is confirmed. Customer address and phone number are shared with the worker for the purpose of completing the service.</p>

                        <h2 className="text-2xl font-bold text-foreground">4. Data Security</h2>
                        <p>We implement security measures to protect your data, including encryption for sensitive identification documents.</p>

                        <h2 className="text-2xl font-bold text-foreground">5. Your Choices</h2>
                        <p>You can update your profile information at any time via the dashboard. You can request account deletion by contacting support.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
