import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginStart, loginSuccess } from '@/store/slices/authSlice';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Phone, ArrowRight } from 'lucide-react';

const mockUsers = {
    customer: {
        id: 'c1',
        name: 'Asad Hussain',
        email: 'asad@example.com',
        phone: '+92 321 1234567',
        role: 'customer' as const,
        createdAt: '2026-01-01',
        address: 'House 45, Street 12, DHA Phase 6, Karachi',
        favoriteWorkers: ['w1', 'w3'],
    },
    worker: {
        id: 'w1',
        name: 'Muhammad Ali',
        email: 'ali@example.com',
        phone: '+92 300 1234567',
        role: 'worker' as const,
        createdAt: '2024-01-15',
        category: 'electrician' as const,
        bio: '15 years experience',
        experience: 15,
        rating: 4.9,
        reviewCount: 127,
        jobsCompleted: 342,
        priceRange: { min: 800, max: 2500 },
        specialties: ['Wiring', 'Installation'],
        availableToday: true,
        verified: { cnic: true, police: true, skill: true, backgroundCheck: true },
        portfolio: [],
        services: [],
        availability: {
            monday: { available: true },
            tuesday: { available: true },
            wednesday: { available: true },
            thursday: { available: true },
            friday: { available: true },
            saturday: { available: true },
            sunday: { available: false },
            emergencyAvailable: true,
        },
        location: 'DHA Phase 5, Karachi',
        memberSince: 'January 2024',
    },
    admin: {
        id: 'a1',
        name: 'Admin User',
        email: 'admin@mazdoorconnect.pk',
        phone: '+92 300 0000000',
        role: 'admin' as const,
        createdAt: '2024-01-01',
        permissions: ['all'],
    },
};

export default function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.auth);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const [userType, setUserType] = useState<'customer' | 'worker'>('customer');

    const handleSendOtp = async () => {
        if (!phoneNumber) {
            toast.error('Please enter your phone number');
            return;
        }

        dispatch(loginStart());
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setShowOtp(true);
        toast.success('OTP sent to your phone number');
    };

    const handleVerifyOtp = async () => {
        if (!otp || otp.length !== 4) {
            toast.error('Please enter a valid 4-digit OTP');
            return;
        }

        dispatch(loginStart());
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const user = mockUsers[userType];
        dispatch(loginSuccess(user));
        toast.success('Login successful!');

        if (userType === 'customer') {
            navigate('/customer/dashboard');
        } else {
            navigate('/worker/dashboard');
        }
    };

    const handleDemoLogin = (type: 'customer' | 'worker' | 'admin') => {
        dispatch(loginStart());

        setTimeout(() => {
            const user = mockUsers[type];
            dispatch(loginSuccess(user));
            toast.success(`Logged in as ${type}`);

            if (type === 'customer') {
                navigate('/customer/dashboard');
            } else if (type === 'worker') {
                navigate('/worker/dashboard');
            } else {
                navigate('/admin/dashboard');
            }
        }, 500);
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1 flex items-center justify-center py-12 px-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Welcome Back</CardTitle>
                        <CardDescription>
                            Login to your Mazdoor Connect account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Tabs value={userType} onValueChange={(v) => setUserType(v as 'customer' | 'worker')}>
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="customer">Customer</TabsTrigger>
                                <TabsTrigger value="worker">Worker</TabsTrigger>
                            </TabsList>

                            <TabsContent value={userType} className="space-y-4 mt-4">
                                {!showOtp ? (
                                    <>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                                <Input
                                                    id="phone"
                                                    placeholder="+92 300 1234567"
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                    className="pl-9"
                                                />
                                            </div>
                                        </div>
                                        <Button
                                            className="w-full"
                                            onClick={handleSendOtp}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Sending...' : 'Send OTP'}
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <div className="space-y-2">
                                            <Label htmlFor="otp">Enter OTP</Label>
                                            <Input
                                                id="otp"
                                                placeholder="Enter 4-digit OTP"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                maxLength={4}
                                                className="text-center text-2xl tracking-widest"
                                            />
                                            <p className="text-xs text-muted-foreground text-center">
                                                OTP sent to {phoneNumber}
                                            </p>
                                        </div>
                                        <Button
                                            className="w-full"
                                            onClick={handleVerifyOtp}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Verifying...' : 'Verify & Login'}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="w-full"
                                            onClick={() => setShowOtp(false)}
                                        >
                                            Change Phone Number
                                        </Button>
                                    </>
                                )}
                            </TabsContent>
                        </Tabs>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Demo Accounts
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDemoLogin('customer')}
                                disabled={isLoading}
                            >
                                Customer
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDemoLogin('worker')}
                                disabled={isLoading}
                            >
                                Worker
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDemoLogin('admin')}
                                disabled={isLoading}
                            >
                                Admin
                            </Button>
                        </div>

                        <p className="text-center text-sm text-muted-foreground">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-primary hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    );
}
