import { useApp } from '@/context/app-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CategoryCard } from '@/components/categories/category-card';
import { WORKER_CATEGORIES } from '@/types';

export default function CategoriesPage() {
    const { t } = useApp();

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1">
                <div className="container mx-auto px-4 py-12">
                    {/* Page Header */}
                    <div className="mb-12">
                        <h1 className="text-3xl font-bold text-foreground md:text-4xl">
                            {t("nav.categories")}
                        </h1>
                        <p className="mt-3 text-lg text-muted-foreground">
                            Find the right professional for your home service needs
                        </p>
                    </div>

                    {/* Categories Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {WORKER_CATEGORIES.map((category) => (
                            <CategoryCard key={category.id} category={category.id} />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
