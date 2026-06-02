import { useState } from "react";
import { Link } from "react-router-dom";

// ✅ Component ke bahar rakho - pure function
const generateBookingId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `RES-${result}`;
};

const Reservation = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    occasion: "",
    seatingPref: "indoor",
    specialRequests: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ useState with initializer function - render mein directly use kar sakte hain
  const [bookingId, setBookingId] = useState(() => generateBookingId());

  const timeSlots = [
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM",
    "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM",
    "10:00 PM",
  ];

  const occasions = [
    "Birthday", "Anniversary", "Date Night", "Business Dinner",
    "Family Gathering", "Wedding", "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name required";
    if (!formData.email.trim()) newErrors.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone required";
    if (!formData.date) newErrors.date = "Date required";
    if (!formData.time) newErrors.time = "Time required";
    if (!formData.guests) newErrors.guests = "Number of guests required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 border rounded-xl text-dark text-sm focus:outline-none focus:ring-2 transition-all ${
      errors[field]
        ? "border-red-400 focus:ring-red-200 bg-red-50"
        : "border-gray-200 focus:border-primary focus:ring-primary/20"
    }`;

  if (submitted) {
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
              Table Reserved! 🎉
            </h2>
            <p className="text-gray-500 mb-6">
              Your reservation is confirmed. We look forward to seeing you!
            </p>
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
              <p className="text-primary font-semibold text-sm">
                Booking Reference
              </p>
              {/* ✅ bookingId directly - no .current needed */}
              <p className="text-2xl font-extrabold text-dark">{bookingId}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 text-left mb-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Guest Name</span>
                <span className="font-semibold">
                  {formData.firstName} {formData.lastName}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Date</span>
                <span className="font-semibold">
                  {new Date(formData.date + "T00:00:00").toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Time</span>
                <span className="font-semibold">{formData.time}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Guests</span>
                <span className="font-semibold">
                  {formData.guests}{" "}
                  {parseInt(formData.guests) === 1 ? "Person" : "People"}
                </span>
              </div>
              {formData.occasion && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Occasion</span>
                  <span className="font-semibold">{formData.occasion}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Seating</span>
                <span className="font-semibold capitalize">
                  {formData.seatingPref}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              📧 Confirmation sent to{" "}
              <span className="font-semibold text-dark">{formData.email}</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/"
                className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-orange-600 transition text-center"
              >
                Back to Home
              </Link>
              <button
                onClick={() => {
                  setSubmitted(false);
                  // ✅ New ID generate karo next reservation ke liye
                  setBookingId(generateBookingId());
                  setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    date: "",
                    time: "",
                    guests: "2",
                    occasion: "",
                    seatingPref: "indoor",
                    specialRequests: "",
                  });
                }}
                className="flex-1 py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition text-center"
              >
                New Reservation
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light">
      {/* Page Header */}
      <div className="bg-dark text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Book Your Spot
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold mt-2 mb-4">
            Table <span className="text-primary">Reservation</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Reserve your table and enjoy a premium dining experience. Perfect
            for every occasion, big or small.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>›</span>
            <span className="text-primary">Reservation</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="lg:grid lg:grid-cols-5 lg:gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
              <h2 className="text-xl font-bold text-dark mb-6">
                Reservation Details
              </h2>

              <form onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
                </div>

                {/* Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">
                      Email *
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
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0300-1234567"
                      className={inputClass("phone")}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">
                      Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      min={getTodayDate()}
                      onChange={handleChange}
                      className={inputClass("date")}
                    />
                    {errors.date && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.date}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">
                      Time *
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className={inputClass("time")}
                    >
                      <option value="">Select Time</option>
                      {timeSlots.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    {errors.time && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.time}
                      </p>
                    )}
                  </div>
                </div>

                {/* Guests & Occasion */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">
                      Number of Guests *
                    </label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className={inputClass("guests")}
                    >
                      {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Person" : "People"}
                        </option>
                      ))}
                    </select>
                    {errors.guests && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.guests}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">
                      Occasion
                    </label>
                    <select
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-dark text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Select Occasion (Optional)</option>
                      {occasions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Seating Preference */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-dark mb-3">
                    Seating Preference
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "indoor", label: "Indoor", icon: "🏠" },
                      { value: "outdoor", label: "Outdoor", icon: "🌿" },
                      { value: "private", label: "Private Room", icon: "🔒" },
                    ].map(({ value, label, icon }) => (
                      <label
                        key={value}
                        className={`flex flex-col items-center p-3 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.seatingPref === value
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 hover:border-primary/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name="seatingPref"
                          value={value}
                          checked={formData.seatingPref === value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <span className="text-2xl mb-1">{icon}</span>
                        <span className="text-xs font-semibold text-dark text-center">
                          {label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Special Requests */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-dark mb-1.5">
                    Special Requests
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any dietary restrictions, allergies, special arrangements, wheelchair access, etc."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-dark text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-primary hover:bg-orange-600 text-white font-bold rounded-xl transition-all duration-200 text-lg hover:shadow-lg hover:shadow-primary/30 disabled:opacity-60 flex items-center justify-center gap-2"
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
                      Confirming...
                    </>
                  ) : (
                    "📅 Confirm Reservation"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Info Sidebar */}
          <div className="lg:col-span-2 mt-6 lg:mt-0 space-y-5">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-dark text-lg mb-4">
                Restaurant Info
              </h3>
              <div className="space-y-3">
                {[
                  {
                    icon: "📍",
                    label: "Location",
                    value: "123 Food Street, Gulshan-e-Iqbal, Karachi",
                  },
                  { icon: "📞", label: "Phone", value: "+92 305 7773073" },
                  {
                    icon: "✉️",
                    label: "Email",
                    value: "asadshabbir7373@gmail.com",
                  },
                  {
                    icon: "🕐",
                    label: "Hours",
                    value: "Mon–Sun: 11 AM – 11 PM",
                  },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex gap-3">
                    <span className="text-xl flex-shrink-0">{icon}</span>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">
                        {label}
                      </p>
                      <p className="text-sm text-dark font-semibold">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
              <h3 className="font-bold text-dark text-lg mb-4 flex items-center gap-2">
                <span>📋</span> Reservation Policy
              </h3>
              <ul className="space-y-2">
                {[
                  "Reservations must be made at least 2 hours in advance.",
                  "We hold tables for 15 minutes past reservation time.",
                  "For parties of 10+, please call us directly.",
                  "Cancellations should be made 2 hours before your reservation.",
                  "Confirmation email will be sent within 5 minutes.",
                ].map((policy, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <span className="text-primary font-bold mt-0.5">›</span>
                    <span>{policy}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🪑", label: "Total Capacity", value: "200 Seats" },
                { icon: "🌿", label: "Private Rooms", value: "5 Available" },
                { icon: "🅿️", label: "Parking", value: "Free Parking" },
                { icon: "🎵", label: "Live Music", value: "Fri & Sat" },
              ].map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="bg-white rounded-xl p-4 text-center shadow-sm"
                >
                  <div className="text-3xl mb-1">{icon}</div>
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="text-sm font-bold text-dark">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;