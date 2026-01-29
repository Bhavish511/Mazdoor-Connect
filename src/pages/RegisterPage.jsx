import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/authSlice';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { User, Phone, Briefcase, MapPin, ArrowRight } from 'lucide-react';
import { WORKER_CATEGORIES } from '@/lib/constants';

export default function RegisterPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.auth);

    const [userType, setUserType] = useState('customer');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        location: '',
        category: '',
        experience: '',
        agreeTerms: false,
    });

    const handleRegister = async () => {
        if (!formData.name || !formData.phone || !formData.agreeTerms) {
            toast.error('Please fill in required fields and agree to terms');
            return;
        }

        dispatch(loginStart());
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const mockUser = {
            id: `u${Date.now()}`,
            name: formData.name,
            phone: formData.phone,
            role: userType,
            createdAt: new Date().toISOString(),
            ...(userType === 'worker' && {
                category: formData.category,
                experience: Number(formData.experience),
                avatar: '',
                bio: 'Professional ' + formData.category,
                rating: 5,
                reviewCount: 1,
                jobsCompleted: 0,
                memberSince: '2026',
                location: formData.location || 'Karachi',
                verified: { cnic: true, police: false, skill: true },
                specialties: [formData.category],
                services: [],
                priceRange: { min: 1000, max: 5000 },
                availableToday: true
            }),
        };

        dispatch(loginSuccess({ user: mockUser, token: 'mock-token' }));
        toast.success('Registration successful!');

        if (userType === 'customer') {
            navigate('/customer/dashboard');
        } else {
            navigate('/worker/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1 flex items-center justify-center py-12 px-4">
                <Card className="w-full max-w-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
                        <CardDescription>
                            Join Mazdoor Connect as a Customer or a Verified Worker
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Tabs value={userType} onValueChange={(v) => setUserType(v)}>
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="customer">Customer</TabsTrigger>
                                <TabsTrigger value="worker">Worker</TabsTrigger>
                            </TabsList>

                            <TabsContent value={userType} className="space-y-4 mt-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name *</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="name"
                                            placeholder="Enter your full name"
                                            className="pl-9"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number *</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="phone"
                                            placeholder="+92 3XX XXXXXXX"
                                            className="pl-9"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="location">Area / City</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="location"
                                            placeholder="e.g. DHA Phase 5, Karachi"
                                            className="pl-9"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {userType === 'worker' && (
                                    <>
                                        <div className="space-y-2">
                                            <Label htmlFor="category">Category *</Label>
                                            <div className="relative">
                                                <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                                <select
                                                    id="category"
                                                    className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    value={formData.category}
                                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                >
                                                    <option value="">Select Category</option>
                                                    {WORKER_CATEGORIES.map((cat) => (
                                                        <option key={cat.id} value={cat.id}>
                                                            {cat.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="experience">Years of Experience</Label>
                                            <Input
                                                id="experience"
                                                type="number"
                                                placeholder="e.g. 5"
                                                value={formData.experience}
                                                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="flex items-start space-x-2 pt-2">
                                    <Checkbox
                                        id="terms"
                                        checked={formData.agreeTerms}
                                        onCheckedChange={(checked) =>
                                            setFormData({ ...formData, agreeTerms: !!checked })
                                        }
                                    />
                                    <label
                                        htmlFor="terms"
                                        className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        I agree to the{' '}
                                        <Link to="/terms-of-service" className="text-primary hover:underline">
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link to="/privacy-policy" className="text-primary hover:underline">
                                            Privacy Policy
                                        </Link>
                                    </label>
                                </div>

                                <Button
                                    className="w-full"
                                    onClick={handleRegister}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Creating Account...' : 'Create Account'}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </TabsContent>
                        </Tabs>

                        <p className="text-center text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary hover:underline font-medium">
                                Login here
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    );
}
