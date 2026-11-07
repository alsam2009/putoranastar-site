/* Накомякен — общие блоки и логика прототипа (шапка, футер, чат-рыбак, формы). Прототип: данные в localStorage, на сайте заменяется на API. */
(function () {
  "use strict";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Иконки (inline SVG, без внешних шрифтов) ---------- */
  var ICONS =
    '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
    '<symbol id="i-fish" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 12c0-3 3-5 6.5-5 4 0 7 2.2 8.5 5-1.5 2.8-4.5 5-8.5 5-3.5 0-6.5-2-6.5-5z"/><path d="M6.5 12L3 8.5v7L6.5 12z"/><circle cx="16" cy="10.8" r="0.9" fill="currentColor" stroke="none"/></symbol>' +
    '<symbol id="i-users" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c0.6-3 2.8-4.5 5.5-4.5s4.9 1.5 5.5 4.5"/><circle cx="16.5" cy="9" r="2.6"/><path d="M15.8 14.7c2.2 0.3 3.9 1.7 4.6 4.3"/></symbol>' +
    '<symbol id="i-calendar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 9.5h17M8 3v3.5M16 3v3.5"/></symbol>' +
    '<symbol id="i-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15M13 6l6 6-6 6"/></symbol>' +
    '<symbol id="i-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5.5l7 6 7-6M5 12.5l7 6 7-6"/></symbol>' +
    '<symbol id="i-house" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11l8-6.5L20 11"/><path d="M6 9.5V20h12V9.5"/><path d="M10.5 20v-5h3v5"/></symbol>' +
    '<symbol id="i-utensils" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3.5v17M4.5 3.5v4a2.5 2.5 0 005 0v-4"/><path d="M16.5 3.5c-1.7 1.5-2.5 4-2.5 6.5 0 2 1 3 2.5 3v7.5"/></symbol>' +
    '<symbol id="i-fire" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5c1 2.5-0.5 4-1.5 5.5C9.5 10.5 9 11.5 9 13a3 3 0 006 0c0-1-0.4-1.8-1-2.5 2 0.8 4 3 4 5.5a6 6 0 01-12 0c0-4.5 3.5-8 6-12.5z"/></symbol>' +
    '<symbol id="i-wifi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5C6 7.8 8.9 7 12 7s6 0.8 8 2.5"/><path d="M6.5 12.8c1.5-1.1 3.3-1.8 5.5-1.8s4 0.7 5.5 1.8"/><path d="M9.3 16c0.8-0.6 1.7-1 2.7-1s1.9 0.4 2.7 1"/><circle cx="12" cy="19" r="1.2" fill="currentColor" stroke="none"/></symbol>' +
    '<symbol id="i-boat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13h18l-2.5 5.5a2 2 0 01-1.8 1H7.3a2 2 0 01-1.8-1L3 13z"/><path d="M12 13V4l6 9"/><path d="M8.5 13V9.5h6V13"/></symbol>' +
    '<symbol id="i-compass" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5l-2.2 5-5 2.2 2.2-5 5-2.2z"/></symbol>' +
    '<symbol id="i-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.1 7-11a7 7 0 10-14 0c0 4.9 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></symbol>' +
    '<symbol id="i-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></symbol>' +
    '<symbol id="i-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></symbol>' +
    '<symbol id="i-list" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M4 12h16M4 17h16"/></symbol>' +
    '<symbol id="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M8 12.5l2.8 2.8L16.5 9"/></symbol>' +
    '<symbol id="i-send" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 3L10 14M21 3l-7 18-4-7-7-4 18-7z"/></symbol>' +
    '<symbol id="i-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l1.5 4.5L8 10c1 2.5 3.5 5 6 6l1.5-2.5L20 15v4a1.5 1.5 0 01-1.7 1.5C10 19.6 4.4 14 3.5 5.7A1.5 1.5 0 015 4z"/></symbol>' +
    '<symbol id="i-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M4 7l8 6 8-6"/></symbol>' +
    '<symbol id="i-wa" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5a8.5 8.5 0 00-7.3 12.8L3.5 20.5l4.4-1.1A8.5 8.5 0 1012 3.5z"/><path d="M9.3 8.2c0.6-0.3 1 0.3 1.3 1 0.2 0.5-0.2 1-0.6 1.4 0.5 1.2 1.6 2.3 2.8 2.8 0.4-0.4 0.9-0.8 1.4-0.6 0.7 0.3 1.3 0.7 1 1.3-0.4 0.9-1.5 1.4-2.4 1.1-2.4-0.7-4.9-3.2-5.6-5.6-0.3-0.9 0.2-2 1.1-2.4z"/></symbol>' +
    '<symbol id="i-tg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M7.5 11.8l9-3.6-2.3 8.3-2.9-2.3-1.6 1.6-0.4-2.7-1.8-1.3z"/></symbol>' +
    '<symbol id="i-ig" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.4"/><circle cx="16.8" cy="7.2" r="0.9" fill="currentColor" stroke="none"/></symbol>' +
    '<symbol id="i-play" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M8.5 6.2l11 5.8-11 5.8V6.2z"/></symbol>' +
    '<symbol id="i-camera" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8.5A2.5 2.5 0 016.5 6h1.6l1.4-2h5l1.4 2h1.6A2.5 2.5 0 0120 8.5v9A2.5 2.5 0 0117.5 20h-11A2.5 2.5 0 014 17.5v-9z"/><circle cx="12" cy="12.5" r="3.4"/></symbol>' +
    '<symbol id="i-mountain" viewBox="0 0 64 36" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 31L12 18l5 5 6-8 10-13 8 12 5-3 7 8 6 12"/><path d="M33 2l-3 18M33 2l4 16M12 18l3 8M23 15l2 9M41 14l3 11M46 11l2 11" opacity=".85"/><path d="M7 25l3 2M37 8l4-2" opacity=".5"/></symbol>' +
    "</defs></svg>";
  document.body.insertAdjacentHTML("afterbegin", ICONS);
  function icon(name, cls) { return '<svg class="ic ' + (cls || "") + '" aria-hidden="true"><use href="#i-' + name + '"/></svg>'; }

  /* ---------- Шапка и навигация как на старом сайте ---------- */
  var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  function nav(href, label, match) {
    var cur = (match || href).split("#")[0].toLowerCase();
    var active = page === cur || (cur === "index.html" && (page === "" || page === "index.html") && href.indexOf("#") > -1 && location.hash === href.split("#")[1] ? ' aria-current="page"' : "");
    return '<a href="' + href + '"' + active + ' class="nav-link">' + label + "</a>";
  }
  var header =
    '<header class="fixed top-4 inset-x-0 z-50 flex justify-center px-4">' +
    '<nav class="flex items-center gap-3 lg:gap-4 rounded-full whitespace-nowrap bg-ink-900/70 backdrop-blur-md border border-white/10 pl-5 pr-2 py-2" aria-label="Главная навигация">' +
    '<a href="index.html" class="flex items-center gap-4" aria-label="Накомякен, на главную">' +
      '<svg class="text-ink-gold" style="width:58px;height:32px" viewBox="0 0 64 36" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#i-mountain"/></svg>' +
      '<span class="hidden sm:block w-px h-8 bg-white/55" aria-hidden="true"></span>' +
      '<span class="hidden sm:block text-fog-1 uppercase" style="font-size:13px;line-height:16px;font-weight:500;letter-spacing:.42em">НАКОМЯКЕН</span></a>' +
    '<div class="hidden xl:flex items-center gap-7">' +
    nav("index.html", "Главная", "index.html") +
    nav("o-nas.html", "О нас") +
    nav("index.html#raspisanie", "Расписание", "index.html") +
    '<div class="relative group">' +
    '<button type="button" class="nav-link flex items-center gap-1">Программы <svg class="ic transition-transform duration-300 group-hover:rotate-180" style="width:.9em;height:.9em"><use href="#i-caret"/></svg></button>' +
    '<div class="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300" style="transition-timing-function:var(--ease-base)">' +
    '<div class="w-72 rounded-2xl bg-ink-900/95 backdrop-blur border border-white/10 p-2 shadow-2xl">' +
    '<a href="tur-letniy.html" class="block px-4 py-3 rounded-xl hover:bg-white/5"><span class="title-4 text-fog-1 block">Летняя рыбалка</span><span class="caption-5 text-fog-3">флагман, 5 июля — 20 сентября</span></a>' +
    '<a href="tur-zimnyy.html" class="block px-4 py-3 rounded-xl hover:bg-white/5"><span class="title-4 text-fog-1 block">Снегоходы и зимняя рыбалка</span><span class="caption-5 text-fog-3">1 апреля — 10 мая</span></a>' +
    '<a href="tur-vertolyot.html" class="block px-4 py-3 rounded-xl hover:bg-white/5"><span class="title-4 text-fog-1 block">Вертолётные экскурсии</span><span class="caption-5 text-fog-3">водопады, 1 июня — 20 сентября</span></a>' +
    "</div></div></div>" +
    nav("novosti.html", "Новости") +
    nav("galereya.html", "Фотогалерея") +
    nav("video.html", "Видео") +
    nav("mesto.html", "Местоположение") +
    nav("kontakty.html", "Контакты") +
    "</div>" +
    '<a href="#order" class="btn btn-primary button-sm px-3 py-2 hidden md:inline-flex">' + icon("send") + "Оставить заявку</a>" +
    '<button id="burger" class="xl:hidden w-10 h-10 rounded-full border border-white/15 text-fog-1" aria-label="Открыть меню" aria-expanded="false">' + icon("list", "text-xl") + "</button>" +
    "</nav></header>" +
    '<div id="mobile-menu" class="fixed inset-0 z-[60] hidden bg-ink-900/95 backdrop-blur-xl">' +
    '<div class="flex justify-end p-6"><button id="burger-close" class="w-10 h-10 rounded-full border border-white/15 text-fog-1" aria-label="Закрыть меню">' + icon("x", "text-xl") + "</button></div>" +
    '<nav class="flex flex-col items-center gap-6 mt-6" aria-label="Мобильная навигация">' +
    '<a href="index.html" class="mm-link heading-4 text-fog-1">Главная</a>' +
    '<a href="o-nas.html" class="mm-link heading-4 text-fog-1">О нас</a>' +
    '<a href="index.html#raspisanie" class="mm-link heading-4 text-fog-1">Расписание 2026</a>' +
    '<a href="tur-letniy.html" class="mm-link heading-4 text-fog-1">Летняя рыбалка</a>' +
    '<a href="tur-zimnyy.html" class="mm-link heading-4 text-fog-1">Снегоходы и зимняя рыбалка</a>' +
    '<a href="tur-vertolyot.html" class="mm-link heading-4 text-fog-1">Вертолётные экскурсии</a>' +
    '<a href="novosti.html" class="mm-link heading-4 text-fog-1">Новости</a>' +
    '<a href="galereya.html" class="mm-link heading-4 text-fog-1">Фотогалерея</a>' +
    '<a href="video.html" class="mm-link heading-4 text-fog-1">Видео</a>' +
    '<a href="mesto.html" class="mm-link heading-4 text-fog-1">Местоположение</a>' +
    '<a href="kontakty.html" class="mm-link heading-4 text-fog-1">Контакты</a>' +
    '<a href="#order" class="mm-link btn btn-primary button-md px-6 py-3 mt-2">Оставить заявку</a>' +
    "</nav></div>";

  /* ---------- Футер ---------- */
  var footer =
    '<footer id="contacts" class="border-t border-white/10 bg-ink-950 mt-0">' +
    '<div class="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">' +
    '<div><div class="flex items-center gap-4">' +
      '<svg class="text-ink-gold" style="width:48px;height:27px" viewBox="0 0 64 36" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#i-mountain"/></svg>' +
      '<span class="w-px h-7 bg-white/55" aria-hidden="true"></span>' +
      '<span class="text-fog-1 uppercase" style="font-size:12px;line-height:16px;font-weight:500;letter-spacing:.4em">НАКОМЯКЕН</span></div>' +
    '<p class="caption-2 text-fog-3 mt-4 max-w-[40ch]">База отдыха на плато Путорана. Одна группа за раз, рыбалка, на которую приезжают годами.</p></div>' +
    '<div><h3 class="caption-3 tracking-[0.25em] uppercase text-fog-3">Туры</h3><ul class="mt-4 space-y-3 body-6">' +
    '<li><a href="tur-letniy.html" class="text-fog-2 hover:text-ink-gold">Летняя рыбалка</a></li>' +
    '<li><a href="tur-zimnyy.html" class="text-fog-2 hover:text-ink-gold">Снегоходы и зимняя рыбалка</a></li>' +
    '<li><a href="tur-vertolyot.html" class="text-fog-2 hover:text-ink-gold">Вертолётные экскурсии</a></li></ul></div>' +
    '<div><h3 class="caption-3 tracking-[0.25em] uppercase text-fog-3">Информация</h3><ul class="mt-4 space-y-3 body-6">' +
    '<li><a href="o-nas.html" class="text-fog-2 hover:text-ink-gold">О нас</a></li>' +
    '<li><a href="index.html#raspisanie" class="text-fog-2 hover:text-ink-gold">Расписание 2026</a></li>' +
    '<li><a href="novosti.html" class="text-fog-2 hover:text-ink-gold">Новости</a></li>' +
    '<li><a href="galereya.html" class="text-fog-2 hover:text-ink-gold">Фотогалерея</a></li>' +
    '<li><a href="mesto.html" class="text-fog-2 hover:text-ink-gold">Местоположение</a></li></ul></div>' +
    '<div><h3 class="caption-3 tracking-[0.25em] uppercase text-fog-3">Контакты</h3><ul class="mt-4 space-y-3 body-6">' +
    '<li><a href="tel:+79313568107" class="flex items-center gap-2 text-fog-2 hover:text-ink-gold">' + icon("phone", "text-ink-gold") + "+7 931 356-81-07</a></li>" +
    '<li><a href="https://wa.me/79313568107" class="flex items-center gap-2 text-fog-2 hover:text-ink-gold">' + icon("wa", "text-ink-gold") + "WhatsApp</a></li>" +
    '<li><a href="mailto:352952@rambler.ru" class="flex items-center gap-2 text-fog-2 hover:text-ink-gold">' + icon("mail", "text-ink-gold") + "352952@rambler.ru</a></li>" +
    '<li><a href="https://www.instagram.com/putoranastar/" class="flex items-center gap-2 text-fog-2 hover:text-ink-gold">' + icon("ig", "text-ink-gold") + "Instagram</a></li></ul></div></div>" +
    '<div class="border-t border-white/10"><div class="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row gap-3 items-center justify-between">' +
    '<p class="caption-5 text-fog-3">© База отдыха «Накомякен». Все права защищены.</p>' +
    '<div class="flex gap-6"><button type="button" id="open-consent" class="caption-5 text-fog-3 hover:text-ink-gold">Политика обработки персональных данных</button>' +
    '<a href="#order" class="caption-5 text-fog-3 hover:text-ink-gold">Оставить заявку</a></div></div></div></footer>';

  /* ---------- Модалка согласия (текст с действующего сайта) ---------- */
  var consent =
    '<div id="consent-modal" class="fixed inset-0 z-[80] hidden items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="consent-title">' +
    '<div class="absolute inset-0 bg-black/70" data-close-consent></div>' +
    '<div class="relative rounded-2xl border border-white/10 bg-ink-800 max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8">' +
    '<div class="flex items-start justify-between gap-4"><h2 id="consent-title" class="heading-6">Соглашение об обработке персональных данных</h2>' +
    '<button class="w-9 h-9 rounded-full border border-white/15 text-fog-2" data-close-consent aria-label="Закрыть">' + icon("x") + "</button></div>" +
    '<div class="mt-6 space-y-4 caption-2 text-fog-2">' +
    "<p>Присоединяясь к настоящему Соглашению и оставляя свои данные на Сайте базы отдыха «Накомякен» (далее Сайт), путём заполнения полей форм обратной связи Пользователь:</p>" +
    '<ul class="list-disc pl-5 space-y-2"><li>подтверждает, что все указанные им данные принадлежат лично ему;</li><li>подтверждает, что внимательно и в полном объёме ознакомлен с Соглашением, текст и условия обработки персональных данных ему понятны;</li><li>даёт согласие на обработку Сайтом персональных данных в целях заключения и исполнения настоящего Соглашения;</li><li>выражает согласие с условиями обработки персональных данных без оговорок и ограничений.</li></ul>' +
    "<p>Пользователь даёт согласие на обработку персональных данных, а именно совершение действий, предусмотренных п. 3 ч. 1 ст. 3 Федерального закона от 27.07.2006 N 152-ФЗ «О персональных данных», и подтверждает, что даёт такое согласие свободно, своей волей и в своём интересе.</p>" +
    "<p>Обрабатываются: имя; номер телефона; адрес электронной почты (E-mail); содержание сообщения.</p>" +
    "<p>Оператор вправе осуществлять: сбор и накопление; хранение в течение установленных нормативными документами сроков, но не менее трёх лет с момента прекращения пользования услугами Пользователя; уточнение (обновление, изменение); использование; уничтожение; обезличивание; передачу по требованию суда третьим лицам с соблюдением мер защиты от несанкционированного доступа.</p>" +
    "<p>Согласие действует бессрочно с момента предоставления данных и может быть отозвано заявлением администрации сайта. Отзыв согласия направляется на контактный адрес электронной почты, указанный на Сайте.</p>" +
    "<p>К настоящему Соглашению и отношениям между пользователем и Сайтом применяется право Российской Федерации.</p></div></div></div>";

  /* ---------- Cookie ---------- */
  var cookie =
    '<div id="cookie-bar" class="fixed bottom-4 left-4 z-[70] hidden max-w-xs rounded-2xl border border-white/10 bg-ink-800/95 backdrop-blur p-4">' +
    '<p class="caption-2 text-fog-2">Мы используем cookie и Яндекс.Метрику, чтобы сайт был полезнее.</p>' +
    '<button id="cookie-ok" class="btn btn-outline button-sm px-4 py-2 mt-3">Хорошо</button></div>';

  /* ---------- Чат: рыбак со спиннингом ---------- */
  var fishermanSvg =
    '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M7 52.5c3.2-1.8 6.4-1.8 9.6 0s6.4 1.8 9.6 0 6.4-1.8 9.6 0 6.4 1.8 9.6 0 6.4-1.8 9.6 0" opacity=".5"/>' +
    '<g class="fisher-rod">' +
    '<path d="M33.5 28C42.5 22 50 15.5 55 10" stroke-width="2.8"/>' +
    '<circle cx="36.2" cy="26.6" r="2" stroke-width="1.8"/>' +
    '<circle cx="25.5" cy="15.5" r="4.8"/>' +
    '<path d="M19.8 14.2c1.8-3.4 6.2-4.9 9.9-3.2 1.4.6 2.4 1.6 3 2.8l1.6.4" stroke-width="2"/>' +
    '<path d="M25.4 20.4c-1.3 4.2-1.7 8.8-1.1 13.6l.7 6.4" stroke-width="2.6"/>' +
    '<path d="M25.6 34.4l-2.6 6.4M26.4 34.8l2.4 6" stroke-width="2.4"/>' +
    '<path d="M25.6 23.5c2.9.9 5.4 2.4 7.9 4.5M25.8 27.2c2.7.4 5.2 1.2 7.7 2.2" stroke-width="2"/>' +
    "</g>" +
    '<g class="fisher-line">' +
    '<path d="M55 10c2.4 9.5 1.4 20.5-2.4 31.5-.6 1.7-1.3 3.4-2.1 5" stroke-width="1.1" opacity=".75"/>' +
    '<circle cx="50.5" cy="48.5" r="2.2" fill="currentColor" stroke="none"/>' +
    "</g>" +
    '<g class="fisher-fish"><path d="M41.5 44.5c2-3.4 6-5 9.6-3.7-.5 2.4-2.1 4.2-4.2 5.2 2.1 1 3.7 2.9 4.2 5.2-3.6 1.3-7.6-.3-9.6-3.7l-3.9-1.5 3.9-1.5z" fill="currentColor" stroke="none"/></g>' +
    '<circle class="fisher-ring" cx="50.5" cy="51" r="6.5" stroke-width="1.3"/>' +
    "</svg>";
  var chat =
    '<button id="chat-open" class="chat-fab fixed bottom-4 right-4 z-[70] flex items-center justify-center" aria-label="Открыть чат с гидом Евгением">' +
    fishermanSvg + '<span class="bite-dot" aria-hidden="true"></span></button>' +
    '<div id="chat-panel" class="fixed bottom-4 right-4 z-[75] hidden w-[min(380px,calc(100vw-2rem))] rounded-2xl border border-white/10 bg-ink-800/95 backdrop-blur overflow-hidden" role="dialog" aria-label="Чат с гидом Евгением">' +
    '<div class="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-ink-900">' +
    '<span class="w-9 h-9 rounded-full bg-ink-gold/15 border border-ink-gold/40 text-ink-gold title-3 flex items-center justify-center" aria-hidden="true">Е</span>' +
    '<div class="flex-1"><p class="title-4 text-fog-1">Евгений</p><p class="caption-5 text-fog-3 flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" aria-hidden="true"></span>гид базы, на связи</p></div>' +
    '<button id="chat-close" class="w-8 h-8 rounded-full border border-white/15 text-fog-2" aria-label="Закрыть чат">' + icon("x") + "</button></div>" +
    '<div id="chat-log" class="h-72 overflow-y-auto p-4 space-y-3" aria-live="polite"></div>' +
    '<div id="chat-chips" class="px-4 pb-2 flex flex-wrap gap-2"></div>' +
    '<form id="chat-form" class="flex items-center gap-2 p-3 border-t border-white/10">' +
    '<input id="chat-input" type="text" placeholder="Спросите про цены, даты, дорогу..." class="flex-1 h-10 rounded-full bg-ink-700 border border-white/10 px-4 body-6 text-fog-1 placeholder:text-fog-3" aria-label="Сообщение Евгению">' +
    '<button type="submit" class="w-10 h-10 rounded-full bg-ink-gold text-ink-ember flex items-center justify-center" aria-label="Отправить">' + icon("send") + "</button></form></div>";

  document.getElementById("shared-top").insertAdjacentHTML("beforeend", header);
  document.getElementById("shared-end").insertAdjacentHTML("beforeend", footer + consent + cookie + chat);

  /* ---------- Меню ---------- */
  var burger = document.getElementById("burger"), mm = document.getElementById("mobile-menu");
  function openMenu() {
    mm.classList.remove("hidden"); burger.setAttribute("aria-expanded", "true"); document.body.style.overflow = "hidden";
    mm.querySelectorAll(".mm-link").forEach(function (el, i) {
      el.style.opacity = "0"; el.style.transform = "translateY(24px)";
      setTimeout(function () { el.style.transition = "opacity .5s var(--ease-base), transform .5s var(--ease-base)"; el.style.opacity = "1"; el.style.transform = "none"; }, reduceMotion ? 0 : 60 + i * 55);
    });
  }
  function closeMenu() { mm.classList.add("hidden"); burger.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; }
  burger.addEventListener("click", openMenu);
  document.getElementById("burger-close").addEventListener("click", closeMenu);
  mm.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });

  /* ---------- Reveal + tagline ---------- */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  document.querySelectorAll("[data-tagline]").forEach(function (tag) {
    var words = tag.textContent.trim().split(/\s+/); tag.textContent = "";
    words.forEach(function (w, i) {
      var s = document.createElement("span"); s.className = "tw"; s.textContent = w; tag.appendChild(s);
      if (i < words.length - 1) tag.appendChild(document.createTextNode(" "));
    });
    var ioW = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) {
        tag.querySelectorAll(".tw").forEach(function (s, i) {
          if (reduceMotion) { s.classList.add("on"); } else { setTimeout(function () { s.classList.add("on"); }, i * 90); }
        });
        ioW.disconnect();
      } });
    }, { threshold: 0.4 });
    ioW.observe(tag);
  });

  /* ---------- Согласие ---------- */
  var modal = document.getElementById("consent-modal");
  function openConsent() { modal.classList.remove("hidden"); modal.classList.add("flex"); }
  function closeConsent() { modal.classList.add("hidden"); modal.classList.remove("flex"); }
  document.getElementById("open-consent").addEventListener("click", openConsent);
  modal.querySelectorAll("[data-close-consent]").forEach(function (el) { el.addEventListener("click", closeConsent); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeConsent(); closeChat(); } });

  /* ---------- Cookie ---------- */
  var cb = document.getElementById("cookie-bar");
  try { if (!localStorage.getItem("nakomyaken_cookie_ok")) cb.classList.remove("hidden"); } catch (e) { cb.classList.remove("hidden"); }
  document.getElementById("cookie-ok").addEventListener("click", function () { cb.classList.add("hidden"); try { localStorage.setItem("nakomyaken_cookie_ok", "1"); } catch (e) {} });

  /* ---------- Заявка ---------- */
  document.querySelectorAll("form.lead-form").forEach(function (form) {
    var success = form.parentElement.querySelector(".lead-success");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var name = form.querySelector("[name=name]"), phone = form.querySelector("[name=phone]"), consent = form.querySelector("[name=consent]");
      var digits = phone.value.replace(/\D/g, "");
      var okName = name.value.trim().length >= 2, okPhone = digits.length >= 10 && digits.length <= 12, okConsent = consent.checked;
      name.closest("div").querySelector(".err").classList.toggle("hidden", okName);
      name.classList.toggle("errb", !okName);
      phone.closest("div").querySelector(".err").classList.toggle("hidden", okPhone);
      phone.classList.toggle("errb", !okPhone);
      form.querySelector(".consent-err").classList.toggle("hidden", okConsent);
      if (!(okName && okPhone && okConsent)) return;
      var btn = form.querySelector("button[type=submit]"), label = btn.querySelector(".lbl");
      btn.disabled = true; label.textContent = "Отправляем...";
      setTimeout(function () {
        try {
          var leads = JSON.parse(localStorage.getItem("nakomyaken_leads") || "[]");
          leads.push({ name: name.value.trim(), phone: phone.value.trim(), time: (form.querySelector("[name=time]:checked") || {}).value || "", page: page, ts: new Date().toISOString() });
          localStorage.setItem("nakomyaken_leads", JSON.stringify(leads));
        } catch (e) {}
        form.classList.add("hidden"); if (success) success.classList.remove("hidden");
        if (window.ym) ym(95566409, "reachGoal", "form_submit");
      }, 800);
    });
    form.querySelectorAll("[name=name],[name=phone]").forEach(function (el) {
      el.addEventListener("input", function () { el.classList.remove("errb"); var p = el.closest("div").querySelector(".err"); if (p) p.classList.add("hidden"); });
    });
  });

  /* ---------- Чат Евгений ---------- */
  var chatBtn = document.getElementById("chat-open"), panel = document.getElementById("chat-panel"),
      log = document.getElementById("chat-log"), chips = document.getElementById("chat-chips"),
      input = document.getElementById("chat-input"), chatForm = document.getElementById("chat-form");
  var KB = [
    { k: ["цен", "стоит", "стоимость", "сколько", "руб"], a: "Стандартный тур летней рыбалки: 6 дней и 7 ночей, 120 000 ₽ с человека. Трансфер отдельно: катер и аэролодка 180 000 ₽ за группу или вертолёт от 315 000 ₽. Подобрать даты и оставить заявку?" },
    { k: ["дат", "сезон", "когда", "заезд", "июл", "авг", "сент", "2026"], a: "Летняя рыбалка идёт с 5 июля по 20 сентября. Заезды 2026: 17 и 26 июля, 4, 14, 25 августа, 4 сентября. Расписание на странице ниже, могу записать на дату." },
    { k: ["как добраться", "добраться", "дорога", "трансфер", "норильск", "вертолёт", "вертолет", "катер", "где наход"], a: "База стоит на озере Накомякен в центральной части плато Путорана, 150 км от Норильска. Летите до Норильска, встречаем в аэропорту: дальше катер и аэролодка 4–8 часов или вертолёт 45 минут. Карта в разделе «Местоположение»." },
    { k: ["входит", "включ", "питание", "баня", "интернет", "связь", "лодк"], a: "В тур входит: проживание, трёхразовое питание, баня, спутниковый интернет, ПВХ-лодка с мотором 15 л. с. на двоих, бензин и гид. Из личного нужны вещи и любимые снасти." },
    { k: ["рыб", "таймень", "голец", "хариус", "щук", "окун", "налим", "сиг", "трофе"], a: "Ловятся хариус, сиг, окунь, налим, щука, голец и таймень. Реки и озёра плато дикие, пресса нет, поэтому трофеи здесь обычное дело. Рассказать про программу подробнее?" },
    { k: ["зим", "снегоход", "апрел", "май"], a: "Зимний тур: 1 апреля — 10 мая, 160 км на снегоходах по льду озёр до базы, зимняя рыбалка и баня." },
    { k: ["вертолёт", "вертолет", "экскурси", "водопад"], a: "Вертолётные экскурсии на водопады идут с 1 июня по 20 сентября. Маршрут обсуждается индивидуально, стоимость зависит от программы." },
    { k: ["групп", "мест", "человек", "компан", "компани"], a: "База принимает группы до 10 человек, и на базе всегда только одна группа. Стандартный тур собирается на 6 человек." },
    { k: ["фото", "галере", "видео"], a: "Есть фотогалерея и видео с плато: смотрите разделы «Фотогалерея» и «Видео» в меню. А лучше приезжайте и снимайте своё." },
    { k: ["забронир", "заяв", "перезвон", "звонок", "телефон", "хочу"], a: "Отлично! Напишите имя и телефон прямо сюда, или откройте форму «Оставить заявку» и выберите удобное время. Администратор перезвонит." },
    { k: ["привет", "здравств", "добрый"], a: "Здравствуйте! Я Евгений, гид базы «Накомякен». Подскажу про туры, цены, даты и дорогу. Что интересует?" },
    { k: ["спасибо", "благодар"], a: "Рад помочь! Если появятся вопросы, пишите. Ну а если готовы на трофей, оставьте заявку, перезвоним в удобное время." }
  ];
  var CHIPS = ["Сколько стоит?", "Даты 2026", "Как добраться?", "Что входит?", "Хочу на тур"];
  function push(who, text) {
    var row = document.createElement("div");
    row.className = who === "me" ? "flex justify-end" : "flex justify-start";
    var b = document.createElement("div");
    b.className = who === "me" ? "max-w-[80%] rounded-2xl rounded-br-sm bg-ink-gold text-ink-ember body-6 px-4 py-2" : "max-w-[85%] rounded-2xl rounded-bl-sm bg-ink-700 body-6 text-fog-1 px-4 py-2";
    b.textContent = text; row.appendChild(b); log.appendChild(row); log.scrollTop = log.scrollHeight;
  }
  function bite() { chatBtn.classList.add("bite"); setTimeout(function () { chatBtn.classList.remove("bite"); }, 950); }
  function botReply(q) {
    var text = q.toLowerCase(), best = null;
    KB.forEach(function (item) { item.k.forEach(function (k) { if (text.indexOf(k) > -1 && !best) best = item; }); });
    var answer = best ? best.a : "Хороший вопрос. Точно расскажет администратор при звонке, а я пока могу про цены, даты заездов, дорогу и то, что входит в тур. Что из этого интереснее?";
    var digits = (q.match(/\d/g) || []).join("");
    if (digits.length >= 10) {
      try {
        var leads = JSON.parse(localStorage.getItem("nakomyaken_leads") || "[]");
        leads.push({ name: "", phone: (q.match(/[\+\d][\d\s\-\(\)]{8,}/) || [""])[0], question: q, page: page, ts: new Date().toISOString(), source: "chat" });
        localStorage.setItem("nakomyaken_leads", JSON.stringify(leads));
        if (window.ym) ym(95566409, "reachGoal", "chat_lead");
      } catch (e) {}
    }
    setTimeout(function () { push("bot", answer); bite(); }, reduceMotion ? 0 : 700);
  }
  CHIPS.forEach(function (t) {
    var b = document.createElement("button"); b.type = "button";
    b.className = "caption-4 px-3 py-1.5 rounded-full border border-ink-gold/40 text-ink-gold hover:bg-ink-gold/10 transition-colors duration-300";
    b.textContent = t; b.addEventListener("click", function () { push("me", t); botReply(t); }); chips.appendChild(b);
  });
  function openChat() {
    panel.classList.remove("hidden"); chatBtn.classList.add("hidden"); chatBtn.classList.remove("hasmsg");
    if (!log.children.length) setTimeout(function () { push("bot", "Здравствуйте! Я Евгений, гид базы «Накомякен» на плато Путорана. Помогу выбрать тур и ответить на вопросы. Что интересует?"); }, reduceMotion ? 0 : 400);
    input.focus();
  }
  function closeChat() { panel.classList.add("hidden"); chatBtn.classList.remove("hidden"); }
  chatBtn.addEventListener("click", openChat);
  document.getElementById("chat-close").addEventListener("click", closeChat);
  chatForm.addEventListener("submit", function (e) {
    e.preventDefault(); var v = input.value.trim(); if (!v) return; push("me", v);
    try { var cl = JSON.parse(localStorage.getItem("nakomyaken_chat_log") || "[]"); cl.push({ who: "user", text: v, page: page, ts: new Date().toISOString() }); localStorage.setItem("nakomyaken_chat_log", JSON.stringify(cl)); } catch (e2) {}
    input.value = ""; botReply(v);
  });
  /* Рыбак «подсекает» при первом визите, чтобы заметили чат */
  try {
    if (!sessionStorage.getItem("nakomyaken_fab_seen")) {
      setTimeout(function () { chatBtn.classList.add("hasmsg"); bite(); sessionStorage.setItem("nakomyaken_fab_seen", "1"); }, 2500);
    }
  } catch (e) {}

  /* ---------- Метрика ---------- */
  (function (m, e, t, r, i, k, a) {
    m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
    m[i].l = 1 * new Date();
    for (var j = 0; j < e.scripts.length; j++) { if (e.scripts[j].src === r) { return; } }
    k = e.createElement(t), a = e.getElementsByTagName(t)[0]; k.async = 1; k.src = r; a.parentNode.insertBefore(k, a);
  })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
  if (window.ym) ym(95566409, "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: false });
})();
