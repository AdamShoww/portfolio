// Yandex Metrika (counter 114230993, shared by yeroshen.com, vlad. and tools.)
// behind an opt-in consent banner, as 152-FZ asks: nothing is loaded and no
// cookie of Metrika is set until the visitor presses «Согласен». The answer is
// kept for a year in one cookie for all three sites. The same file lives in
// all three repos; change it here and copy it over.
(function () {
  var COUNTER = 114230993;
  var CONSENT = "https://yeroshen.com/consent/";
  var POLICY = "https://yeroshen.com/privacy/";
  var COOKIE = "consent_metrika";
  var YEAR = 365 * 24 * 3600;

  function readConsent() {
    var m = document.cookie.match(/(?:^|;\s*)consent_metrika=(yes|no)/);
    return m ? m[1] : null;
  }
  function domainAttr() {
    return /(^|\.)yeroshen\.com$/.test(location.hostname) ? "; domain=.yeroshen.com" : "";
  }
  function writeConsent(value, maxAge) {
    document.cookie = COOKIE + "=" + value + "; max-age=" + maxAge + "; path=/; SameSite=Lax" +
      (location.protocol === "https:" ? "; Secure" : "") + domainAttr();
  }

  function startMetrika() {
    // The loader from Metrika's install page, as is
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
  }

  // Withdrawal (the button on /privacy/): record the refusal and drop
  // Metrika's cookies; Metrika stays off on every page from then on
  function withdraw() {
    writeConsent("no", YEAR);
    document.cookie.split(";").forEach(function (c) {
      var name = c.split("=")[0].trim();
      if (/^_ym/.test(name)) {
        document.cookie = name + "=; max-age=0; path=/" + domainAttr();
        document.cookie = name + "=; max-age=0; path=/";
      }
    });
  }

  function banner() {
    var style = document.createElement("style");
    style.textContent =
      ".cookie-notice{position:fixed;left:24px;bottom:24px;z-index:50;max-width:440px;padding:18px 20px;" +
      "border-radius:16px;background:#1b1b1f;box-shadow:0 16px 40px rgba(0,0,0,.45);color:#bfc0c8;" +
      "font:13px/19px 'Google Sans',system-ui,sans-serif}" +
      ".cookie-notice a{color:#f5f4ef;text-decoration:underline;text-underline-offset:3px}" +
      ".cookie-notice .cn-actions{display:flex;gap:8px;margin-top:14px}" +
      ".cookie-notice button{height:36px;padding:0 18px;border-radius:100px;cursor:pointer;" +
      "font:500 13px/1 'Google Sans',system-ui,sans-serif}" +
      ".cookie-notice .cn-yes{border:0;background:#f5f4ef;color:#0c0c0d}" +
      ".cookie-notice .cn-yes:hover{background:#fff}" +
      ".cookie-notice .cn-no{border:1px solid #303035;background:transparent;color:#f5f4ef}" +
      ".cookie-notice .cn-no:hover{border-color:#96969c}" +
      "@media (max-width:760px){.cookie-notice{left:16px;right:16px;bottom:16px;max-width:none}}";
    var box = document.createElement("div");
    box.className = "cookie-notice";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", "Согласие на cookies");
    box.innerHTML =
      "<p>Чтобы понимать, что читают на сайте, я использую Яндекс Метрику: она ставит cookies и собирает " +
      'обезличенную статистику. Нажимая «Согласен», вы даёте <a href="' + CONSENT + '">согласие на обработку ' +
      'персональных данных</a> по <a href="' + POLICY + '">политике конфиденциальности</a>.</p>' +
      '<div class="cn-actions"><button type="button" class="cn-yes">Согласен</button>' +
      '<button type="button" class="cn-no">Отказаться</button></div>';
    box.querySelector(".cn-yes").addEventListener("click", function () {
      writeConsent("yes", YEAR);
      box.remove();
      startMetrika();
    });
    box.querySelector(".cn-no").addEventListener("click", function () {
      writeConsent("no", YEAR);
      box.remove();
    });
    document.head.appendChild(style);
    document.body.appendChild(box);
  }

  function wireWithdrawButtons() {
    var buttons = document.querySelectorAll("[data-consent-withdraw]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function (e) {
        withdraw();
        e.currentTarget.textContent = "Согласие отозвано";
        e.currentTarget.disabled = true;
      });
    }
  }

  function ready(fn) {
    if (document.body) fn(); else document.addEventListener("DOMContentLoaded", fn);
  }

  var answer = readConsent();
  if (answer === "yes") startMetrika();
  ready(function () {
    wireWithdrawButtons();
    if (answer === null) banner();
  });
})();
