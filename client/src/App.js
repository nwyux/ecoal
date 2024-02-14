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

function App() {
  return (
    <div className="overflow-hidden bg-blanc">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/article/:id" element={<Article />} />

      </Routes>

      <Footer />
    </div>
  );
}

export default App;
