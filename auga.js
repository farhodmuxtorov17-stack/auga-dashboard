/* ============================================================
   AUGA — umumiy shell va interaktivlik
   Har sahifa: <body data-sahifa="panel|aktivlar|
   shartnomalar|xaritalar|hisobotlar|bildirishnomalar|sozlamalar">
   Ichida [data-shell-sidebar] va [data-shell-topbar] bo'lsa,
   shu skript ularni to'ldiradi. window.AUGA yordamchilari:
   toast, modal, dropdown.
   ============================================================ */
(function(){
"use strict";

/* ---------- Ikonkalar (Lucide uslubi, 1.7 stroke) ---------- */
const IKONLAR = `
<svg style="display:none" aria-hidden="true">
  <symbol id="i-panel" viewBox="0 0 24 24"><rect x="4" y="4" width="6.5" height="6.5" rx="2" fill="currentColor" stroke="none"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="2" fill="currentColor" stroke="none"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="2" fill="currentColor" stroke="none"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="2" fill="currentColor" stroke="none"/></symbol>
  <symbol id="i-aktiv" viewBox="0 0 24 24"><path d="M3.5 8.5 12 4l8.5 4.5v7L12 20l-8.5-4.5z"/><path d="M3.5 8.5 12 13l8.5-4.5M12 13v7"/></symbol>
  <symbol id="i-uy" viewBox="0 0 24 24"><path d="m4 10 8-6.5L20 10v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19z"/><path d="M9.5 20.5v-6h5v6"/></symbol>
  <symbol id="i-lizing" viewBox="0 0 24 24"><rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3 10h18M7 15h4"/></symbol>
  <symbol id="i-shartnoma" viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5M9 12.5h6M9 16h6"/></symbol>
  <symbol id="i-xarita" viewBox="0 0 24 24"><path d="M9.5 4.5 4 6.5v13l5.5-2 5 2 5.5-2v-13l-5.5 2z"/><path d="M9.5 4.5v13M14.5 6.5v13"/></symbol>
  <symbol id="i-hisobot" viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M8 16v-4M12 16V8M16 16v-6"/></symbol>
  <symbol id="i-qongiroq" viewBox="0 0 24 24"><path d="M6.3 8.6a5.7 5.7 0 0 1 11.4 0c0 6.2 2.3 7.9 2.3 7.9H4s2.3-1.7 2.3-7.9"/><path d="M10.4 20a1.85 1.85 0 0 0 3.2 0"/></symbol>
  <symbol id="i-sozlama" viewBox="0 0 24 24"><path d="M12.22 3h-.44a1.9 1.9 0 0 0-1.9 1.9v.17a1.9 1.9 0 0 1-.95 1.64l-.41.24a1.9 1.9 0 0 1-1.9 0l-.14-.08a1.9 1.9 0 0 0-2.59.7l-.21.36a1.9 1.9 0 0 0 .69 2.59l.15.1a1.9 1.9 0 0 1 .95 1.63v.49a1.9 1.9 0 0 1-.95 1.65l-.15.09a1.9 1.9 0 0 0-.69 2.59l.21.36a1.9 1.9 0 0 0 2.59.7l.14-.08a1.9 1.9 0 0 1 1.9 0l.41.24a1.9 1.9 0 0 1 .95 1.64v.17a1.9 1.9 0 0 0 1.9 1.9h.44a1.9 1.9 0 0 0 1.9-1.9v-.17a1.9 1.9 0 0 1 .95-1.64l.41-.24a1.9 1.9 0 0 1 1.9 0l.14.08a1.9 1.9 0 0 0 2.59-.7l.21-.37a1.9 1.9 0 0 0-.69-2.59l-.15-.08a1.9 1.9 0 0 1-.95-1.65v-.48a1.9 1.9 0 0 1 .95-1.65l.15-.09a1.9 1.9 0 0 0 .69-2.59l-.21-.36a1.9 1.9 0 0 0-2.59-.7l-.14.08a1.9 1.9 0 0 1-1.9 0l-.41-.24a1.9 1.9 0 0 1-.95-1.64V4.9A1.9 1.9 0 0 0 12.22 3z"/><circle cx="12" cy="12" r="2.8"/></symbol>
  <symbol id="i-yordam" viewBox="0 0 24 24"><path d="M4 13.5v-2a8 8 0 0 1 16 0v2"/><path d="M4 13.5a2 2 0 0 1 2-2h1v5H6a2 2 0 0 1-2-2zm16 0a2 2 0 0 0-2-2h-1v5h1a2 2 0 0 0 2-2z" fill="currentColor" stroke="none"/><path d="M20 15.5v1a3 3 0 0 1-3 3h-3"/></symbol>
  <symbol id="i-izlash" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7.5"/><path d="m20.5 20.5-4.2-4.2"/></symbol>
  <symbol id="i-quyosh" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/></symbol>
  <symbol id="i-past" viewBox="0 0 24 24"><path d="m6 9.5 6 6 6-6"/></symbol>
  <symbol id="i-tepa" viewBox="0 0 24 24"><path d="m6 14.5 6-6 6 6"/></symbol>
  <symbol id="i-ong" viewBox="0 0 24 24"><path d="m9.5 6 6 6-6 6"/></symbol>
  <symbol id="i-chap" viewBox="0 0 24 24"><path d="m14.5 6-6 6 6 6"/></symbol>
  <symbol id="i-yuklab" viewBox="0 0 24 24"><path d="M20.5 15v3.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2V15"/><path d="m7.5 10.5 4.5 4.5 4.5-4.5M12 15V3.5"/></symbol>
  <symbol id="i-yuklash" viewBox="0 0 24 24"><path d="M20.5 15v3.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2V15"/><path d="M7.5 8 12 3.5 16.5 8M12 3.5V15"/></symbol>
  <symbol id="i-bino" viewBox="0 0 24 24"><path d="M4.5 21V5.2A1.2 1.2 0 0 1 5.7 4h7.6a1.2 1.2 0 0 1 1.2 1.2V21" fill="currentColor" stroke="none" opacity=".18"/><path d="M4.5 21V5.2A1.2 1.2 0 0 1 5.7 4h7.6a1.2 1.2 0 0 1 1.2 1.2V21M14.5 9h3.8a1.2 1.2 0 0 1 1.2 1.2V21M2.8 21h18.4"/><path d="M7.5 7.5h1.6M10.5 7.5h1.6M7.5 10.7h1.6M10.5 10.7h1.6M7.5 13.9h1.6M10.5 13.9h1.6M7.5 17.1h1.6M10.5 17.1h1.6M17 12.5h.9M17 15.5h.9M17 18.5h.9"/></symbol>
  <symbol id="i-papka" viewBox="0 0 24 24"><path d="M3.5 7.5v10a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-6.6L9.6 5.2a2 2 0 0 0-1.4-.6H5.5a2 2 0 0 0-2 2z"/><path d="m9 14 2 2 4-4"/></symbol>
  <symbol id="i-grafik" viewBox="0 0 24 24"><path d="M3.5 4v14.5a2 2 0 0 0 2 2H20.5"/><path d="m7 14.5 3.5-4 3 2.5 4.5-5.5"/><circle cx="18" cy="7.5" r="1.4" fill="currentColor" stroke="none"/></symbol>
  <symbol id="i-daromad" viewBox="0 0 24 24"><rect x="5" y="3.5" width="14" height="17" rx="2.5"/><path d="M9 3.5h6v3H9zM9 11h6M9 14.5h6M9 18h3.5"/></symbol>
  <symbol id="i-navigatsiya" viewBox="0 0 24 24"><path d="m4.5 11 15-6.5L13 19.5l-2-6.5z"/></symbol>
  <symbol id="i-qoshish" viewBox="0 0 24 24"><path d="M12 5.5v13M5.5 12h13"/></symbol>
  <symbol id="i-minus" viewBox="0 0 24 24"><path d="M5.5 12h13"/></symbol>
  <symbol id="i-slayder" viewBox="0 0 24 24"><path d="M4 7.5h9M17.5 7.5H20M4 16.5h2.5M11 16.5h9"/><circle cx="15" cy="7.5" r="2.2"/><circle cx="8.5" cy="16.5" r="2.2"/></symbol>
  <symbol id="i-muddat" viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/><path d="M12 13v3l2 1.2"/></symbol>
  <symbol id="i-tamirlash" viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/><path d="m9.5 15.5 1.8 1.8 3.4-3.4"/></symbol>
  <symbol id="i-kalendar" viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/></symbol>
  <symbol id="i-koz" viewBox="0 0 24 24"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/></symbol>
  <symbol id="i-koz-yopiq" viewBox="0 0 24 24"><path d="M10.7 5.8A9.8 9.8 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17.6 17.6 0 0 1-2.2 3M14.1 14.1a3 3 0 1 1-4.2-4.2M3.5 3.5l17 17M6.6 6.6C4 8.4 2.5 12 2.5 12s3.5 6.5 9.5 6.5c1.4 0 2.7-.35 3.9-.9"/></symbol>
  <symbol id="i-qalam" viewBox="0 0 24 24"><path d="M16.8 3.7a2.3 2.3 0 0 1 3.3 3.3L8 19.1l-4.5 1.2L4.7 15.8z"/><path d="m14.5 6 3.3 3.3"/></symbol>
  <symbol id="i-savat" viewBox="0 0 24 24"><path d="M4 7h16M9.5 7V5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 5v2M6 7l1 12.4A2 2 0 0 0 9 21h6a2 2 0 0 0 2-1.6L18 7"/><path d="M10 11.5v5M14 11.5v5"/></symbol>
  <symbol id="i-yopish" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></symbol>
  <symbol id="i-filtr" viewBox="0 0 24 24"><path d="M4 5.5h16l-6.2 7.2v5.1L10.2 20v-7.3z"/></symbol>
  <symbol id="i-saralash" viewBox="0 0 24 24"><path d="M7 4v13M7 17l-3-3M7 17l3-3M17 20V7M17 7l-3 3M17 7l3 3"/></symbol>
  <symbol id="i-nuqtalar" viewBox="0 0 24 24"><circle cx="12" cy="5.5" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="18.5" r="1.6" fill="currentColor" stroke="none"/></symbol>
  <symbol id="i-chiqish" viewBox="0 0 24 24"><path d="M9.5 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.5"/><path d="m15.5 16.5 4.5-4.5-4.5-4.5M20 12H9.5"/></symbol>
  <symbol id="i-foyd" viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></symbol>
  <symbol id="i-tel" viewBox="0 0 24 24"><path d="M21 16.5v2.6a1.9 1.9 0 0 1-2.1 1.9 19 19 0 0 1-8.3-3A18.7 18.7 0 0 1 4.9 12.2a19 19 0 0 1-3-8.3A1.9 1.9 0 0 1 3.9 2h2.6a1.9 1.9 0 0 1 1.9 1.6c.12.9.34 1.8.65 2.6a1.9 1.9 0 0 1-.43 2L7.5 9.4a15.2 15.2 0 0 0 7.1 7.1l1.2-1.17a1.9 1.9 0 0 1 2-.43c.84.31 1.7.53 2.6.65A1.9 1.9 0 0 1 21 16.5z"/></symbol>
  <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7.5 8.5 6 8.5-6"/></symbol>
  <symbol id="i-pin" viewBox="0 0 24 24"><path d="M19.5 10.2c0 5.5-7.5 11.3-7.5 11.3S4.5 15.7 4.5 10.2a7.5 7.5 0 0 1 15 0z"/><circle cx="12" cy="10.2" r="2.8"/></symbol>
  <symbol id="i-soat" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 1.8"/></symbol>
  <symbol id="i-belgi" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></symbol>
  <symbol id="i-belgi-doira" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.2 2.4 2.4 4.8-5"/></symbol>
  <symbol id="i-ogoh" viewBox="0 0 24 24"><path d="m21.4 17.6-7.6-13.3a2.1 2.1 0 0 0-3.6 0L2.6 17.6A2.1 2.1 0 0 0 4.4 21h15.2a2.1 2.1 0 0 0 1.8-3.4z"/><path d="M12 9.5v4M12 17.3h.01"/></symbol>
  <symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.8h.01"/></symbol>
  <symbol id="i-hujjat" viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/></symbol>
  <symbol id="i-printer" viewBox="0 0 24 24"><path d="M6.5 8V3.5h11V8M6.5 17H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1.5"/><rect x="6.5" y="14.5" width="11" height="6"/></symbol>
  <symbol id="i-ulashish" viewBox="0 0 24 24"><circle cx="6" cy="12" r="2.6"/><circle cx="17.5" cy="5.5" r="2.6"/><circle cx="17.5" cy="18.5" r="2.6"/><path d="m8.4 10.7 6.8-4M8.4 13.3l6.8 4"/></symbol>
  <symbol id="i-kamera" viewBox="0 0 24 24"><path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/></symbol>
  <symbol id="i-kvadrat3d" viewBox="0 0 24 24"><path d="M12 3 4 7.5v9L12 21l8-4.5v-9z"/><path d="M4 7.5 12 12l8-4.5M12 12v9"/></symbol>
  <symbol id="i-qavat" viewBox="0 0 24 24"><path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/><path d="m3 17.5 9 5 9-5" opacity=".45"/></symbol>
  <symbol id="i-yer" viewBox="0 0 24 24"><path d="M3.5 20.5 8 5l4.5 3.5L17 4l3.5 16.5z"/><path d="M8.5 14.5h7"/></symbol>
  <symbol id="i-vazifa" viewBox="0 0 24 24"><path d="M3.5 8.5 12 4l8.5 4.5v7L12 20l-8.5-4.5z"/><path d="m8.6 11.4 2.4 2.4 4.4-4.7"/></symbol>
  <symbol id="i-monitor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="13" rx="2.5"/><path d="M8.5 20.5h7M12 17v3.5"/><path d="m7 11 2-2.5 2.5 3 2-4 2.5 3.5"/></symbol>
  <symbol id="i-ekran" viewBox="0 0 24 24"><rect x="3" y="4.5" width="18" height="12.5" rx="2.5"/><path d="M8.5 21h7M12 17v4"/></symbol>
  <symbol id="i-wifi" viewBox="0 0 24 24"><path d="M3 9.5a14 14 0 0 1 18 0M6.2 13a9.5 9.5 0 0 1 11.6 0M9.4 16.4a5 5 0 0 1 5.2 0"/><circle cx="12" cy="19.3" r="1.3" fill="currentColor" stroke="none"/></symbol>
  <symbol id="i-strelka" viewBox="0 0 24 24"><path d="M4.5 12h15M13.5 6l6 6-6 6"/></symbol>
  <symbol id="i-qulf" viewBox="0 0 24 24"><rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3M12 14.5v2.5"/></symbol>
  <symbol id="i-qalqon" viewBox="0 0 24 24"><path d="M12 21.5c4.2-1.4 7.5-4 7.5-8.8V6.2L12 3 4.5 6.2v6.5c0 4.8 3.3 7.4 7.5 8.8z"/><path d="m8.8 11.8 2.3 2.3 4.1-4.4"/></symbol>
  <symbol id="i-xatcho" viewBox="0 0 24 24"><path d="M17.5 21 12 17l-5.5 4V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2z"/></symbol>
  <symbol id="i-kengay" viewBox="0 0 24 24"><path d="M14.5 3.5h6v6M9.5 20.5h-6v-6M20.5 3.5 14 10M3.5 20.5 10 14"/></symbol>
  <symbol id="i-energiya" viewBox="0 0 24 24"><path d="M13 2.5 4.5 13.5h6L11 21.5l8.5-11h-6z"/></symbol>
  <symbol id="i-servis" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"/></symbol>
  <symbol id="i-topshiriq" viewBox="0 0 24 24"><path d="M8.5 6h12M8.5 12h12M8.5 18h12M3.5 6h.01M3.5 12h.01M3.5 18h.01"/></symbol>
  <symbol id="i-tashrif" viewBox="0 0 24 24"><path d="M9.5 3.5h-3a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h3"/><path d="m13.5 8 4 4-4 4"/><path d="M17.5 12h-9"/></symbol>
  <defs>
    <!-- Chuqurlik tizimi — grafik/diagramma/statistika elementlari uchun premium 3D gradient/filtrlar.
         Barcha sahifalar shu bir manbadan foydalanadi (bar/donut/halqa/chiziq grafiklar). -->
    <linearGradient id="grad-bar-3d" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#9FE332"/>
      <stop offset=".55" stop-color="#78C802"/>
      <stop offset="1" stop-color="#4C8600"/>
    </linearGradient>
    <linearGradient id="grad-bar-3d-passiv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#E9F4D3"/>
      <stop offset=".55" stop-color="#D8ECC0"/>
      <stop offset="1" stop-color="#BFDD9C"/>
    </linearGradient>
    <linearGradient id="grad-area-3d" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#78C802" stop-opacity=".38"/>
      <stop offset="1" stop-color="#78C802" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="grad-ring-3d" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#A7E639"/>
      <stop offset="1" stop-color="#5C9600"/>
    </linearGradient>
    <linearGradient id="grad-ring-3d-qizil" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F0897A"/>
      <stop offset="1" stop-color="#C43C31"/>
    </linearGradient>
    <linearGradient id="grad-dark-3d" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#333A2C"/>
      <stop offset="1" stop-color="#101208"/>
    </linearGradient>
    <radialGradient id="grad-sheen" cx=".5" cy=".18" r=".55">
      <stop offset="0" stop-color="#fff" stop-opacity=".55"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="grad-ring-overlay" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".55"/>
      <stop offset=".38" stop-color="#fff" stop-opacity="0"/>
      <stop offset=".65" stop-color="#fff" stop-opacity="0"/>
      <stop offset="1" stop-color="#171A1F" stop-opacity=".22"/>
    </linearGradient>
    <filter id="depth-sm" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="1.5" stdDeviation="2" flood-color="#171A1F" flood-opacity=".22"/>
    </filter>
    <filter id="depth-md" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#171A1F" flood-opacity=".20"/>
    </filter>
  </defs>
</svg>`;

/* ---------- Rollar (RBAC) — texnik talablar §3 matritsasi asosida ---------- */
const ROL_KALIT = {"Rahbar":"rahbar","Operator":"operator","Texnik xodim":"texnik","Administrator":"admin"};
const ROL_RUXSAT = {
  admin: null, // barcha bo'limlar
  rahbar: ["panel","aktivlar","shartnomalar","xaritalar","hisobotlar","hujjatlar","bildirishnomalar","monitoring","vazifalar","yer","sotuv","arxiv","sozlamalar"],
  operator: ["panel","aktivlar","shartnomalar","xaritalar","smart-access","hujjatlar","bildirishnomalar","monitoring","hodisalar","vazifalar","yer","sotuv","arxiv","sozlamalar"],
  texnik: ["panel","aktivlar","xaritalar","monitoring","hodisalar","xonalar","yer","bildirishnomalar","sozlamalar"]
};
function rolYaroqlimi(r){
  // Object.hasOwn — prototype-chain bypass'ga qarshi ("toString", "__proto__" va h.k.)
  return typeof r === "string" && Object.hasOwn(ROL_KALIT, r);
}
function joriyRol(){
  const r = localStorage.getItem("auga-rol");
  // Yaroqsiz qiymatda eng KAM huquqli rol qaytariladi (fail-closed);
  // shell sahifalarda bundan oldinroq login'ga yo'naltirish ishlaydi.
  return rolYaroqlimi(r) ? r : "Texnik xodim";
}
function asilRol(){
  // Haqiqiy autentifikatsiya qilingan rol — "ko'rish" rejimida ham o'zgarmaydi.
  const r = localStorage.getItem("auga-asil-rol");
  return rolYaroqlimi(r) ? r : joriyRol();
}
function ruxsatlimi(sahifa){
  const royxat = ROL_RUXSAT[ROL_KALIT[joriyRol()]];
  return !royxat || royxat.includes(sahifa);
}
const FOYD_ISM = {admin:"Akmalov Laziz", rahbar:"Yusupov Botir", operator:"Nazarova Feruza", texnik:"Rustamov Sanjar"};

/* ---------- Sidebar / Topbar shablonlari ---------- */
const MENYU = [
  ["panel","index.html","i-panel","Boshqaruv paneli"],
  ["aktivlar","aktivlar.html","i-aktiv","Aktivlar"],
  ["shartnomalar","shartnomalar.html","i-shartnoma","Shartnomalar"],
  ["xaritalar","xaritalar.html","i-xarita","Xaritalar"],
  ["hisobotlar","hisobotlar.html","i-hisobot","Hisobotlar"],
  ["smart-access","smart-access.html","i-qulf","Smart Access"],
  ["hujjatlar","hujjatlar.html","i-hujjat","Hujjatlar markazi"],
  ["bildirishnomalar","bildirishnomalar.html","i-qongiroq","Bildirishnomalar"],
  ["monitoring","monitoring.html","i-monitor","Monitoring markazi"],
  ["hodisalar","hodisalar.html","i-ogoh","Hodisalar markazi"],
  ["vazifalar","vazifalar.html","i-vazifa","Vazifalar va tasdiqlar"],
  ["xonalar","xonalar.html","i-qavat","Xonalar va qavatlar"],
  ["yer","yer-maydonlari.html","i-yer","Yer maydonlari"],
  ["sotuv","sotuv.html","i-daromad","Sotuv jarayoni"],
  ["arxiv","arxiv.html","i-papka","Sotilganlar arxivi"],
  ["foydalanuvchilar","foydalanuvchilar.html","i-foyd","Foydalanuvchilar va rollar"],
  ["sozlamalar","sozlamalar.html","i-sozlama","Sozlamalar"]
];

const LOGO_SVG = `
<svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
  <path d="M18 3 31 10.2v.9L18 18.4 5 11.1v-.9z" fill="#9CDC3A"/>
  <path d="M5 11.1 18 18.4V33L5 25.7z" fill="#5FA51B"/>
  <path d="M31 11.1 18 18.4V33l13-7.3z" fill="#77C10E"/>
  <path d="m11.6 6.5 13 7.2 3.2-1.8-13-7.2z" fill="#C4EC66"/>
</svg>`;

function sidebarHTML(aktiv){
  return `
  <div class="logo"><a href="index.html" style="display:flex;align-items:center;gap:12px" aria-label="AUGA bosh sahifa">${LOGO_SVG}<span class="logo-soz">AUGA</span></a></div>
  <nav class="menyu" aria-label="Asosiy navigatsiya">
    ${MENYU.filter(([id])=>ruxsatlimi(id)).map(([id,href,ikon,nom])=>`
      <a class="m-band${id===aktiv?" aktiv":""}" href="${href}" ${id===aktiv?'aria-current="page"':""}>
        <svg class="ic"><use href="#${ikon}"/></svg><span class="yozuv">${nom}</span>
      </a>`).join("")}
  </nav>
  <div class="sidebar-past">
    <button class="yordam" data-toast="Yordam markazi: +998 71 200-00-00 · support@auga.uz">
      <svg class="ic"><use href="#i-yordam"/></svg>
      <span class="yozuv">Yordam markazi</span>
      <svg class="ic strelka"><use href="#i-ong"/></svg>
    </button>
  </div>`;
}

function topbarHTML(){
  const sarlavha = document.body.dataset.topbarSarlavha;
  const ikon = document.body.dataset.topbarIkon || "i-xarita";
  const chap = sarlavha
    ? `<div class="tb-sarlavha" style="display:flex;align-items:center;gap:14px">
         <svg class="ic" style="width:26px;height:26px;color:#17191C"><use href="#${ikon}"/></svg>
         <span style="font-size:24px;font-weight:750;letter-spacing:-.01em;color:#17191C">${sarlavha}</span>
       </div>`
    : `<div class="izlash" onclick="this.querySelector('input').focus()">
         <input type="search" id="global-izlash" placeholder="Qidirish..." aria-label="Qidirish">
         <svg class="ic"><use href="#i-izlash"/></svg>
       </div>`;
  return `
  ${chap}
  <div class="topbar-ong">
    <a class="qongiroq" href="bildirishnomalar.html" aria-label="Bildirishnomalar — yangi xabarlar bor">
      <svg class="ic"><use href="#i-qongiroq"/></svg>
      <span class="nuqta"></span>
    </a>
    <div class="holat-karta">
      <div class="h-blok">
        <svg class="ic quyosh"><use href="#i-quyosh"/></svg>
        <div class="matnlar"><b>28°C</b><span>Toshkent</span></div>
      </div>
      <div class="ajratgich"></div>
      <div class="h-blok">
        <div class="matnlar"><b>14:32</b><span>24-may, Shanba</span></div>
      </div>
      <div class="profil" id="profil-tugma" role="button" tabindex="0" style="cursor:pointer" aria-haspopup="menu" aria-expanded="false">
        <span class="avatar rol-${ROL_KALIT[joriyRol()]}" aria-hidden="true">
          <svg viewBox="0 0 34 34"><circle cx="17" cy="12" r="6.5" fill="#8B94A3"/><path d="M4 34c1.6-8 7-11.5 13-11.5S28.4 26 30 34z" fill="#8B94A3"/></svg>
        </span>
        <div class="matnlar">
          <b>${FOYD_ISM[ROL_KALIT[joriyRol()]]}</b>
          <span class="rol-yorliq rol-${ROL_KALIT[joriyRol()]}">${joriyRol()}</span>
        </div>
        <svg class="ic strelka"><use href="#i-past"/></svg>
        <div class="menyu-popover" id="profil-menyu" role="menu" style="top:calc(100% + 10px);right:0">
          <a href="sozlamalar.html"><svg class="ic"><use href="#i-foyd"/></svg>Profil ma'lumotlari</a>
          <a href="sozlamalar.html"><svg class="ic"><use href="#i-sozlama"/></svg>Sozlamalar</a>
          ${asilRol()==="Administrator" ? `
          <div class="ajrat"></div>
          <div class="popover-bolim">Foydalanuvchi ko'rinishida tekshirish</div>
          ${Object.keys(ROL_KALIT).map(r=>`
            <button type="button" data-rol-tanla="${r}"><svg class="ic"><use href="#i-foyd"/></svg>${r}
              ${r===joriyRol()?'<svg class="ic belgi"><use href="#i-belgi"/></svg>':""}
            </button>`).join("")}
          ` : ""}
          <div class="ajrat"></div>
          <a href="login.html" class="xavf" id="chiqish-havolasi"><svg class="ic"><use href="#i-chiqish"/></svg>Tizimdan chiqish</a>
        </div>
      </div>
    </div>
  </div>`;
}

/* ---------- Yordamchilar ---------- */
const AUGA = {};

AUGA.toast = function(xabar, ikon){
  let joy = document.querySelector(".toastlar");
  if (!joy){ joy = document.createElement("div"); joy.className = "toastlar"; document.body.appendChild(joy); }
  const t = document.createElement("div");
  t.className = "toast";
  t.setAttribute("role","status");
  t.innerHTML = `<svg class="ic"><use href="#${ikon||"i-belgi-doira"}"/></svg><span>${xabar}</span>`;
  joy.appendChild(t);
  setTimeout(()=>{ t.classList.add("ketmoqda"); setTimeout(()=>t.remove(), 220); }, 3200);
};

AUGA.modal = function(sarlavha, matn, opts){
  opts = opts || {};
  const fon = document.createElement("div");
  fon.className = "modal-fon";
  fon.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-label="${sarlavha}">
      <h3>${sarlavha}</h3>
      <div class="modal-matn">${matn}</div>
      <div class="modal-harakat">
        <button class="tugma tugma-chiziqli tugma-kichik" data-m-yopish>Bekor qilish</button>
        <button class="tugma ${opts.xavf?"tugma-xavf":"tugma-yashil"} tugma-kichik" data-m-ok>${opts.okMatn||"Tasdiqlash"}</button>
      </div>
    </div>`;
  document.body.appendChild(fon);
  requestAnimationFrame(()=>fon.classList.add("ochiq"));
  function yop(){ fon.classList.remove("ochiq"); setTimeout(()=>fon.remove(), 180); }
  fon.addEventListener("click", e=>{ if (e.target===fon) yop(); });
  fon.querySelector("[data-m-yopish]").addEventListener("click", yop);
  fon.querySelector("[data-m-ok]").addEventListener("click", ()=>{ yop(); if (opts.ok) opts.ok(); });
  document.addEventListener("keydown", function esc(e){ if(e.key==="Escape"){ yop(); document.removeEventListener("keydown", esc);} });
  fon.querySelector("[data-m-ok]").focus();
};

/* Umumiy popover yopish */
function hammaPopoverYop(istisno){
  document.querySelectorAll(".menyu-popover.ochiq").forEach(p=>{ if (p!==istisno) p.classList.remove("ochiq"); });
}
document.addEventListener("click", e=>{ if (!e.target.closest(".menyu-popover") && !e.target.closest("[data-popover-tugma]") && !e.target.closest("#profil-tugma")) hammaPopoverYop(); });
document.addEventListener("keydown", e=>{ if (e.key==="Escape") hammaPopoverYop(); });

/* .tanlov [data-variantlar] — dropdown */
function tanlovUla(root){
  (root||document).querySelectorAll(".tanlov[data-variantlar]").forEach(btn=>{
    if (btn.dataset.ulandi) return;
    btn.dataset.ulandi = "1";
    btn.setAttribute("data-popover-tugma","");
    btn.style.position = "relative";
    const variantlar = JSON.parse(btn.dataset.variantlar);
    const yorliq = btn.querySelector(".t-yorliq") || btn.firstChild;
    const pop = document.createElement("div");
    pop.className = "menyu-popover";
    pop.style.cssText = "top:calc(100% + 8px);left:0;right:auto;min-width:100%";
    pop.innerHTML = variantlar.map(v=>`<button type="button" data-v="${v}"><span>${v}</span></button>`).join("");
    btn.appendChild(pop);
    /* Oyna o'ng chekkasidagi tanlovda ro'yxat vyuportdan chiqib ketardi — yopiq holatda
       ham (opacity:0 layoutni egallaydi) gorizontal skroll hosil qilardi. Sig'masa
       chapga emas, o'ng chekkaga tekislanadi. */
    const joylashtir = ()=>{
      pop.style.left = "0"; pop.style.right = "auto";
      if (pop.getBoundingClientRect().right > document.documentElement.clientWidth - 8){
        pop.style.left = "auto"; pop.style.right = "0";
      }
    };
    joylashtir();
    // Shrift (Onest) kech yuklanadi va matn kengayadi — o'lchashni qayta bajarish shart.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(joylashtir);
    window.addEventListener("resize", joylashtir);
    btn.addEventListener("click", e=>{
      if (e.target.closest(".menyu-popover")) return;
      const ochiqmi = pop.classList.contains("ochiq");
      hammaPopoverYop();
      if (!ochiqmi){ joylashtir(); pop.classList.add("ochiq"); }
    });
    pop.querySelectorAll("button").forEach(v=>{
      v.addEventListener("click", ()=>{
        const qiymat = v.dataset.v;
        if (yorliq && yorliq.nodeType===3) btn.childNodes[0].nodeValue = qiymat;
        else if (yorliq) yorliq.textContent = qiymat;
        btn.classList.add("tanlandi");
        pop.querySelectorAll("button").forEach(b=>b.innerHTML=`<span>${b.dataset.v}</span>`);
        v.innerHTML = `<span>${qiymat}</span><svg class="ic belgi"><use href="#i-belgi"/></svg>`;
        pop.classList.remove("ochiq");
        btn.dispatchEvent(new CustomEvent("tanlov",{detail:qiymat,bubbles:true}));
      });
    });
  });
}
AUGA.tanlovUla = tanlovUla;

/* ---------- Ishga tushirish ---------- */
document.addEventListener("DOMContentLoaded", ()=>{
  // Ikonkalar
  const wrap = document.createElement("div");
  wrap.innerHTML = IKONLAR;
  document.body.prepend(wrap.firstElementChild);

  // Shell
  const sb = document.querySelector("[data-shell-sidebar]");

  // Autentifikatsiya: shell sahifalarida yaroqli rol bo'lmasa — login'ga
  // (fail-closed; login.html da shell yo'q, shuning uchun tsikl bo'lmaydi)
  if (sb && !rolYaroqlimi(localStorage.getItem("auga-rol"))){
    location.replace("login.html");
    return;
  }
  if (sb){
    sb.innerHTML = sidebarHTML(document.body.dataset.sahifa||"");
    sb.classList.add("rol-"+ROL_KALIT[joriyRol()]);
  }
  const tb = document.querySelector("[data-shell-topbar]");
  if (tb) tb.innerHTML = topbarHTML();

  // Profil menyu
  const pt = document.getElementById("profil-tugma");
  if (pt){
    const pm = document.getElementById("profil-menyu");
    pt.addEventListener("click", e=>{
      if (e.target.closest(".menyu-popover")) return;
      const ochiqmi = pm.classList.contains("ochiq");
      hammaPopoverYop();
      pm.classList.toggle("ochiq", !ochiqmi);
      pt.setAttribute("aria-expanded", String(!ochiqmi));
    });
    // Foydalanuvchi ko'rinishida tekshirish — faqat asl rol Administrator bo'lganda
    pm.querySelectorAll("[data-rol-tanla]").forEach(b=>{
      b.addEventListener("click", e=>{
        e.stopPropagation();
        localStorage.setItem("auga-rol", b.dataset.rolTanla);
        location.reload();
      });
    });
    const chiqish = document.getElementById("chiqish-havolasi");
    if (chiqish) chiqish.addEventListener("click", ()=>{
      localStorage.removeItem("auga-rol");
      localStorage.removeItem("auga-asil-rol");
    });
  }

  // RBAC qo'riqchisi: joriy rol uchun taqiqlangan sahifada 403 holati
  // Eslatma: mavjud elementlarni O'CHIRMAYMIZ, yashiramiz — sahifaning o'z
  // skriptlari getElementById bilan ishlashda xato bermasligi uchun.
  const sahifa = document.body.dataset.sahifa;
  // data-rol-yoq — bo'lim ruxsati YETARLI bo'lgan, lekin rol uchun baribir taqiqlangan
  // sahifalar uchun (masalan Rahbar monitoringni ko'radi, lekin qurilma o'rnatolmaydi).
  const rolKal = ROL_KALIT[joriyRol()];
  const sahifaTaqiq = (document.body.dataset.rolYoq || "").split(/\s+/).includes(rolKal);
  if (sahifa && sb && (!ruxsatlimi(sahifa) || sahifaTaqiq)){
    const kontent = document.querySelector(".kontent");
    if (kontent){
      document.title = "AUGA — Ruxsat yetarli emas";
      [...kontent.children].forEach(el=>{ el.style.display = "none"; });
      const taqiq = document.createElement("div");
      kontent.appendChild(taqiq);
      taqiq.outerHTML = `
        <div style="display:grid;place-items:center;min-height:calc(100vh - 200px)">
          <div style="text-align:center;max-width:460px">
            <img src="assets/st_ruxsat.png" alt="" style="width:230px;margin:0 auto 6px">
            <span style="display:inline-block;background:#FFF3D6;color:#B07C08;font-size:12px;font-weight:700;border-radius:99px;padding:5px 14px">Ruxsat rad etildi · 403</span>
            <h2 style="font-size:26px;font-weight:750;margin-top:14px">Ruxsat yetarli emas</h2>
            <p style="font-size:14.5px;color:#5F6A5C;line-height:1.6;margin-top:10px">
              Ushbu bo'limni ochish uchun <b>${joriyRol()}</b> rolida kerakli ruxsatlar mavjud emas.
              Administrator bilan bog'laning yoki boshqa rol bilan kiring.
            </p>
            <div style="display:flex;gap:10px;justify-content:center;margin-top:22px">
              <a class="tugma tugma-yashil" href="index.html"><svg class="ic"><use href="#i-uy"/></svg>Bosh sahifaga qaytish</a>
              <button class="tugma tugma-chiziqli" onclick="document.getElementById('profil-tugma').click()">Rolni almashtirish</button>
            </div>
          </div>
        </div>`;
    }
  }

  // Global qidiruv → aktivlar sahifasi
  const gi = document.getElementById("global-izlash");
  if (gi){
    gi.addEventListener("keydown", e=>{
      if (e.key==="Enter" && gi.value.trim()){
        location.href = "aktivlar.html?qidiruv="+encodeURIComponent(gi.value.trim());
      }
    });
  }

  // Bo'lim ruxsatiga bog'liq boshqaruv elementlari. Sahifa qo'riqchisi faqat SAHIFA
  // darajasida ishlaydi; rol kira olmaydigan bo'limga havola qiluvchi tugma esa 403
  // ga olib boruvchi o'lik yo'l bo'lib qolardi. Yashiriladi (o'chirilmaydi) — sahifa
  // init-skriptlari elementni topa olishi kerak.
  // Bir martalik querySelectorAll yetarli emas: sahifalar ro'yxat/panellarni init'dan
  // KEYIN qayta render qiladi va yangi tugunlar tekshiruvdan o'tmay qolardi. Shu sababli
  // uslub qoidasi qo'yiladi — u qachon yaratilishidan qat'i nazar hamma tugunga tegadi.
  const taqiqlangan = MENYU.map(([id])=>id).filter(id=>!ruxsatlimi(id));
  const qoidalar = taqiqlangan.map(id=>`[data-ruxsat="${id}"]{display:none!important}`);
  // Bo'lim ochiq bo'lsa ham AMAL taqiqlanishi mumkin — bunda data-ruxsat yaramaydi.
  // :not(body) — body'ning o'zida bu atribut sahifa darajasidagi taqiq uchun ishlatiladi.
  qoidalar.push(`[data-rol-yoq~="${ROL_KALIT[joriyRol()]}"]:not(body){display:none!important}`);
  const st = document.createElement("style");
  st.textContent = qoidalar.join("");
  document.head.appendChild(st);

  // data-toast tugmalar
  document.body.addEventListener("click", e=>{
    const t = e.target.closest("[data-toast]");
    if (t){ AUGA.toast(t.dataset.toast); }
  });

  tanlovUla();
});

AUGA.ruxsatlimi = ruxsatlimi;
AUGA.joriyRol = joriyRol;
AUGA.asilRol = asilRol;
AUGA.rolKaliti = () => ROL_KALIT[joriyRol()];
AUGA.foydIsmi = () => FOYD_ISM[ROL_KALIT[joriyRol()]];
window.AUGA = AUGA;
})();
