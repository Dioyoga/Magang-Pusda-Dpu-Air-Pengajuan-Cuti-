const $ = (id) => document.getElementById(id),
  QA = (s) => [...document.querySelectorAll(s)];
const P = {
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-3.3 0-8 1.7-8 5v1h16v-1c0-3.3-4.7-5-8-5z",
  build:
    "M4 21V3h10v6h6v12h-7v-4h-2v4zm3-14h2V5H7zm0 4h2V9H7zm0 4h2v-2H7zm8-2h2v-2h-2zm0 4h2v-2h-2z",
  id: "M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM9 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm4 10H5v-1c0-1.7 2.7-2.5 4-2.5s4 .8 4 2.5zm6-2h-4v-1.5h4zm0-3h-4v-1.5h4z",
  phone:
    "M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11 11 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.6 3.6a1 1 0 0 1-.25 1z",
  work: "M20 7h-4V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM10 5h4v2h-4z",
  clock:
    "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v5.4l4 2.3-.8 1.3L11 13V7z",
  tag: "M17.6 3H12L3 12l9 9 9-9V6.4zM16 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2z",
  list: "M3 5h2v2H3zm4 0h14v2H7zM3 11h2v2H3zm4 0h14v2H7zM3 17h2v2H3zm4 0h14v2H7z",
  info: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-6h2zm0-8h-2V7h2z",
  cal: "M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2zM5 10h14v10H5z",
  text: "M4 6h16v2H4zm0 5h16v2H4zm0 5h10v2H4z",
  lock: "M18 8h-1V6a5 5 0 0 0-10 0v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM9 6a3 3 0 0 1 6 0v2H9z",
  home: "M12 2 2 12h3v8h6v-6h2v6h6v-8h3z",
};
QA("i.ic").forEach(
  (e) =>
    (e.outerHTML =
      '<svg class="ic" viewBox="0 0 24 24"><path d="' +
      P[e.dataset.i] +
      '"/></svg>'),
);
const pd = (s) => {
  const [a, b, c] = s.split("-").map(Number);
  return new Date(a, b - 1, c);
};
const iso = (d) =>
  d.getFullYear() +
  "-" +
  String(d.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(d.getDate()).padStart(2, "0");
const libur = []; // isi tanggal libur nasional format 'YYYY-MM-DD'
const hk = (a, b) => {
  let n = 0;
  for (let d = new Date(a); d <= b; d.setDate(d.getDate() + 1)) {
    const w = d.getDay();
    if (w && w < 6 && !libur.includes(iso(d))) n++;
  }
  return n;
};
const kal = (a, b) => Math.round((b - a) / 864e5) + 1;
const fmt = (s) =>
  pd(s).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c],
  );
const today = iso(new Date());
let DB = [];
try {
  DB = JSON.parse(localStorage.getItem("pusda_cuti") || "[]");
} catch (e) {}
const save = () => {
  try {
    localStorage.setItem("pusda_cuti", JSON.stringify(DB));
  } catch (e) {}
};
const J = {
  "Cuti Tahunan": {
    mk: 1,
    x: "th",
    n: "12 hari kerja per tahun. Penghitungan memakai hari kerja (Senin–Jumat).",
  },
  "Cuti Besar": {
    mk: 5,
    bln: 3,
    n: "Masa kerja minimal 5 tahun, paling lama 3 bulan. Tidak berhak cuti tahunan pada tahun yang sama.",
  },
  "Cuti Sakit": {
    mk: 0,
    lamp: "Surat Keterangan Dokter (max 3MB)",
    x: "lp",
    n: "Lampirkan keterangan dokter. Tanggal mulai boleh sebelum hari ini.",
  },
  "Cuti Melahirkan": {
    mk: 0,
    bln: 3,
    lamp: "Surat Keterangan Dokter/Bidan (max 3MB)",
    x: "lh",
    n: "Paling lama 3 bulan. Lampirkan surat keterangan dokter/bidan.",
  },
  "Cuti Karena Alasan Penting": {
    mk: 0,
    bln: 2,
    x: "pn",
    opt: "Bukti Pendukung (Opsional, max 3MB)",
    n: "Paling lama 2 bulan. Lampirkan bukti pendukung bila ada.",
  },
  "Cuti di Luar Tanggungan Negara": {
    mk: 5,
    bln: 36,
    n: "Masa kerja minimal 5 tahun, alasan pribadi dan mendesak, paling lama 3 tahun.",
  },
};
const val = (id) => $(id).value.trim(),
  num = (id) => Math.max(0, +$(id).value || 0);
