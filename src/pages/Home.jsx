import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { popularDishes } from "../data/menuData";

import { useCart } from "../context/useCart";

// ✅ Component ke bahar rakho - HERO_COUNT constant
const heroSlides = [
  {
    title: "Taste the",
    highlight: "Extraordinary",
    subtitle:
      "Experience authentic flavors crafted with passion and the finest ingredients.",
    bg: "from-orange-900/80 to-dark/90",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=700&fit=crop",
  },
  {
    title: "Fresh &",
    highlight: "Delicious",
    subtitle:
      "Every dish is prepared fresh daily with locally sourced premium ingredients.",
    bg: "from-red-900/80 to-dark/90",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=700&fit=crop",
  },
  {
    title: "Fine Dining",
    highlight: "Experience",
    subtitle:
      "Elevate your dining experience in our elegantly designed restaurant.",
    bg: "from-amber-900/80 to-dark/90",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=700&fit=crop",
  },
];

// ✅ Constant - array ke bahar, stable value
const HERO_COUNT = heroSlides.length;

const stats = [
  { icon: "🍽️", value: "500+", label: "Menu Items" },
  { icon: "👨‍🍳", value: "50+", label: "Expert Chefs" },
  { icon: "⭐", value: "4.9", label: "Rating" },
  { icon: "🎉", value: "10K+", label: "Happy Customers" },
];

const features = [
  {
    icon: "🚀",
    title: "Fast Delivery",
    desc: "Hot food delivered to your door within 30-45 minutes, fresh and fast.",
  },
  {
    icon: "🌿",
    title: "Fresh Ingredients",
    desc: "We source only the finest, freshest ingredients from trusted local farms.",
  },
  {
    icon: "👨‍🍳",
    title: "Expert Chefs",
    desc: "Our world-class chefs bring 15+ years of culinary expertise to your plate.",
  },
  {
    icon: "💯",
    title: "Quality Guaranteed",
    desc: "Every dish passes rigorous quality checks before reaching your table.",
  },
];

const testimonials = [
  {
    name: "Ahmed Khan",
    review:
      "Absolutely amazing food! The Butter Chicken was the best I've ever had. Will definitely come back!",
    rating: 5,
    avatar: "AK",
  },
  {
    name: "Fatima Ali",
    review:
      "Beautiful ambiance, exceptional service, and mouth-watering food. SpiceHub never disappoints!",
    rating: 5,
    avatar: "FA",
  },
  {
    name: "Usman Raza",
    review:
      "Ordered delivery twice this week already. The Mutton Biryani is absolutely incredible!",
    rating: 5,
    avatar: "UR",
  },
];

const Home = () => {
  const { addToCart } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ HERO_COUNT use karo - no missing dependency warning
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_COUNT);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">

      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[85vh] min-h-[550px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-r ${slide.bg}`}
            />
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-px w-12 bg-primary"></span>
                <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                  Welcome to SpiceHub
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-4">
                {heroSlides[currentSlide].title}{" "}
                <span className="text-primary block">
                  {heroSlides[currentSlide].highlight}
                </span>
              </h1>
              <p className="text-gray-300 text-lg sm:text-xl mb-8 leading-relaxed">
                {heroSlides[currentSlide].subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/menu"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-orange-600 text-white font-bold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-1 text-lg"
                >
                  🍽️ Explore Menu
                </Link>
                <Link
                  to="/reservation"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-bold rounded-full backdrop-blur-sm transition-all duration-300 border border-white/30 text-lg"
                >
                  📅 Reserve a Table
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`transition-all duration-300 rounded-full ${
                i === currentSlide
                  ? "w-8 h-3 bg-primary"
                  : "w-3 h-3 bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Scroll Down */}
        <div className="absolute bottom-8 right-8 z-10 hidden sm:flex flex-col items-center gap-1 text-white/60 text-xs">
          <span>Scroll</span>
          <div className="w-px h-12 bg-white/30 animate-pulse"></div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="bg-primary py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(({ icon, value, label }) => (
              <div key={label} className="text-center text-white">
                <div className="text-3xl mb-1">{icon}</div>
                <div className="text-2xl sm:text-3xl font-extrabold">
                  {value}
                </div>
                <div className="text-orange-200 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POPULAR DISHES ===== */}
      <section className="py-16 sm:py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Our Specialties
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark mt-2 mb-4">
              Popular <span className="text-primary">Dishes</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Handpicked favorites loved by thousands of customers. Each dish
              tells a story of flavor and passion.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="h-1 w-12 bg-primary rounded-full"></div>
              <div className="h-1 w-6 bg-primary/40 rounded-full"></div>
              <div className="h-1 w-3 bg-primary/20 rounded-full"></div>
            </div>
          </div>

          {/* Dishes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {popularDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-52">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {dish.badge && (
                    <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                      {dish.badge}
                    </span>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <span className="text-yellow-400 text-xs">⭐</span>
                    <span className="text-xs font-bold text-dark">
                      {dish.rating}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-dark text-lg leading-tight">
                      {dish.name}
                    </h3>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap ml-2">
                      ⏱ {dish.time}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {dish.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-extrabold text-primary">
                      Rs. {dish.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => addToCart(dish)}
                      className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-orange-600 text-white rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 active:scale-95"
                    >
                      <span>+</span> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-full transition-all duration-300 text-lg"
            >
              View Full Menu →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-2">
              The SpiceHub <span className="text-primary">Difference</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="text-center p-6 rounded-2xl bg-light hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {icon}
                </div>
                <h3 className="font-bold text-dark text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SPECIAL OFFER BANNER ===== */}
      <section className="py-16 bg-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-10 text-8xl">🍕</div>
          <div className="absolute top-8 right-20 text-6xl">🍔</div>
          <div className="absolute bottom-4 left-1/3 text-7xl">🍜</div>
          <div className="absolute bottom-8 right-10 text-5xl">🥗</div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-full uppercase tracking-wider">
            🔥 Limited Time Offer
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-6 mb-4">
            Free Delivery on Orders{" "}
            <span className="text-primary">Above Rs. 2,000</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Order more, save more! Enjoy complimentary delivery on all orders
            exceeding Rs. 2,000.
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-10 py-4 bg-primary hover:bg-orange-600 text-white font-bold rounded-full text-xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1"
          >
            🛒 Order Now
          </Link>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-16 sm:py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Customer Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-2">
              What People <span className="text-primary">Say</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, review, rating, avatar }) => (
              <div
                key={name}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                  &quot;{review}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {avatar}
                  </div>
                  <div>
                    <p className="font-bold text-dark text-sm">{name}</p>
                    <p className="text-gray-400 text-xs">Verified Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Experience Amazing Food?
          </h2>
          <p className="text-orange-200 text-lg mb-8">
            Book a table or order online. We guarantee an unforgettable
            experience!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/reservation"
              className="px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-all text-lg"
            >
              📅 Book a Table
            </Link>
            <Link
              to="/menu"
              className="px-8 py-4 bg-dark/30 hover:bg-dark/50 text-white font-bold rounded-full transition-all text-lg border border-white/30"
            >
              🍽️ Order Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;