"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api, auth } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("chris.tran@gmail.com");
  const [password, setPassword] = useState("Password@123");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const r = await api.login(email, password);
      auth.setTokens(r.accessToken, r.refreshToken);
      router.replace("/dashboard");
    } catch (err: any) {
      setError(err?.body?.error?.message ?? "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "linear-gradient(135deg,#f7f5ff 0%,#e8e3ff 100%)" }}>
      <div style={{ background: "#fff", padding: 40, borderRadius: 20, width: 420, boxShadow: "0 12px 40px rgba(65,55,249,0.12)" }}>
        <h1 style={{ fontFamily: "Manrope, Inter, sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Nhà Chung</h1>
        <p style={{ color: "#585c7b", marginBottom: 28 }}>Đăng nhập vào cổng cư dân</p>

        <form onSubmit={onSubmit}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Email</label>
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "12px 14px", border: "1px solid #e2e5f1", borderRadius: 10, marginBottom: 16, fontSize: 14 }}
          />

          <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Mật khẩu</label>
          <div style={{ position: "relative", marginBottom: 16 }}>
            <input
              type={showPwd ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "12px 14px", border: "1px solid #e2e5f1", borderRadius: 10, fontSize: 14 }}
            />
            <button type="button" onClick={() => setShowPwd((s) => !s)} style={{ position: "absolute", right: 12, top: 12, background: "none", border: 0, cursor: "pointer", color: "#585c7b", fontSize: 12 }}>
              {showPwd ? "Ẩn" : "Hiện"}
            </button>
          </div>

          {error && <div style={{ color: "#f5222d", fontSize: 13, marginBottom: 12 }}>{error}</div>}

          <button type="submit" disabled={loading} style={{ width: "100%", padding: "12px 14px", background: "#4137f9", color: "#fff", border: 0, borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Đang xử lý…" : "Đăng nhập"}
          </button>
        </form>

        <p style={{ marginTop: 18, fontSize: 12, color: "#585c7b", lineHeight: 1.6 }}>
          Tài khoản demo: <code>chris.tran@gmail.com</code> / <code>Password@123</code>
        </p>
      </div>
    </div>
  );
}
