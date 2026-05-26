export default function KhoTaiLieuPage() {
  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>

      {/* Page header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#272727", lineHeight: "36px" }}>
            Kho tài liệu
          </h1>
          <p style={{ fontSize: "16px", color: "#3e4265", marginTop: "6px", lineHeight: "24px", fontWeight: 500 }}>
            Lưu trữ và chia sẻ các tài liệu, quy định, biên bản và biểu mẫu của tòa nhà
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexShrink: 0, paddingTop: "4px" }}>
          <button style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "11px 19px", background: "#ffffff",
            border: "1px solid #d4d7e5", borderRadius: "10px",
            fontSize: "14px", fontWeight: 500, color: "#272727",
            cursor: "pointer", whiteSpace: "nowrap", lineHeight: "22px",
          }}>
            <img src="https://www.figma.com/api/mcp/asset/5b1fb34b-3241-4c29-a762-611ab592e0d4" alt="" width={16} height={16} />
            Yêu cầu tài liệu
          </button>
          <button style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "11px 18px", background: "#4137f9",
            borderRadius: "10px", border: 0,
            fontSize: "14px", fontWeight: 500, color: "#fff",
            cursor: "pointer", whiteSpace: "nowrap", lineHeight: "22px",
          }}>
            <img src="https://www.figma.com/api/mcp/asset/f7d9b813-c0e2-4951-80fc-4f2b8e0286bf" alt="" width={16} height={16} />
            Tải lên tài liệu
          </button>
        </div>
      </div>

      {/* Search row */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <div style={{
          flex: 1, display: "flex", alignItems: "center", gap: "10px",
          border: "1px solid #d4d7e5", borderRadius: "10px",
          padding: "0 15px", height: "44px", background: "#ffffff",
        }}>
          <img src="https://www.figma.com/api/mcp/asset/e5e84f39-43bf-47b7-8e50-b816879b3bfc" alt="" width={16} height={16} style={{ flex: "0 0 16px" }} />
          <input
            placeholder="Tìm kiếm tài liệu..."
            style={{
              flex: 1, border: 0, outline: 0,
              fontSize: "16px", color: "#222222", background: "transparent",
            }}
          />
        </div>
        <button style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "0 19px", height: "44px", background: "#ffffff",
          border: "1px solid #d4d7e5", borderRadius: "10px",
          fontSize: "13.5px", fontWeight: 400, color: "#272727",
          cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
        }}>
          <img src="https://www.figma.com/api/mcp/asset/0dab6af6-554e-4f6e-b014-b2ca135de172" alt="" width={15} height={15} />
          Bộ lọc
        </button>
      </div>

      {/* Section: Danh mục */}
      <div style={{
        background: "#ffffff", border: "1px solid #e2e5f1",
        borderRadius: "20px", padding: "23px 25px",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
          <span style={{ fontSize: "18px", fontWeight: 700, color: "#272727", lineHeight: "26px" }}>Danh mục</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px" }}>
          {[
            { name: "Nội quy - Quy định", count: "12 tài liệu" },
            { name: "Biên bản họp", count: "28 tài liệu" },
            { name: "Hợp đồng - Biểu mẫu", count: "15 tài liệu" },
            { name: "Hướng dẫn sử dụng", count: "8 tài liệu" },
            { name: "Tài liệu khác", count: "6 tài liệu" },
          ].map((folder) => (
            <div key={folder.name} style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "15px", border: "1px solid #e2e5f1", borderRadius: "12px",
              background: "#ffffff", cursor: "pointer",
            }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "10px",
                background: "#f7f5ff", display: "inline-flex",
                alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <img src="https://www.figma.com/api/mcp/asset/430b1f39-fd7a-43af-8049-f1a595a7eb12" alt="" width={20} height={20} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: 0 }}>
                <div style={{ fontSize: "13.5px", color: "#272727", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: 400 }}>
                  {folder.name}
                </div>
                <div style={{ fontSize: "11.5px", color: "#585c7b" }}>{folder.count}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section: Tài liệu mới nhất */}
      <div style={{
        background: "#ffffff", border: "1px solid #e2e5f1",
        borderRadius: "20px", padding: "23px 25px",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
          <span style={{ fontSize: "18px", fontWeight: 700, color: "#272727", lineHeight: "26px" }}>Tài liệu mới nhất</span>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #eff2fc" }}>
              <th style={{ fontSize: "12.5px", fontWeight: 400, color: "#585c7b", padding: "0 12px 14px", textAlign: "left", whiteSpace: "nowrap", width: "43%" }}>Tên tài liệu</th>
              <th style={{ fontSize: "12.5px", fontWeight: 400, color: "#585c7b", padding: "0 12px 14px", textAlign: "left", whiteSpace: "nowrap", width: "17%" }}>Danh mục</th>
              <th style={{ fontSize: "12.5px", fontWeight: 400, color: "#585c7b", padding: "0 12px 14px", textAlign: "left", whiteSpace: "nowrap", width: "10%" }}>Cập nhật</th>
              <th style={{ fontSize: "12.5px", fontWeight: 400, color: "#585c7b", padding: "0 12px 14px", textAlign: "center", whiteSpace: "nowrap", width: "10%" }}>Kích thước</th>
              <th style={{ fontSize: "12.5px", fontWeight: 400, color: "#585c7b", padding: "0 12px 14px", textAlign: "center", whiteSpace: "nowrap", width: "10%" }}>Lượt xem</th>
              <th style={{ fontSize: "12.5px", fontWeight: 400, color: "#585c7b", padding: "0 12px 14px", textAlign: "center", whiteSpace: "nowrap", width: "10%" }}>Tác vụ</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                badgeBg: "#ef4444", badgeTxt: "PDF",
                name: "Nội quy quản lý và sử dụng chung cư Sunshine Riverside", ext: "PDF",
                catClass: "purple", catLabel: "Nội quy - Quy định",
                date: "20/05/2024", size: "2.4 MB", views: "1.256",
              },
              {
                badgeBg: "#ef4444", badgeTxt: "PDF",
                name: "Biên bản họp BQT tháng 5/2024", ext: "PDF",
                catClass: "green", catLabel: "Biên bản họp",
                date: "18/05/2024", size: "1.8 MB", views: "892",
              },
              {
                badgeBg: "#2f7bf6", badgeTxt: "DOC",
                name: "Mẫu đăng ký thẻ từ thang máy", ext: "DOCX",
                catClass: "orange", catLabel: "Hợp đồng - Biểu mẫu",
                date: "16/05/2024", size: "456 KB", views: "745",
              },
              {
                badgeBg: "#ef4444", badgeTxt: "PDF",
                name: "Hướng dẫn sử dụng ứng dụng Nhà Chung", ext: "PDF",
                catClass: "blue", catLabel: "Hướng dẫn sử dụng",
                date: "15/05/2024", size: "3.1 MB", views: "1.102",
              },
              {
                badgeBg: "#ef4444", badgeTxt: "PDF",
                name: "Thông báo về việc điều chỉnh phí dịch vụ", ext: "PDF",
                catClass: "gray", catLabel: "Tài liệu khác",
                date: "14/05/2024", size: "1.2 MB", views: "634",
              },
              {
                badgeBg: "#1cbf6a", badgeTxt: "XLS",
                name: "Báo cáo thu chi Quỹ bảo trì tháng 4/2024", ext: "XLSX",
                catClass: "gray", catLabel: "Tài liệu khác",
                date: "12/05/2024", size: "892 KB", views: "523",
              },
              {
                badgeBg: "#ef4444", badgeTxt: "PDF",
                name: "Quy định về giữ gìn vệ sinh và môi trường", ext: "PDF",
                catClass: "purple", catLabel: "Nội quy - Quy định",
                date: "10/05/2024", size: "1.5 MB", views: "987",
              },
            ].map((row, i) => {
              const catStyles: Record<string, React.CSSProperties> = {
                purple: { background: "#efeaff", color: "#5a3ad9" },
                green:  { background: "#e3fbed", color: "#1c9d5f" },
                orange: { background: "#fff0d9", color: "#c8761b" },
                blue:   { background: "#def5fa", color: "#1287a5" },
                gray:   { background: "#eef0f7", color: "#3e4265" },
              };
              return (
                <tr key={i} style={{ borderBottom: i < 6 ? "1px solid #eff2fc" : "none" }}>
                  <td style={{ padding: "16px 12px 17px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{
                        width: "32px", height: "38px", borderRadius: "6px",
                        background: row.badgeBg,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, position: "relative",
                      }}>
                        <div style={{
                          position: "absolute", top: 0, right: 0,
                          width: "9px", height: "9px",
                          background: "rgba(255,255,255,.35)",
                          borderBottomLeftRadius: "3px",
                        }} />
                        <span style={{
                          fontSize: "9px", fontWeight: 400, color: "#fff",
                          letterSpacing: ".36px", textAlign: "center", lineHeight: "normal",
                          position: "relative", zIndex: 1,
                        }}>{row.badgeTxt}</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: 0 }}>
                        <div style={{ fontSize: "13.5px", color: "#272727", lineHeight: "normal" }}>{row.name}</div>
                        <div style={{ fontSize: "11.5px", color: "#585c7b", textTransform: "uppercase", letterSpacing: ".46px" }}>{row.ext}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "0 12px", verticalAlign: "middle" }}>
                    <span style={{
                      display: "inline-flex", alignItems: "center",
                      padding: "5px 10px", borderRadius: "999px",
                      fontSize: "11.5px", whiteSpace: "nowrap", lineHeight: "normal",
                      ...catStyles[row.catClass],
                    }}>{row.catLabel}</span>
                  </td>
                  <td style={{ padding: "0 12px", verticalAlign: "middle" }}>
                    <span style={{ fontSize: "13.5px", color: "#3e4265", whiteSpace: "nowrap" }}>{row.date}</span>
                  </td>
                  <td style={{ padding: "0 12px", verticalAlign: "middle", textAlign: "center" }}>
                    <span style={{ fontSize: "13.5px", color: "#3e4265", whiteSpace: "nowrap" }}>{row.size}</span>
                  </td>
                  <td style={{ padding: "0 12px", verticalAlign: "middle", textAlign: "center" }}>
                    <span style={{ fontSize: "13.5px", color: "#3e4265", whiteSpace: "nowrap" }}>{row.views}</span>
                  </td>
                  <td style={{ padding: "0 12px", verticalAlign: "middle" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "19.5px 0" }}>
                      <button style={{
                        width: "32px", height: "32px", borderRadius: "8px",
                        background: "#f7f8fc", border: 0,
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", flexShrink: 0,
                      }} title="Xem">
                        <img src="https://www.figma.com/api/mcp/asset/11233af8-3ea8-42c5-9f66-042e59f01659" alt="Xem" width={15} height={15} />
                      </button>
                      <button style={{
                        width: "32px", height: "32px", borderRadius: "8px",
                        background: "#f7f8fc", border: 0,
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", flexShrink: 0,
                      }} title="Tải xuống">
                        <img src="https://www.figma.com/api/mcp/asset/4d6f8621-fb91-4e73-b77f-00e312bdce48" alt="Tải xuống" width={15} height={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: "18px", marginTop: "8px",
          borderTop: "1px solid #eff2fc",
        }}>
          <span style={{ fontSize: "12.5px", color: "#3e4265" }}>Hiển thị 1 - 8 của 128 tài liệu</span>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <button style={{
              minWidth: "32px", height: "32px", borderRadius: "8px",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              padding: "0", fontSize: "13px", color: "#3e4265",
              border: "1px solid #d4d7e5", background: "#ffffff", cursor: "pointer",
            }}>
              <img src="https://www.figma.com/api/mcp/asset/ba478cc3-0b5e-44ca-a131-55ba84ff73b8" alt="Trang trước" width={11} height={11} />
            </button>
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} style={{
                minWidth: "32px", height: "32px", borderRadius: "8px",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                padding: "0 10px", fontSize: "13px",
                color: n === 1 ? "#fff" : "#3e4265",
                border: n === 1 ? "1px solid #4137f9" : "1px solid #d4d7e5",
                background: n === 1 ? "#4137f9" : "#ffffff",
                cursor: "pointer",
              }}>{n}</button>
            ))}
            <button style={{
              minWidth: "32px", height: "32px", borderRadius: "8px",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              padding: "0 10px", fontSize: "13px", color: "#585c7b",
              border: "none", background: "none", cursor: "default",
            }}>…</button>
            <button style={{
              minWidth: "32px", height: "32px", borderRadius: "8px",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              padding: "0 10px", fontSize: "13px", color: "#3e4265",
              border: "1px solid #d4d7e5", background: "#ffffff", cursor: "pointer",
            }}>16</button>
            <button style={{
              minWidth: "32px", height: "32px", borderRadius: "8px",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              padding: "0", fontSize: "13px", color: "#3e4265",
              border: "1px solid #d4d7e5", background: "#ffffff", cursor: "pointer",
            }}>
              <img src="https://www.figma.com/api/mcp/asset/3d0c597c-faf7-4f24-bfdf-9f6e9954f120" alt="Trang sau" width={11} height={11} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
