import { useState } from "react";
import Icon from "@/components/ui/icon";

const PROFILE_BG = "https://cdn.poehali.dev/files/3558c9c6-12f6-4ee5-afcf-9e1b87e76b82.jpg";

const investments = [
  { label: "Привлечённые инвестиции", value: "₽12.5 млн", icon: "TrendingUp", change: "+34%" },
  { label: "Активных пользователей", value: "18 420", icon: "Users", change: "+127%" },
  { label: "Маршрутов в базе", value: "3 847", icon: "Map", change: "+89%" },
  { label: "Оценка стартапа", value: "₽85 млн", icon: "Award", change: "+210%" },
];

const investorRounds = [
  { round: "Pre-Seed", amount: "₽2.5 млн", date: "Март 2024", status: "Закрыт" },
  { round: "Seed", amount: "₽10 млн", date: "Ноябрь 2024", status: "Закрыт" },
  { round: "Series A", amount: "₽50 млн", date: "2025 Q3", status: "Открыт" },
];

const thoughts = [
  {
    date: "18 апреля 2026",
    title: "Следующий шаг — социальная карта",
    text: "Мы работаем над функцией, которая позволит видеть на карте, где сейчас едут другие участники сообщества в реальном времени.",
    tag: "Обновление v3.0",
    emoji: "🗺️",
  },
  {
    date: "5 апреля 2026",
    title: "ИИ-тренер и анализ нагрузки",
    text: "Планируем внедрить персонального ИИ-тренера, который будет анализировать данные о ритме педалирования, пульсе и высоте подъёмов.",
    tag: "Обновление v3.2",
    emoji: "🤖",
  },
  {
    date: "22 марта 2026",
    title: "Партнёрство с веломагазинами",
    text: "Активно ведём переговоры с 12 ведущими сетями веломагазинов. Пользователи смогут получать скидки прямо в приложении.",
    tag: "Бизнес",
    emoji: "🤝",
  },
];

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

type Tab = "routes" | "investments" | "thoughts";

