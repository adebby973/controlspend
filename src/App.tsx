import { Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Home from "./pages/home";
import Expense from "./pages/expenses";
import Savings from "./pages/savings";
import Profile from "./pages/profile";
import Layout from "./layout";

export default function App() {
  return (
    <Routes>
      {/* Login has NO header or footer */}
      <Route path="/" element={<Login />} />

      {/* Everything inside Layout gets header + footer */}
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/savings" element={<Savings />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
