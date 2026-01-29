import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1">
                <section className="py-16 md:py-24 bg-primary/5">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h1 className="text-4xl font-bold md:text-5xl mb-8">About Mazdoor Connect</h1>
                        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed text-foreground">
                            <p>
                                Mazdoor Connect is Pakistan's premier platform for connecting households and businesses with verified, skilled daily-wage workers. Founded in 2024, our mission is to bring transparency, safety, and reliability to the informal labor market.
                            </p>
                            <p>
                                We understand the challenges of finding trustable help for home repairs and maintenance. That's why we built a system that prioritizes <strong>Identity Verification</strong>, <strong>Criminal Record Checks</strong>, and <strong>Quality Ratings</strong>.
                            </p>
                            <h2 className="text-2xl font-bold text-foreground pt-4">Why We Started</h2>
                            <p>
                                Pakistan has millions of skilled workers who lack a formal way to showcase their expertise. On the other side, customers often struggle with inconsistent pricing and safety concerns. Mazdoor Connect bridges this gap by creating a digital marketplace that empowers workers and provides peace of mind to customers.
                            </p>
                            <h2 className="text-2xl font-bold text-foreground pt-4">Our Values</h2>
                            <ul className="list-disc pl-6 space-y-3">
                                <li><strong>Trust First:</strong> Safety is non-negotiable. We verify every professional.</li>
                                <li><strong>Fair Pricing:</strong> We establish market-standard price ranges for all services.</li>
                                <li><strong>Worker Empowerment:</strong> We provide workers with a digital identity and growth opportunities.</li>
                                <li><strong>Community Driven:</strong> Your ratings and reviews shape the future of our platform.</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
