import "./App.css";
import "./scss/style.scss";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Article from "./components/Article";
import Home from "./pages/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import ArticleList from "./components/ArticleList";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/article" element={<ArticleList />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
