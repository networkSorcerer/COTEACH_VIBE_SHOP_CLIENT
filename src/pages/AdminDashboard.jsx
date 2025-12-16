import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginWithToken } from "../features/user/userSlice";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.user)
  useEffect(() => {
    console.log("user-type ::::: " , user)
    if (!user || user.level !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch(loginWithToken());
    }
  }, []);


  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <h1>NIKE</h1>
          <span style={styles.badge}>ADMIN</span>
        </div>
        <button style={styles.outlineBtn} onClick={() => navigate("/")}>
          쇼핑몰로 돌아가기
        </button>
      </header>

      {/* Title */}
      <section style={{ marginBottom: 24 }}>
        <h2>관리자 대시보드</h2>
        <p style={{ color: "#666" }}>
          NIKE 쇼핑몰 관리 시스템에 오신 것을 환영합니다.
        </p>
      </section>

      {/* Stats */}
      <section style={styles.stats}>
        <Stat title="총 주문" value="1,234" />
        <Stat title="총 상품" value="156" />
        <Stat title="총 고객" value="2,345" />
        <Stat title="총 매출" value="₩45,678,000" />
      </section>

      {/* Content */}
      <section style={styles.content}>
        <div style={styles.card}>
          <h3>빠른 작업</h3>
          <button style={styles.primaryBtn}>+ 새 상품 등록</button>
          <button style={styles.outlineBtn}>주문 관리</button>
          <button style={styles.outlineBtn}>고객 관리</button>
        </div>

        <div style={{ ...styles.card, flex: 2 }}>
          <h3>최근 주문</h3>
          <Order id="ORD-001234" name="김민수" price="₩219,000" />
          <Order id="ORD-001233" name="이서연" price="₩145,000" />
          <Order id="ORD-001232" name="박지훈" price="₩89,000" />
        </div>
      </section>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div style={styles.statCard}>
      <p style={{ color: "#888" }}>{title}</p>
      <strong style={{ fontSize: 20 }}>{value}</strong>
    </div>
  );
}

function Order({ id, name, price }) {
  return (
    <div style={styles.order}>
      <div>
        <strong>{id}</strong>
        <div style={{ fontSize: 12, color: "#777" }}>{name}</div>
      </div>
      <span style={{ color: "#f59e0b", fontWeight: 600 }}>{price}</span>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: 32,
    background: "#f5f5f5",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  logo: {
    display: "flex",
    gap: 12,
    alignItems: "center",
  },
  badge: {
    background: "#fde68a",
    color: "#92400e",
    padding: "2px 8px",
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 600,
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    background: "#fff",
    padding: 16,
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  content: {
    display: "flex",
    gap: 24,
  },
  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 16,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  order: {
    display: "flex",
    justifyContent: "space-between",
    padding: 12,
    border: "1px solid #eee",
    borderRadius: 12,
  },
  primaryBtn: {
    background: "#111",
    color: "#fff",
    padding: 10,
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
  },
  outlineBtn: {
    background: "#fff",
    border: "1px solid #ddd",
    padding: 10,
    borderRadius: 10,
    cursor: "pointer",
  },
};
