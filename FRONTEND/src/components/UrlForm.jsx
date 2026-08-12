import { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api";
import { useSelector } from "react-redux";
import { queryClient } from "../main";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [customSlug, setCustomSlug] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setError(null);

    try {
      const generatedShortUrl = await createShortUrl(url, customSlug);
      setShortUrl(generatedShortUrl);
      queryClient.invalidateQueries({ queryKey: ["userUrls"] });
    } catch (err) {
      setError(err?.message || "Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ width: "100%", marginBottom: "30px" }}>
      {/* Form with Proper Gaps */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "flex-end",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        {/* Main URL Input */}
        <div style={{ flex: "2", minWidth: "250px" }}>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "600",
              color: "#94a3b8",
              marginBottom: "8px",
            }}
          >
            Enter your URL
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            required
            style={{
              width: "100%",
              padding: "14px 16px",
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "10px",
              color: "#ffffff",
              fontSize: "14px",
              outline: "none",
            }}
          />
        </div>

        {/* Custom Slug */}
        {isAuthenticated && (
          <div style={{ flex: "1", minWidth: "180px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#94a3b8",
                marginBottom: "8px",
              }}
            >
              Custom URL (optional)
            </label>
            <input
              type="text"
              value={customSlug}
              onChange={(e) => setCustomSlug(e.target.value)}
              placeholder="custom-slug"
              style={{
                width: "100%",
                padding: "14px 16px",
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "10px",
                color: "#ffffff",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>
        )}

        {/* Shorten Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            height: "50px",
            padding: "0 28px",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            fontWeight: "600",
            fontSize: "15px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {loading ? "Shortening..." : "Shorten URL 🔗"}
        </button>
      </form>

      {/* Output Short Link Result */}
      {shortUrl && (
        <div
          style={{
            padding: "16px",
            backgroundColor: "#0f172a",
            border: "1px solid #334155",
            borderRadius: "12px",
            marginTop: "20px",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "#94a3b8",
              marginBottom: "8px",
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          >
            Your Shortened URL:
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <input
              type="text"
              readOnly
              value={shortUrl}
              style={{
                flex: 1,
                padding: "10px 14px",
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#38bdf8",
                fontWeight: "600",
                fontSize: "14px",
              }}
            />
            <button
              onClick={handleCopy}
              style={{
                padding: "10px 20px",
                backgroundColor: copied ? "#10b981" : "#2563eb",
                color: "#ffffff",
                borderRadius: "8px",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {copied ? "Copied! ✓" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
