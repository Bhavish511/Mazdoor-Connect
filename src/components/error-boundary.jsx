import React from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col bg-background">
                    <Header />
                    <main className="flex-1 flex items-center justify-center p-8">
                        <div className="max-w-md w-full text-center space-y-6">
                            <div className="mx-auto w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
                                <ShieldAlert className="h-10 w-10" />
                            </div>
                            <h1 className="text-3xl font-bold">Something went wrong</h1>
                            <p className="text-muted-foreground text-lg">
                                We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
                            </p>
                            <Button
                                className="w-full h-12"
                                onClick={() => window.location.reload()}
                            >
                                Refresh Page
                            </Button>
                        </div>
                    </main>
                    <Footer />
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
