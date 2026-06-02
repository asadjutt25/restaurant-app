import { useState, useMemo } from "react";
import { menuItems, categories } from "../data/menuData";
import { useCart } from "../context/useCart";
import { Link } from "react-router-dom";

const Menu = () => {
  const { addToCart, cartItems } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [addedItems, setAddedItems] = useState({});

  // ✅ useMemo use karo - useEffect + setState hatao
  const filteredItems = useMemo(() => {
    let result = [...menuItems];

    if (activeCategory !== "All") {
      result = result.filter((item) => item.category === activeCategory);
    }

    if (searchQuery.trim()) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  const getItemQtyInCart = (id) => {
    const item = cartItems.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  const categoryIcons = {
    All: "🍽️",
    Starters: "🥗",
    "Main Course": "🍛",
    Pizza: "🍕",
    Burgers: "🍔",
    Drinks: "🥤",
    Desserts: "🍰",
  };

  return (
    <div className="min-h-screen bg-light">
      {/* Page Header */}
      <div className="bg-dark text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Explore Our Menu
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold mt-2 mb-4">
              Our <span className="text-primary">Delicious</span> Menu
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              From starters to desserts, explore our wide range of
              mouth-watering dishes crafted by expert chefs.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>›</span>
              <span className="text-primary">Menu</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search dishes, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-dark focus:outline-none focus:border-primary cursor-pointer min-w-[180px]"
          >
            <option value="default">Sort: Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "bg-white text-gray-600 hover:bg-primary/10 hover:text-primary border border-gray-200"
              }`}
            >
              <span>{categoryIcons[cat]}</span>
              <span>{cat}</span>
              {cat !== "All" && (
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeCategory === cat
                      ? "bg-white/30 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {menuItems.filter((i) => i.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-500 text-sm">
            Showing{" "}
            <span className="font-bold text-dark">{filteredItems.length}</span>{" "}
            {filteredItems.length === 1 ? "dish" : "dishes"}
            {activeCategory !== "All" && (
              <span>
                {" "}
                in{" "}
                <span className="text-primary font-semibold">
                  {activeCategory}
                </span>
              </span>
            )}
          </p>
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-dark mb-2">
              No dishes found
            </h3>
            <p className="text-gray-500 mb-6">
              Try a different search term or category
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-orange-600 transition"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((dish) => {
            const qtyInCart = getItemQtyInCart(dish.id);
            const isAdded = addedItems[dish.id];

            return (
              <div
                key={dish.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                <div className="relative overflow-hidden h-44">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {dish.badge && (
                    <span className="absolute top-2.5 left-2.5 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      {dish.badge}
                    </span>
                  )}
                  <div className="absolute top-2.5 right-2.5 bg-white/95 rounded-full px-2 py-0.5 flex items-center gap-1">
                    <span className="text-yellow-400 text-xs">⭐</span>
                    <span className="text-xs font-bold text-dark">
                      {dish.rating}
                    </span>
                  </div>
                  {qtyInCart > 0 && (
                    <div className="absolute bottom-2.5 right-2.5 bg-primary text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                      {qtyInCart}
                    </div>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-dark text-base leading-tight flex-1">
                      {dish.name}
                    </h3>
                    <span className="text-xs text-gray-400 whitespace-nowrap bg-gray-50 px-1.5 py-0.5 rounded">
                      ⏱ {dish.time}
                    </span>
                  </div>
                  <span className="text-xs text-primary font-medium mb-2">
                    {dish.category}
                  </span>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 flex-1 line-clamp-2">
                    {dish.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-extrabold text-primary">
                      Rs. {dish.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleAddToCart(dish)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 ${
                        isAdded
                          ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                          : "bg-primary hover:bg-orange-600 text-white hover:shadow-lg hover:shadow-primary/30"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <span>✓</span> Added!
                        </>
                      ) : (
                        <>
                          <span>+</span> Add
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Menu;