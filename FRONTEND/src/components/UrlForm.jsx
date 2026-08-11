import { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api";
import { useSelector } from "react-redux";
import { queryClient } from "../main";

const UrlForm = () => {
  const [url, setUrl] = useState("https://www.google.com");
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
    <div style={{ width: "100%" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "flex-end",
          flexWrap: "wrap",
        }}
      >
        {/* URL Input */}
        <div style={{ flex: "2", minWidth: "260px" }}>
          <label
            style={{
              display: "block",
              fontSize: "13px",
              fontWeight: "600",
              color: "#cbd5e1",
              marginBottom: "6px",
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
              padding: "10px 14px",
              backgroundColor: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "8px",
              color: "#ffffff",
              fontSize: "14px",
              outline: "none",
            }}
          />
        </div>

        {/* Custom Slug (Visible if logged in) */}
        {isAuthenticated && (
          <div style={{ flex: "1", minWidth: "180px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "600",
                color: "#cbd5e1",
                marginBottom: "6px",
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
                padding: "10px 14px",
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#ffffff",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            height: "42px",
            padding: "0 22px",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            fontWeight: "600",
            fontSize: "14px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {loading ? "Shortening..." : "Shorten URL 🔗"}
        </button>
      </form>

      {error && (
        <div
          style={{
            marginTop: "12px",
            padding: "10px 14px",
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#f87171",
            borderRadius: "8px",
            fontSize: "13px",
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {shortUrl && (
        <div
          style={{
            marginTop: "16px",
            padding: "14px",
            backgroundColor: "#0f172a",
            border: "1px solid #334155",
            borderRadius: "10px",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              color: "#94a3b8",
              marginBottom: "6px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Your shortened URL:
          </p>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              readOnly
              value={shortUrl}
              style={{
                flex: 1,
                padding: "8px 12px",
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "6px",
                color: "#60a5fa",
                fontFamily: "monospace",
                fontSize: "13px",
              }}
            />
            <button
              onClick={handleCopy}
              style={{
                padding: "8px 16px",
                backgroundColor: copied ? "#10b981" : "#2563eb",
                color: "#ffffff",
                borderRadius: "6px",
                border: "none",
                fontWeight: "600",
                fontSize: "13px",
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
