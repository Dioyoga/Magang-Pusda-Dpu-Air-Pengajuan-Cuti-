# Menu Umum – PUSDA Jatim

Halaman web statis (HTML, CSS, JavaScript) berisi menu umum PUSDA Jatim dan formulir pengajuan cuti pegawai.

## Cara menjalankan

**Langsung di komputer:** buka file `index.html` dengan double-click (tidak perlu server atau instalasi).

**Lewat GitHub Pages:**
1. Push seluruh isi folder ini ke repository GitHub.
2. Buka **Settings → Pages**.
3. Pada *Build and deployment*, pilih **Deploy from a branch**, branch `main`, folder `/ (root)`, lalu **Save**.
4. Tunggu beberapa menit, lalu buka `https://USERNAME.github.io/NAMA-REPO/`.

## Struktur folder

```
.
├── index.html      # struktur halaman
├── css/
│   └── style.css   # tampilan
├── js/
│   └── script.js   # logika (login demo, form cuti, cetak formulir)
├── assets/
│   └── bg.jpg      # gambar latar
└── README.md
```

## Catatan

- Login hanyalah **simulasi di sisi browser** (akun demo: `pegawai` / `pusda123`). Jangan gunakan untuk data atau akun sungguhan.
- Data pengajuan cuti disimpan di `localStorage` browser masing-masing, jadi tidak dibagikan antar perangkat.
- Font (Google Fonts) memerlukan koneksi internet; tanpa internet, halaman tetap jalan dengan font bawaan.
- Jaga susunan folder (`css/`, `js/`, `assets/`) agar path file tidak rusak.
