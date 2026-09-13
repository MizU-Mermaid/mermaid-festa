/**
 * 共通ヘッダー/フッターを各ページに読み込む。
 * <html data-base="./"> (ルート階層) / data-base="../" (events/配下) を
 * 各ページで指定しておくと、リンクの相対パスが自動調整される。
 */
(function () {
  var base = document.documentElement.getAttribute("data-base") || "./";
  var currentPage = document.body.getAttribute("data-page") || "";

  function inject(url, targetSelector, callback) {
    var target = document.querySelector(targetSelector);
    if (!target) return;
    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error("failed to load " + url);
        return res.text();
      })
      .then(function (html) {
        target.innerHTML = html.split("{{BASE}}").join(base);
        if (callback) callback(target);
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    inject(base + "partials/header.html", "[data-include='header']", function (target) {
      var link = target.querySelector('[data-nav="' + currentPage + '"]');
      if (link) link.setAttribute("aria-current", "page");

      var toggle = target.querySelector("[data-nav-toggle]");
      var nav = target.querySelector("[data-main-nav]");
      if (toggle && nav) {
        toggle.addEventListener("click", function () {
          var isOpen = nav.classList.toggle("is-open");
          toggle.setAttribute("aria-expanded", String(isOpen));
        });
      }
    });

    inject(base + "partials/footer.html", "[data-include='footer']", function (target) {
      var yearEl = target.querySelector("[data-current-year]");
      if (yearEl) yearEl.textContent = new Date().getFullYear();
    });
  });
})();
