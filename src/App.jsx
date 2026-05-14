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
  .card-val { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; }
  .card-label { font-size: 11px; color: #5a5a7a; margin-top: 2px; }
  .section { padding: 0 16px 16px; }
  .section-title { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; }
  .add-btn { background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.2); color: #f59e0b; border-radius: 8px; padding: 5px 12px; font-size: 11px; cursor: pointer; font-family: 'DM Sans', sans-serif; }
  .aday { background: #16161f; border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 14px; margin-bottom: 8px; display: flex; align-items: center; gap: 12px; }
  .aday-av { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px; flex-shrink: 0; }
  .aday-name { font-size: 14px; font-weight: 600; }
  .aday-note { font-size: 11px; color: #9090b0; margin-top: 2px; }
  .durum { padding: 3px 9px; border-radius: 20px; font-size: 10px; font-weight: 700; }
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
  .modal { background: #16161f; border-radius: 24px 24px 0 0; padding: 24px; width: 100%; max-width: 480px; max-height: 85vh; overflow-y: auto; }
  .modal-title { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 700; margin-bottom: 20px; }
  .inp { width: 100%; background: #0a0a0f; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px 14px; color: #f0f0f8; font-size: 14px; margin-bottom: 12px; outline: none; font-family: 'DM Sans', sans-serif; }
  .inp-label { font-size: 11px; color: #5a5a7a; margin-bottom: 4px; display: block; }
  .sel { width: 100%; background: #0a0a0f; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px 14px; color: #f0f0f8; font-size: 14px; margin-bottom: 16px; outline: none; font-family: 'DM Sans', sans-serif; }
  .sel option { background: #16161f; }
  .save-btn { width: 100%; background: linear-gradient(135deg, #a855f7, #7c3aed); border: none; border-radius: 12px; padding: 14px; color: #fff; font-size: 15px; font-weight: 700; cursor: pointer; font-family: 'Syne', sans-serif; }
  .progress-bg { background: #1e1e2a; border-radius: 999px; height: 8px; margin: 8px 0; overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, #a855f7, #f59e0b); }
  .login-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #0a0a0f; }
  .login-card { background: #16161f; border: 1px solid rgba(255,255,255,0.07); border-radius: 24px; padding: 40px 28px; width: 340px; }
  .login-logo { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; background: linear-gradient(135deg, #f59e0b, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-align: center; margin-bottom: 6px; }
  .login-sub { color: #5a5a7a; font-size: 12px; text-align: center; margin-bottom: 28px; }
  .login-label { font-size: 11px; color: #5a5a7a; display: block; margin-bottom: 6px; }
  .login-btn { width: 100%; background: linear-gradient(135deg, #a855f7, #7c3aed); border: none; border-radius: 12px; padding: 14px; color: #fff; font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; margin-top: 4px; }
  .err { color: #ef4444; font-size: 12px; text-align: center; margin-top: 10px; }
  .empty { text-align: center; color: #5a5a7a; padding: 40px 0; font-size: 14px; }
  .kariyer-badge { display: inline-block; background: linear-gradient(135deg, #f59e0b, #a855f7); border-radius: 20px; padding: 4px 14px; font-size: 12px; font-weight: 700; color: #000; margin-top: 8px; }
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
  const [metrikler, setMetrikler] = useState({
    solpv: 0, sagpv: 0, toplamkazanc: 0, haftalikkazanc: 0,
    ekip: 0, sponsor: 0, basvuru: 0, kariyer: "Executive"
  });
  const [tasks, setTasks] = useState([
    { id: 1, ad: "Sabah Rutini", saat: "08:00-08:30", ikon: "⏰", done: false },
    { id: 2, ad: "Mesaj Yanitla", saat: "09:00-10:00", ikon: "💬", done: false },
    { id: 3, ad: "Zoom Toplantisi", saat: "11:00-12:30", ikon: "📹", done: false },
    { id: 4, ad: "Aday Takibi", saat: "14:00-15:00", ikon: "👥", done: false },
    { id: 5, ad: "Icerik Uretimi", saat: "16:00-17:00", ikon: "✨", done: false },
  ]);
  const [modal, setModal] = useState(null);
  const [yeni, setYeni] = useState({ ad: "", tel: "", durum: "yeni", not: "" });
  const [metForm, setMetForm] = useState({});
  const [login, setLogin] = useState({ id: "", sifre: "" });
  const [err, setErr] = useState("");

  const giris = () => {
    const u = USERS[login.id];
    if (u && u.sifre === login.sifre) { setKullanici(u); setErr(""); }
    else setErr("Kullanici adi veya sifre hatali.");
  };

  const adayEkle = () => {
    if (!yeni.ad) return;
    setAdaylar(a => [{ ...yeni, id: Date.now() }, ...a]);
    setYeni({ ad: "", tel: "", durum: "yeni", not: "" });
    setModal(null);
  };

  const metrikKaydet = () => {
    setMetrikler(m => ({ ...m, ...metForm }));
    setModal(null);
  };

  const durumRenk = { sicak: "#f59e0b25", yesil: "#10b98125", takip: "#3b82f625", yeni: "#a855f725" };
  const durumColor = { sicak: "#f59e0b", yesil: "#10b981", takip: "#3b82f6", yeni: "#a855f7" };

  if (!kullanici) return (
    <>
      <style>{css}</style>
      <div className="login-wrap">
        <div className="login-card">
          <div className="login-logo">OXO Takip</div>
          <div className="login-sub">Network Marketing Sistemi</div>
          <label className="login-label">Kullanici Adi</label>
          <input className="inp" placeholder="rabia" value={login.id} onChange={e => setLogin(l => ({ ...l, id: e.target.value }))} onKeyDown={e => e.key === "Enter" && giris()} />
          <label className="login-label">Sifre</label>
          <input className="inp" type="password" placeholder="••••" value={login.sifre} onChange={e => setLogin(l => ({ ...l, sifre: e.target.value }))} onKeyDown={e => e.key === "Enter" && giris()} />
          <button className="login-btn" onClick={giris}>Giris Yap</button>
          {err && <div className="err">{err}</div>}
          <div style={{ marginTop: 20, textAlign: "center", fontSize: 11, color: "#5a5a7a" }}>Kullanici: rabia / Sifre: 1234</div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="topbar">
          <div className="logo">OXO Takip</div>
          <div className="avatar" onClick={() => setKullanici(null)}>{kullanici.ad[0]}</div>
        </div>

        {sayfa === "ana" && (
          <>
            <div className="greeting">
              <h2>Merhaba, {kullanici.ad}! 👋</h2>
              <p>Kariyerin: <span className="kariyer-badge">{metrikler.kariyer}</span></p>
            </div>
            <div className="metrics">
              {[
                { label: "Sol PV", val: metrikler.solpv, ikon: "⬅️", renk: "#f59e0b" },
                { label: "Sag PV", val: metrikler.sagpv, ikon: "➡️", renk: "#a855f7" },
                { label: "Haftalik Kazanc", val: metrikler.haftalikkazanc + " TL", ikon: "💰", renk: "#10b981" },
                { label: "Toplam Kazanc", val: metrikler.toplamkazanc + " TL", ikon: "🏆", renk: "#f59e0b" },
                { label: "Distributör", val: metrikler.ekip, ikon: "👥", renk: "#3b82f6" },
                { label: "Sponsor", val: metrikler.sponsor, ikon: "🌟", renk: "#a855f7" },
                { label: "Basvuru", val: metrikler.basvuru, ikon: "📋", renk: "#10b981" },
              ].map((m, i) => (
                <div key={i} className="card">
                  <div className="card-icon">{m.ikon}</div>
                  <div className="card-val" style={{ color: m.renk }}>{m.val}</div>
                  <div className="card-label">{m.label}</div>
                </div>
              ))}
              <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <button className="add-btn" style={{ width: "100%" }} onClick={() => { setMetForm({ ...metrikler }); setModal("metrik"); }}>
                  Guncelle
                </button>
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
            {adaylar.length === 0 && <div className="empty">Henuz aday yok. + Ekle butonuna bas!</div>}
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
              Gunluk Program
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
              <div style={{ color: "#5a5a7a", fontSize: 12, marginTop: 4 }}>{kullanici.rol === "admin" ? "👑 Yonetici" : "Bayi"}</div>
              <div className="kariyer-badge" style={{ marginTop: 12 }}>{metrikler.kariyer}</div>
            </div>
            <div className="metrics" style={{ padding: 0, marginBottom: 14 }}>
              {[
                { label: "Sol PV", val: metrikler.solpv, renk: "#f59e0b" },
                { label: "Sag PV", val: metrikler.sagpv, renk: "#a855f7" },
                { label: "Distributör
                  ", val: metrikler.ekip, renk: "#3b82f6" },
                { label: "Sponsor", val: metrikler.sponsor, renk: "#10b981" },
              ].map((s, i) => (
                <div key={i} className="card">
                  <div className="card-val" style={{ color: s.renk }}>{s.val}</div>
                  <div className="card-label">{s.label}</div>
                </div>
              ))}
            </div>
            <button className="save-btn" onClick={() => setKullanici(null)}>Cikis Yap</button>
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
              <option value="yeni">Yeni</option>
              <option value="sicak">Sicak</option>
              <option value="yesil">Yesil</option>
              <option value="takip">Takip</option>
            </select>
            <input className="inp" placeholder="Not..." value={yeni.not} onChange={e => setYeni(v => ({ ...v, not: e.target.value }))} />
            <button className="save-btn" onClick={adayEkle}>Ekle</button>
          </div>
        </div>
      )}

      {modal === "metrik" && (
        <div className="modal-bg" onClick={e => e.target.className === "modal-bg" && setModal(null)}>
          <div className="modal">
            <div className="modal-title">Verileri Guncelle</div>
            {[
              ["solpv","Sol PV"],
              ["sagpv","Sag PV"],
              ["haftalikkazanc","Haftalik Kazanc (TL)"],
              ["toplamkazanc","Toplam Kazanc (TL)"],
              ["ekip","Ekip Sayisi"],
              ["sponsor","Sponsor Sayisi"],
              ["basvuru","Basvuru Sayisi"],
            ].map(([k, l]) => (
              <div key={k}>
                <label className="inp-label">{l}</label>
                <input className="inp" type="number" placeholder="0" defaultValue={metrikler[k] || ""}
                  onChange={e => setMetForm(f => ({ ...f, [k]: Number(e.target.value) }))} />
              </div>
            ))}
            <label className="inp-label">Kariyer Seviyesi</label>
            <select className="sel" defaultValue={metrikler.kariyer}
              onChange={e => setMetForm(f => ({ ...f, kariyer: e.target.value }))}>
              <option>Executive</option>
              <option>Jade</option><option>Pearl</option>
<option>Sapphire</option>
<option>Elite</option>
              <option>Ruby</option><option>Double Diamond</option>
              <option>Emerald</option>
              <option>Diamond</option>
            </select>
            <button className="save-btn" onClick={metrikKaydet}>Kaydet</button>
          </div>
        </div>
      )}
    </>
  );
}