const setErr = (m) => {
  $("gerr").textContent = m;
  $("gerr").classList.toggle("hid", !m);
};

// navigasi
// Tautan menu lain sengaja dinonaktifkan (data-link="#"). Isi data-link dengan URL tujuan agar aktif.
document.querySelectorAll(".card[data-link]").forEach(
  (c) =>
    (c.onclick = () => {
      const u = c.dataset.link;
      if (u && u !== "#") location.href = u;
    }),
);
function show(v) {
  const f = v !== "menu";
  ["menu", "login", "cuti"].forEach((k) =>
    $("v-" + k).classList.toggle("on", k === v),
  );
  document.body.classList.toggle("cuti", f);
  $("back").style.display = f ? "none" : "";
  const L = $("logo");
  $("slot-" + v).appendChild(L);
  L.classList.toggle("sm", f);
  scrollTo(0, 0);
}
// ===== LOGIN (DEMO) =====
// PENTING: ini hanya simulasi di sisi browser. Untuk produksi, ganti doLogin() dengan permintaan ke server
// (mis. fetch('/pintu-air/login',{method:'POST',...})) dan simpan sesi di server (cookie HttpOnly), bukan di JavaScript.
const USERS = [
  {
    u: "pegawai",
    p: "pusda123",
    nama: "Pegawai Demo",
    nip: "198501012010011001",
    jabatan: "Staf Sekretariat",
    unit: "Sekretariat",
    mk: 10,
    atasan: "Kepala Sub Bagian (contoh)",
  },
];
let ME = null;
try {
  ME = JSON.parse(sessionStorage.getItem("pusda_me") || "null");
} catch (e) {}
let fails = 0,
  lockUntil = 0;
const lerr = (m) => {
  $("lerr").textContent = m;
  $("lerr").classList.toggle("hid", !m);
  $("lerr").style.marginBottom = m ? "16px" : "0";
};
function prefill() {
  if (!ME) return;
  $("nama").value = ME.nama;
  $("nip").value = ME.nip;
  $("jabatan").value = ME.jabatan;
  $("unit").value = ME.unit;
  $("mk").value = ME.mk;
  $("atasan").value = ME.atasan;
  $("nama").readOnly = $("nip").readOnly = true;
  $("whoTxt").textContent =
    "Masuk sebagai " + ME.nama + " (" + ME.nip + ")";
}
function enter() {
  prefill();
  renderList();
  show("cuti");
  calc();
}
function doLogin() {
  const now = Date.now();
  if (now < lockUntil)
    return lerr(
      "Terlalu banyak percobaan. Coba lagi dalam " +
        Math.ceil((lockUntil - now) / 1000) +
        " detik.",
    );
  const u = $("lu").value.trim().toLowerCase(),
    p = $("lpw").value;
  if (!u || !p) return lerr("Username dan password wajib diisi.");
  const a = USERS.find((x) => (x.u === u || x.nip === u) && x.p === p);
  if (!a) {
    fails++;
    if (fails >= 5) {
      fails = 0;
      lockUntil = now + 30000;
      return lerr("Terlalu banyak percobaan. Coba lagi dalam 30 detik.");
    }
    return lerr("Username atau password salah.");
  }
  fails = 0;
  ME = { ...a };
  delete ME.p;
  try {
    sessionStorage.setItem("pusda_me", JSON.stringify(ME));
  } catch (e) {}
  $("lpw").value = "";
  lerr("");
  enter();
}
$("lgo").onclick = doLogin;
$("lback").onclick = () => show("menu");
["lu", "lpw"].forEach((i) =>
  $(i).addEventListener("keydown", (e) => {
    if (e.key === "Enter") doLogin();
  }),
);
$("eye").onclick = () => {
  const p = $("lpw");
  p.type = p.type === "password" ? "text" : "password";
};
$("logout").onclick = () => {
  ME = null;
  try {
    sessionStorage.removeItem("pusda_me");
  } catch (e) {}
  $("fm").reset();
  $("nama").readOnly = $("nip").readOnly = false;
  $("done").classList.add("hid");
  $("wiz").classList.remove("hid");
  dyn();
  go(0);
  $("lu").value = "";
  show("menu");
};
$("btn-cuti").onclick = () => (ME ? enter() : show("login"));
// Tombol "Kembali ke Menu Awal" sengaja dinonaktifkan (tautan mati). Ganti dengan location.href=URL bila ingin aktif.
$("back").onclick = (e) => e.preventDefault();

