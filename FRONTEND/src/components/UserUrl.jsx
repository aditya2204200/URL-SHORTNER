// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getAllUserUrls } from "../api/user.api";

// const UserUrl = () => {
//   const {
//     data: urls,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["userUrls"],
//     queryFn: getAllUserUrls,
//     refetchInterval: 30000, // Refetch every 30 seconds to update click counts
//     staleTime: 0, // Consider data stale immediately so it refetches when invalidated
//   });
//   const [copiedId, setCopiedId] = useState(null);
//   const handleCopy = (url, id) => {
//     navigator.clipboard.writeText(url);
//     setCopiedId(id);

//     // Reset the copied state after 2 seconds
//     setTimeout(() => {
//       setCopiedId(null);
//     }, 2000);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center my-8">
//         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
//         Error loading your URLs: {error.message}
//       </div>
//     );
//   }

//   if (!urls.urls || urls.urls.length === 0) {
//     return (
//       <div className="text-center text-gray-500 my-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
//         <svg
//           className="w-12 h-12 mx-auto text-gray-400 mb-3"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M13 10V3L4 14h7v7l9-11h-7z"
//           ></path>
//         </svg>
//         <p className="text-lg font-medium">No URLs found</p>
//         <p className="mt-1">You haven't created any shortened URLs yet.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-lg mt-5 shadow-md overflow-hidden">
//       <div className="overflow-x-auto h-56">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Original URL
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Short URL
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Clicks
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {urls.urls.reverse().map((url) => (
//               <tr key={url._id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4">
//                   <div className="text-sm text-gray-900 truncate max-w-xs">
//                     {url.full_url}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="text-sm">
//                     <a
//                       href={`http://localhost:3000/${url.short_url}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 hover:text-blue-900 hover:underline"
//                     >
//                       {`localhost:3000/${url.short_url}`}
//                     </a>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="text-sm text-gray-900">
//                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
//                       {url.clicks} {url.clicks === 1 ? "click" : "clicks"}
//                     </span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 text-sm font-medium">
//                   <button
//                     onClick={() =>
//                       handleCopy(
//                         `http://localhost:3000/${url.short_url}`,
//                         url._id,
//                       )
//                     }
//                     className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm ${
//                       copiedId === url._id
//                         ? "bg-green-600 text-white hover:bg-green-700"
//                         : "bg-blue-600 text-white hover:bg-blue-700"
//                     } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
//                   >
//                     {copiedId === url._id ? (
//                       <>
//                         <svg
//                           className="w-4 h-4 mr-1"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M5 13l4 4L19 7"
//                           ></path>
//                         </svg>
//                         Copied!
//                       </>
//                     ) : (
//                       <>
//                         <svg
//                           className="w-4 h-4 mr-1"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
//                           ></path>
//                         </svg>
//                         Copy URL
//                       </>
//                     )}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserUrl;

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUserUrls } from "../api/user.api";

const UserUrl = () => {
  const {
    data: urls,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userUrls"],
    queryFn: getAllUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
  });

  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (isLoading)
    return (
      <div style={{ color: "#94a3b8", textAlign: "center", padding: "20px" }}>
        Loading links...
      </div>
    );
  if (isError)
    return (
      <div style={{ color: "#ef4444", padding: "10px" }}>
        Error: {error.message}
      </div>
    );

  if (!urls?.urls || urls.urls.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          color: "#64748b",
          padding: "30px",
          backgroundColor: "#0f172a",
          borderRadius: "12px",
        }}
      >
        No URLs found yet.
      </div>
    );
  }

  const reversedUrls = [...urls.urls].reverse();

  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        border: "1px solid #334155",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
          color: "#ffffff",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#1e293b",
              borderBottom: "1px solid #334155",
              color: "#94a3b8",
              fontSize: "12px",
              textTransform: "uppercase",
            }}
          >
            <th style={{ padding: "14px 20px" }}>Original URL</th>
            <th style={{ padding: "14px 20px" }}>Short URL</th>
            <th style={{ padding: "14px 20px", textAlign: "center" }}>
              Clicks
            </th>
            <th style={{ padding: "14px 20px", textAlign: "right" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {reversedUrls.map((url) => (
            <tr key={url._id} style={{ borderBottom: "1px solid #1e293b" }}>
              <td
                style={{
                  padding: "14px 20px",
                  color: "#cbd5e1",
                  fontSize: "14px",
                  maxWidth: "300px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {url.full_url}
              </td>
              <td style={{ padding: "14px 20px" }}>
                <a
                  href={`http://localhost:3000/${url.short_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#60a5fa",
                    textDecoration: "none",
                    fontWeight: "500",
                  }}
                >
                  {`localhost:3000/${url.short_url}`}
                </a>
              </td>
              <td
                style={{
                  padding: "14px 20px",
                  textAlign: "center",
                  color: "#93c5fd",
                }}
              >
                {url.clicks}
              </td>
              <td style={{ padding: "14px 20px", textAlign: "right" }}>
                <button
                  onClick={() =>
                    handleCopy(
                      `http://localhost:3000/${url.short_url}`,
                      url._id,
                    )
                  }
                  style={{
                    padding: "6px 14px",
                    backgroundColor:
                      copiedId === url._id ? "#10b981" : "#2563eb",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {copiedId === url._id ? "Copied!" : "Copy"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserUrl;