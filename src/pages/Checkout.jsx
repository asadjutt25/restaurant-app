import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";

// ✅ Component ke bahar - pure function
const generateOrderId = () => {
  const chars = "0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `SPH-${result}`;
};

const Checkout = () => {
  const { cartItems, subtotal, deliveryFee, grandTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // ✅ useState use karo - render mein show karna hai
  const [orderId] = useState(() => generateOrderId());

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    area: "",
    notes: "",
    paymentMethod: "cash",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, "")))
      newErrors.phone = "Invalid phone number";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    if (formData.paymentMethod === "card") {
      const newErrors = {};
      if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number required";
      if (!formData.cardExpiry.trim()) newErrors.cardExpiry = "Expiry required";
      if (!formData.cardCvc.trim()) newErrors.cardCvc = "CVC required";
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOrderPlaced(true);
      clearCart();
    }, 2000);
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-2xl font-bold text-dark mb-3">
            No items to checkout
          </h2>
          <p className="text-gray-500 mb-6">
            Please add items to your cart first.
          </p>
          <Link
            to="/menu"
            className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-orange-600 transition"
          >
            Explore Menu
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Order Success Screen
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center px-4">
        <div className="max-w-lg w-full">
          <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-dark mb-2">
              Order Placed! 🎉
            </h2>
            <p className="text-gray-500 mb-4">
              Your order has been successfully placed and is being prepared!
            </p>
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
              <p className="text-primary font-semibold">Order ID</p>
              {/* ✅ orderId directly use karo - no .current */}
              <p className="text-2xl font-extrabold text-dark">{orderId}</p>
            </div>
            <div className="text-left bg-gray-50 rounded-xl p-4 mb-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Customer</span>
                <span className="font-semibold">
                  {formData.firstName} {formData.lastName}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Delivery to</span>
                <span className="font-semibold text-right max-w-[60%]">
                  {formData.address}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Payment</span>
                <span className="font-semibold capitalize">
                  {formData.paymentMethod === "cash"
                    ? "Cash on Delivery"
                    : "Card Payment"}
                </span>
              </div>
              <div className="flex justify-between text-sm border-t border-gray-200 pt-2 mt-2">
                <span className="font-bold text-dark">Total Paid</span>
                <span className="font-extrabold text-primary">
                  Rs. {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Estimated delivery time:{" "}
              <span className="font-bold text-dark">30-45 minutes</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/"
                className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-orange-600 transition text-center"
              >
                Back to Home
              </Link>
              <Link
                to="/menu"
                className="flex-1 py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition text-center"
              >
                Order More
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 border rounded-xl text-dark text-sm focus:outline-none focus:ring-2 transition-all ${
      errors[field]
        ? "border-red-400 focus:ring-red-200 bg-red-50"
        : "border-gray-200 focus:border-primary focus:ring-primary/20"
    }`;

  return (
    <div className="min-h-screen bg-light">
      {/* Header */}
      <div className="bg-dark text-white py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
            Secure <span className="text-primary">Checkout</span>
          </h1>
          <p className="text-gray-400">
            Complete your order in just a few steps
          </p>
          <div className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span>›</span>
            <Link to="/cart" className="hover:text-primary">
              Cart
            </Link>
            <span>›</span>
            <span className="text-primary">Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-10">
          {[
            { num: 1, label: "Delivery Info" },
            { num: 2, label: "Payment" },
            { num: 3, label: "Review" },
          ].map(({ num, label }, idx) => (
            <div key={num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    step > num
                      ? "bg-green-500 text-white"
                      : step === num
                      ? "bg-primary text-white ring-4 ring-primary/30"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {step > num ? "✓" : num}
                </div>
                <span
                  className={`text-xs mt-1 font-medium hidden sm:block ${
                    step >= num ? "text-primary" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
              </div>
              {idx < 2 && (
                <div
                  className={`w-16 sm:w-24 h-1 mx-2 rounded-full transition-all ${
                    step > num ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Form Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
              {/* STEP 1 */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-bold text-dark mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-sm">
                      📍
                    </span>
                    Delivery Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-dark mb-1.5">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Ahmed"
                        className={inputClass("firstName")}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-dark mb-1.5">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Khan"
                        className={inputClass("lastName")}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-dark mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ahmed@email.com"
                        className={inputClass("email")}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-dark mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="03001234567"
                        className={inputClass("phone")}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-dark mb-1.5">
                        Delivery Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="House #123, Street 5, Block A"
                        className={inputClass("address")}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.address}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-dark mb-1.5">
                        City *
                      </label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={inputClass("city")}
                      >
                        <option value="">Select City</option>
                        {[
                          "Karachi",
                          "Lahore",
                          "Islamabad",
                          "Rawalpindi",
                          "Peshawar",
                          "Quetta",
                          "Faisalabad",
                          "Multan",
                        ].map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      {errors.city && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.city}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-dark mb-1.5">
                        Area / Locality
                      </label>
                      <input
                        type="text"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        placeholder="Gulshan-e-Iqbal"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-dark text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-dark mb-1.5">
                        Special Instructions (Optional)
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                        placeholder="e.g., Please ring the bell twice, extra spicy, no onions..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-dark text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleNextStep}
                    className="mt-6 w-full py-4 bg-primary hover:bg-orange-600 text-white font-bold rounded-xl transition-all duration-200 text-lg hover:shadow-lg hover:shadow-primary/30"
                  >
                    Continue to Payment →
                  </button>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-dark mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-sm">
                      💳
                    </span>
                    Payment Method
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {[
                      {
                        value: "cash",
                        label: "Cash on Delivery",
                        icon: "💵",
                        desc: "Pay when you receive",
                      },
                      {
                        value: "card",
                        label: "Credit/Debit Card",
                        icon: "💳",
                        desc: "Visa, Mastercard, etc.",
                      },
                      {
                        value: "jazzcash",
                        label: "JazzCash / Easypaisa",
                        icon: "📱",
                        desc: "Mobile wallet payment",
                      },
                    ].map(({ value, label, icon, desc }) => (
                      <label
                        key={value}
                        className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.paymentMethod === value
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 hover:border-primary/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={value}
                          checked={formData.paymentMethod === value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <span className="text-3xl mb-2">{icon}</span>
                        <span className="font-bold text-dark text-sm text-center">
                          {label}
                        </span>
                        <span className="text-xs text-gray-400 text-center mt-1">
                          {desc}
                        </span>
                        {formData.paymentMethod === value && (
                          <div className="mt-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        )}
                      </label>
                    ))}
                  </div>

                  {formData.paymentMethod === "card" && (
                    <div className="bg-gray-50 rounded-xl p-5 space-y-4">
                      <h3 className="font-semibold text-dark">Card Details</h3>
                      <div>
                        <label className="block text-sm font-semibold text-dark mb-1.5">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className={inputClass("cardNumber")}
                        />
                        {errors.cardNumber && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.cardNumber}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-dark mb-1.5">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            maxLength={5}
                            className={inputClass("cardExpiry")}
                          />
                          {errors.cardExpiry && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.cardExpiry}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-dark mb-1.5">
                            CVC *
                          </label>
                          <input
                            type="text"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={handleChange}
                            placeholder="123"
                            maxLength={4}
                            className={inputClass("cardCvc")}
                          />
                          {errors.cardCvc && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.cardCvc}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>🔒</span>
                        <span>
                          Your payment information is encrypted and secure
                        </span>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === "jazzcash" && (
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                      <p className="text-purple-700 text-sm">
                        📱 You will receive a payment request on your registered
                        mobile number after order confirmation.
                      </p>
                    </div>
                  )}

                  {formData.paymentMethod === "cash" && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <p className="text-green-700 text-sm">
                        💵 Please keep the exact amount ready. Our delivery
                        rider cannot provide change.
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-4 border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:border-primary hover:text-primary transition-all"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="flex-1 py-4 bg-primary hover:bg-orange-600 text-white font-bold rounded-xl transition-all"
                    >
                      Review Order →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-bold text-dark mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-sm">
                      📋
                    </span>
                    Review Your Order
                  </h2>

                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-dark">Delivery Details</h3>
                      <button
                        onClick={() => setStep(1)}
                        className="text-primary text-xs font-semibold hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>
                        <span className="font-semibold text-dark">Name:</span>{" "}
                        {formData.firstName} {formData.lastName}
                      </p>
                      <p>
                        <span className="font-semibold text-dark">Phone:</span>{" "}
                        {formData.phone}
                      </p>
                      <p>
                        <span className="font-semibold text-dark">Email:</span>{" "}
                        {formData.email}
                      </p>
                      <p>
                        <span className="font-semibold text-dark">
                          Address:
                        </span>{" "}
                        {formData.address},{" "}
                        {formData.area && `${formData.area}, `}
                        {formData.city}
                      </p>
                      {formData.notes && (
                        <p>
                          <span className="font-semibold text-dark">
                            Notes:
                          </span>{" "}
                          {formData.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-dark">Payment Method</h3>
                      <button
                        onClick={() => setStep(2)}
                        className="text-primary text-xs font-semibold hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 capitalize">
                      {formData.paymentMethod === "cash"
                        ? "💵 Cash on Delivery"
                        : formData.paymentMethod === "card"
                        ? `💳 Card ending in ${formData.cardNumber.slice(-4)}`
                        : "📱 JazzCash / Easypaisa"}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <h3 className="font-bold text-dark mb-3">
                      Order Items ({cartItems.length})
                    </h3>
                    <div className="space-y-2">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-gray-600">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="font-semibold text-dark">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                      <div className="border-t border-gray-200 pt-2 mt-2 space-y-1">
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Subtotal</span>
                          <span>Rs. {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Delivery</span>
                          <span
                            className={
                              deliveryFee === 0
                                ? "text-green-500 font-semibold"
                                : ""
                            }
                          >
                            {deliveryFee === 0
                              ? "FREE"
                              : `Rs. ${deliveryFee}`}
                          </span>
                        </div>
                        <div className="flex justify-between font-bold text-dark text-base pt-1">
                          <span>Total</span>
                          <span className="text-primary">
                            Rs. {grandTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 py-4 border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:border-primary hover:text-primary transition-all"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={loading}
                      className="flex-1 py-4 bg-primary hover:bg-orange-600 text-white font-bold rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <svg
                            className="w-5 h-5 animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Placing Order...
                        </>
                      ) : (
                        "🎉 Place Order"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 mt-6 lg:mt-0">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h3 className="font-bold text-dark text-lg mb-4 pb-3 border-b border-gray-100">
                Order Summary
              </h3>
              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-dark truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400">×{item.quantity}</p>
                    </div>
                    <span className="text-xs font-bold text-primary whitespace-nowrap">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Delivery</span>
                  <span
                    className={
                      deliveryFee === 0 ? "text-green-500 font-semibold" : ""
                    }
                  >
                    {deliveryFee === 0 ? "FREE" : `Rs. ${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between font-extrabold text-dark text-lg pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-primary">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;