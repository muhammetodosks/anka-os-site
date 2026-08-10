# ANKA-OS Web

Anka-OS resmî web sitesi — GitHub Pages ile yayınlanan modern, tamamı açık kaynak tanıtım sayfası.

> 🖥️ Canlı: https://muhammetodosks.github.io/anka-os-site/

## Özellikler

- Tema: koyu/açık mod (localStorage'da saklanır)
- Tamamen statik: HTML + CSS + JS (framework yok, bağımlılık yok)
- Mobil uyumlu (responsive), glassmorphism & gradient tasarım
- Sayfa açılma animasyonları (IntersectionObserver)
- ISO indirme (Google Drive mirror) + SHA256 kopyalama

## Yapı

```
├── index.html          # Ana sayfa
├── assets/
│   ├── css/style.css   # Tüm stiller
│   ├── js/main.js      # Tema, menü, animasyonlar
│   └── img/favicon.svg # Favicon
```

## Geliştirme

Sayfayı yerel çalıştır:

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

## Deploy

GitHub Pages, `main` dalının kökünden yayınlar. Pekiştirecek hiçbir şey yok — push yeter:

```bash
git push origin main
```

## Lisans

[MIT](LICENSE) © 2026 Anka-OS