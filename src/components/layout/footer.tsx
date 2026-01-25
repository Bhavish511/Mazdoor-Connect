
import { Link } from "react-router-dom";
import { useApp } from "@/context/app-context";
import { WORKER_CATEGORIES } from "@/types";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const { t } = useApp();

  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl">
                M
              </div>
              <span className="font-bold text-xl">{t("app.name")}</span>
            </Link>
            <p className="text-sm text-sidebar-foreground/70">
              {t("hero.subheadline")}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-sidebar-foreground/70 transition-colors hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-sidebar-foreground/70 transition-colors hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-sidebar-foreground/70 transition-colors hover:text-primary"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t("nav.categories")}</h3>
            <ul className="space-y-2">
              {WORKER_CATEGORIES.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/categories/${category.id}`}
                    className="text-sm text-sidebar-foreground/70 transition-colors hover:text-primary"
                  >
                    {t(`category.${category.id}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/how-it-works"
                  className="text-sm text-sidebar-foreground/70 transition-colors hover:text-primary"
                >
                  {t("nav.howItWorks")}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-sidebar-foreground/70 transition-colors hover:text-primary"
                >
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-sidebar-foreground/70 transition-colors hover:text-primary"
                >
                  {t("nav.contact")}
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-sm text-sidebar-foreground/70 transition-colors hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-sm text-sidebar-foreground/70 transition-colors hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t("nav.contact")}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-sidebar-foreground/70">
                <Phone className="h-4 w-4 text-primary" />
                +92 300 1234567
              </li>
              <li className="flex items-center gap-2 text-sm text-sidebar-foreground/70">
                <Mail className="h-4 w-4 text-primary" />
                info@mazdoorconnect.pk
              </li>
              <li className="flex items-start gap-2 text-sm text-sidebar-foreground/70">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                Karachi, Pakistan
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-sidebar-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-sidebar-foreground/70">
              &copy; {new Date().getFullYear()} {t("app.name")}. {t("footer.rights")}.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="/privacy-policy"
                className="text-sm text-sidebar-foreground/70 transition-colors hover:text-primary"
              >
                Privacy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-sm text-sidebar-foreground/70 transition-colors hover:text-primary"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
