// import { Link } from "@tanstack/react-router";

// const Navbar = () => {
//   return (
//     <nav className="bg-white border border-b-black">
//       <div className=" mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           {/* Left side - App Name */}
//           <div className="flex items-center">
//             <Link to="/" className="text-xl font-bold text-gray-800">
//               URL Shortener
//             </Link>
//           </div>

//           {/* Right side - Auth buttons */}
//           <div className="flex items-center">
//             {/* {(true) ? (
//               <div className="flex items-center space-x-4">
//                 <span className="text-gray-700">Welcome, {userName || 'User'}</span>
//                 <button
//                   onClick={onLogout}
//                   className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <Link
//                 to="/auth"
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
//               >
//                 Login
//               </Link>
//             )} */}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };
import { Link, useNavigate } from "@tanstack/react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slice/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate({ to: "/auth" });
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "64px",
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid #1e293b",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
          }}
        >
          <span style={{ fontSize: "20px" }}>🔗</span>
          <span
            style={{ fontSize: "18px", fontWeight: "bold", color: "#ffffff" }}
          >
            URL Shortener
          </span>
        </Link>

        {/* User / Auth */}
        <div>
          {isAuthenticated ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  padding: "4px 12px",
                  borderRadius: "20px",
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: "#2563eb",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {user?.name ? user.name[0].toUpperCase() : "A"}
                </div>
                <span style={{ fontSize: "14px", color: "#cbd5e1" }}>
                  Welcome,{" "}
                  <strong style={{ color: "#ffffff" }}>
                    {user?.name || "Aditya"}
                  </strong>
                </span>
              </div>

              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "rgba(239, 68, 68, 0.15)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  color: "#f87171",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              style={{
                backgroundColor: "#2563eb",
                color: "#ffffff",
                padding: "8px 18px",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;