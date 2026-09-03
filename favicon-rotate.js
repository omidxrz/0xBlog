(function () {
  var link = document.getElementById("app-favicon") || document.querySelector('link[rel~="icon"]');
  if (!link) return;

  var sourceHref = link.getAttribute("href") || "./favicon.ico";
  var img = new Image();
  img.decoding = "async";

  var canvas = document.createElement("canvas");
  var size = 64;
  canvas.width = size;
  canvas.height = size;
  var ctx = canvas.getContext("2d");
  if (!ctx) return;

  var angle = 0;
  var started = false;
  var step = Math.PI / 24; // 7.5deg per frame
  var interval = 40;

  function render() {
    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.rotate(angle);
    ctx.drawImage(img, -size / 2, -size / 2, size, size);
    ctx.restore();

    link.href = canvas.toDataURL("image/png");
    angle += step;
  }

  function start() {
    if (started) return;
    started = true;
    render();
    window.setInterval(function () {
      if (document.visibilityState !== "visible") return;
      render();
    }, interval);
  }

  img.onload = start;
  img.onerror = function () {
    // Keep the static favicon if the source cannot be loaded into canvas.
  };

  img.src = sourceHref;

  // Snap one frame when returning to the tab.
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && img.complete && img.naturalWidth > 0) {
      angle += step * 4;
      render();
    }
  });
})();
