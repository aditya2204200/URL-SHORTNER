import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/NavBar";

const RootLayout = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        /* Sky Blue Bright Moving Gradient */
        background:
          "linear-gradient(-45deg, #0284c7, #38bdf8, #0284c7, #0ea5e9)",
        backgroundSize: "400% 400%",
        animation: "skyGradientMove 8s ease infinite",
      }}
    >
      <style>{`
        @keyframes skyGradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <Navbar />

      <main style={{ flex: 1, width: "100%" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
