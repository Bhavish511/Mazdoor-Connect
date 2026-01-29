import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1 py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                    <div className="prose dark:prose-invert max-w-none text-muted-foreground space-y-6">
                        <p><strong>Last Updated:</strong> January 25, 2026</p>

                        <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
                        <p>By using Mazdoor Connect, you agree to be bound by these terms. If you do not agree, please do not use the service.</p>

                        <h2 className="text-2xl font-bold text-foreground">2. Description of Service</h2>
                        <p>Mazdoor Connect is a platform connecting customers with workers. We do not employ the workers; they are independent professionals responsible for their work quality.</p>

                        <h2 className="text-2xl font-bold text-foreground">3. User Obligations</h2>
                        <p>Users must provide accurate information. Workers must provide truthful credentials. Customers must provide a safe environment for workers to perform tasks.</p>

                        <h2 className="text-2xl font-bold text-foreground">4. Payment and Fees</h2>
                        <p>Payment is made directly to the worker after job completion unless stated otherwise. A platform fee of Rs. 200-300 applies to each booking.</p>

                        <h2 className="text-2xl font-bold text-foreground">5. Cancellation Policy</h2>
                        <p>Cancellations should be made at least 2 hours before the scheduled time. Frequent cancellations may lead to account suspension.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
