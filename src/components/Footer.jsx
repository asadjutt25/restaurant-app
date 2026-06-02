import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-auto">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xl">🍽️</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  Spice<span className="text-primary">Hub</span>
                </h2>
                <p className="text-xs text-gray-400">Fine Dining</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Experience the finest culinary journey with authentic flavors from
              around the world. Quality food, exceptional service.
            </p>
            <div className="flex gap-3">
              {["facebook", "twitter", "instagram", "youtube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  <span className="text-sm capitalize">{social[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/menu", label: "Our Menu" },
                { to: "/reservation", label: "Reservations" },
                { to: "/checkout", label: "Order Now" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="text-primary">›</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <span className="text-primary mt-1">📍</span>
                <span>123 Food Street, Gulshan-e-Iqbal, Karachi, Pakistan</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <span className="text-primary">📞</span>
                <a href="tel:+923001234567" className="hover:text-primary transition-colors">
                  +92 305 7773073
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <span className="text-primary">✉️</span>
                <a href="mailto:asadshabbir7373@gmail.com" className="hover:text-primary transition-colors">
                  asadshabbir7373@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <span className="text-primary">🕐</span>
                <span>Mon-Sun: 11:00 AM - 11:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe for exclusive deals, new menu items & special offers!
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
              />
              <button className="px-4 py-2.5 bg-primary hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-sm">
            © 2025 Asad Shabbir . All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm">🔒 Secure Payments</span>
            <div className="flex gap-2">
              {["💳", "🏦", "📱"].map((icon, i) => (
                <span key={i} className="text-lg">{icon}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;