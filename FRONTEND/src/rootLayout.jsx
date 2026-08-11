import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/NavBar";

const RootLayout = () => {
  return (
    <div
      style={{
        backgroundColor: "#0f172a", // Deep Dark Slate Background
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        color: "#ffffff",
      }}
    >
      <Navbar />
      <main style={{ flex: 1, width: "100%", backgroundColor: "#0f172a" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
