import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/d6e9a4ab-4b53-4818-8b66-f608253ce069/files/94126c1a-d861-4cbf-94ae-c8b90fa06d1c.jpg";
const GPS_IMG = "https://cdn.poehali.dev/projects/d6e9a4ab-4b53-4818-8b66-f608253ce069/files/8c2222c9-10de-42da-92df-582d68cfc109.jpg";
const FOREST_IMG = "https://cdn.poehali.dev/projects/d6e9a4ab-4b53-4818-8b66-f608253ce069/files/dc0067e1-94c5-4035-b697-03becbc18a4d.jpg";

const routes = [
  {
    id: 1,
    name: "Горный хребет Алтай",
    distance: "124 км",
    elevation: "2 840 м",
    duration: "9 ч 20 мин",
    difficulty: "Сложный",
    diffColor: "#ef4444",
    img: HERO_IMG,
    altProfile: [30, 45, 60, 80, 95, 88, 70, 100, 85, 65, 50, 40],
    tags: ["Горы", "Бездорожье", "Высота"],
    rating: 4.9,
  },
  {
    id: 2,
    name: "Лесной маршрут Сочи",
    distance: "67 км",
    elevation: "1 120 м",
    duration: "4 ч 45 мин",
    difficulty: "Средний",
    diffColor: "#f59e0b",
    img: FOREST_IMG,
    altProfile: [20, 35, 50, 45, 60, 55, 70, 65, 50, 40, 30, 25],
    tags: ["Лес", "Природа", "Трек"],
    rating: 4.7,
  },
  {
    id: 3,
    name: "GPS Навигация — Байкал",
    distance: "210 км",
    elevation: "3 200 м",
    duration: "14 ч 00 мин",
    difficulty: "Экстрем",
    diffColor: "#8b5cf6",
    img: GPS_IMG,
    altProfile: [15, 30, 55, 75, 90, 100, 95, 85, 70, 80, 90, 60],
    tags: ["GPS", "Озеро", "Экстрим"],
    rating: 5.0,
  },
];

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
    text: "Мы работаем над функцией, которая позволит видеть на карте, где сейчас едут другие участники сообщества в реальном времени. Это изменит то, как велолюбители взаимодействуют друг с другом в поездках.",
    tag: "Обновление v3.0",
    emoji: "🗺️",
  },
  {
    date: "5 апреля 2026",
    title: "ИИ-тренер и анализ нагрузки",
    text: "Планируем внедрить персонального ИИ-тренера, который будет анализировать данные о ритме педалирования, пульсе и высоте подъёмов, и давать рекомендации по оптимальной нагрузке.",
    tag: "Обновление v3.2",
    emoji: "🤖",
  },
  {
    date: "22 марта 2026",
    title: "Партнёрство с веломагазинами",
    text: "Активно ведём переговоры с 12 ведущими сетями веломагазинов. Пользователи смогут получать скидки и специальные предложения прямо в приложении на основе своей активности.",
    tag: "Бизнес",
    emoji: "🤝",
  },
  {
    date: "10 марта 2026",
    title: "Офлайн-карты для горных зон",
    text: "Готовимся к запуску офлайн-режима с кешированием маршрутов. Это особенно важно для горных трасс, где нет сигнала — ваш GPS-трек будет работать без интернета.",
    tag: "Обновление v2.8",
    emoji: "📡",
  },
];

