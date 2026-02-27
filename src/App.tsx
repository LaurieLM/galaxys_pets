import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <Navbar />
            
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Navigate to="/refuges" replace />} />
                    <Route path="/refuges" element={<div>Refuges</div>} />
                    <Route path="/health" element={<div>Santé</div>} />
                    <Route path="/nutrition" element={<div>Nutrition</div>} />
                </Routes>
            </main>

            <Footer />
        </div>
    )
}