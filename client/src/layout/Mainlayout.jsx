import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Mainlayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}
