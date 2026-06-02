import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { useCart } from "./context/useCart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Reservation from "./pages/Reservation";

const Notification = () => {
  const { notification } = useCart();
  if (!notification) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-dark text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
      <span className="text-xl">🛒</span>
      <span className="font-medium text-sm">{notification}</span>
    </div>
  );
};

const AppContent = () => (
  <Router>
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/reservation" element={<Reservation />} />
        </Routes>
      </main>
      <Footer />
      <Notification />
    </div>
  </Router>
);

const App = () => (
  <CartProvider>
    <AppContent />
  </CartProvider>
);

export default App;