// aturan dinamis
function avail() {
  const t =
    Math.max(0, 12 - num("diambil")) +
    Math.min(6, num("n1")) +
    Math.min(6, num("n2"));
  return Math.min(t, num("n2") > 0 ? 24 : 18);
}
function dyn() {
  const j = $("jenis").value,
    r = J[j];
  QA(".x").forEach((e) => e.classList.add("hid"));
  if (r) {
    $("jnote").innerHTML = "<b>Catatan:</b> " + r.n;
    $("jnote").classList.remove("hid");
    if (r.x) QA(".x-" + r.x).forEach((e) => e.classList.remove("hid"));
    if (r.lamp || r.opt) {
      $("lampbox").classList.remove("hid");
      $("lamplb").textContent = r.lamp || r.opt;
    }
  } else $("jnote").classList.add("hid");
  calc();
}
function calc() {
  const j = $("jenis").value,
    r = J[j],
    a = $("mulai").value,
    b = $("selesai").value,
    box = $("durasi");
  let err = "",
    t = "Lama cuti: –",
    warn = "";
  if (r && r.mk && val("mk") !== "" && num("mk") < r.mk)
    err = j + " mensyaratkan masa kerja minimal " + r.mk + " tahun.";
  if (!err && a && b) {
    const s = pd(a),
      e = pd(b);
    if (e < s) err = "Tanggal selesai tidak boleh sebelum tanggal mulai.";
    else {
      const h = hk(s, e),
        k = kal(s, e);
      t = "Lama cuti: " + h + " hari kerja (" + k + " hari kalender)";
      if (j && j !== "Cuti Sakit" && a < today)
        err = "Permintaan cuti harus diajukan sebelum cuti dimulai.";
      if (!err && r && r.bln) {
        const me = new Date(s);
        me.setMonth(me.getMonth() + r.bln);
        me.setDate(me.getDate() - 1);
        if (e > me)
          err =
            "Maksimal " +
            (r.bln >= 12 ? r.bln / 12 + " tahun" : r.bln + " bulan") +
            " untuk " +
            j +
            ".";
      }
      if (!err && j === "Cuti Tahunan") {
        const av = avail();
        t += " · Hak tersedia: " + av + " hari kerja";
        if (h > av)
          err =
            "Melebihi hak cuti tahunan yang tersedia (" +
            av +
            " hari kerja).";
        else if (h < 1) err = "Minimal 1 hari kerja.";
      }
      if (!err && j === "Cuti Melahirkan" && $("anak").value === "4")
        warn =
          "Anak ke-4 dan seterusnya mengikuti ketentuan cuti besar; hubungi bagian kepegawaian.";
    }
  }
  box.textContent = err || t + (warn ? " · " + warn : "");
  box.className = "nt " + (err ? "e" : warn ? "w" : "i");
  return err;
}
[
  "jenis",
  "mulai",
  "selesai",
  "diambil",
  "n1",
  "n2",
  "anak",
  "mk",
].forEach((id) =>
  $(id).addEventListener("input", () => {
    id === "jenis" ? dyn() : calc();
  }),
);
$("mulai").addEventListener(
  "input",
  () => ($("selesai").min = $("mulai").value),
);

