"use client";

export default function AIAssistantPage() {
  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px", height: "100%", overflow: "hidden" }}>

      {/* Page header */}
      <div style={{ flexShrink: 0 }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, lineHeight: "36px", color: "#272727" }}>AI Assistant</h1>
        <p style={{ fontSize: "16px", color: "#585c7b", marginTop: "6px", lineHeight: "24px", fontWeight: 500 }}>Trợ lý AI của cư dân Sunshine Riverside</p>
      </div>

      {/* Body: left panel + chat panel */}
      <div style={{ flex: 1, minHeight: 0, display: "flex", gap: "20px", alignItems: "stretch" }}>

        {/* Left panel */}
        <div style={{
          width: "198px", flexShrink: 0,
          background: "#ffffff", border: "1px solid #e2e5f1", borderRadius: "20px",
          padding: "15px", display: "flex", flexDirection: "column", gap: "16px",
          overflowY: "auto",
        }}>
          <button style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            background: "#4137f9", color: "#fff", border: 0,
            borderRadius: "10px", padding: "10px 18px", width: "100%",
            fontSize: "14px", fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap",
          }}>
            <img src="https://www.figma.com/api/mcp/asset/53254322-bec1-4a9e-912f-41a6d45c231c" alt="" width={20} height={20} style={{ flex: "0 0 20px" }} />
            Đoạn chat mới
          </button>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ fontSize: "15px", fontWeight: 700, color: "#272727", whiteSpace: "nowrap" }}>Câu hỏi gần đây</div>
            <div>
              {[
                { q: "Quy định về giờ yên tĩnh?", time: "10:30 AM" },
                { q: "Phí gửi xe ô tô hiện tại?", time: "Hôm qua" },
                { q: "Cách đăng ký thẻ từ cho người thân?", time: "2 ngày trước" },
                { q: "Quy định về nuôi thú cưng?", time: "3 ngày trước" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", flexDirection: "column", gap: "4px",
                  padding: "8px 0",
                  borderTop: i === 0 ? "none" : "1px solid #eff2fc",
                  paddingTop: i === 0 ? 0 : "8px",
                  cursor: "pointer",
                }}>
                  <div style={{ fontSize: "13px", fontWeight: 500, color: "#272727", lineHeight: "18px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.q}</div>
                  <div style={{ fontSize: "11px", color: "#585c7b" }}>{item.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat panel */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Chat thread */}
          <div style={{ flex: 1, minHeight: 0, overflowY: "auto", overflowX: "hidden", display: "flex", flexDirection: "column", gap: "16px", padding: "12px 0 4px" }}>

            {/* User message */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{ background: "#f7f5ff", borderRadius: "18px 18px 4px 18px", padding: "14px 18px", maxWidth: "60%", display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ fontSize: "14px", color: "#272727", lineHeight: "22px" }}>Quy định về giờ yên tĩnh tại chung cư là như thế nào?</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "6px" }}>
                  <span style={{ fontSize: "11px", color: "#585c7b" }}>10:30 AM</span>
                  <img src="https://www.figma.com/api/mcp/asset/95b35bbb-f566-4de4-85cd-b69410f4bcd7" alt="" width={12} height={12} style={{ flex: "0 0 12px" }} />
                </div>
              </div>
            </div>

            {/* Bot message */}
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", paddingRight: "60px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", flex: "0 0 36px", overflow: "hidden" }}>
                <img src="https://www.figma.com/api/mcp/asset/9de1c74d-1a93-4cf2-b5c9-01642fdf9c12" alt="AI" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ flex: 1, minWidth: 0, background: "#ffffff", border: "1px solid #e2e5f1", borderRadius: "4px 18px 18px 18px", padding: "16px 20px", display: "flex", flexDirection: "column", gap: "12px" }}>

                {/* Intro */}
                <div style={{ fontSize: "14px", color: "#272727", lineHeight: "22px" }}>
                  Theo <strong>Nội quy quản lý, sử dụng chung cư Sunshine Riverside</strong>, quy định về giờ yên tĩnh như sau:
                </div>

                {/* Highlight card */}
                <div style={{ background: "#f7f5ff", border: "1px solid #d3c5fd", borderRadius: "12px", padding: "15px 17px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div style={{ width: "28px", height: "28px", background: "#ffffff", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <img src="https://www.figma.com/api/mcp/asset/4c9ecce8-215e-467a-a31a-82d50d04f37f" alt="" width={16} height={16} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <div style={{ fontSize: "13.5px", fontWeight: 600, color: "#272727", lineHeight: "22px" }}>Giờ yên tĩnh</div>
                    <div style={{ fontSize: "13.5px", color: "#3e4265", lineHeight: "22px" }}>Từ <strong>22:00</strong> đến <strong>06:00</strong> sáng hôm sau</div>
                  </div>
                </div>

                <div style={{ fontSize: "14px", color: "#272727", lineHeight: "22px" }}>Trong khoảng thời gian này, cư dân vui lòng:</div>

                {/* Checklist */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {["Hạn chế gây tiếng ồn lớn", "Không sử dụng thiết bị âm thanh công suất lớn", "Không tổ chức tiệc tùng, hát karaoke", "Không làm việc gây tiếng động mạnh"].map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "18px", height: "18px", background: "#52c41a", borderRadius: "9px", flex: "0 0 18px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img src="https://www.figma.com/api/mcp/asset/6ae31e66-e279-4426-becf-86afd7c9ea0c" alt="" width={10} height={10} />
                      </div>
                      <span style={{ fontSize: "13.5px", fontWeight: 700, color: "#3e4265", lineHeight: "22px" }}>{item}</span>
                    </div>
                  ))}
                </div>

                <div style={{ fontSize: "14px", color: "#272727", lineHeight: "22px" }}>
                  Quy định này nhằm đảm bảo không gian nghỉ ngơi, sinh hoạt chung văn minh và thoải mái cho tất cả cư dân.
                </div>

                {/* Source */}
                <div style={{ fontSize: "13px", color: "#3e4265", lineHeight: "21px" }}>
                  Nguồn: <a href="#" style={{ color: "#4137f9", fontWeight: 500 }}>Nội quy quản lý, sử dụng chung cư Sunshine Riverside (Điều 12.3)</a>
                </div>

                {/* Footer */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "13px", borderTop: "1px solid #eff2fc" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    {[
                      { icon: "https://www.figma.com/api/mcp/asset/64bc89cb-1979-4519-b142-007ef20bf61c", title: "Hữu ích" },
                      { icon: "https://www.figma.com/api/mcp/asset/90c751e5-2d11-4b11-ae78-e6dfe599ce05", title: "Không hữu ích" },
                      { icon: "https://www.figma.com/api/mcp/asset/a8f38ef3-f6a5-4cc9-bfb6-a131b30170d8", title: "Sao chép" },
                      { icon: "https://www.figma.com/api/mcp/asset/19998ac5-5ee0-418c-9ec5-e9ea8e36564a", title: "Chia sẻ" },
                    ].map((btn) => (
                      <div key={btn.title} title={btn.title} style={{ width: "30px", height: "30px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                        <img src={btn.icon} alt={btn.title} width={15} height={15} />
                      </div>
                    ))}
                  </div>
                  <span style={{ fontSize: "11.5px", color: "#585c7b" }}>10:30 AM</span>
                </div>

              </div>
            </div>
          </div>

          {/* Bottom: chips + composer */}
          <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Follow-up chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
              {[
                "Quy định về nuôi thú cưng?",
                "Phí quản lý hàng tháng là bao nhiêu?",
                "Quy trình xử lý khi mất thẻ từ?",
              ].map((chip) => (
                <button key={chip} style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  background: "#ffffff", border: "1px solid #d4d7e5",
                  borderRadius: "999px", padding: "12px 19px",
                  fontSize: "13.5px", fontWeight: 500, color: "#272727",
                  cursor: "pointer", whiteSpace: "nowrap",
                }}>
                  {chip}
                  <img src="https://www.figma.com/api/mcp/asset/3d28ab7d-a463-41ba-9fec-99bfafa1e674" alt="" width={14} height={14} style={{ flex: "0 0 14px" }} />
                </button>
              ))}
            </div>

            {/* Composer */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "12px",
                background: "#ffffff", border: "1px solid #d3c5fd",
                borderRadius: "16px", padding: "15px 19px",
                boxShadow: "0 2px 7px rgba(65,55,249,.05)", width: "100%",
              }}>
                <div style={{ width: "34px", height: "34px", borderRadius: "8px", flex: "0 0 34px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <img src="https://www.figma.com/api/mcp/asset/2890a272-547d-494a-82c7-1c297173a9ee" alt="" width={18} height={18} />
                </div>
                <input
                  type="text"
                  placeholder="Nhập câu hỏi của bạn..."
                  style={{ flex: 1, minWidth: 0, border: 0, outline: 0, fontSize: "14px", color: "#272727", background: "transparent" }}
                />
                <div style={{ width: "42px", height: "42px", background: "#4137f9", borderRadius: "10px", flex: "0 0 42px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <img src="https://www.figma.com/api/mcp/asset/a6760d5c-5a20-4458-8da9-508da214bd0c" alt="" width={18} height={18} />
                </div>
              </div>
              <span style={{ fontSize: "12px", color: "#585c7b", textAlign: "center", whiteSpace: "nowrap" }}>
                AI có thể mắc sai sót. Vui lòng kiểm tra lại thông tin quan trọng.
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
