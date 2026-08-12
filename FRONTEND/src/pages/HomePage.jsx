import UrlForm from "../components/UrlForm";
import UserUrl from "../components/UserUrl";

const HomePage = () => {
  return (
    <div style={{ padding: "40px 20px", display: "flex", justifyContent: "center" }}>
      {/* Self-contained CSS for 3D Glow, Animations & Smooth Transitions */}
      <style>{`
        /* Smooth Entrance Fade-In */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Animated Glowing Border */
        @keyframes borderGlow {
          0% { border-color: rgba(56, 189, 248, 0.4); box-shadow: 0 0 20px rgba(56, 189, 248, 0.2); }
          50% { border-color: rgba(168, 85, 247, 0.5); box-shadow: 0 0 35px rgba(168, 85, 247, 0.3); }
          100% { border-color: rgba(56, 189, 248, 0.4); box-shadow: 0 0 20px rgba(56, 189, 248, 0.2); }
        }

        .main-card-effect {
          animation: fadeInUp 0.6s ease-out forwards, borderGlow 6s infinite ease-in-out;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .main-card-effect:hover {
          transform: translateY(-4px);
        }

        /* Input Glow Effects */
        .custom-input {
          transition: all 0.3s ease !important;
        }
        .custom-input:focus {
          border-color: #38bdf8 !important;
          box-shadow: 0 0 15px rgba(56, 189, 248, 0.4) !important;
          transform: scale(1.01);
        }

        /* Gradient Glowing Button */
        .glow-btn {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4) !important;
        }
        .glow-btn:hover {
          transform: translateY(-2px) scale(1.02) !important;
          box-shadow: 0 8px 25px rgba(56, 189, 248, 0.6) !important;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%) !important;
        }
        .glow-btn:active {
          transform: translateY(0) scale(0.98) !important;
        }

        /* Table Row Hover Effects */
        tr {
          transition: background-color 0.2s ease, transform 0.2s ease;
        }
        tbody tr:hover {
          background-color: rgba(30, 41, 59, 0.8) !important;
        }
      `}</style>

      {/* Main Container Card */}
      <main 
        className="main-card-effect"
        style={{
          width: "100%",
          maxWidth: "900px",
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          padding: "40px",
          border: "2px solid rgba(56, 189, 248, 0.3)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)"
        }}
      >
        {/* Animated Gradient Title */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ 
            fontSize: "36px", 
            fontWeight: "900", 
            background: "linear-gradient(135deg, #0f172a 0%, #2563eb 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: "0 0 8px 0"
          }}>
            URL Shortener
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
            Transform long links into short, memorable URLs instantly.
          </p>
        </div>

        {/* Form Component */}
        <UrlForm />

        {/* Separator Divider */}
        <div style={{ 
          height: "1px", 
          background: "linear-gradient(90deg, transparent, rgba(203, 213, 225, 0.8), transparent)", 
          margin: "32px 0" 
        }} />

        {/* Table Component */}
        <UserUrl />
      </main>
    </div>
  );
};

export default HomePage;