// langkah form
let step = 0;
const need = [
  ["nama", "unit", "nip", "hp", "jabatan", "mk", "atasan"],
  ["jenis", "mulai", "selesai", "alasan", "alamat"],
  [],
];
const lab = {
  nama: "Nama",
  unit: "Bidang / Bagian",
  nip: "NIP",
  hp: "Nomor HP",
  jabatan: "Jabatan",
  mk: "Masa kerja",
  atasan: "Atasan langsung",
  jenis: "Jenis cuti",
  mulai: "Tanggal mulai",
  selesai: "Tanggal selesai",
  alasan: "Alasan cuti",
  alamat: "Alamat selama cuti",
};
function go(n) {
  step = n;
  QA(".step").forEach((s, i) => s.classList.toggle("on", i === n));
  $("next").textContent = n === 2 ? "Kirim Pengajuan Cuti" : "Lanjut";
  setErr("");
  if (n === 2) review();
}
function check(n) {
  for (const id of need[n])
    if (!val(id)) return lab[id] + " wajib diisi.";
  if (n === 0) {
    if (!/^\d{18}$/.test(val("nip"))) return "NIP harus 18 digit angka.";
    if (!/^(\+62|62|0)8\d{7,12}$/.test(val("hp").replace(/[\s-]/g, "")))
      return "Nomor HP tidak valid.";
  }
  if (n === 1) {
    const j = $("jenis").value,
      r = J[j],
      f = $("lamp").files[0];
    if (j === "Cuti Karena Alasan Penting" && !val("sub"))
      return "Pilih alasan penting.";
    if (r && r.lamp && !f) return "Lampiran wajib untuk " + j + ".";
    if (f && f.size > 3 * 1024 * 1024)
      return "Ukuran lampiran maksimal 3 MB.";
    return calc();
  }
  if (n === 2 && !$("setuju").checked)
    return "Centang pernyataan terlebih dahulu.";
  return "";
}
function data() {
  const j = $("jenis").value,
    s = pd(val("mulai")),
    e = pd(val("selesai"));
  return {
    nama: val("nama"),
    nip: val("nip"),
    jabatan: val("jabatan"),
    unit: val("unit"),
    mk: num("mk"),
    hp: val("hp"),
    atasan: val("atasan"),
    jenis: j,
    mulai: val("mulai"),
    selesai: val("selesai"),
    hk: hk(s, e),
    kal: kal(s, e),
    alasan: val("alasan"),
    alamat: val("alamat"),
    sub: j === "Cuti Karena Alasan Penting" ? val("sub") : "",
    anak: j === "Cuti Melahirkan" ? $("anak").value : "",
    cat:
      j === "Cuti Tahunan"
        ? {
            ambil: num("diambil"),
            n1: num("n1"),
            n2: num("n2"),
            av: avail(),
          }
        : null,
    lamp: $("lamp").files[0] ? $("lamp").files[0].name : "",
  };
}
function review() {
  const d = data();
  const rows = [
    ["Nama", d.nama],
    ["NIP", d.nip],
    ["Bidang / Jabatan", d.unit + " / " + d.jabatan],
    ["Masa kerja", d.mk + " tahun"],
    ["Jenis cuti", d.jenis + (d.sub ? " – " + d.sub : "")],
    ["Periode", fmt(d.mulai) + " s.d. " + fmt(d.selesai)],
    ["Lama", d.hk + " hari kerja (" + d.kal + " hari kalender)"],
    ["Alasan", d.alasan],
    ["Alamat selama cuti", d.alamat + " · " + d.hp],
    ["Atasan langsung", d.atasan],
  ];
  if (d.lamp) rows.push(["Lampiran", d.lamp]);
  $("rv").innerHTML = rows
    .map((r) => "<dt>" + r[0] + "</dt><dd>" + esc(r[1]) + "</dd>")
    .join("");
}
$("prev").onclick = () => (step ? go(step - 1) : show("menu"));
$("next").onclick = () => {
  const m = check(step);
  if (m) {
    setErr(m);
    return;
  }
  if (step < 2) return go(step + 1);
  const d = data();
  d.no =
    "CUTI/" +
    new Date().getFullYear() +
    "/" +
    String(Math.floor(Math.random() * 9000) + 1000);
  d.tgl = today;
  d.stage = 1;
  d.st = "proses";
  d.log = [{ t: today, x: "Permintaan diajukan oleh pegawai" }];
  DB.unshift(d);
  save();
  renderList();
  success(d);
};
function success(d) {
  $("wiz").classList.add("hid");
  const el = $("done");
  el.classList.remove("hid");
  el.innerHTML =
    '<div class="ok"><div class="tick">✓</div><h3 style="margin:12px 0 2px;font-size:22px">Pengajuan Terkirim</h3><p style="margin:0;opacity:.8;font-size:14px">Menunggu pertimbangan atasan langsung (' +
    esc(d.atasan) +
    ").</p><code>" +
    d.no +
    '</code><div class="acts" style="border:0;margin-top:10px"><button class="bk" id="pr" style="flex:1;justify-content:center">Cetak Formulir</button><button class="pr" id="ag">Ajukan Lagi</button></div></div>';
  $("pr").onclick = () => cetak(d);
  $("ag").onclick = () => {
    $("fm").reset();
    prefill();
    el.classList.add("hid");
    $("wiz").classList.remove("hid");
    dyn();
    go(0);
  };
}

