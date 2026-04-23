import { useState } from "react";
import Icon from "@/components/ui/icon";

const PROFILE_BG = "https://cdn.poehali.dev/files/3558c9c6-12f6-4ee5-afcf-9e1b87e76b82.jpg";
const TELEGRAM_URL = "https://t.me/ForbesDzhambek";
const TIPS_URL = "";

// Яндекс OAuth — Client ID подставляется после добавления секрета
const YANDEX_CLIENT_ID = "dc8c46c4ab1648628cfd8fb3fede30fc";
const REDIRECT_URI = window.location.origin + "/auth/yandex/callback";

const DIFFICULTY_OPTIONS = ["Лёгкий", "Средний", "Сложный", "Экстрем"];
const DIFFICULTY_COLORS: Record<string, string> = {
  "Лёгкий": "#22c55e", "Средний": "#f59e0b", "Сложный": "#ef4444", "Экстрем": "#8b5cf6",
};

interface YandexUser { name: string; avatar?: string; login: string; }
interface Route { id: number; name: string; distance: string; elevation: string; duration: string; difficulty: string; tags: string; description: string; }
interface InvCard { id: number; label: string; value: string; change: string; icon: string; }
interface InvRound { id: number; round: string; amount: string; date: string; status: string; }
interface Thought { id: number; title: string; text: string; tag: string; emoji: string; date: string; }
interface Post { id: number; category: "bike" | "run"; title: string; text: string; distance: string; duration: string; mood: string; date: string; author: string; avatar?: string; }

type Tab = "blog" | "routes" | "investments" | "thoughts";
type Category = "all" | "bike" | "run";

