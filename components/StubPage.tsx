interface StubPageProps {
  title: string;
  description: string;
  emoji: string;
}

export function StubPage({ title, description, emoji }: StubPageProps) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "60vh",
      gap: "16px",
      color: "#585c7b",
    }}>
      <div style={{ fontSize: "64px" }}>{emoji}</div>
      <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#272727", margin: 0 }}>{title}</h1>
      <p style={{ fontSize: "16px", color: "#3e4265", margin: 0 }}>{description}</p>
      <div style={{
        marginTop: "8px",
        padding: "8px 20px",
        background: "#f1f7ff",
        borderRadius: "999px",
        color: "#4137f9",
        fontSize: "13px",
        fontWeight: 600,
      }}>
        Sắp ra mắt
      </div>
    </div>
  );
}