// lacak + simulasi alur
const stL = ["Diajukan", "Atasan", "Pejabat", "Dicatat"];
function statusTxt(r) {
  if (r.st === "ditolak") return ["Ditolak", "no"];
  if (r.st === "ditangguhkan") return ["Ditangguhkan", "hold"];
  if (r.stage === 1) return ["Menunggu atasan", ""];
  if (r.stage === 2) return ["Menunggu pejabat", ""];
  if (r.stage === 3) return ["Disetujui", "ok"];
  return ["Selesai", "ok"];
}
function renderList() {
  const q = val("cari").toLowerCase();
  const L = DB.filter(
    (r) =>
      (!ME || r.nip === ME.nip) &&
      (!q || r.no.toLowerCase().includes(q) || r.nip.includes(q)),
  );
  $("list").innerHTML = L.length
    ? L.map((r) => {
        const [s, c] = statusTxt(r);
        const fail = r.st === "ditolak" || r.st === "ditangguhkan";
        const tl = stL
          .map(
            (x, i) =>
              '<li class="' +
              (i < r.stage
                ? "d"
                : i === r.stage
                  ? fail
                    ? "x"
                    : "c"
                  : "") +
              '">' +
              x +
              "</li>",
          )
          .join("");
        let act = "";
        if (r.st === "proses") {
          if (r.stage === 1)
            act =
              '<button class="sbtn g" data-a="pa" data-n="' +
              r.no +
              '">Atasan: setuju</button><button class="sbtn r" data-a="pb" data-n="' +
              r.no +
              '">Atasan: tidak setuju</button>';
          else if (r.stage === 2)
            act =
              '<button class="sbtn g" data-a="ok" data-n="' +
              r.no +
              '">Pejabat: setujui</button><button class="sbtn" data-a="tg" data-n="' +
              r.no +
              '">Tangguhkan</button><button class="sbtn r" data-a="tl" data-n="' +
              r.no +
              '">Tolak</button>';
          else if (r.stage === 3)
            act =
              '<button class="sbtn g" data-a="ct" data-n="' +
              r.no +
              '">Kepegawaian: catat</button>';
        }
        return (
          '<div class="rec"><h4>' +
          esc(r.jenis) +
          ' <span class="badge ' +
          c +
          '">' +
          s +
          '</span></h4><div class="m">' +
          r.no +
          " · " +
          esc(r.nama) +
          "<br>" +
          fmt(r.mulai) +
          " s.d. " +
          fmt(r.selesai) +
          " (" +
          r.hk +
          ' hari kerja)</div><ol class="tl">' +
          tl +
          '</ol><div class="m">' +
          r.log.map((l) => fmt(l.t) + ": " + esc(l.x)).join("<br>") +
          "</div><div>" +
          act +
          '<button class="sbtn" data-a="pt" data-n="' +
          r.no +
          '">Cetak</button></div></div>'
        );
      }).join("")
    : '<div class="rec">Belum ada pengajuan.</div>';
}
$("cari").oninput = renderList;
$("list").onclick = (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  const r = DB.find((x) => x.no === b.dataset.n);
  if (!r) return;
  const a = b.dataset.a,
    L = (x) => r.log.push({ t: today, x });
  if (a === "pt") return cetak(r);
  if (a === "pa" || a === "pb") {
    r.pert = a === "pa" ? "Setuju" : "Tidak setuju";
    r.stage = 2;
    L("Pertimbangan atasan langsung: " + r.pert);
  }
  if (a === "ok") {
    r.stage = 3;
    r.st = "proses";
    L("Pejabat berwenang menyetujui cuti");
  }
  if (a === "tg") {
    r.st = "ditangguhkan";
    L("Cuti ditangguhkan oleh pejabat berwenang (kepentingan dinas)");
  }
  if (a === "tl") {
    r.st = "ditolak";
    L("Cuti ditolak oleh pejabat berwenang");
  }
  if (a === "ct") {
    r.stage = 4;
    L("Cuti dicatat oleh unit kepegawaian");
  }
  save();
  renderList();
};

