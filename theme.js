(function () {
  var root = document.documentElement;
  var key = "theme";

  function getPreferredTheme() {
    var saved = window.localStorage.getItem(key);
    if (saved === "light" || saved === "dark") return saved;
    return "light";
  }

  function syncButtons(theme) {
    var lightBtn = document.getElementById("theme-light");
    var darkBtn = document.getElementById("theme-dark");
    if (!lightBtn || !darkBtn) return;

    lightBtn.classList.toggle("active", theme === "light");
    darkBtn.classList.toggle("active", theme === "dark");
  }

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    window.localStorage.setItem(key, theme);
    syncButtons(theme);
  }

  function init() {
    setTheme(getPreferredTheme());

    var lightBtn = document.getElementById("theme-light");
    var darkBtn = document.getElementById("theme-dark");
    if (!lightBtn || !darkBtn) return;

    lightBtn.addEventListener("click", function () {
      setTheme("light");
    });

    darkBtn.addEventListener("click", function () {
      setTheme("dark");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