const emptyForm = { name: "", distance: "", elevation: "", duration: "", difficulty: "Средний", tags: "", description: "" };

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("routes");
  const [routes, setRoutes] = useState<Route[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleAdd = () => {
    if (!form.name.trim()) return;
    const newRoute: Route = { ...form, id: Date.now() };
    setRoutes((prev) => [newRoute, ...prev]);
    setForm(emptyForm);
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    setRoutes((prev) => prev.filter((r) => r.id !== id));
    setDeleteId(null);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "var(--app-bg)", border: "1px solid var(--app-border)",
    borderRadius: 10, padding: "11px 14px", color: "#e8eaed", fontSize: 14,
    fontFamily: "'IBM Plex Sans', sans-serif", outline: "none",
    boxSizing: "border-box",
  };

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
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 16, fontWeight: 600, color: "#fff", letterSpacing: "0.05em", lineHeight: 1 }}>
                РАБОТАЙТЕ ПРАВИЛЬНО
              </div>
              <div style={{ fontSize: 10, color: "var(--app-lime)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Велопутешествия
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--app-lime)" }} />
            <span style={{ fontSize: 12, color: "#6b7280" }}>GPS активен</span>
          </div>
        </div>
      </header>

      {/* Hero — твоё фото */}
      <div style={{ position: "relative", height: 440, overflow: "hidden" }}>
        <img src={PROFILE_BG} alt="Профиль" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,12,15,0.1) 0%, rgba(10,12,15,0.85) 100%)" }} />
        <div style={{ position: "absolute", bottom: 40, left: 0, right: 0, textAlign: "center" }}>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 52, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1, textShadow: "0 4px 32px rgba(0,0,0,0.6)" }}>
            КАЖДЫЙ КИЛОМЕТР<br />
            <span style={{ color: "var(--app-lime)" }}>НА СЧЕТУ</span>
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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 34, fontWeight: 700, color: "#fff", margin: 0 }}>МАРШРУТЫ</h2>
                <span style={{ fontSize: 13, color: "var(--app-lime)" }}>{routes.length} добавлено</span>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "11px 22px", background: showForm ? "rgba(132,204,22,0.1)" : "var(--app-lime)",
                  color: showForm ? "var(--app-lime)" : "#0a0c0f",
                  border: showForm ? "1px solid var(--app-lime)" : "none",
                  borderRadius: 12, cursor: "pointer",
                  fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                  transition: "all 0.2s ease",
                }}
              >
                <Icon name={showForm ? "X" : "Plus"} size={16} />
                {showForm ? "Отмена" : "Добавить маршрут"}
              </button>
            </div>

            {/* Форма добавления */}
            {showForm && (
              <div style={{
                background: "var(--app-surface)", border: "1px solid rgba(132,204,22,0.3)",
                borderRadius: 20, padding: "28px", marginBottom: 32,
                boxShadow: "0 0 32px rgba(132,204,22,0.08)",
              }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, fontWeight: 600, color: "#fff", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
                  <Icon name="MapPin" size={18} style={{ color: "var(--app-lime)" }} />
                  Новый маршрут
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{ fontSize: 11, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Название маршрута *</label>
                    <input
                      style={inputStyle}
                      placeholder="Например: Вдоль реки Иртыш"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: 11, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Дистанция</label>
                    <input style={inputStyle} placeholder="45 км" value={form.distance} onChange={(e) => setForm({ ...form, distance: e.target.value })} />
                  </div>

                  <div>
                    <label style={{ fontSize: 11, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Набор высоты</label>
                    <input style={inputStyle} placeholder="320 м" value={form.elevation} onChange={(e) => setForm({ ...form, elevation: e.target.value })} />
                  </div>

                  <div>
                    <label style={{ fontSize: 11, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Время в пути</label>
                    <input style={inputStyle} placeholder="2 ч 30 мин" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
                  </div>

                  <div>
                    <label style={{ fontSize: 11, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Сложность</label>
                    <select
                      style={{ ...inputStyle, cursor: "pointer" }}
                      value={form.difficulty}
                      onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                    >
                      {DIFFICULTY_OPTIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>

                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{ fontSize: 11, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Теги (через запятую)</label>
                    <input style={inputStyle} placeholder="Река, Асфальт, Город" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
                  </div>

                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{ fontSize: 11, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Описание</label>
                    <textarea
                      style={{ ...inputStyle, resize: "vertical", minHeight: 80 }}
                      placeholder="Расскажи про маршрут — покрытие, достопримечательности, особенности..."
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
                  <button
                    onClick={handleAdd}
                    disabled={!form.name.trim()}
                    style={{
                      padding: "12px 32px", background: form.name.trim() ? "var(--app-lime)" : "#374151",
                      color: form.name.trim() ? "#0a0c0f" : "#6b7280",
                      border: "none", borderRadius: 12, cursor: form.name.trim() ? "pointer" : "not-allowed",
                      fontFamily: "'Oswald', sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                      transition: "all 0.2s",
                    }}
                  >
                    Сохранить маршрут
                  </button>
                  <button
                    onClick={() => { setForm(emptyForm); setShowForm(false); }}
                    style={{ padding: "12px 24px", background: "transparent", color: "#6b7280", border: "1px solid var(--app-border)", borderRadius: 12, cursor: "pointer", fontSize: 14 }}
                  >
                    Отмена
                  </button>
                </div>
              </div>
            )}

            {/* Список маршрутов */}
            {routes.length === 0 && !showForm && (
              <div style={{ textAlign: "center", padding: "80px 24px", border: "2px dashed var(--app-border)", borderRadius: 20 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🚴</div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 10 }}>
                  Маршрутов пока нет
                </div>
                <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 24 }}>
                  Добавь свой первый маршрут — нажми кнопку выше
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  style={{ padding: "12px 28px", background: "var(--app-lime)", color: "#0a0c0f", border: "none", borderRadius: 12, cursor: "pointer", fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
                  + Добавить первый маршрут
                </button>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
              {routes.map((route) => {
                const color = DIFFICULTY_COLORS[route.difficulty] || "#84cc16";
                const tagList = route.tags ? route.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
                return (
                  <div key={route.id} style={{ background: "var(--app-surface)", border: "1px solid var(--app-border)", borderRadius: 16, overflow: "hidden", transition: "border-color 0.2s" }}>
                    {/* Color bar top */}
                    <div style={{ height: 4, background: color }} />
                    <div style={{ padding: "20px" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                        <div>
                          <span style={{ background: color + "22", color, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, border: `1px solid ${color}44` }}>
                            {route.difficulty}
                          </span>
                          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, fontWeight: 600, color: "#fff", marginTop: 8, lineHeight: 1.2 }}>
                            {route.name}
                          </div>
                        </div>
                        <button
                          onClick={() => setDeleteId(deleteId === route.id ? null : route.id)}
                          style={{ background: "transparent", border: "none", cursor: "pointer", color: "#4b5563", padding: 4, borderRadius: 6, flexShrink: 0 }}
                        >
                          <Icon name="Trash2" size={16} />
                        </button>
                      </div>

                      {/* Stats */}
                      <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
                        {route.distance && (
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <Icon name="Ruler" size={13} style={{ color: "var(--app-lime)" }} />
                            <span style={{ fontSize: 13, color: "#e8eaed", fontWeight: 500 }}>{route.distance}</span>
                          </div>
                        )}
                        {route.elevation && (
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <Icon name="MountainSnow" size={13} style={{ color: "var(--app-lime)" }} />
                            <span style={{ fontSize: 13, color: "#e8eaed", fontWeight: 500 }}>{route.elevation}</span>
                          </div>
                        )}
                        {route.duration && (
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <Icon name="Clock" size={13} style={{ color: "var(--app-lime)" }} />
                            <span style={{ fontSize: 13, color: "#e8eaed", fontWeight: 500 }}>{route.duration}</span>
                          </div>
                        )}
                      </div>

                      {route.description && (
                        <p style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.6, marginBottom: 12 }}>{route.description}</p>
                      )}

                      {tagList.length > 0 && (
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const }}>
                          {tagList.map((tag) => (
                            <span key={tag} style={{ background: "var(--app-lime-dim)", color: "var(--app-lime)", fontSize: 11, padding: "3px 10px", borderRadius: 20, border: "1px solid rgba(132,204,22,0.2)" }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Confirm delete */}
                      {deleteId === route.id && (
                        <div style={{ marginTop: 14, padding: "12px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                          <span style={{ fontSize: 13, color: "#fca5a5" }}>Удалить маршрут?</span>
                          <div style={{ display: "flex", gap: 8 }}>
                            <button onClick={() => handleDelete(route.id)} style={{ padding: "6px 14px", background: "#ef4444", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Да</button>
                            <button onClick={() => setDeleteId(null)} style={{ padding: "6px 14px", background: "transparent", color: "#9ca3af", border: "1px solid var(--app-border)", borderRadius: 8, cursor: "pointer", fontSize: 12 }}>Нет</button>
                          </div>
                        </div>
                      )}
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
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 32 }}>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 34, fontWeight: 700, color: "#fff", margin: 0 }}>ИНВЕСТИЦИИ</h2>
              <span style={{ fontSize: 13, color: "var(--app-lime)" }}>Апрель 2026</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20, marginBottom: 40 }}>
              {investments.map((inv) => (
                <div key={inv.label} style={{ background: "var(--app-surface)", border: "1px solid var(--app-border)", borderRadius: 16, padding: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--app-lime-dim)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(132,204,22,0.2)" }}>
                      <Icon name={inv.icon} size={20} style={{ color: "var(--app-lime)" }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#22c55e", background: "rgba(34,197,94,0.1)", padding: "3px 10px", borderRadius: 20 }}>{inv.change}</span>
                  </div>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 30, fontWeight: 700, color: "#fff", marginTop: 16, lineHeight: 1 }}>{inv.value}</div>
                  <div style={{ fontSize: 13, color: "#6b7280", marginTop: 6 }}>{inv.label}</div>
                </div>
              ))}
            </div>

            <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, fontWeight: 600, color: "#fff", marginBottom: 16, letterSpacing: "0.04em" }}>РАУНДЫ ФИНАНСИРОВАНИЯ</h3>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 12, marginBottom: 40 }}>
              {investorRounds.map((r) => (
                <div key={r.round} style={{ background: "var(--app-surface)", border: "1px solid var(--app-border)", borderRadius: 14, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: r.status === "Открыт" ? "var(--app-lime)" : "#374151" }} />
                    <div>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, color: "#fff" }}>{r.round}</div>
                      <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{r.date}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" as const }}>
                    <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, fontWeight: 700, color: r.status === "Открыт" ? "var(--app-lime)" : "#fff" }}>{r.amount}</div>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: r.status === "Открыт" ? "var(--app-lime-dim)" : "rgba(55,65,81,0.5)", color: r.status === "Открыт" ? "var(--app-lime)" : "#9ca3af" }}>
                      {r.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "linear-gradient(135deg, rgba(132,204,22,0.08) 0%, rgba(59,130,246,0.08) 100%)", border: "1px solid rgba(132,204,22,0.2)", borderRadius: 20, padding: "36px", textAlign: "center" as const }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 26, fontWeight: 700, color: "#fff", marginBottom: 10 }}>ПРИСОЕДИНИТЕСЬ К SERIES A</div>
              <p style={{ color: "#9ca3af", fontSize: 15, marginBottom: 24 }}>Стать партнёром лидирующего велоприложения России</p>
              <button style={{ padding: "14px 40px", background: "var(--app-lime)", color: "#0a0c0f", border: "none", borderRadius: 12, fontFamily: "'Oswald', sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: "0.1em", cursor: "pointer", textTransform: "uppercase" as const }}>
                Связаться с командой
              </button>
            </div>
          </div>
        )}

        {/* ===== THOUGHTS ===== */}
        {activeTab === "thoughts" && (
          <div>
            <div style={{ marginBottom: 8 }}>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 34, fontWeight: 700, color: "#fff", margin: 0 }}>МЫСЛИ РУКОВОДИТЕЛЯ</h2>
            </div>
            <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 36 }}>Идеи о следующих обновлениях и развитии продукта</p>

            <div style={{ background: "var(--app-surface)", border: "1px solid var(--app-border)", borderRadius: 20, padding: "24px", marginBottom: 36, display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ width: 68, height: 68, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "3px solid var(--app-lime)" }}>
                <img src={PROFILE_BG} alt="CEO" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 60%" }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, fontWeight: 600, color: "#fff" }}>Алексей Горский</div>
                <div style={{ fontSize: 13, color: "var(--app-lime)", marginTop: 2 }}>Основатель & CEO</div>
                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>40 000 км на велосипеде · Бизнес-ангел</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column" as const, gap: 20 }}>
              {thoughts.map((t, i) => (
                <div key={i} style={{ background: "var(--app-surface)", border: "1px solid var(--app-border)", borderRadius: 18, padding: "24px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: "var(--app-lime)" }} />
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 12 }}>
                    <span style={{ fontSize: 26 }}>{t.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, flexWrap: "wrap" as const }}>
                        <div>
                          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 19, fontWeight: 600, color: "#fff" }}>{t.title}</div>
                          <div style={{ fontSize: 12, color: "#6b7280", marginTop: 3 }}>{t.date}</div>
                        </div>
                        <span style={{ background: "var(--app-lime-dim)", color: "var(--app-lime)", fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 20, border: "1px solid rgba(132,204,22,0.2)", whiteSpace: "nowrap" as const }}>
                          {t.tag}
                        </span>
                      </div>
                      <p style={{ fontSize: 14, color: "#9ca3af", lineHeight: 1.7, marginTop: 10 }}>{t.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
