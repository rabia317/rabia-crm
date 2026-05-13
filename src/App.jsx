import { useState } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0f; color: #f0f0f8; font-family: 'DM Sans', sans-serif; }
  .app { max-width: 480px; margin: 0 auto; min-height: 100vh; padding-bottom: 80px; }
  .topbar { padding: 20px 16px 0; display: flex; justify-content: space-between; align-items: center; }
  .logo { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; background: linear-gradient(135deg, #f59e0b, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .avatar { width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, #f59e0b, #a855f7); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px; color: #000; cursor: pointer; }
  .greeting { padding: 20px 16px 0; }
  .greeting h2 { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; }
  .greeting p { color: #9090b0; font-size: 13px; margin-top: 4px; }
  .metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 16px; }
  .card { background: #16161f; border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 16px; }
  .card-icon { font-size: 20px; margin-bottom: 8px; }
  .card-val { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; }
  .card-label { font-size: 11px; color: #5a5a7a; text-transform: uppercase; letter-spacing: 0.06em; margin-top: 2px; }
  .section { padding: 0 16px 16px; }
  .section-title { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; }
  .add-btn { background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.2); color: #f59e0b; border-radius: 8px; padding: 5px 12px; font-size: 11px; cursor: pointer; }
  .aday { background: #16161f; border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 14px; margin-bottom: 8px; display: flex; align-items: center; gap: 12px; }
  .aday-av { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px; flex-shrink: 0; }
  .aday-name { font-size: 14px; font-weight: 600; }
  .aday-note { font-size: 11px; color: #9090b0; margin-top: 2px; }
  .durum { padding: 3px 9px; border-radius: 20px; font-size: 10px; font-weight: 700; text-transform: uppercase; }
  .sicak { background: rgba(245,158,11,0.15); color: #f59e0b; }
  .yesil { background: rgba(16,185,129,0.15); color: #10b981; }
  .takip { background: rgba(59,130,246,0.15); color: #3b82f6; }
  .yeni { background: rgba(168,85,247,0.15); color: #a855f7; }
  .task { background: #16161f; border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 14px; margin-bottom: 8px; display: flex; align-items: center; gap: 12px; cursor: pointer; }
  .task.done { opacity: 0.45; }
  .check { width: 22px; height: 22px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; font-size: 11px; flex-shrink: 0; }
  .check.checked { background: #10b981; border-color: #10b981; }
  .task-name { font-size: 13px; font-weight: 500; }
  .task-time { font-size: 11px; color: #5a5a7a; margin-top: 2px; }
  .navbar { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 480px; background: #111118; border-top: 1px solid rgba(255,255,255,0.07); display: flex; justify-content: space-around; padding: 10px 0 20px; z-index: 100; }
  .nav-item { display: flex; flex-direction: column; align-items: center; gap: 3px; cursor: pointer; color: #5a5a7a; font-size: 10px; padding: 4px 16px; transition: color 0.2s; }
  .nav-item.active { color: #f59e0b; }
  .nav-icon { font-size: 22px; }
  .modal-bg { position: fixed; inset: 0; background: rgba(0,0,0,0.6); display: flex; align-items: flex-end; justify-content: center; z-index: 200; }
  .modal { background: #16161f; border-radius: 24px 24px 0 0; padding: 24px; width: 100%; max-width: 480px; }
  .modal-title { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 700; margin-bottom: 20px; }
  .inp { width: 100%; background: #0a0a0f; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px 14px; color: #f0f0f8; font-size: 14px; margin-bottom: 12px; outline: none; font-family: 'DM Sans', sans-serif; }
  .sel { width: 100%; background: #0a0a0f; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px 14px; color: #f0f0f8; font-size: 14px; margin-bottom: 16px; outline: none; }
  .sel option { background: #16161f; }
  .save-btn { width: 100%; background: linear-gradient(135deg, #a855f7, #7c3aed); border: none; border-radius: 12px; padding: 14px; color: #fff; font-size: 15px; font-weight: 700; cursor: pointer; font-family: 'Syne', sans-serif; }
  .progress-bg { background: #1e1e2a; border-radius: 999px; height: 8px; margin: 8px 0; overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, #a855f7, #f59e0b); }
  .login-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #0a0a0f; }
  .login-card { background: #16161f; border: 1px solid rgba(255,255,255,0.07); border-radius: 24px; padding: 40px 28px; width: 340px; }
  .login-logo { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; background: linear-gradient(135deg, #f59e0b, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-align: center; margin-bottom: 6px; }
  .login-sub { color: #5a5a7a; font-size: 12px; text-align: center; margin-bottom: 28px; }
  .login-label { font-size: 11px; color: #5a5a7a; text-transform: uppercase; letter-spacing: 0.06em; display: block; margin-bottom: 6px; }
  .login-btn { width: 100%; background: linear-gradient(135deg, #a855f7, #7c3aed); border: none; border-radius: 12px; padding: 14px; color: #fff; font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; margin-top: 4px; }
  .err { color: #ef4444; font-size: 12px; text-align: center; margin-top: 10px; }
  .empty { text-align: center; color: #5a5a7a; padding: 40px 0; font-size: 14px; }
`;

const USERS = {
  rabia: { id: "rabia", ad: "Rabia", sifre: "1234", rol: "admin" },
  bayi1: { id: "bayi1", ad: "Selin", sifre: "1234", rol: "bayi" },
  bayi2: { id: "bayi2", ad: "Ayse", sifre: "1234", rol: "bayi" },
};

export default function App() {
  const [kullanici, setKullanici] = useState(null);
  const [sayfa, setSayfa] = useState("ana");
  const [adaylar, setAdaylar] = useState([]);
  const [metrikler, setMetrikler] = useState({ basvuru: 0, video: 0, funnel: 0, zoom: 0, distributor: 0, xp: 0, gelir: 0, hedef: 0 });
  const [tasks, setTasks] = useState([
    { id: 1, ad: "Sabah Rutini", saat: "08:00-08:30", ikon: "⏰", done: false },
    { id: 2, ad: "Mesajları Yanıtla", saat: "09:00-10:00", ikon: "💬", done: false },
    { id: 3, ad: "Zoom Toplantısı", saat: "11:00-12:30", ikon: "📹", done: false },
    { id: 4, ad: "Aday Takibi", saat: "14:00-15:00", ikon: "👥", done: false },
    { id: 5, ad: "İçerik Üretimi", saat: "16:00-17:00", ikon: "✨", done: false },
  ]);
  const [modal, setModal] = useState(null);
  const [yeni, setYeni] = useState({ ad: "", tel: "", durum: "yeni", not: "" });
  const [metForm, setMetForm] = useState({});
  const [login, setLogin] = useState({ id: "", sifre: "" });
  const [err, setErr] = useState("");

  const giris = () => {
    const u = USERS[login.id];
    if (u && u.sifre === login.sifre) { setKullanici(u); setErr(""); }
    else setErr("Kullanıcı adı veya şifre hatalı.");
  };

  const adayEkle = () => {
    if (!yeni.ad) return;
    setAdaylar(a => [{ ...yeni, id: Date.now() }, ...a]);
    setYeni({ ad: "", tel: "", durum: "yeni", not: "" });
    setModal(null);
  };

  const metrikKaydet = () => {
    setMetrikler(m => ({ ...m, ...Object.fromEntries(Object.entries(metForm).map(([k, v]) => [k, Number(v) || 0])) }));
    setModal(null);
  };

  const hedefPct = metrikler.hedef > 0 ? Math.min(100, Math.round((metrikler.gelir / metrikler.hedef) * 100)) : 0;
  const durumRenk = { sicak: "#f59e0b25", yesil: "#10b98125", takip: "#3b82f625", yeni: "#a855f725" };
  const durumColor = { sicak: "#f59e0b", yesil: "#10b981", takip: "#3b82f6", yeni: "#a855f7" };

  if (!kullanici) return (
    <>
      <style>{css}</style>
      <div className="login-wrap">
        <div className="login-card">
          <div className="login-logo">NetWork Pro</div>
          <div className="login-sub">Network Marketing Takip</div>
          <label className="login-label">Kullanıcı Adı</label>
          <input className="inp" placeholder="rabia" value={login.id} onChange={e => setLogin(l => ({ ...l, id: e.target.value }))} onKeyDown={e => e.key === "Enter" && giris()} />
          <label className="login-label">Şifre</label>
          <input className="inp" type="password" placeholder="••••" value={login.sifre} onChange={e => setLogin(l => ({ ...l, sifre: e.target.value }))} onKeyDown={e => e.key === "Enter" && giris()} />
          <button className="login-btn" onClick={giris}>Giriş Yap</button>
          {err && <div className="err">{err}</div>}
          <div style={{ marginTop: 20, textAlign: "center", fontSize: 11, color: "#5a5a7a" }}>Kullanıcı: rabia / Şifre: 1234</div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="topbar">
          <div className="logo">NetWork Pro</div>
          <div className="avatar" onClick={() => setKullanici(null)}>{kullanici.ad[0]}</div>
        </div>

        {sayfa === "ana" && (
          <>
            <div className="greeting">
              <h2>Merhaba, {kullanici.ad}! 👋</h2>
              <p>Bugünün verilerini gir ve takip et 📊</p>
            </div>
            <div className="metrics">
              {[
                { label: "Başvurular", val: metrikler.basvuru, ikon: "👥", renk: "#f59e0b" },
                { label: "Video İzlenme", val: metrikler.video, ikon: "▶️", renk: "#a855f7" },
                { label: "Funnel %", val: metrikler.funnel + "%", ikon: "🔽", renk: "#f59e0b" },
                { label: "Zoom", val: metrikler.zoom, ikon: "📹", renk: "#3b82f6" },
                { label: "Distribütör", val: metrikler.distributor, ikon: "🏆", renk: "#10b981" },
                { label: "XP Puanı", val: metrikler.xp + " XP", ikon: "⚡", renk: "#f59e0b" },
              ].map((m, i) => (
                <div key={i} className="card">
                  <div className="card-icon">{m.ikon}</div>
                  <div className="card-val" style={{ color: m.renk }}>{m.val}</div>
                  <div className="card-label">{m.label}</div>
                </div>
              ))}
            </div>
            <div className="section">
              <div className="section-title">
                Aylık Hedef
                <button className="add-btn" onClick={() => { setMetForm({ ...metrikler }); setModal("metrik"); }}>Güncelle</button>
              </div>
              <div className="card">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13 }}>₺{metrikler.gelir.toLocaleString("tr-TR")}</span>
                  <span style={{ color: "#f59e0b", fontWeight: 700 }}>%{hedefPct}</span>
                </div>
                <div className="progress-bg"><div className="progress-fill" style={{ width: hedefPct + "%" }} /></div>
                <div style={{ fontSize: 11, color: "#5a5a7a", marginTop: 6 }}>Hedef: ₺{metrikler.hedef.toLocaleString("tr-TR")}</div>
              </div>
            </div>
          </>
        )}

        {sayfa === "crm" && (
          <div className="section" style={{ paddingTop: 20 }}>
            <div className="section-title">
              Adaylar ({adaylar.length})
              <button className="add-btn" onClick={() => setModal("aday")}>+ Ekle</button>
            </div>
            {adaylar.length === 0 && <div className="empty">Henüz aday yok.<br />+ Ekle butonuna bas!</div>}
            {adaylar.map(a => (
              <div key={a.id} className="aday">
                <div className="aday-av" style={{ background: durumRenk[a.durum], color: durumColor[a.durum] }}>
                  {a.ad.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="aday-name">{a.ad}</div>
                  {a.tel && <div className="aday-note">📞 {a.tel}</div>}
                  {a.not && <div className="aday-note">{a.not}</div>}
                </div>
                <span className={`durum ${a.durum}`}>{a.durum}</span>
              </div>
            ))}
          </div>
        )}

        {sayfa === "program" && (
          <div className="section" style={{ paddingTop: 20 }}>
            <div className="section-title">
              Günlük Program
              <span style={{ fontSize: 12, color: "#5a5a7a", fontWeight: 400 }}>{tasks.filter(t => t.done).length}/{tasks.length}</span>
            </div>
            {tasks.map(t => (
              <div key={t.id} className={`task ${t.done ? "done" : ""}`} onClick={() => setTasks(ts => ts.map(x => x.id === t.id ? { ...x, done: !x.done } : x))}>
                <span style={{ fontSize: 20 }}>{t.ikon}</span>
                <div style={{ flex: 1 }}>
                  <div className="task-name">{t.ad}</div>
                  <div className="task-time">{t.saat}</div>
                </div>
                <div className={`check ${t.done ? "checked" : ""}`}>{t.done ? "✓" : ""}</div>
              </div>
            ))}
          </div>
        )}

        {sayfa === "profil" && (
          <div className="section" style={{ paddingTop: 20 }}>
            <div className="card" style={{ textAlign: "center", padding: 28, marginBottom: 14 }}>
              <div style={{ width: 64, height: 64, borderRadius: 18, background: "linear-gradient(135deg, #f59e0b, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800, color: "#000", margin: "0 auto 12px" }}>{kullanici.ad[0]}</div>
              <div style={{ fontFamily: "Syne,sans-serif", fontSize: 20, fontWeight: 700 }}>{kullanici.ad}</div>
              <div style={{ color: "#5a5a7a", fontSize: 12, marginTop: 4 }}>{kullanici.rol === "admin" ? "👑 Yönetici" : "Bayi"}</div>
            </div>
            <button className="save-btn" onClick={() => setKullanici(null)}>Çıkış Yap</button>
          </div>
        )}

        <div className="navbar">
          {[
            { id: "ana", label: "Ana Sayfa", ikon: "🏠" },
            { id: "crm", label: "CRM", ikon: "👥" },
            { id: "program", label: "Program", ikon: "📅" },
            { id: "profil", label: "Profil", ikon: "👤" },
          ].map(n => (
            <div key={n.id} className={`nav-item ${sayfa === n.id ? "active" : ""}`} onClick={() => setSayfa(n.id)}>
              <div className="nav-icon">{n.ikon}</div>
              <div>{n.label}</div>
            </div>
          ))}
        </div>
      </div>

      {modal === "aday" && (
        <div className="modal-bg" onClick={e => e.target.className === "modal-bg" && setModal(null)}>
          <div className="modal">
            <div className="modal-title">Yeni Aday Ekle</div>
            <input className="inp" placeholder="Ad Soyad" value={yeni.ad} onChange={e => setYeni(v => ({ ...v, ad: e.target.value }))} />
            <input className="inp" placeholder="Telefon" value={yeni.tel} onChange={e => setYeni(v => ({ ...v, tel: e.target.value }))} />
            <select className="sel" value={yeni.durum} onChange={e => setYeni(v => ({ ...v, durum: e.target.value }))}>
              <option value="yeni">🆕 Yeni</option>
              <option value="sicak">🔥 Sıcak</option>
              <option value="yesil">✅ Yeşil</option>
              <option value="takip">📌 Takip</option>
            </select>
            <input className="inp" placeholder="Not..." value={yeni.not} onChange={e => setYeni(v => ({ ...v, not: e.target.value }))} />
            <button className="save-btn" onClick={adayEkle}>Ekle</button>
          </div>
        </div>
      )}

      {modal === "metrik" && (
        <div className="modal-bg" onClick={e => e.target.className === "modal-bg" && setModal(null)}>
          <div className="modal">
            <div className="modal-title">📊 Metrikleri Güncelle</div>
            {[["basvuru","Başvuru Sayısı"],["video","Video İzlenme"],["funnel","Funnel (%)"],["zoom","Zoom Toplantısı"],["distributor","Yeni Distribütör"],["xp","XP Puanı"],["gelir","Aylık Gelir (₺)"],["hedef","Aylık Hedef (₺)"]].map(([k, l]) => (
              <input key={k} className="inp" type="number" placeholder={l} defaultValue={metrikler[k] || ""}
                onChange={e => setMetForm(f => ({ ...f, [k]: e.target.value }))} />
            ))}
            <button className="save-btn" onClick={metrikKaydet}>Kaydet</button>
          </div>
        </div>
      )}
    </>
  );
}