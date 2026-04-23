import { useState } from "react";
import Icon from "@/components/ui/icon";

const PROFILE_BG = "https://cdn.poehali.dev/files/3558c9c6-12f6-4ee5-afcf-9e1b87e76b82.jpg";

const DIFFICULTY_OPTIONS = ["Лёгкий", "Средний", "Сложный", "Экстрем"];
const DIFFICULTY_COLORS: Record<string, string> = {
  "Лёгкий": "#22c55e",
  "Средний": "#f59e0b",
  "Сложный": "#ef4444",
  "Экстрем": "#8b5cf6",
};

interface Route {
  id: number;
  name: string;
  distance: string;
  elevation: string;
  duration: string;
  difficulty: string;
  tags: string;
  description: string;
}

interface InvCard {
  id: number;
  label: string;
  value: string;
  change: string;
  icon: string;
}

interface InvRound {
  id: number;
  round: string;
  amount: string;
  date: string;
  status: string;
}

interface Thought {
  id: number;
  title: string;
  text: string;
  tag: string;
  emoji: string;
  date: string;
}

const TELEGRAM_URL = "https://t.me/ForbesDzhambek";
const TIPS_URL = ""; // вставь сюда свою ссылку Яндекс Чаевые

type Tab = "routes" | "investments" | "thoughts";

const emptyRoute = { name: "", distance: "", elevation: "", duration: "", difficulty: "Средний", tags: "", description: "" };
const emptyCard = { label: "", value: "", change: "", icon: "TrendingUp" };
const emptyRound = { round: "", amount: "", date: "", status: "Открыт" };
const emptyThought = { title: "", text: "", tag: "", emoji: "💡", date: "" };

