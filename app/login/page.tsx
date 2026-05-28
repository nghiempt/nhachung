"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api, auth } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      setError(err?.body?.error?.message ?? "Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="left-panel">
        <div className="logo">
          <svg className="logo-icon" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 12.6995V36.7148C0 36.8859 0.0894999 37.043 0.235683 37.13L3.58397 39.1241C3.73215 39.2122 3.91711 39.2142 4.06727 39.1281L7.61545 37.086C7.76461 37 7.8571 36.8399 7.8571 36.6668V16.7058C7.8571 16.5337 7.76561 16.3736 7.61744 16.2875L0.719977 12.2813C0.399766 12.0952 0 12.3273 0 12.6995Z" fill="#4137F9"/>
            <path d="M19.4784 8.91446L27.7512 13.7201C27.8993 13.8062 27.9908 13.9662 27.9908 14.1383V30.0301C27.9908 30.2973 28.2056 30.5134 28.4711 30.5134H35.3676C35.6331 30.5134 35.8479 30.2973 35.8479 30.0301V9.57482C35.8479 9.40273 35.7564 9.24264 35.6082 9.15659L19.9587 0.0655729C19.6385 -0.12053 19.2387 0.111598 19.2387 0.483804V8.49523C19.2387 8.66732 19.3302 8.82741 19.4784 8.91346V8.91446Z" fill="#A7A3F7"/>
            <path d="M15.8893 0.0655729L1.13768 8.6353C0.817474 8.82141 0.817474 9.28566 1.13768 9.47177L8.03315 13.478C8.18133 13.564 8.3643 13.564 8.51347 13.478L16.3696 8.91446C16.5177 8.82841 16.6092 8.66832 16.6092 8.49623V0.483804C16.6092 0.111598 16.2095 -0.12053 15.8893 0.0655729Z" fill="#4137F9"/>
            <path d="M31.9184 40.0005C34.0878 40.0005 35.8464 38.231 35.8464 36.0483C35.8464 33.8656 34.0878 32.0961 31.9184 32.0961C29.749 32.0961 27.9903 33.8656 27.9903 36.0483C27.9903 38.231 29.749 40.0005 31.9184 40.0005Z" fill="#4137F9"/>
            <path d="M17.72 14.6407C15.3164 14.6407 13.3613 16.6068 13.3613 19.0261C13.3613 21.4455 15.206 23.3185 17.6096 23.4016C17.6832 23.3926 17.7568 23.3926 17.8115 23.4016H17.8761C20.225 23.3185 22.0687 21.3985 22.0786 19.0261C22.0786 16.6078 20.1245 14.6407 17.72 14.6407Z" fill="#4137F9"/>
            <path d="M22.3805 25.8569C19.8208 24.1399 15.6461 24.1399 13.0675 25.8569C11.902 26.6413 11.2596 27.7029 11.2596 28.8385C11.2596 29.9742 11.902 31.0267 13.0576 31.8022C14.3424 32.6697 16.03 33.1039 17.7185 33.1039C19.4071 33.1039 21.0947 32.6697 22.3795 31.8022C23.536 31.0177 24.1774 29.9652 24.1774 28.8205C24.1685 27.6849 23.535 26.6323 22.3795 25.8569H22.3805Z" fill="#4137F9"/>
          </svg>
          <svg className="logo-wordmark" viewBox="0 0 114 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.08376 0.41618L10.7434 11.7261V0.41618H13.6282V17.0307H10.7932L3.08376 5.72081V17.0307H0V0.666398C0 0.605345 0.079581 0.513264 0 0.41618H3.08376Z" fill="#161A48"/>
            <path d="M111.115 15.3252C108.772 17.8894 104.134 17.0627 102.672 13.962C100.157 8.62835 105.228 2.80527 110.467 6.21925L111.215 6.91786V5.51664H114V17.4771C114 17.8704 113.652 19.0575 113.476 19.4518C111.549 23.7666 103.993 23.5974 102.56 18.9293L105.285 18.0195C106.038 20.5267 110.022 20.6018 110.895 18.1557C110.939 18.0296 111.115 17.449 111.115 17.377V15.3252ZM107.811 7.84667C103.858 8.23001 104.125 14.8558 108.769 14.2152C112.193 13.7428 111.9 7.45033 107.811 7.84667Z" fill="#161A48"/>
            <path d="M51.2667 12.9877C53.4541 15.1626 57.8182 14.8553 59.1074 11.8347L62.1334 12.6174C60.8015 17.3075 54.6399 18.4615 50.7325 16.3777C45.4413 13.5552 45.127 5.19392 49.8481 1.67184C53.7197 -1.21668 59.8515 -0.34792 62.0648 4.16702L59.3213 5.60427C59.1332 5.62129 58.7184 4.81959 58.5453 4.61441C56.6622 2.37946 52.903 2.63969 51.0369 4.76854C49.1866 6.87839 49.2672 10.998 51.2676 12.9877H51.2667Z" fill="#161A48"/>
            <path d="M19.4978 0.0146542V6.72051C21.5023 4.48656 25.6743 4.68773 26.877 7.65332C26.9496 7.83348 27.257 8.75929 27.257 8.87238V17.0295H24.2727V10.2736C24.2727 8.49606 23.0322 7.76442 21.362 8.04566C20.5503 8.18278 19.4978 9.36081 19.4978 10.1735V17.0295H16.613V0.0146542H19.4978Z" fill="#161A48"/>
            <path d="M67.0478 0.0146542V6.72051L68.2475 5.77568C71.0059 4.25435 74.8069 5.89779 74.8069 9.27273V17.0295H71.9221V10.1735C71.9221 9.94732 71.6834 9.26473 71.562 9.03453C70.7473 7.48517 68.14 7.70837 67.395 9.22169C67.3422 9.32978 67.0478 10.2176 67.0478 10.2736V17.0295H64.163V0.0146542H67.0478Z" fill="#161A48"/>
            <path d="M39.5915 17.0319H36.8062C36.8171 16.6846 36.7853 16.3173 36.7047 15.981C36.6003 15.5456 36.4779 16.019 36.3645 16.1331C34.6366 17.8856 30.6217 17.8136 29.427 15.4986C28.0314 12.7962 30.1482 10.1259 32.9763 10.1259H36.5077C36.5286 9.26713 36.6152 8.58053 35.9029 7.982C35.0176 7.23836 33.0649 7.31042 32.3864 8.33131C32.1935 8.62156 32.1228 9.2411 31.8612 9.31216C31.5091 9.25311 29.3932 9.10098 29.3504 8.86878C29.7812 5.48382 33.5881 4.74818 36.3874 5.49383C38.3431 6.01529 39.2911 7.39349 39.4811 9.38723C39.7149 11.8494 39.2523 14.5637 39.5925 17.0319H39.5915ZM36.5077 12.0275H33.5732C33.426 12.0275 32.5854 12.4369 32.4262 12.575C31.3051 13.5499 32.2213 15.0842 33.5712 15.1773C35.6304 15.3184 36.7843 14.0923 36.5077 12.0275Z" fill="#161A48"/>
            <path d="M100.471 17.0268H97.4871V9.77049C97.4871 9.5613 97.0941 8.80665 96.934 8.62549C96.1203 7.70969 94.1466 7.80777 93.3558 8.71657C93.1807 8.91774 92.7122 9.96265 92.7122 10.1708V17.0268H89.8274V5.51677H92.6127V6.81691L93.7766 5.83705C96.3878 4.20063 100.471 5.86308 100.471 9.16996V17.0268Z" fill="#161A48"/>
            <path d="M84.556 5.5178H87.4408V17.0278H84.6555V15.7267C82.7605 18.1318 78.4541 17.8526 77.2167 14.954C77.0784 14.6308 76.7969 13.6889 76.7969 13.3747V5.5178H79.6319L79.7812 5.66793V12.9743C79.7812 13.0414 80.0647 13.6139 80.1353 13.719C81.0843 15.1122 83.3892 14.8139 84.179 13.3957C84.2417 13.2836 84.556 12.4278 84.556 12.3738V5.5178Z" fill="#161A48"/>
            <path d="M31.3356 0.617431H34.4691L35.997 3.7882L35.8618 4.0204H33.4743L31.3903 1.11386L31.3356 0.617431Z" fill="#161A48"/>
          </svg>
        </div>
        <div className="form-wrap">
          <div className="title-section">
            <h1>Đăng nhập</h1>
            <p>Đăng nhập để vào dashboard quản lý</p>
          </div>
          <form className="login-form" onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Nhập địa chỉ email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="password">Mật khẩu</label>
              <div className="input-row">
                <input
                  type={showPwd ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Nhập mật khẩu"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPwd((s) => !s)}
                  aria-label="Hiện/ẩn mật khẩu"
                >
                  {!showPwd ? (
                    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 0C5.45 0 1.73 2.61 0 6.5 1.73 10.39 5.45 13 10 13 14.55 13 18.27 10.39 20 6.5 18.27 2.61 14.55 0 10 0ZM10 10.83C7.35 10.83 5.17 8.65 5.17 6 5.17 3.35 7.35 1.17 10 1.17 12.65 1.17 14.83 3.35 14.83 6 14.83 8.65 12.65 10.83 10 10.83ZM10 3C8.34 3 7 4.34 7 6 7 7.66 8.34 9 10 9 11.66 9 13 7.66 13 6 13 4.34 11.66 3 10 3Z" fill="#737373"/>
                    </svg>
                  ) : (
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 1C5.45 1 1.73 3.61 0 7.5 1.73 11.39 5.45 14 10 14 14.55 14 18.27 11.39 20 7.5 18.27 3.61 14.55 1 10 1ZM10 11.83C7.35 11.83 5.17 9.65 5.17 7 5.17 4.35 7.35 2.17 10 2.17 12.65 2.17 14.83 4.35 14.83 7 14.83 9.65 12.65 11.83 10 11.83ZM10 4C8.34 4 7 5.34 7 7 7 8.66 8.34 10 10 10 11.66 10 13 8.66 13 7 13 5.34 11.66 4 10 4Z" fill="#4137F9"/>
                      <line x1="1.5" y1="16.5" x2="18.5" y2="1.5" stroke="#4137F9" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )}
                </button>
              </div>
              <div className="field-footer">
                <a href="#" className="forgot-link">Quên mật khẩu?</a>
              </div>
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              <span>{loading ? "Đang xử lý…" : "Đăng nhập"}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.49 2 2 6.49 2 12 2 17.51 6.49 22 12 22 17.51 22 22 17.51 22 12 22 6.49 17.51 2 12 2ZM14.79 12.53L11.26 16.06C11.11 16.21 10.92 16.28 10.73 16.28 10.54 16.28 10.35 16.21 10.2 16.06 9.91 15.77 9.91 15.29 10.2 15L13.2 12 10.2 9C9.91 8.71 9.91 8.23 10.2 7.94 10.49 7.65 10.97 7.65 11.26 7.94L14.79 11.47C15.09 11.76 15.09 12.24 14.79 12.53Z" fill="white"/>
              </svg>
            </button>
            {error && <div id="login-error">{error}</div>}
          </form>
          <p className="register-link">
            Chưa có tài khoản? <Link href="/signup">Đăng ký miễn phí</Link>
          </p>
          <div className="support-box">
            <div className="support-title">
              <span style={{ color: "#585C7B" }}>Cần hỗ trợ? </span>
              <span style={{ color: "#4137F9", fontWeight: 700 }}>Luôn sẵn sàng</span>
            </div>
            <div className="support-actions">
              <a href="tel:0886020202">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.22198 11.0455C9.50559 11.1757 9.8416 11.0918 10.0307 10.8435L10.2673 10.5335C10.5191 10.1978 10.9143 10.0002 11.334 10.0002H13.334C14.0699 10.0002 14.6673 10.5976 14.6673 11.3335V13.3335C14.6673 14.0694 14.0699 14.6668 13.334 14.6668C6.70657 14.6668 1.33398 9.29425 1.33398 2.66683C1.33398 1.93094 1.93143 1.3335 2.66732 1.3335H4.66732C5.4032 1.3335 6.00065 1.93094 6.00065 2.66683V4.66683C6.00065 5.08651 5.80306 5.48169 5.46732 5.7335L5.15532 5.9675C4.90297 6.16018 4.82152 6.5041 4.96065 6.7895C5.87177 8.64007 7.37027 10.1367 9.22198 11.0455" stroke="#4137F9" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {" "}0886.02.02.02
              </a>
              <span className="support-sep">·</span>
              <a href="https://zalo.me/0886020202">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.99376 10.8947C2.09179 11.142 2.11361 11.4129 2.05643 11.6727L1.34643 13.866C1.29992 14.0922 1.37373 14.3263 1.54154 14.4849C1.70935 14.6435 1.94727 14.7039 2.17043 14.6447L4.44576 13.9794C4.69091 13.9307 4.94478 13.952 5.17843 14.0407C8.11744 15.4132 11.6178 14.4712 13.4709 11.8089C15.324 9.14672 14.9921 5.53708 12.6845 3.25749C10.3769 0.977908 6.76345 0.690071 4.12406 2.57559C1.48467 4.46111 0.585457 7.97268 1.99376 10.8947" stroke="#4137F9" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {" "}Nhắn Zalo
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="right-panel">
        <img src="/images/login-banner.png" alt="Webico dashboard preview" />
      </div>
      <style jsx global>{`
        html, body { height: 100%; overflow: hidden; font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #fff; color: #222; }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
      <style jsx>{`
        .login-page { display: flex; height: 100vh; width: 100%; overflow: hidden; }
        .left-panel { flex: 1 1 0; min-width: 0; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: clamp(20px, 5.86vh, 60px); padding: clamp(16px, 2.5vw, 48px) clamp(20px, 4vw, 60px); overflow-y: auto; }
        .logo { display: flex; align-items: center; gap: 10px; }
        .logo :global(.logo-icon) { height: clamp(28px, 3.91vh, 40px); width: auto; }
        .logo :global(.logo-wordmark) { height: clamp(14px, 2.25vh, 23px); width: auto; }
        .form-wrap { width: 100%; max-width: 408px; display: flex; flex-direction: column; align-items: center; gap: clamp(12px, 1.95vh, 20px); }
        .title-section { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; }
        .title-section :global(h1) { font-size: clamp(20px, 2.93vh, 30px); font-weight: 600; color: #222; line-height: 1.2; }
        .title-section :global(p) { font-size: clamp(13px, 1.56vh, 16px); color: #585C7B; line-height: 1.5; }
        .login-form { width: 100%; display: flex; flex-direction: column; gap: clamp(8px, 1.17vh, 12px); }
        .field { display: flex; flex-direction: column; gap: 6px; }
        .field :global(label) { font-size: clamp(13px, 1.56vh, 16px); color: #222; }
        .input-row { position: relative; display: flex; align-items: center; }
        .input-row :global(input), .field > :global(input) { width: 100%; height: clamp(36px, 4.3vh, 44px); padding: 0 12px; font-size: clamp(13px, 1.56vh, 16px); font-family: inherit; color: #222; background: #fff; border: 1px solid #D4D7E5; border-radius: 8px; outline: none; transition: border-color .2s; }
        .input-row :global(input) { padding-right: 44px; }
        .input-row :global(input:focus), .field > :global(input:focus) { border-color: #4137F9; }
        .eye-btn { position: absolute; right: 12px; background: none; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0; line-height: 0; }
        .field-footer { display: flex; justify-content: flex-end; }
        .forgot-link { font-size: clamp(11px, 1.37vh, 14px); color: #4137F9; text-decoration: none; }
        .forgot-link:hover { text-decoration: underline; }
        .submit-btn { width: 100%; height: clamp(36px, 4.3vh, 44px); background: #4137F9; color: #fff; border: none; border-radius: 10px; font-size: clamp(13px, 1.56vh, 16px); font-weight: 500; font-family: inherit; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: background .15s, opacity .15s; margin-top: 2px; }
        .submit-btn:hover { background: #3028e0; }
        .submit-btn:active { opacity: .85; }
        .submit-btn:disabled { opacity: .7; cursor: not-allowed; }
        .register-link { font-size: clamp(12px, 1.37vh, 14px); color: #585C7B; text-align: center; }
        .register-link :global(a) { color: #4137F9; text-decoration: none; font-weight: 500; }
        .register-link :global(a:hover) { text-decoration: underline; }
        .support-box { width: 100%; background: rgba(245,245,245,0.3); border: 1px dashed #e5e5e5; border-radius: 10px; padding: 13px 17px; display: flex; flex-direction: column; gap: 8px; text-align: center; }
        .support-title { font-size: 14px; line-height: 20px; color: #585C7B; }
        .support-actions { display: flex; align-items: center; justify-content: center; gap: 16px; }
        .support-actions :global(a) { display: flex; align-items: center; gap: 6px; color: #4137F9; text-decoration: none; font-weight: 500; font-size: 14px; line-height: 22px; }
        .support-actions :global(a:hover) { text-decoration: underline; }
        .support-actions :global(a svg) { width: 16px; height: 16px; flex-shrink: 0; }
        .support-sep { color: rgba(115,115,115,0.5); font-size: 14px; }
        .right-panel { flex: 0 0 auto; height: 100vh; display: flex; align-items: stretch; }
        .right-panel :global(img) { height: 100vh; width: auto; display: block; object-fit: contain; }
        #login-error { color: #ef4444; font-size: 13px; text-align: center; margin-top: 8px; font-family: inherit; }
        @media (max-width: 860px) { .right-panel { display: none; } }
      `}</style>
    </div>
  );
}
