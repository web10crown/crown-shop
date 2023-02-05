import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductsPage from "./pages/Products";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
const App = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ToastContainer theme="dark" autoClose={2500} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:_id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate replace to={"/"} />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate replace to={"/"} />}
          />
          <Route
            path="/admin"
            element={
              user && user.isAdmin ? <Admin /> : <Navigate replace to={"/"} />
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
