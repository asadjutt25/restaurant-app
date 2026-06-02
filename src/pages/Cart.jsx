import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    subtotal,
    deliveryFee,
    grandTotal,
    totalItems,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-extrabold text-dark mb-3">
            Your Cart is Empty
          </h2>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added any delicious items yet. Explore our
            menu and find something you love!
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-orange-600 text-white font-bold rounded-full transition-all text-lg"
          >
            🍽️ Explore Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light">
      {/* Page Header */}
      <div className="bg-dark text-white py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
              Your <span className="text-primary">Cart</span>
            </h1>
            <p className="text-gray-400">
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            </p>
            <div className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-500">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>›</span>
              <Link to="/menu" className="hover:text-primary transition-colors">Menu</Link>
              <span>›</span>
              <span className="text-primary">Cart</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="font-bold text-dark text-lg">Order Items</h2>
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear All
                </button>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-50">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 px-6 py-5 hover:bg-gray-50/50 transition-colors"
                  >
                    {/* Image */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-dark text-base sm:text-lg leading-tight">
                            {item.name}
                          </h3>
                          <span className="text-xs text-primary font-medium">{item.category}</span>
                          <p className="text-primary font-extrabold text-lg mt-1">
                            Rs. {item.price.toLocaleString()}
                          </p>
                        </div>
                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all flex-shrink-0"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* Quantity Controls & Subtotal */}
                      <div className="flex items-center justify-between mt-3">
                        {/* Qty */}
                        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                          <button
                            onClick={() => decreaseQty(item.id)}
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-dark font-bold hover:bg-primary hover:text-white transition-all shadow-sm text-lg"
                          >
                            −
                          </button>
                          <span className="w-10 text-center font-bold text-dark text-base">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQty(item.id)}
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-dark font-bold hover:bg-primary hover:text-white transition-all shadow-sm text-lg"
                          >
                            +
                          </button>
                        </div>
                        {/* Item Total */}
                        <span className="font-bold text-dark text-sm sm:text-base">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-primary hover:text-orange-600 font-semibold transition-colors"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 mt-6 lg:mt-0">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="font-bold text-dark text-xl mb-6 pb-3 border-b border-gray-100">
                Order Summary
              </h2>

              {/* Items List */}
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-500 flex-1 pr-2 truncate">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-semibold text-dark whitespace-nowrap">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculations */}
              <div className="space-y-3 border-t border-gray-100 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold text-dark">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-1">
                    Delivery Fee
                    {deliveryFee === 0 && (
                      <span className="text-xs text-green-500 bg-green-50 px-1.5 py-0.5 rounded-full">
                        Free
                      </span>
                    )}
                  </span>
                  <span className={`font-semibold ${deliveryFee === 0 ? "text-green-500" : "text-dark"}`}>
                    {deliveryFee === 0 ? "FREE" : `Rs. ${deliveryFee}`}
                  </span>
                </div>

                {deliveryFee > 0 && (
                  <div className="bg-orange-50 border border-orange-100 rounded-xl p-3">
                    <p className="text-xs text-orange-700">
                      💡 Add Rs. {(2000 - subtotal).toLocaleString()} more for{" "}
                      <span className="font-bold">FREE delivery!</span>
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <span className="font-bold text-dark text-lg">Grand Total</span>
                  <span className="font-extrabold text-primary text-xl">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="block w-full mt-6 py-4 bg-primary hover:bg-orange-600 text-white font-bold text-center rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 text-lg"
              >
                Proceed to Checkout →
              </Link>

              {/* Trust Badges */}
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-400">
                <span>🔒 Secure</span>
                <span>•</span>
                <span>🚀 Fast Delivery</span>
                <span>•</span>
                <span>💯 Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;