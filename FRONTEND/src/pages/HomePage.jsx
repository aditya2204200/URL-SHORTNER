// import UrlForm from "../components/UrlForm";

// const HomePage = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h1 className="text-2xl font-bold text-center mb-6">URL Shortener</h1>
//         <UrlForm />
//       </div>
//     </div>
//   );
// };
import UrlForm from "../components/UrlForm";
import Navbar from "../components/Navbar";
import UserUrl from "../components/UserUrl";

const HomePage = () => {
  return (
    <div
      style={{
        backgroundColor: "#0f172a", // Deep Dark Background
        minHeight: "100vh",
        width: "100%",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main
        style={{
          width: "100%",
          maxWidth: "1050px",
          padding: "100px 20px 40px 20px",
        }}
      >
        {/* Main Center Card (White color removed & updated to dark slate) */}
        <div
          style={{
            backgroundColor: "#1e293b", // Dark Slate Blue Card
            border: "1px solid #334155",
            borderRadius: "24px",
            padding: "35px",
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.4)",
          }}
        >
          {/* Header Title */}
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "800",
                color: "#ffffff",
                marginBottom: "8px",
              }}
            >
              URL Shortener
            </h1>
            <p style={{ color: "#94a3b8", fontSize: "15px" }}>
              Paste your long links below to make them short, trackable, and
              easy to share.
            </p>
          </div>

          {/* Form */}
          <div style={{ marginBottom: "30px" }}>
            <UrlForm />
          </div>

          {/* Table */}
          <div>
            <UserUrl />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;