const ICON_OPTIONS = ["TrendingUp", "Users", "Map", "Award", "DollarSign", "BarChart2", "Star", "Zap"];
const STATUS_OPTIONS = ["Открыт", "Закрыт"];

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("routes");
  const [tipsUrl, setTipsUrl] = useState(TIPS_URL);
  const [editingTips, setEditingTips] = useState(false);
  const [tipsInput, setTipsInput] = useState(TIPS_URL);

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

  const handleAddRoute = () => {
    if (!routeForm.name.trim()) return;
    setRoutes((p) => [{ ...routeForm, id: Date.now() }, ...p]);
    setRouteForm(emptyRoute);
    setShowRouteForm(false);
  };

  const handleAddCard = () => {
    if (!cardForm.label.trim()) return;
    setInvCards((p) => [{ ...cardForm, id: Date.now() }, ...p]);
    setCardForm(emptyCard);
    setShowCardForm(false);
  };

  const handleAddRound = () => {
    if (!roundForm.round.trim()) return;
    setInvRounds((p) => [{ ...roundForm, id: Date.now() }, ...p]);
    setRoundForm(emptyRound);
    setShowRoundForm(false);
  };

  const handleAddThought = () => {
    if (!thoughtForm.title.trim()) return;
    const today = new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
    setThoughts((p) => [{ ...thoughtForm, date: thoughtForm.date || today, id: Date.now() }, ...p]);
    setThoughtForm(emptyThought);
    setShowThoughtForm(false);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "var(--app-bg)", border: "1px solid var(--app-border)",
    borderRadius: 10, padding: "11px 14px", color: "#e8eaed", fontSize: 14,
    fontFamily: "'IBM Plex Sans', sans-serif", outline: "none", boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 11, color: "#6b7280", letterSpacing: "0.08em",
    textTransform: "uppercase", display: "block", marginBottom: 6,
  };

  const addBtnStyle = (active: boolean): React.CSSProperties => ({
    display: "flex", alignItems: "center", gap: 8, padding: "10px 20px",
    background: active ? "rgba(132,204,22,0.1)" : "var(--app-lime)",
    color: active ? "var(--app-lime)" : "#0a0c0f",
    border: active ? "1px solid var(--app-lime)" : "none",
    borderRadius: 12, cursor: "pointer",
    fontFamily: "'Oswald', sans-serif", fontSize: 13, fontWeight: 700,
    letterSpacing: "0.06em", textTransform: "uppercase", transition: "all 0.2s",
  });

  const saveBtnStyle = (enabled: boolean): React.CSSProperties => ({
    padding: "11px 28px", background: enabled ? "var(--app-lime)" : "#374151",
    color: enabled ? "#0a0c0f" : "#6b7280", border: "none", borderRadius: 12,
    cursor: enabled ? "pointer" : "not-allowed",
    fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 700,
    letterSpacing: "0.08em", textTransform: "uppercase", transition: "all 0.2s",
  });

  const formBox: React.CSSProperties = {
    background: "var(--app-surface)", border: "1px solid rgba(132,204,22,0.3)",
    borderRadius: 18, padding: "24px", marginBottom: 28,
    boxShadow: "0 0 24px rgba(132,204,22,0.07)",
  };

  const emptyState = (icon: string, text: string, sub: string, onAdd: () => void, btnLabel: string) => (
    <div style={{ textAlign: "center", padding: "60px 24px", border: "2px dashed var(--app-border)", borderRadius: 20 }}>
      <div style={{ fontSize: 42, marginBottom: 14 }}>{icon}</div>
      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, fontWeight: 600, color: "#fff", marginBottom: 8 }}>{text}</div>
      <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 20 }}>{sub}</p>
      <button onClick={onAdd} style={saveBtnStyle(true)}>{btnLabel}</button>
    </div>
  );

  const deleteConfirm = (onYes: () => void, onNo: () => void) => (
    <div style={{ marginTop: 12, padding: "11px 14px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
      <span style={{ fontSize: 13, color: "#fca5a5" }}>Удалить?</span>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={onYes} style={{ padding: "5px 14px", background: "#ef4444", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Да</button>
        <button onClick={onNo} style={{ padding: "5px 14px", background: "transparent", color: "#9ca3af", border: "1px solid var(--app-border)", borderRadius: 8, cursor: "pointer", fontSize: 12 }}>Нет</button>
      </div>
    </div>
  );

  return (
    <div style={{ background: "var(--app-bg)", minHeight: "100vh", fontFamily: "'IBM Plex Sans', sans-serif" }}>

      {/* Header */}
      <header style={{ background: "rgba(10,12,15,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--app-border)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--app-lime)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="Bike" size={20} style={{ color: "#0a0c0f" }} />
            </div>
            <div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 16, fontWeight: 600, color: "#fff", letterSpacing: "0.05em", lineHeight: 1 }}>РАБОТАЙТЕ ПРАВИЛЬНО</div>
              <div style={{ fontSize: 10, color: "var(--app-lime)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Велопутешествия</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--app-lime)" }} />
            <span style={{ fontSize: 12, color: "#6b7280" }}>GPS активен</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div style={{ position: "relative", height: 440, overflow: "hidden" }}>
        <img src={PROFILE_BG} alt="Профиль" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,12,15,0.1) 0%, rgba(10,12,15,0.85) 100%)" }} />
        <div style={{ position: "absolute", bottom: 40, left: 0, right: 0, textAlign: "center" }}>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 52, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1, textShadow: "0 4px 32px rgba(0,0,0,0.6)" }}>
            КАЖДЫЙ КИЛОМЕТР<br /><span style={{ color: "var(--app-lime)" }}>НА СЧЕТУ</span>
          </div>
          <p style={{ marginTop: 14, fontSize: 15, color: "rgba(255,255,255,0.65)", fontWeight: 300 }}>
            Отслеживай маршруты · GPS навигация · Анализ высоты
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "var(--app-surface)", borderBottom: "1px solid var(--app-border)", position: "sticky", top: 64, zIndex: 40 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex" }}>
          {([
            { key: "routes", label: "Маршруты", icon: "Route" },
            { key: "investments", label: "Инвестиции", icon: "TrendingUp" },
            { key: "thoughts", label: "Мысли CEO", icon: "Lightbulb" },
          ] as { key: Tab; label: string; icon: string }[]).map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
              display: "flex", alignItems: "center", gap: 8, padding: "18px 24px",
              background: "transparent", border: "none", cursor: "pointer",
              fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 500,
              letterSpacing: "0.06em", textTransform: "uppercase",
              color: activeTab === tab.key ? "var(--app-lime)" : "#6b7280",
              borderBottom: activeTab === tab.key ? "2px solid var(--app-lime)" : "2px solid transparent",
              transition: "all 0.2s ease",
            }}>
              <Icon name={tab.icon} size={15} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 100px" }}>

        {/* ===== ROUTES ===== */}
        {activeTab === "routes" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 34, fontWeight: 700, color: "#fff", margin: 0 }}>МАРШРУТЫ</h2>
                <span style={{ fontSize: 13, color: "var(--app-lime)" }}>{routes.length} добавлено</span>
              </div>
              <button onClick={() => setShowRouteForm(!showRouteForm)} style={addBtnStyle(showRouteForm)}>
                <Icon name={showRouteForm ? "X" : "Plus"} size={15} />
                {showRouteForm ? "Отмена" : "Добавить маршрут"}
              </button>
            </div>

            {showRouteForm && (
              <div style={formBox}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, color: "#fff", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                  <Icon name="MapPin" size={16} style={{ color: "var(--app-lime)" }} /> Новый маршрут
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>Название *</label>
                    <input style={inputStyle} placeholder="Вдоль реки Иртыш" value={routeForm.name} onChange={(e) => setRouteForm({ ...routeForm, name: e.target.value })} />
                  </div>
                  <div>
                    <label style={labelStyle}>Дистанция</label>
                    <input style={inputStyle} placeholder="45 км" value={routeForm.distance} onChange={(e) => setRouteForm({ ...routeForm, distance: e.target.value })} />
                  </div>
                  <div>
                    <label style={labelStyle}>Набор высоты</label>
                    <input style={inputStyle} placeholder="320 м" value={routeForm.elevation} onChange={(e) => setRouteForm({ ...routeForm, elevation: e.target.value })} />
                  </div>
                  <div>
                    <label style={labelStyle}>Время</label>
                    <input style={inputStyle} placeholder="2 ч 30 мин" value={routeForm.duration} onChange={(e) => setRouteForm({ ...routeForm, duration: e.target.value })} />
                  </div>
                  <div>
                    <label style={labelStyle}>Сложность</label>
                    <select style={{ ...inputStyle, cursor: "pointer" }} value={routeForm.difficulty} onChange={(e) => setRouteForm({ ...routeForm, difficulty: e.target.value })}>
                      {DIFFICULTY_OPTIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>Теги (через запятую)</label>
                    <input style={inputStyle} placeholder="Река, Асфальт, Город" value={routeForm.tags} onChange={(e) => setRouteForm({ ...routeForm, tags: e.target.value })} />
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>Описание</label>
                    <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 76 }} placeholder="Покрытие, особенности, достопримечательности..." value={routeForm.description} onChange={(e) => setRouteForm({ ...routeForm, description: e.target.value })} />
                  </div>
                </div>
                <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
                  <button onClick={handleAddRoute} disabled={!routeForm.name.trim()} style={saveBtnStyle(!!routeForm.name.trim())}>Сохранить</button>
                  <button onClick={() => { setRouteForm(emptyRoute); setShowRouteForm(false); }} style={{ padding: "11px 20px", background: "transparent", color: "#6b7280", border: "1px solid var(--app-border)", borderRadius: 12, cursor: "pointer", fontSize: 13 }}>Отмена</button>
                </div>
              </div>
            )}

            {routes.length === 0 && !showRouteForm && emptyState("🚴", "Маршрутов пока нет", "Добавь свой первый маршрут", () => setShowRouteForm(true), "+ Добавить маршрут")}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18 }}>
              {routes.map((route) => {
                const color = DIFFICULTY_COLORS[route.difficulty] || "#84cc16";
                const tagList = route.tags ? route.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
                return (
                  <div key={route.id} style={{ background: "var(--app-surface)", border: "1px solid var(--app-border)", borderRadius: 16, overflow: "hidden" }}>
                    <div style={{ height: 4, background: color }} />
                    <div style={{ padding: "18px" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                        <div>
                          <span style={{ background: color + "22", color, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>{route.difficulty}</span>
                          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 19, fontWeight: 600, color: "#fff", marginTop: 7 }}>{route.name}</div>
                        </div>
                        <button onClick={() => setDeleteRouteId(deleteRouteId === route.id ? null : route.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#4b5563", padding: 4 }}>
                          <Icon name="Trash2" size={15} />
                        </button>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 12, marginBottom: 10 }}>
                        {route.distance && <div style={{ display: "flex", alignItems: "center", gap: 5 }}><Icon name="Ruler" size={12} style={{ color: "var(--app-lime)" }} /><span style={{ fontSize: 13, color: "#e8eaed" }}>{route.distance}</span></div>}
                        {route.elevation && <div style={{ display: "flex", alignItems: "center", gap: 5 }}><Icon name="MountainSnow" size={12} style={{ color: "var(--app-lime)" }} /><span style={{ fontSize: 13, color: "#e8eaed" }}>{route.elevation}</span></div>}
                        {route.duration && <div style={{ display: "flex", alignItems: "center", gap: 5 }}><Icon name="Clock" size={12} style={{ color: "var(--app-lime)" }} /><span style={{ fontSize: 13, color: "#e8eaed" }}>{route.duration}</span></div>}
                      </div>
                      {route.description && <p style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.6, marginBottom: 10 }}>{route.description}</p>}
                      {tagList.length > 0 && (
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const }}>
                          {tagList.map((tag) => <span key={tag} style={{ background: "var(--app-lime-dim)", color: "var(--app-lime)", fontSize: 11, padding: "3px 10px", borderRadius: 20, border: "1px solid rgba(132,204,22,0.2)" }}>{tag}</span>)}
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
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 34, fontWeight: 700, color: "#fff", margin: "0 0 32px" }}>ИНВЕСТИЦИИ</h2>

            {/* KPI Cards */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 16, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em" }}>ПОКАЗАТЕЛИ</div>
              <button onClick={() => setShowCardForm(!showCardForm)} style={addBtnStyle(showCardForm)}>
                <Icon name={showCardForm ? "X" : "Plus"} size={14} />
                {showCardForm ? "Отмена" : "Добавить показатель"}
              </button>
            </div>

            {showCardForm && (
              <div style={formBox}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
                  <Icon name="BarChart2" size={15} style={{ color: "var(--app-lime)" }} /> Новый показатель
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>Название показателя *</label>
                    <input style={inputStyle} placeholder="Например: Привлечённые инвестиции" value={cardForm.label} onChange={(e) => setCardForm({ ...cardForm, label: e.target.value })} />
                  </div>
                  <div>
                    <label style={labelStyle}>Значение</label>
                    <input style={inputStyle} placeholder="₽12.5 млн" value={cardForm.value} onChange={(e) => setCardForm({ ...cardForm, value: e.target.value })} />
                  </div>
                  <div>
                    <label style={labelStyle}>Изменение</label>
                    <input style={inputStyle} placeholder="+34%" value={cardForm.change} onChange={(e) => setCardForm({ ...cardForm, change: e.target.value })} />
                  </div>
                  <div>
                    <label style={labelStyle}>Иконка</label>
                    <select style={{ ...inputStyle, cursor: "pointer" }} value={cardForm.icon} onChange={(e) => setCardForm({ ...cardForm, icon: e.target.value })}>
                      {ICON_OPTIONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
                  <button onClick={handleAddCard} disabled={!cardForm.label.trim()} style={saveBtnStyle(!!cardForm.label.trim())}>Сохранить</button>
                  <button onClick={() => { setCardForm(emptyCard); setShowCardForm(false); }} style={{ padding: "11px 20px", background: "transparent", color: "#6b7280", border: "1px solid var(--app-border)", borderRadius: 12, cursor: "pointer", fontSize: 13 }}>Отмена</button>
                </div>
              </div>
            )}

            {invCards.length === 0 && !showCardForm && (
              <div style={{ border: "2px dashed var(--app-border)", borderRadius: 16, padding: "32px", textAlign: "center", marginBottom: 32 }}>
                <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 16 }}>Нет показателей — добавь свои KPI</p>
                <button onClick={() => setShowCardForm(true)} style={saveBtnStyle(true)}>+ Добавить показатель</button>
              </div>
            )}

            {invCards.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16, marginBottom: 32 }}>
                {invCards.map((card) => (
                  <div key={card.id} style={{ background: "var(--app-surface)", border: "1px solid var(--app-border)", borderRadius: 16, padding: "22px", position: "relative" }}>
                    <button onClick={() => setDeleteCardId(deleteCardId === card.id ? null : card.id)} style={{ position: "absolute", top: 12, right: 12, background: "transparent", border: "none", cursor: "pointer", color: "#4b5563" }}>
                      <Icon name="Trash2" size={14} />
                    </button>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: "var(--app-lime-dim)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(132,204,22,0.2)", marginBottom: 14 }}>
                      <Icon name={card.icon} size={18} style={{ color: "var(--app-lime)" }} />
                    </div>
                    {card.change && <span style={{ fontSize: 11, fontWeight: 600, color: "#22c55e", background: "rgba(34,197,94,0.1)", padding: "2px 8px", borderRadius: 20 }}>{card.change}</span>}
                    <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 28, fontWeight: 700, color: "#fff", marginTop: 10, lineHeight: 1 }}>{card.value || "—"}</div>
                    <div style={{ fontSize: 13, color: "#6b7280", marginTop: 5 }}>{card.label}</div>
                    {deleteCardId === card.id && deleteConfirm(() => { setInvCards((p) => p.filter((c) => c.id !== card.id)); setDeleteCardId(null); }, () => setDeleteCardId(null))}
                  </div>
                ))}
              </div>
            )}

            {/* Rounds */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 16, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em" }}>РАУНДЫ ФИНАНСИРОВАНИЯ</div>
              <button onClick={() => setShowRoundForm(!showRoundForm)} style={addBtnStyle(showRoundForm)}>
                <Icon name={showRoundForm ? "X" : "Plus"} size={14} />
                {showRoundForm ? "Отмена" : "Добавить раунд"}
              </button>
            </div>

            {showRoundForm && (
              <div style={formBox}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
                  <Icon name="DollarSign" size={15} style={{ color: "var(--app-lime)" }} /> Новый раунд
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Название раунда *</label>
                    <input style={inputStyle} placeholder="Series A" value={roundForm.round} onChange={(e) => setRoundForm({ ...roundForm, round: e.target.value })} />
                  </div>
                  <div>
                    <label style={labelStyle}>Сумма</label>
                    <input style={inputStyle} placeholder="₽50 млн" value={roundForm.amount} onChange={(e) => setRoundForm({ ...roundForm, amount: e.target.value })} />
                  </div>
                  <div>
                    <label style={labelStyle}>Дата</label>
                    <input style={inputStyle} placeholder="Март 2025" value={roundForm.date} onChange={(e) => setRoundForm({ ...roundForm, date: e.target.value })} />
                  </div>
                  <div>
                    <label style={labelStyle}>Статус</label>
                    <select style={{ ...inputStyle, cursor: "pointer" }} value={roundForm.status} onChange={(e) => setRoundForm({ ...roundForm, status: e.target.value })}>
                      {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
                  <button onClick={handleAddRound} disabled={!roundForm.round.trim()} style={saveBtnStyle(!!roundForm.round.trim())}>Сохранить</button>
                  <button onClick={() => { setRoundForm(emptyRound); setShowRoundForm(false); }} style={{ padding: "11px 20px", background: "transparent", color: "#6b7280", border: "1px solid var(--app-border)", borderRadius: 12, cursor: "pointer", fontSize: 13 }}>Отмена</button>
                </div>
              </div>
            )}

            {invRounds.length === 0 && !showRoundForm && (
              <div style={{ border: "2px dashed var(--app-border)", borderRadius: 16, padding: "32px", textAlign: "center" }}>
                <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 16 }}>Нет раундов — добавь историю финансирования</p>
                <button onClick={() => setShowRoundForm(true)} style={saveBtnStyle(true)}>+ Добавить раунд</button>
              </div>
            )}

            {invRounds.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
                {invRounds.map((r) => (
                  <div key={r.id} style={{ background: "var(--app-surface)", border: "1px solid var(--app-border)", borderRadius: 14, padding: "18px 22px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{ width: 11, height: 11, borderRadius: "50%", background: r.status === "Открыт" ? "var(--app-lime)" : "#374151", flexShrink: 0 }} />
                        <div>
                          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 17, fontWeight: 600, color: "#fff" }}>{r.round}</div>
                          {r.date && <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{r.date}</div>}
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{ textAlign: "right" as const }}>
                          {r.amount && <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, fontWeight: 700, color: r.status === "Открыт" ? "var(--app-lime)" : "#fff" }}>{r.amount}</div>}
                          <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: 20, background: r.status === "Открыт" ? "var(--app-lime-dim)" : "rgba(55,65,81,0.5)", color: r.status === "Открыт" ? "var(--app-lime)" : "#9ca3af" }}>{r.status}</span>
                        </div>
                        <button onClick={() => setDeleteRoundId(deleteRoundId === r.id ? null : r.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#4b5563" }}>
                          <Icon name="Trash2" size={14} />
                        </button>
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
            {/* Profile */}
            <div style={{ background: "var(--app-surface)", border: "1px solid var(--app-border)", borderRadius: 20, padding: "22px", marginBottom: 32, display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "3px solid var(--app-lime)" }}>
                <img src={PROFILE_BG} alt="CEO" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 60%" }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, fontWeight: 600, color: "#fff" }}>Мои мысли</div>
                <div style={{ fontSize: 13, color: "var(--app-lime)", marginTop: 2 }}>Идеи и планы по развитию</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 30, fontWeight: 700, color: "#fff", margin: 0 }}>ЗАПИСИ</h2>
                <span style={{ fontSize: 13, color: "var(--app-lime)" }}>{thoughts.length} записей</span>
              </div>
              <button onClick={() => setShowThoughtForm(!showThoughtForm)} style={addBtnStyle(showThoughtForm)}>
                <Icon name={showThoughtForm ? "X" : "Plus"} size={14} />
                {showThoughtForm ? "Отмена" : "Написать мысль"}
              </button>
            </div>

            {showThoughtForm && (
              <div style={formBox}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
                  <Icon name="PenLine" size={15} style={{ color: "var(--app-lime)" }} /> Новая запись
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>Заголовок *</label>
                    <input style={inputStyle} placeholder="О чём думаешь?" value={thoughtForm.title} onChange={(e) => setThoughtForm({ ...thoughtForm, title: e.target.value })} />
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>Текст</label>
                    <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 100 }} placeholder="Напиши свои мысли, планы, идеи..." value={thoughtForm.text} onChange={(e) => setThoughtForm({ ...thoughtForm, text: e.target.value })} />
                  </div>
                  <div>
                    <label style={labelStyle}>Тег / категория</label>
                    <input style={inputStyle} placeholder="Обновление, Бизнес..." value={thoughtForm.tag} onChange={(e) => setThoughtForm({ ...thoughtForm, tag: e.target.value })} />
                  </div>
                  <div>
                    <label style={labelStyle}>Эмодзи</label>
                    <input style={inputStyle} placeholder="💡" value={thoughtForm.emoji} onChange={(e) => setThoughtForm({ ...thoughtForm, emoji: e.target.value })} />
                  </div>
                  <div>
                    <label style={labelStyle}>Дата (необязательно)</label>
                    <input style={inputStyle} placeholder="Сегодня автоматически" value={thoughtForm.date} onChange={(e) => setThoughtForm({ ...thoughtForm, date: e.target.value })} />
                  </div>
                </div>
                <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
                  <button onClick={handleAddThought} disabled={!thoughtForm.title.trim()} style={saveBtnStyle(!!thoughtForm.title.trim())}>Опубликовать</button>
                  <button onClick={() => { setThoughtForm(emptyThought); setShowThoughtForm(false); }} style={{ padding: "11px 20px", background: "transparent", color: "#6b7280", border: "1px solid var(--app-border)", borderRadius: 12, cursor: "pointer", fontSize: 13 }}>Отмена</button>
                </div>
              </div>
            )}

            {thoughts.length === 0 && !showThoughtForm && emptyState("💭", "Мыслей пока нет", "Напиши свою первую идею или план", () => setShowThoughtForm(true), "+ Написать первую мысль")}

            <div style={{ display: "flex", flexDirection: "column" as const, gap: 18 }}>
              {thoughts.map((t) => (
                <div key={t.id} style={{ background: "var(--app-surface)", border: "1px solid var(--app-border)", borderRadius: 18, padding: "22px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: "var(--app-lime)" }} />
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <span style={{ fontSize: 26, flexShrink: 0 }}>{t.emoji || "💡"}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, flexWrap: "wrap" as const }}>
                        <div>
                          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 19, fontWeight: 600, color: "#fff" }}>{t.title}</div>
                          <div style={{ fontSize: 12, color: "#6b7280", marginTop: 3 }}>{t.date}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          {t.tag && <span style={{ background: "var(--app-lime-dim)", color: "var(--app-lime)", fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 20, border: "1px solid rgba(132,204,22,0.2)", whiteSpace: "nowrap" as const }}>{t.tag}</span>}
                          <button onClick={() => setDeleteThoughtId(deleteThoughtId === t.id ? null : t.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#4b5563", padding: 4 }}>
                            <Icon name="Trash2" size={14} />
                          </button>
                        </div>
                      </div>
                      {t.text && <p style={{ fontSize: 14, color: "#9ca3af", lineHeight: 1.7, marginTop: 10 }}>{t.text}</p>}
                      {deleteThoughtId === t.id && deleteConfirm(() => { setThoughts((p) => p.filter((x) => x.id !== t.id)); setDeleteThoughtId(null); }, () => setDeleteThoughtId(null))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tips + Telegram footer */}
      <div style={{ maxWidth: 1200, margin: "0 auto 40px", padding: "0 24px" }}>
        <div style={{ background: "var(--app-surface)", border: "1px solid var(--app-border)", borderRadius: 20, overflow: "hidden" }}>
          {/* Чаевые */}
          <div style={{ padding: "28px", borderBottom: "1px solid var(--app-border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: "linear-gradient(135deg, #fc0, #ff6b00)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 22 }}>☕</span>
              </div>
              <div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff" }}>Поддержать автора</div>
                <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 2 }}>Отправь чаевые через Яндекс Чаевые — это занимает 10 секунд</div>
              </div>
            </div>

            {!tipsUrl && !editingTips ? (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ flex: 1, padding: "12px 16px", background: "rgba(132,204,22,0.05)", border: "2px dashed rgba(132,204,22,0.25)", borderRadius: 12, fontSize: 13, color: "#6b7280" }}>
                  Ссылка на чаевые не добавлена
                </div>
                <button
                  onClick={() => setEditingTips(true)}
                  style={{ padding: "12px 20px", background: "var(--app-lime)", color: "#0a0c0f", border: "none", borderRadius: 12, cursor: "pointer", fontFamily: "'Oswald', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}
                >
                  + Добавить ссылку
                </button>
              </div>
            ) : editingTips ? (
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  style={{ flex: 1, background: "var(--app-bg)", border: "1px solid rgba(132,204,22,0.4)", borderRadius: 12, padding: "12px 16px", color: "#e8eaed", fontSize: 14, fontFamily: "'IBM Plex Sans', sans-serif", outline: "none" }}
                  placeholder="https://pay.yandex.ru/..."
                  value={tipsInput}
                  onChange={(e) => setTipsInput(e.target.value)}
                  autoFocus
                />
                <button
                  onClick={() => { setTipsUrl(tipsInput); setEditingTips(false); }}
                  style={{ padding: "12px 20px", background: "var(--app-lime)", color: "#0a0c0f", border: "none", borderRadius: 12, cursor: "pointer", fontFamily: "'Oswald', sans-serif", fontSize: 13, fontWeight: 700, textTransform: "uppercase" }}
                >
                  Сохранить
                </button>
                <button
                  onClick={() => setEditingTips(false)}
                  style={{ padding: "12px 16px", background: "transparent", color: "#6b7280", border: "1px solid var(--app-border)", borderRadius: 12, cursor: "pointer", fontSize: 13 }}
                >
                  Отмена
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <a
                  href={tipsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "14px 24px", background: "linear-gradient(135deg, #fc0, #ff8c00)", color: "#0a0c0f", borderRadius: 14, textDecoration: "none", fontFamily: "'Oswald', sans-serif", fontSize: 16, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}
                >
                  <span>☕</span> Оставить чаевые
                </a>
                <button
                  onClick={() => { setTipsInput(tipsUrl); setEditingTips(true); }}
                  style={{ padding: "14px 16px", background: "transparent", color: "#6b7280", border: "1px solid var(--app-border)", borderRadius: 12, cursor: "pointer" }}
                  title="Изменить ссылку"
                >
                  <Icon name="Pencil" size={15} />
                </button>
              </div>
            )}
          </div>

          {/* Telegram */}
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 14, padding: "20px 28px", textDecoration: "none", transition: "background 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div style={{ width: 46, height: 46, borderRadius: 14, background: "linear-gradient(135deg, #2aabee, #229ed9)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 22 }}>✈️</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, color: "#fff" }}>Telegram</div>
              <div style={{ fontSize: 13, color: "#6b7280", marginTop: 1 }}>@ForbesDzhambek — пиши напрямую</div>
            </div>
            <Icon name="ExternalLink" size={16} style={{ color: "#4b5563" }} />
          </a>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(17,20,24,0.97)", backdropFilter: "blur(16px)", borderTop: "1px solid var(--app-border)", padding: "12px 0 20px", display: "flex", justifyContent: "space-around", zIndex: 50 }}>
        {([
          { key: "routes", label: "Маршруты", icon: "Route" },
          { key: "investments", label: "Инвестиции", icon: "TrendingUp" },
          { key: "thoughts", label: "CEO", icon: "Lightbulb" },
        ] as { key: Tab; label: string; icon: string }[]).map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 4, background: "transparent", border: "none", cursor: "pointer", padding: "0 20px" }}>
            <Icon name={tab.icon} size={22} style={{ color: activeTab === tab.key ? "var(--app-lime)" : "#4b5563", transition: "color 0.2s" }} />
            <span style={{ fontSize: 10, color: activeTab === tab.key ? "var(--app-lime)" : "#4b5563", fontWeight: activeTab === tab.key ? 600 : 400, letterSpacing: "0.05em", textTransform: "uppercase" as const }}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}