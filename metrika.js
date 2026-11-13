// Yandex Metrika (counter 114230993, shared by yeroshen.com, vlad. and tools.)
// and the cookie notice it needs. The same file lives in all three repos;
// change the counter here and copy the file over.
(function () {
  var COUNTER = 114230993;
  var POLICY = "https://yeroshen.com/privacy/";
  var SEEN = "cookie-notice-seen";

  // Counter: the loader from Metrika's install page, as is
  (function (m, e, t, r, i, k, a) {
    m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
    m[i].l = 1 * new Date();
    for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
    k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a);
  })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=" + COUNTER, "ym");
  window.ym(COUNTER, "init", {
    webvisor: true, clickmap: true, accurateTrackBounce: true, trackLinks: true,
    referrer: document.referrer, url: location.href,
  });

  // Cookie notice: shown until the visitor closes it once
  var seen = false;
  try { seen = localStorage.getItem(SEEN) === "1"; } catch (e) { /* private mode: show it */ }
  if (seen) return;

  function show() {
    var style = document.createElement("style");
    style.textContent =
      ".cookie-notice{position:fixed;left:24px;bottom:24px;z-index:50;display:flex;align-items:center;gap:16px;" +
      "max-width:420px;padding:16px 16px 16px 20px;border-radius:16px;background:#1b1b1f;" +
      "box-shadow:0 16px 40px rgba(0,0,0,.45);color:#bfc0c8;font:13px/19px 'Google Sans',system-ui,sans-serif}" +
      ".cookie-notice a{color:#f5f4ef;text-decoration:underline;text-underline-offset:3px}" +
      ".cookie-notice button{flex:none;height:36px;padding:0 18px;border:0;border-radius:100px;background:#f5f4ef;" +
      "color:#0c0c0d;font:500 13px/1 'Google Sans',system-ui,sans-serif;cursor:pointer}" +
      ".cookie-notice button:hover{background:#fff}" +
      "@media (max-width:760px){.cookie-notice{left:16px;right:16px;bottom:16px;max-width:none}}";
    var box = document.createElement("div");
    box.className = "cookie-notice";
    box.setAttribute("role", "region");
    box.setAttribute("aria-label", "Cookies");
    box.innerHTML = '<p>Сайт использует cookies и Яндекс Метрику, чтобы понимать, что читают. ' +
      '<a href="' + POLICY + '">Подробнее</a></p><button type="button">Понятно</button>';
    box.querySelector("button").addEventListener("click", function () {
      try { localStorage.setItem(SEEN, "1"); } catch (e) { /* ignore */ }
      box.remove();
    });
    document.head.appendChild(style);
    document.body.appendChild(box);
  }
  if (document.body) show(); else document.addEventListener("DOMContentLoaded", show);
})();