const emptyRoute = { name: "", distance: "", elevation: "", duration: "", difficulty: "Средний", tags: "", description: "" };
const emptyCard = { label: "", value: "", change: "", icon: "TrendingUp" };
const emptyRound = { round: "", amount: "", date: "", status: "Открыт" };
const emptyThought = { title: "", text: "", tag: "", emoji: "💡", date: "" };
const emptyPost = { category: "bike" as const, title: "", text: "", distance: "", duration: "", mood: "😊" };
const ICON_OPTIONS = ["TrendingUp", "Users", "Map", "Award", "DollarSign", "BarChart2", "Star", "Zap"];
const STATUS_OPTIONS = ["Открыт", "Закрыт"];
const MOODS = ["😊", "🔥", "💪", "😤", "🥵", "🏆", "😌", "⚡"];

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("blog");
  const [category, setCategory] = useState<Category>("all");

  // Auth
  const [user, setUser] = useState<YandexUser | null>(null);

  // Blog posts
  const [posts, setPosts] = useState<Post[]>([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [postForm, setPostForm] = useState(emptyPost);

  // Routes
  const [routes, setRoutes] = useState<Route[]>([]);
  const [showRouteForm, setShowRouteForm] = useState(false);
  const [routeForm, setRouteForm] = useState(emptyRoute);
  const [deleteRouteId, setDeleteRouteId] = useState<number | null>(null);

  // Investments
  const [invCards, setInvCards] = useState<InvCard[]>([]);
  const [invRounds, setInvRounds] = useState<InvRound[]>([]);
  const [showCardForm, setShowCardForm] = useState(false);
  const [showRoundForm, setShowRoundForm] = useState(false);
  const [cardForm, setCardForm] = useState(emptyCard);
  const [roundForm, setRoundForm] = useState(emptyRound);
  const [deleteCardId, setDeleteCardId] = useState<number | null>(null);
  const [deleteRoundId, setDeleteRoundId] = useState<number | null>(null);

  // Thoughts
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [showThoughtForm, setShowThoughtForm] = useState(false);
  const [thoughtForm, setThoughtForm] = useState(emptyThought);
  const [deleteThoughtId, setDeleteThoughtId] = useState<number | null>(null);

  // Tips
  const [tipsUrl, setTipsUrl] = useState(TIPS_URL);
  const [editingTips, setEditingTips] = useState(false);
  const [tipsInput, setTipsInput] = useState(TIPS_URL);

  const loginWithYandex = () => {
    if (!YANDEX_CLIENT_ID) {
      // Demo mode — simulate login
      setUser({ name: "Пользователь", login: "demo_user" });
      return;
    }
    const url = `https://oauth.yandex.ru/authorize?response_type=token&client_id=${YANDEX_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = url;
  };

  const logout = () => setUser(null);

  const handleAddPost = () => {
    if (!postForm.title.trim() || !user) return;
    const today = new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
    setPosts((p) => [{ ...postForm, id: Date.now(), date: today, author: user.name, avatar: user.avatar }, ...p]);
    setPostForm(emptyPost);
    setShowPostForm(false);
  };

  const handleAddRoute = () => {
    if (!routeForm.name.trim()) return;
    setRoutes((p) => [{ ...routeForm, id: Date.now() }, ...p]);
    setRouteForm(emptyRoute); setShowRouteForm(false);
  };
  const handleAddCard = () => {
    if (!cardForm.label.trim()) return;
    setInvCards((p) => [{ ...cardForm, id: Date.now() }, ...p]);
    setCardForm(emptyCard); setShowCardForm(false);
  };
  const handleAddRound = () => {
    if (!roundForm.round.trim()) return;
    setInvRounds((p) => [{ ...roundForm, id: Date.now() }, ...p]);
    setRoundForm(emptyRound); setShowRoundForm(false);
  };
  const handleAddThought = () => {
    if (!thoughtForm.title.trim()) return;
    const today = new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
    setThoughts((p) => [{ ...thoughtForm, date: thoughtForm.date || today, id: Date.now() }, ...p]);
    setThoughtForm(emptyThought); setShowThoughtForm(false);
  };

  // ── тёмная тема ──────────────────────────────────
  const D = {
    bg:      "#0d0d0d",
    surface: "#161616",
    card:    "#1c1c1c",
    border:  "rgba(255,255,255,0.08)",
    text:    "#f0f0f0",
    muted:   "#6b7280",
    accent:  "#84cc16",
    accentDim: "rgba(132,204,22,0.12)",
  } as const;

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "#111", border: `1.5px solid rgba(255,255,255,0.12)`,
    borderRadius: 10, padding: "11px 14px", color: D.text, fontSize: 14,
    fontFamily: "'IBM Plex Sans', sans-serif", outline: "none", boxSizing: "border-box",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 11, color: D.muted, letterSpacing: "0.08em",
    textTransform: "uppercase", display: "block", marginBottom: 6, fontWeight: 600,
  };
  const addBtnStyle = (active: boolean): React.CSSProperties => ({
    display: "flex", alignItems: "center", gap: 8, padding: "10px 20px",
    background: active ? D.accentDim : D.accent,
    color: active ? D.accent : "#0d0d0d",
    border: active ? `1.5px solid ${D.accent}` : "none",
    borderRadius: 12, cursor: "pointer",
    fontFamily: "'Oswald', sans-serif", fontSize: 13, fontWeight: 700,
    letterSpacing: "0.06em", textTransform: "uppercase", transition: "all 0.2s",
  });
  const saveBtnStyle = (enabled: boolean): React.CSSProperties => ({
    padding: "11px 28px",
    background: enabled ? D.accent : "#2a2a2a",
    color: enabled ? "#0d0d0d" : D.muted,
    border: "none", borderRadius: 12,
    cursor: enabled ? "pointer" : "not-allowed",
    fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 700,
    letterSpacing: "0.08em", textTransform: "uppercase", transition: "all 0.2s",
  });
  const formBox: React.CSSProperties = {
    background: D.card, border: `1.5px solid rgba(132,204,22,0.25)`,
    borderRadius: 18, padding: "24px", marginBottom: 24,
    boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
  };
  const deleteConfirm = (onYes: () => void, onNo: () => void) => (
    <div style={{ marginTop: 12, padding: "11px 14px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
      <span style={{ fontSize: 13, color: "#ef4444" }}>Удалить?</span>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={onYes} style={{ padding: "5px 14px", background: "#ef4444", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Да</button>
        <button onClick={onNo} style={{ padding: "5px 14px", background: "transparent", color: D.muted, border: `1px solid ${D.border}`, borderRadius: 8, cursor: "pointer", fontSize: 12 }}>Нет</button>
      </div>
    </div>
  );

  const filteredPosts = posts.filter((p) => category === "all" || p.category === category);

  return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh", fontFamily: "'IBM Plex Sans', sans-serif" }}>

      {/* ===== HEADER ===== */}
      <header style={{ background: "rgba(13,13,13,0.96)", borderBottom: `1px solid rgba(255,255,255,0.08)`, position: "sticky", top: 0, zIndex: 50, boxShadow: "0 1px 8px rgba(0,0,0,0.4)", backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #15803d, #22c55e)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="Bike" size={18} style={{ color: "#fff" }} />
            </div>
            <div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 15, fontWeight: 700, color: "#f0f0f0", letterSpacing: "0.04em", lineHeight: 1 }}>РАБОТАЙТЕ ПРАВИЛЬНО</div>
              <div style={{ fontSize: 10, color: "#84cc16", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>Велопутешествия и бег</div>
            </div>
          </div>

          {/* Nav tabs */}
          <nav style={{ display: "flex", gap: 4 }}>
            {([
              { key: "blog", label: "Блог", icon: "BookOpen" },
              { key: "routes", label: "Маршруты", icon: "Route" },
              { key: "investments", label: "Инвестиции", icon: "TrendingUp" },
              { key: "thoughts", label: "Мысли CEO", icon: "Lightbulb" },
            ] as { key: Tab; label: string; icon: string }[]).map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                display: "flex", alignItems: "center", gap: 6, padding: "7px 14px",
                background: activeTab === tab.key ? "rgba(132,204,22,0.12)" : "transparent",
                color: activeTab === tab.key ? "#84cc16" : "#6b7280",
                border: "none", borderRadius: 10, cursor: "pointer",
                fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, fontWeight: activeTab === tab.key ? 600 : 400,
                transition: "all 0.15s",
              }}>
                <Icon name={tab.icon} size={14} />
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Auth */}
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #15803d, #22c55e)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 13, color: "#fff", fontWeight: 700 }}>{user.name[0]}</span>
              </div>
              <span style={{ fontSize: 13, color: "#d1d5db", fontWeight: 500 }}>{user.name}</span>
              <button onClick={logout} style={{ padding: "6px 12px", background: "transparent", color: "#6b7280", border: `1px solid rgba(255,255,255,0.08)`, borderRadius: 8, cursor: "pointer", fontSize: 12 }}>Выйти</button>
            </div>
          ) : (
            <button onClick={loginWithYandex} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", background: "#fc3f1d", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'IBM Plex Sans', sans-serif" }}>
              <span style={{ fontSize: 15 }}>Я</span>
              Войти через Яндекс
            </button>
          )}
        </div>
      </header>

      {/* ===== HERO ===== */}
      <div style={{ position: "relative", height: 420, overflow: "hidden" }}>
        <img src={PROFILE_BG} alt="Герой" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.7) 100%)" }} />

        {/* Category pills */}
        <div style={{ position: "absolute", top: 28, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 10 }}>
          {([
            { key: "all", label: "Всё", emoji: "🌍" },
            { key: "bike", label: "Велопутешествия", emoji: "🚴" },
            { key: "run", label: "Бег", emoji: "🏃" },
          ] as { key: Category; label: string; emoji: string }[]).map((c) => (
            <button key={c.key} onClick={() => { setCategory(c.key); setActiveTab("blog"); }} style={{
              padding: "8px 18px", borderRadius: 30,
              background: category === c.key ? "#84cc16" : "rgba(255,255,255,0.2)",
              backdropFilter: "blur(8px)",
              color: category === c.key ? "#0d0d0d" : "#fff",
              border: category === c.key ? "none" : "1.5px solid rgba(255,255,255,0.4)",
              cursor: "pointer", fontSize: 13, fontWeight: 600,
              fontFamily: "'IBM Plex Sans', sans-serif",
              transition: "all 0.2s", display: "flex", alignItems: "center", gap: 6,
            }}>
              <span>{c.emoji}</span> {c.label}
            </button>
          ))}
        </div>

        <div style={{ position: "absolute", bottom: 44, left: 0, right: 0, textAlign: "center" }}>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 50, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.05, textShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
            {category === "run" ? "КАЖДЫЙ ШАГ" : "КАЖДЫЙ КИЛОМЕТР"}<br />
            <span style={{ color: "#4ade80" }}>{category === "run" ? "СЧИТАЕТСЯ" : "НА СЧЕТУ"}</span>
          </div>
          <p style={{ marginTop: 14, fontSize: 15, color: "rgba(255,255,255,0.75)", fontWeight: 300 }}>
            Делись впечатлениями · Следи за маршрутами · Вдохновляй других
          </p>
          {!user && (
            <button onClick={loginWithYandex} style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", background: "#fc3f1d", color: "#fff", border: "none", borderRadius: 12, cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "'IBM Plex Sans', sans-serif", boxShadow: "0 4px 20px rgba(252,63,29,0.4)" }}>
              <span style={{ fontSize: 16 }}>Я</span>
              Войти и поделиться впечатлениями
            </button>
          )}
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 140px" }}>

        {/* ===== BLOG ===== */}
        {activeTab === "blog" && (
          <div>
            {/* Category switcher */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
              <div style={{ display: "flex", gap: 8 }}>
                {([
                  { key: "all", label: "Все записи" },
                  { key: "bike", label: "🚴 Велопутешествия" },
                  { key: "run", label: "🏃 Бег" },
                ] as { key: Category; label: string }[]).map((c) => (
                  <button key={c.key} onClick={() => setCategory(c.key)} style={{
                    padding: "7px 16px", borderRadius: 20,
                    background: category === c.key ? "#84cc16" : "#161616",
                    color: category === c.key ? "#0d0d0d" : "#6b7280",
                    border: category === c.key ? "none" : `1.5px solid rgba(255,255,255,0.08)`,
                    cursor: "pointer", fontSize: 13, fontWeight: 500,
                    fontFamily: "'IBM Plex Sans', sans-serif", transition: "all 0.15s",
                  }}>{c.label}</button>
                ))}
              </div>
              {user && (
                <button onClick={() => setShowPostForm(!showPostForm)} style={addBtnStyle(showPostForm)}>
                  <Icon name={showPostForm ? "X" : "PenLine"} size={15} />
                  {showPostForm ? "Отмена" : "Написать впечатление"}
                </button>
              )}
            </div>

            {/* Post form */}
            {showPostForm && user && (
              <div style={formBox}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#15803d,#22c55e)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 14, color: "#fff", fontWeight: 700 }}>{user.name[0]}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#f0f0f0" }}>{user.name}</div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>Новая запись в блог</div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Категория</label>
                    <select style={inputStyle} value={postForm.category} onChange={(e) => setPostForm({ ...postForm, category: e.target.value as "bike" | "run" })}>
                      <option value="bike">🚴 Велопутешествие</option>
                      <option value="run">🏃 Бег</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Настроение</label>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const }}>
                      {MOODS.map((m) => (
                        <button key={m} onClick={() => setPostForm({ ...postForm, mood: m })} style={{ fontSize: 22, background: postForm.mood === m ? "rgba(132,204,22,0.15)" : "transparent", border: postForm.mood === m ? "2px solid #84cc16" : "2px solid transparent", borderRadius: 8, cursor: "pointer", padding: 4, transition: "all 0.1s" }}>{m}</button>
                      ))}
                    </div>
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>Заголовок *</label>
                    <input style={inputStyle} placeholder="Мой первый маршрут вдоль реки..." value={postForm.title} onChange={(e) => setPostForm({ ...postForm, title: e.target.value })} />
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>Впечатления</label>
                    <textarea style={{ ...inputStyle, minHeight: 100, resize: "vertical" }} placeholder="Расскажи как прошло, что видел, что почувствовал..." value={postForm.text} onChange={(e) => setPostForm({ ...postForm, text: e.target.value })} />
                  </div>
                  <div>
                    <label style={labelStyle}>Дистанция</label>
                    <input style={inputStyle} placeholder="12 км" value={postForm.distance} onChange={(e) => setPostForm({ ...postForm, distance: e.target.value })} />
                  </div>
                  <div>
                    <label style={labelStyle}>Время</label>
                    <input style={inputStyle} placeholder="1 ч 20 мин" value={postForm.duration} onChange={(e) => setPostForm({ ...postForm, duration: e.target.value })} />
                  </div>
                </div>
                <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
                  <button onClick={handleAddPost} disabled={!postForm.title.trim()} style={saveBtnStyle(!!postForm.title.trim())}>Опубликовать</button>
                  <button onClick={() => setShowPostForm(false)} style={{ padding: "11px 20px", background: "transparent", color: "#6b7280", border: `1.5px solid rgba(255,255,255,0.12)`, borderRadius: 12, cursor: "pointer", fontSize: 13 }}>Отмена</button>
                </div>
              </div>
            )}

            {/* Login CTA */}
            {!user && (
              <div style={{ background: "#1c1c1c", border: `1.5px solid rgba(255,255,255,0.08)`, borderRadius: 16, padding: "24px", marginBottom: 24, display: "flex", alignItems: "center", gap: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>
                <div style={{ fontSize: 36 }}>✍️</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "#f0f0f0", marginBottom: 4 }}>Поделись своими впечатлениями</div>
                  <div style={{ fontSize: 13, color: "#6b7280" }}>Войди через Яндекс, чтобы писать о своих поездках и пробежках</div>
                </div>
                <button onClick={loginWithYandex} style={{ padding: "10px 20px", background: "#fc3f1d", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" as const }}>
                  Я  Войти
                </button>
              </div>
            )}

            {/* Posts */}
            {filteredPosts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 24px", background: "#161616", borderRadius: 20, border: "1.5px dashed rgba(255,255,255,0.12)" }}>
                <div style={{ fontSize: 44, marginBottom: 14 }}>{category === "run" ? "🏃" : "🚴"}</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: "#d1d5db", marginBottom: 8 }}>Записей пока нет</div>
                <p style={{ color: "#6b7280", fontSize: 14 }}>Будь первым — поделись впечатлениями от поездки или пробежки</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 20 }}>
                {filteredPosts.map((post) => (
                  <article key={post.id} style={{ background: "#161616", borderRadius: 18, border: `1px solid rgba(255,255,255,0.08)`, padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.3)", transition: "box-shadow 0.2s" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                      <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#15803d,#22c55e)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: 15, color: "#fff", fontWeight: 700 }}>{post.author[0]}</span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#f0f0f0" }}>{post.author}</div>
                        <div style={{ fontSize: 12, color: "#6b7280" }}>{post.date}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 22 }}>{post.mood}</span>
                        <span style={{ padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: post.category === "bike" ? "rgba(132,204,22,0.12)" : "rgba(59,130,246,0.12)", color: post.category === "bike" ? "#84cc16" : "#60a5fa" }}>
                          {post.category === "bike" ? "🚴 Велопутешествие" : "🏃 Бег"}
                        </span>
                      </div>
                    </div>
                    <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, fontWeight: 700, color: "#f0f0f0", margin: "0 0 10px", lineHeight: 1.2 }}>{post.title}</h3>
                    {post.text && <p style={{ fontSize: 15, color: "#d1d5db", lineHeight: 1.75, margin: "0 0 16px" }}>{post.text}</p>}
                    {(post.distance || post.duration) && (
                      <div style={{ display: "flex", gap: 16, padding: "12px 16px", background: "#111", borderRadius: 12 }}>
                        {post.distance && <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name="Ruler" size={14} style={{ color: "#84cc16" }} /><span style={{ fontSize: 13, fontWeight: 600, color: "#d1d5db" }}>{post.distance}</span></div>}
                        {post.duration && <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name="Clock" size={14} style={{ color: "#84cc16" }} /><span style={{ fontSize: 13, fontWeight: 600, color: "#d1d5db" }}>{post.duration}</span></div>}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== ROUTES ===== */}
        {activeTab === "routes" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 32, fontWeight: 700, color: "#f0f0f0", margin: 0 }}>МАРШРУТЫ</h2>
                <span style={{ fontSize: 13, color: "#84cc16", fontWeight: 600 }}>{routes.length} добавлено</span>
              </div>
              <button onClick={() => setShowRouteForm(!showRouteForm)} style={addBtnStyle(showRouteForm)}>
                <Icon name={showRouteForm ? "X" : "Plus"} size={15} />
                {showRouteForm ? "Отмена" : "Добавить маршрут"}
              </button>
            </div>

            {showRouteForm && (
              <div style={formBox}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 17, fontWeight: 600, color: "#f0f0f0", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                  <Icon name="MapPin" size={16} style={{ color: "#84cc16" }} /> Новый маршрут
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>Название *</label>
                    <input style={inputStyle} placeholder="Вдоль реки Иртыш" value={routeForm.name} onChange={(e) => setRouteForm({ ...routeForm, name: e.target.value })} />
                  </div>
                  <div><label style={labelStyle}>Дистанция</label><input style={inputStyle} placeholder="45 км" value={routeForm.distance} onChange={(e) => setRouteForm({ ...routeForm, distance: e.target.value })} /></div>
                  <div><label style={labelStyle}>Набор высоты</label><input style={inputStyle} placeholder="320 м" value={routeForm.elevation} onChange={(e) => setRouteForm({ ...routeForm, elevation: e.target.value })} /></div>
                  <div><label style={labelStyle}>Время</label><input style={inputStyle} placeholder="2 ч 30 мин" value={routeForm.duration} onChange={(e) => setRouteForm({ ...routeForm, duration: e.target.value })} /></div>
                  <div>
                    <label style={labelStyle}>Сложность</label>
                    <select style={inputStyle} value={routeForm.difficulty} onChange={(e) => setRouteForm({ ...routeForm, difficulty: e.target.value })}>
                      {DIFFICULTY_OPTIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}><label style={labelStyle}>Теги</label><input style={inputStyle} placeholder="Река, Асфальт, Город" value={routeForm.tags} onChange={(e) => setRouteForm({ ...routeForm, tags: e.target.value })} /></div>
                  <div style={{ gridColumn: "1 / -1" }}><label style={labelStyle}>Описание</label><textarea style={{ ...inputStyle, resize: "vertical", minHeight: 76 }} placeholder="Особенности маршрута..." value={routeForm.description} onChange={(e) => setRouteForm({ ...routeForm, description: e.target.value })} /></div>
                </div>
                <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
                  <button onClick={handleAddRoute} disabled={!routeForm.name.trim()} style={saveBtnStyle(!!routeForm.name.trim())}>Сохранить</button>
                  <button onClick={() => setShowRouteForm(false)} style={{ padding: "11px 20px", background: "transparent", color: "#6b7280", border: `1.5px solid rgba(255,255,255,0.12)`, borderRadius: 12, cursor: "pointer", fontSize: 13 }}>Отмена</button>
                </div>
              </div>
            )}

            {routes.length === 0 && !showRouteForm && (
              <div style={{ textAlign: "center", padding: "60px 24px", background: "#161616", borderRadius: 20, border: "1.5px dashed rgba(255,255,255,0.12)" }}>
                <div style={{ fontSize: 42, marginBottom: 12 }}>🚴</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: "#d1d5db", marginBottom: 8 }}>Маршрутов пока нет</div>
                <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 20 }}>Добавь свой первый маршрут</p>
                <button onClick={() => setShowRouteForm(true)} style={saveBtnStyle(true)}>+ Добавить маршрут</button>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18 }}>
              {routes.map((route) => {
                const color = DIFFICULTY_COLORS[route.difficulty] || "#84cc16";
                const tagList = route.tags ? route.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
                return (
                  <div key={route.id} style={{ background: "#161616", border: `1px solid rgba(255,255,255,0.08)`, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
                    <div style={{ height: 4, background: color }} />
                    <div style={{ padding: "18px" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                        <div>
                          <span style={{ background: color + "22", color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{route.difficulty}</span>
                          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 19, fontWeight: 700, color: "#f0f0f0", marginTop: 7 }}>{route.name}</div>
                        </div>
                        <button onClick={() => setDeleteRouteId(deleteRouteId === route.id ? null : route.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#4b5563", padding: 4 }}>
                          <Icon name="Trash2" size={15} />
                        </button>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 12, marginBottom: 10 }}>
                        {route.distance && <div style={{ display: "flex", alignItems: "center", gap: 5 }}><Icon name="Ruler" size={12} style={{ color: "#84cc16" }} /><span style={{ fontSize: 13, color: "#d1d5db" }}>{route.distance}</span></div>}
                        {route.elevation && <div style={{ display: "flex", alignItems: "center", gap: 5 }}><Icon name="MountainSnow" size={12} style={{ color: "#84cc16" }} /><span style={{ fontSize: 13, color: "#d1d5db" }}>{route.elevation}</span></div>}
                        {route.duration && <div style={{ display: "flex", alignItems: "center", gap: 5 }}><Icon name="Clock" size={12} style={{ color: "#84cc16" }} /><span style={{ fontSize: 13, color: "#d1d5db" }}>{route.duration}</span></div>}
                      </div>
                      {route.description && <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, marginBottom: 10 }}>{route.description}</p>}
                      {tagList.length > 0 && (
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const }}>
                          {tagList.map((tag) => <span key={tag} style={{ background: "rgba(132,204,22,0.1)", color: "#84cc16", fontSize: 11, padding: "3px 10px", borderRadius: 20, fontWeight: 500 }}>{tag}</span>)}
                        </div>
                      )}
                      {deleteRouteId === route.id && deleteConfirm(() => { setRoutes((p) => p.filter((r) => r.id !== route.id)); setDeleteRouteId(null); }, () => setDeleteRouteId(null))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===== INVESTMENTS ===== */}
        {activeTab === "investments" && (
          <div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 32, fontWeight: 700, color: "#f0f0f0", margin: "0 0 28px" }}>ИНВЕСТИЦИИ</h2>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", letterSpacing: "0.1em", textTransform: "uppercase" }}>Показатели</div>
              <button onClick={() => setShowCardForm(!showCardForm)} style={addBtnStyle(showCardForm)}>
                <Icon name={showCardForm ? "X" : "Plus"} size={14} /> {showCardForm ? "Отмена" : "Добавить показатель"}
              </button>
            </div>
            {showCardForm && (
              <div style={formBox}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
                  <div style={{ gridColumn: "1 / -1" }}><label style={labelStyle}>Название *</label><input style={inputStyle} placeholder="Привлечённые инвестиции" value={cardForm.label} onChange={(e) => setCardForm({ ...cardForm, label: e.target.value })} /></div>
                  <div><label style={labelStyle}>Значение</label><input style={inputStyle} placeholder="₽12.5 млн" value={cardForm.value} onChange={(e) => setCardForm({ ...cardForm, value: e.target.value })} /></div>
                  <div><label style={labelStyle}>Изменение</label><input style={inputStyle} placeholder="+34%" value={cardForm.change} onChange={(e) => setCardForm({ ...cardForm, change: e.target.value })} /></div>
                  <div><label style={labelStyle}>Иконка</label><select style={inputStyle} value={cardForm.icon} onChange={(e) => setCardForm({ ...cardForm, icon: e.target.value })}>{ICON_OPTIONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}</select></div>
                </div>
                <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
                  <button onClick={handleAddCard} disabled={!cardForm.label.trim()} style={saveBtnStyle(!!cardForm.label.trim())}>Сохранить</button>
                  <button onClick={() => setShowCardForm(false)} style={{ padding: "11px 20px", background: "transparent", color: "#6b7280", border: `1.5px solid rgba(255,255,255,0.12)`, borderRadius: 12, cursor: "pointer", fontSize: 13 }}>Отмена</button>
                </div>
              </div>
            )}
            {invCards.length === 0 && !showCardForm && (
              <div style={{ border: `1.5px dashed rgba(255,255,255,0.12)`, borderRadius: 14, padding: "28px", textAlign: "center", marginBottom: 28, background: "#161616" }}>
                <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 14 }}>Нет показателей — добавь свои KPI</p>
                <button onClick={() => setShowCardForm(true)} style={saveBtnStyle(true)}>+ Добавить</button>
              </div>
            )}
            {invCards.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
                {invCards.map((card) => (
                  <div key={card.id} style={{ background: "#161616", border: `1px solid rgba(255,255,255,0.08)`, borderRadius: 16, padding: "22px", position: "relative", boxShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
                    <button onClick={() => setDeleteCardId(deleteCardId === card.id ? null : card.id)} style={{ position: "absolute", top: 12, right: 12, background: "transparent", border: "none", cursor: "pointer", color: "#4b5563" }}><Icon name="Trash2" size={14} /></button>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(132,204,22,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}><Icon name={card.icon} size={18} style={{ color: "#84cc16" }} /></div>
                    {card.change && <span style={{ fontSize: 11, fontWeight: 700, color: "#84cc16", background: "rgba(132,204,22,0.12)", padding: "2px 8px", borderRadius: 20 }}>{card.change}</span>}
                    <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 28, fontWeight: 700, color: "#f0f0f0", marginTop: 10, lineHeight: 1 }}>{card.value || "—"}</div>
                    <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{card.label}</div>
                    {deleteCardId === card.id && deleteConfirm(() => { setInvCards((p) => p.filter((c) => c.id !== card.id)); setDeleteCardId(null); }, () => setDeleteCardId(null))}
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", letterSpacing: "0.1em", textTransform: "uppercase" }}>Раунды финансирования</div>
              <button onClick={() => setShowRoundForm(!showRoundForm)} style={addBtnStyle(showRoundForm)}>
                <Icon name={showRoundForm ? "X" : "Plus"} size={14} /> {showRoundForm ? "Отмена" : "Добавить раунд"}
              </button>
            </div>
            {showRoundForm && (
              <div style={formBox}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
                  <div><label style={labelStyle}>Раунд *</label><input style={inputStyle} placeholder="Series A" value={roundForm.round} onChange={(e) => setRoundForm({ ...roundForm, round: e.target.value })} /></div>
                  <div><label style={labelStyle}>Сумма</label><input style={inputStyle} placeholder="₽50 млн" value={roundForm.amount} onChange={(e) => setRoundForm({ ...roundForm, amount: e.target.value })} /></div>
                  <div><label style={labelStyle}>Дата</label><input style={inputStyle} placeholder="Март 2025" value={roundForm.date} onChange={(e) => setRoundForm({ ...roundForm, date: e.target.value })} /></div>
                  <div><label style={labelStyle}>Статус</label><select style={inputStyle} value={roundForm.status} onChange={(e) => setRoundForm({ ...roundForm, status: e.target.value })}>{STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
                </div>
                <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
                  <button onClick={handleAddRound} disabled={!roundForm.round.trim()} style={saveBtnStyle(!!roundForm.round.trim())}>Сохранить</button>
                  <button onClick={() => setShowRoundForm(false)} style={{ padding: "11px 20px", background: "transparent", color: "#6b7280", border: `1.5px solid rgba(255,255,255,0.12)`, borderRadius: 12, cursor: "pointer", fontSize: 13 }}>Отмена</button>
                </div>
              </div>
            )}
            {invRounds.length === 0 && !showRoundForm && (
              <div style={{ border: `1.5px dashed rgba(255,255,255,0.12)`, borderRadius: 14, padding: "28px", textAlign: "center", background: "#161616" }}>
                <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 14 }}>Добавь историю финансирования</p>
                <button onClick={() => setShowRoundForm(true)} style={saveBtnStyle(true)}>+ Добавить раунд</button>
              </div>
            )}
            {invRounds.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
                {invRounds.map((r) => (
                  <div key={r.id} style={{ background: "#161616", border: `1px solid rgba(255,255,255,0.08)`, borderRadius: 14, padding: "18px 22px", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: r.status === "Открыт" ? "#84cc16" : "#4b5563", flexShrink: 0 }} />
                        <div><div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 17, fontWeight: 700, color: "#f0f0f0" }}>{r.round}</div>{r.date && <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{r.date}</div>}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ textAlign: "right" as const }}>
                          {r.amount && <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, fontWeight: 700, color: r.status === "Открыт" ? "#84cc16" : "#f0f0f0" }}>{r.amount}</div>}
                          <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: 20, background: r.status === "Открыт" ? "rgba(132,204,22,0.12)" : "#222", color: r.status === "Открыт" ? "#84cc16" : "#6b7280" }}>{r.status}</span>
                        </div>
                        <button onClick={() => setDeleteRoundId(deleteRoundId === r.id ? null : r.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#4b5563" }}><Icon name="Trash2" size={14} /></button>
                      </div>
                    </div>
                    {deleteRoundId === r.id && deleteConfirm(() => { setInvRounds((p) => p.filter((x) => x.id !== r.id)); setDeleteRoundId(null); }, () => setDeleteRoundId(null))}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== THOUGHTS ===== */}
        {activeTab === "thoughts" && (
          <div>
            <div style={{ background: "#161616", border: `1px solid rgba(255,255,255,0.08)`, borderRadius: 18, padding: "22px", marginBottom: 28, display: "flex", alignItems: "center", gap: 16, boxShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "3px solid #84cc16" }}>
                <img src={PROFILE_BG} alt="CEO" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 60%" }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, fontWeight: 700, color: "#f0f0f0" }}>Мои мысли</div>
                <div style={{ fontSize: 13, color: "#84cc16", fontWeight: 500, marginTop: 2 }}>Идеи и планы по развитию</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 30, fontWeight: 700, color: "#f0f0f0", margin: 0 }}>ЗАПИСИ</h2>
                <span style={{ fontSize: 13, color: "#84cc16", fontWeight: 600 }}>{thoughts.length} записей</span>
              </div>
              <button onClick={() => setShowThoughtForm(!showThoughtForm)} style={addBtnStyle(showThoughtForm)}>
                <Icon name={showThoughtForm ? "X" : "Plus"} size={14} /> {showThoughtForm ? "Отмена" : "Написать мысль"}
              </button>
            </div>
            {showThoughtForm && (
              <div style={formBox}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
                  <div style={{ gridColumn: "1 / -1" }}><label style={labelStyle}>Заголовок *</label><input style={inputStyle} placeholder="О чём думаешь?" value={thoughtForm.title} onChange={(e) => setThoughtForm({ ...thoughtForm, title: e.target.value })} /></div>
                  <div style={{ gridColumn: "1 / -1" }}><label style={labelStyle}>Текст</label><textarea style={{ ...inputStyle, resize: "vertical", minHeight: 100 }} placeholder="Свои мысли, планы, идеи..." value={thoughtForm.text} onChange={(e) => setThoughtForm({ ...thoughtForm, text: e.target.value })} /></div>
                  <div><label style={labelStyle}>Тег</label><input style={inputStyle} placeholder="Обновление..." value={thoughtForm.tag} onChange={(e) => setThoughtForm({ ...thoughtForm, tag: e.target.value })} /></div>
                  <div><label style={labelStyle}>Эмодзи</label><input style={inputStyle} placeholder="💡" value={thoughtForm.emoji} onChange={(e) => setThoughtForm({ ...thoughtForm, emoji: e.target.value })} /></div>
                </div>
                <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
                  <button onClick={handleAddThought} disabled={!thoughtForm.title.trim()} style={saveBtnStyle(!!thoughtForm.title.trim())}>Опубликовать</button>
                  <button onClick={() => setShowThoughtForm(false)} style={{ padding: "11px 20px", background: "transparent", color: "#6b7280", border: `1.5px solid rgba(255,255,255,0.12)`, borderRadius: 12, cursor: "pointer", fontSize: 13 }}>Отмена</button>
                </div>
              </div>
            )}
            {thoughts.length === 0 && !showThoughtForm && (
              <div style={{ textAlign: "center", padding: "60px 24px", background: "#161616", borderRadius: 20, border: "1.5px dashed rgba(255,255,255,0.12)" }}>
                <div style={{ fontSize: 42, marginBottom: 12 }}>💭</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: "#d1d5db", marginBottom: 8 }}>Мыслей пока нет</div>
                <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 20 }}>Напиши свою первую идею</p>
                <button onClick={() => setShowThoughtForm(true)} style={saveBtnStyle(true)}>+ Написать</button>
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 16 }}>
              {thoughts.map((t) => (
                <div key={t.id} style={{ background: "#161616", border: `1px solid rgba(255,255,255,0.08)`, borderLeft: "4px solid #84cc16", borderRadius: "0 16px 16px 0", padding: "22px", boxShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <span style={{ fontSize: 26, flexShrink: 0 }}>{t.emoji || "💡"}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, flexWrap: "wrap" as const }}>
                        <div>
                          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 19, fontWeight: 700, color: "#f0f0f0" }}>{t.title}</div>
                          <div style={{ fontSize: 12, color: "#6b7280", marginTop: 3 }}>{t.date}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          {t.tag && <span style={{ background: "rgba(132,204,22,0.12)", color: "#84cc16", fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 20 }}>{t.tag}</span>}
                          <button onClick={() => setDeleteThoughtId(deleteThoughtId === t.id ? null : t.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#4b5563", padding: 4 }}><Icon name="Trash2" size={14} /></button>
                        </div>
                      </div>
                      {t.text && <p style={{ fontSize: 14, color: "#d1d5db", lineHeight: 1.75, marginTop: 10 }}>{t.text}</p>}
                      {deleteThoughtId === t.id && deleteConfirm(() => { setThoughts((p) => p.filter((x) => x.id !== t.id)); setDeleteThoughtId(null); }, () => setDeleteThoughtId(null))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== TIPS + TELEGRAM ===== */}
        <div style={{ marginTop: 60, background: "#161616", border: `1px solid rgba(255,255,255,0.08)`, borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
          <div style={{ padding: "24px", borderBottom: `1px solid rgba(255,255,255,0.08)` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: "linear-gradient(135deg,#fbbf24,#f59e0b)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 20 }}>☕</span>
              </div>
              <div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 700, color: "#f0f0f0" }}>Поддержать автора</div>
                <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>Отправь чаевые через Яндекс Чаевые</div>
              </div>
            </div>
            {!tipsUrl && !editingTips ? (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ flex: 1, padding: "12px 16px", background: "#111", border: `1.5px dashed rgba(255,255,255,0.12)`, borderRadius: 12, fontSize: 13, color: "#6b7280" }}>Ссылка на чаевые не добавлена</div>
                <button onClick={() => setEditingTips(true)} style={{ padding: "12px 18px", background: "#f59e0b", color: "#fff", border: "none", borderRadius: 12, cursor: "pointer", fontFamily: "'Oswald', sans-serif", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap" as const }}>+ Добавить</button>
              </div>
            ) : editingTips ? (
              <div style={{ display: "flex", gap: 10 }}>
                <input style={{ flex: 1, background: "#111", border: "1.5px solid #fbbf24", borderRadius: 12, padding: "12px 16px", color: "#f0f0f0", fontSize: 14, fontFamily: "'IBM Plex Sans', sans-serif", outline: "none" }} placeholder="https://pay.yandex.ru/..." value={tipsInput} onChange={(e) => setTipsInput(e.target.value)} autoFocus />
                <button onClick={() => { setTipsUrl(tipsInput); setEditingTips(false); }} style={{ padding: "12px 18px", background: "#f59e0b", color: "#fff", border: "none", borderRadius: 12, cursor: "pointer", fontFamily: "'Oswald', sans-serif", fontSize: 13, fontWeight: 700 }}>Сохранить</button>
                <button onClick={() => setEditingTips(false)} style={{ padding: "12px 14px", background: "transparent", color: "#6b7280", border: `1px solid rgba(255,255,255,0.08)`, borderRadius: 12, cursor: "pointer", fontSize: 13 }}>✕</button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <a href={tipsUrl} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 24px", background: "linear-gradient(135deg,#fbbf24,#f59e0b)", color: "#fff", borderRadius: 14, textDecoration: "none", fontFamily: "'Oswald', sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: "0.04em" }}>
                  ☕ Оставить чаевые
                </a>
                <button onClick={() => setEditingTips(true)} style={{ padding: "13px 16px", background: "transparent", color: "#6b7280", border: `1px solid rgba(255,255,255,0.08)`, borderRadius: 14, cursor: "pointer", fontSize: 13 }}>Изменить</button>
              </div>
            )}
          </div>
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 14, padding: "20px 24px", textDecoration: "none", transition: "background 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: "linear-gradient(135deg,#2aabee,#229ed9)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 20 }}>✈️</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 17, fontWeight: 700, color: "#f0f0f0" }}>Telegram</div>
              <div style={{ fontSize: 13, color: "#6b7280", marginTop: 1 }}>@ForbesDzhambek — пиши напрямую</div>
            </div>
            <Icon name="ExternalLink" size={15} style={{ color: "#6b7280" }} />
          </a>
        </div>
      </div>

      {/* ===== BOTTOM NAV ===== */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(13,13,13,0.97)", backdropFilter: "blur(16px)", borderTop: `1px solid rgba(255,255,255,0.08)`, padding: "10px 0 18px", display: "flex", justifyContent: "space-around", zIndex: 50 }}>
        {([
          { key: "blog", label: "Блог", icon: "BookOpen" },
          { key: "routes", label: "Маршруты", icon: "Route" },
          { key: "investments", label: "Инвестиции", icon: "TrendingUp" },
          { key: "thoughts", label: "CEO", icon: "Lightbulb" },
        ] as { key: Tab; label: string; icon: string }[]).map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 3, background: "transparent", border: "none", cursor: "pointer", padding: "0 16px" }}>
            <Icon name={tab.icon} size={21} style={{ color: activeTab === tab.key ? "#84cc16" : "#6b7280", transition: "color 0.2s" }} />
            <span style={{ fontSize: 10, color: activeTab === tab.key ? "#84cc16" : "#6b7280", fontWeight: activeTab === tab.key ? 700 : 400, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
