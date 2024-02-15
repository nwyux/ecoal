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
import Discover from "./pages/Discover";
import Browse from "./pages/Browse";
import Dashboard from "./components/Dashboard";
import QuestionsAccordeon from "./pages/Questions";

function App() {
  return (
    <div className="overflow-hidden bg-blanc min-h-[100vh]">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/article" element={<ArticleList />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/browse" element={<Browse />} />        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/questions" element={<QuestionsAccordeon />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