// cetak formulir
function cetak(d) {
  const c = d.cat
    ? "<tr><td>Catatan cuti tahunan</td><td>Diambil tahun ini: " +
      d.cat.ambil +
      " hari · Sisa N-1: " +
      d.cat.n1 +
      " · Sisa N-2: " +
      d.cat.n2 +
      " · Hak tersedia: " +
      d.cat.av +
      " hari kerja</td></tr>"
    : "";
  $("cetak").innerHTML =
    '<h3 style="text-align:center;margin:0 0 2px">FORMULIR PERMINTAAN DAN PEMBERIAN CUTI</h3><p style="text-align:center;margin:0 0 10px">Dinas PU Sumber Daya Air Provinsi Jawa Timur · No. ' +
    d.no +
    '</p><table><tr><td width="32%">I. Nama / NIP</td><td>' +
    esc(d.nama) +
    " / " +
    d.nip +
    "</td></tr><tr><td>Bidang / Jabatan</td><td>" +
    esc(d.unit) +
    " / " +
    esc(d.jabatan) +
    "</td></tr><tr><td>Masa kerja</td><td>" +
    d.mk +
    " tahun</td></tr><tr><td>II. Jenis cuti</td><td>" +
    esc(d.jenis) +
    (d.sub ? " – " + esc(d.sub) : "") +
    "</td></tr><tr><td>III. Alasan cuti</td><td>" +
    esc(d.alasan) +
    "</td></tr><tr><td>IV. Lamanya cuti</td><td>" +
    d.hk +
    " hari kerja (" +
    d.kal +
    " hari kalender), " +
    fmt(d.mulai) +
    " s.d. " +
    fmt(d.selesai) +
    "</td></tr>" +
    c +
    "<tr><td>V. Alamat selama cuti</td><td>" +
    esc(d.alamat) +
    " · Telp " +
    esc(d.hp) +
    '</td></tr></table><table style="margin-top:10px"><tr><td width="50%">VI. Pertimbangan atasan langsung<br>(' +
    esc(d.pert || "disetujui / tidak disetujui") +
    ")<br><br><br><br>" +
    esc(d.atasan) +
    '</td><td>VII. Keputusan pejabat yang berwenang memberikan cuti<br>(disetujui / perubahan / ditangguhkan / tidak disetujui)<br><br><br>Nama &amp; NIP</td></tr></table><p style="text-align:right;margin-top:14px">Pemohon,<br><br><br>' +
    esc(d.nama) +
    "</p>";
  $("cetak").style.display = "block";
  try {
    print();
  } catch (e) {}
  $("cetak").style.display = "none";
}
$("mulai").min = today;
go(0);
renderList();
if (ME) prefill();