type Tab = "routes" | "investments" | "thoughts";

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("routes");
  const [activeRoute, setActiveRoute] = useState<number | null>(null);

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

      {/* Hero */}
      <div style={{ position: "relative", height: 480, overflow: "hidden" }}>
        <img src={HERO_IMG} alt="Велотрек" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,12,15,0.2) 0%, rgba(10,12,15,0.9) 100%)" }} />

        <div style={{ position: "absolute", top: 24, right: 24, display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { icon: "Navigation", val: "48.2 км/ч", label: "Скорость" },
            { icon: "MountainSnow", val: "1 842 м", label: "Высота" },
            { icon: "Heart", val: "142 уд/мин", label: "Пульс" },
          ].map((s) => (
            <div key={s.label} style={{ background: "rgba(10,12,15,0.8)", border: "1px solid var(--app-border)", borderRadius: 10, padding: "8px 14px", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", gap: 10 }}>
              <Icon name={s.icon} size={14} style={{ color: "var(--app-lime)" }} />
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#fff", fontFamily: "'Oswald', sans-serif" }}>{s.val}</div>
                <div style={{ fontSize: 10, color: "#6b7280" }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ position: "absolute", bottom: 40, left: 0, right: 0, textAlign: "center" }}>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 56, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1, textShadow: "0 4px 32px rgba(0,0,0,0.5)" }}>
            КАЖДЫЙ КИЛОМЕТР<br />
            <span style={{ color: "var(--app-lime)" }}>НА СЧЕТУ</span>
          </div>
          <p style={{ marginTop: 16, fontSize: 16, color: "rgba(255,255,255,0.7)", fontWeight: 300 }}>
            Отслеживай маршруты · GPS навигация · Анализ высоты
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "var(--app-surface)", borderBottom: "1px solid var(--app-border)", position: "sticky", top: 64, zIndex: 40 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", gap: 0 }}>
          {([
            { key: "routes", label: "Маршруты", icon: "Route" },
            { key: "investments", label: "Инвестиции", icon: "TrendingUp" },
            { key: "thoughts", label: "Мысли CEO", icon: "Lightbulb" },
          ] as { key: Tab; label: string; icon: string }[]).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "18px 24px",
                background: "transparent", border: "none", cursor: "pointer",
                fontFamily: "'Oswald', sans-serif",
                fontSize: 14, fontWeight: 500, letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: activeTab === tab.key ? "var(--app-lime)" : "#6b7280",
                borderBottom: activeTab === tab.key ? "2px solid var(--app-lime)" : "2px solid transparent",
                transition: "all 0.2s ease",
              }}
            >
              <Icon name={tab.icon} size={15} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 100px" }}>

        {/* ROUTES */}
        {activeTab === "routes" && (
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 32 }}>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 36, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>МАРШРУТЫ</h2>
              <span style={{ fontSize: 13, color: "var(--app-lime)", fontWeight: 500 }}>3 847 доступно</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
              {routes.map((route, i) => (
                <div
                  key={route.id}
                  onClick={() => setActiveRoute(activeRoute === route.id ? null : route.id)}
                  style={{
                    background: "var(--app-surface)",
                    border: `1px solid ${activeRoute === route.id ? "var(--app-lime)" : "var(--app-border)"}`,
                    borderRadius: 16, overflow: "hidden", cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: activeRoute === route.id ? "0 0 24px rgba(132,204,22,0.15)" : "none",
                  }}
                >
                  <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                    <img src={route.img} alt={route.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(17,20,24,0.9) 100%)" }} />
                    <div style={{ position: "absolute", top: 12, left: 12 }}>
                      <span style={{ background: route.diffColor, color: "#fff", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20, fontFamily: "'Oswald', sans-serif", letterSpacing: "0.05em" }}>
                        {route.difficulty}
                      </span>
                    </div>
                    <div style={{ position: "absolute", top: 12, right: 12, display: "flex", alignItems: "center", gap: 4, background: "rgba(0,0,0,0.6)", borderRadius: 20, padding: "4px 10px" }}>
                      <span style={{ fontSize: 12, color: "#f59e0b" }}>★</span>
                      <span style={{ fontSize: 12, color: "#fff", fontWeight: 600 }}>{route.rating}</span>
                    </div>
                    <div style={{ position: "absolute", bottom: 12, left: 12 }}>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, fontWeight: 600, color: "#fff" }}>{route.name}</div>
                    </div>
                  </div>

                  <div style={{ padding: "16px 20px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
                      {[
                        { icon: "Ruler", val: route.distance, label: "Дистанция" },
                        { icon: "MountainSnow", val: route.elevation, label: "Высота" },
                        { icon: "Clock", val: route.duration, label: "Время" },
                      ].map((s) => (
                        <div key={s.label} style={{ textAlign: "center" }}>
                          <Icon name={s.icon} size={16} style={{ color: "var(--app-lime)", marginBottom: 4 }} />
                          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, color: "#fff" }}>{s.val}</div>
                          <div style={{ fontSize: 10, color: "#6b7280", marginTop: 2 }}>{s.label}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginBottom: 14 }}>
                      <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 6, letterSpacing: "0.05em", textTransform: "uppercase" }}>Профиль высоты</div>
                      <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 36 }}>
                        {route.altProfile.map((h, idx) => (
                          <div key={idx} style={{ flex: 1, height: `${h}%`, background: "linear-gradient(to top, var(--app-lime), rgba(132,204,22,0.3))", borderRadius: "2px 2px 0 0" }} />
                        ))}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const }}>
                      {route.tags.map((tag) => (
                        <span key={tag} style={{ background: "var(--app-lime-dim)", color: "var(--app-lime)", fontSize: 11, padding: "3px 10px", borderRadius: 20, border: "1px solid rgba(132,204,22,0.2)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {activeRoute === route.id && (
                      <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--app-border)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                          <Icon name="Navigation" size={14} style={{ color: "var(--app-lime)" }} />
                          <span style={{ fontSize: 13, color: "#e8eaed", fontWeight: 500 }}>GPS-трек активен</span>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--app-lime)", marginLeft: "auto" }} />
                        </div>
                        <svg viewBox="0 0 300 80" style={{ width: "100%", height: 80 }}>
                          <defs>
                            <linearGradient id={`grad-${route.id}`} x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#84cc16" />
                              <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                          </defs>
                          <path d="M10,60 Q40,20 80,40 T150,30 T220,50 T290,20" fill="none" stroke={`url(#grad-${route.id})`} strokeWidth="2.5" strokeLinecap="round" className="route-path" />
                          <circle cx="10" cy="60" r="5" fill="#84cc16" />
                          <circle cx="290" cy="20" r="5" fill="#3b82f6" />
                        </svg>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                          <span style={{ fontSize: 11, color: "#84cc16" }}>● Старт</span>
                          <span style={{ fontSize: 11, color: "#3b82f6" }}>● Финиш</span>
                        </div>
                        <button style={{ width: "100%", marginTop: 14, padding: "12px", background: "var(--app-lime)", color: "#0a0c0f", border: "none", borderRadius: 10, fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", cursor: "pointer", textTransform: "uppercase" as const }}>
                          Начать маршрут
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INVESTMENTS */}
        {activeTab === "investments" && (
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 32 }}>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 36, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>ИНВЕСТИЦИИ</h2>
              <span style={{ fontSize: 13, color: "var(--app-lime)", fontWeight: 500 }}>Апрель 2026</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20, marginBottom: 40 }}>
              {investments.map((inv) => (
                <div key={inv.label} style={{ background: "var(--app-surface)", border: "1px solid var(--app-border)", borderRadius: 16, padding: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--app-lime-dim)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(132,204,22,0.2)" }}>
                      <Icon name={inv.icon} size={20} style={{ color: "var(--app-lime)" }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#22c55e", background: "rgba(34,197,94,0.1)", padding: "3px 10px", borderRadius: 20 }}>
                      {inv.change}
                    </span>
                  </div>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 30, fontWeight: 700, color: "#fff", marginTop: 16, lineHeight: 1 }}>
                    {inv.value}
                  </div>
                  <div style={{ fontSize: 13, color: "#6b7280", marginTop: 6 }}>{inv.label}</div>
                </div>
              ))}
            </div>

            <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 20, letterSpacing: "0.04em" }}>
              РАУНДЫ ФИНАНСИРОВАНИЯ
            </h3>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
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
                    <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, fontWeight: 700, color: r.status === "Открыт" ? "var(--app-lime)" : "#fff" }}>
                      {r.amount}
                    </div>
                    <span style={{
                      fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
                      background: r.status === "Открыт" ? "var(--app-lime-dim)" : "rgba(55,65,81,0.5)",
                      color: r.status === "Открыт" ? "var(--app-lime)" : "#9ca3af",
                    }}>
                      {r.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 40, background: "linear-gradient(135deg, rgba(132,204,22,0.08) 0%, rgba(59,130,246,0.08) 100%)", border: "1px solid rgba(132,204,22,0.2)", borderRadius: 20, padding: "36px", textAlign: "center" as const }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 10 }}>
                ПРИСОЕДИНИТЕСЬ К SERIES A
              </div>
              <p style={{ color: "#9ca3af", fontSize: 15, marginBottom: 24 }}>Стать партнёром лидирующего велоприложения России</p>
              <button style={{ padding: "14px 40px", background: "var(--app-lime)", color: "#0a0c0f", border: "none", borderRadius: 12, fontFamily: "'Oswald', sans-serif", fontSize: 16, fontWeight: 700, letterSpacing: "0.1em", cursor: "pointer", textTransform: "uppercase" as const }}>
                Связаться с командой
              </button>
            </div>
          </div>
        )}

        {/* THOUGHTS */}
        {activeTab === "thoughts" && (
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 8 }}>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 36, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>
                МЫСЛИ РУКОВОДИТЕЛЯ
              </h2>
            </div>
            <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 40 }}>Идеи о следующих обновлениях и развитии продукта</p>

            <div style={{ background: "var(--app-surface)", border: "1px solid var(--app-border)", borderRadius: 20, padding: "28px", marginBottom: 40, display: "flex", alignItems: "center", gap: 24 }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, var(--app-lime), #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name="User" size={32} style={{ color: "#fff" }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, fontWeight: 600, color: "#fff" }}>Алексей Горский</div>
                <div style={{ fontSize: 13, color: "var(--app-lime)", fontWeight: 500, marginTop: 2 }}>Основатель & CEO, «Работайте правильно»</div>
                <div style={{ fontSize: 13, color: "#6b7280", marginTop: 6 }}>Путешественник · 40 000 км на велосипеде · Бизнес-ангел</div>
              </div>
              <div style={{ marginLeft: "auto", textAlign: "right" as const }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 28, fontWeight: 700, color: "var(--app-lime)" }}>4</div>
                <div style={{ fontSize: 11, color: "#6b7280" }}>записи за 2026</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column" as const, gap: 24 }}>
              {thoughts.map((t, i) => (
                <div key={i} style={{ background: "var(--app-surface)", border: "1px solid var(--app-border)", borderRadius: 18, padding: "28px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: "var(--app-lime)", borderRadius: "18px 0 0 18px" }} />
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
                    <span style={{ fontSize: 28, flexShrink: 0 }}>{t.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" as const }}>
                        <div>
                          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, fontWeight: 600, color: "#fff", lineHeight: 1 }}>{t.title}</div>
                          <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{t.date}</div>
                        </div>
                        <span style={{ background: "var(--app-lime-dim)", color: "var(--app-lime)", fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 20, border: "1px solid rgba(132,204,22,0.2)", whiteSpace: "nowrap" as const }}>
                          {t.tag}
                        </span>
                      </div>
                      <p style={{ fontSize: 15, color: "#9ca3af", lineHeight: 1.7, marginTop: 12 }}>
                        {t.text}
                      </p>
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
            <span style={{ fontSize: 10, color: activeTab === tab.key ? "var(--app-lime)" : "#4b5563", fontWeight: activeTab === tab.key ? 600 : 400, letterSpacing: "0.05em", textTransform: "uppercase" as const, transition: "color 0.2s" }}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}