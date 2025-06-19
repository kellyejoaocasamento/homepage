// script.js

function navigateTo(url) {
  const iframe = document.getElementById("content-frame");
  if (iframe) {
    iframe.src = url;
    // Scroll automaticamente para a tela do iframe
    document
      .querySelector(".iframe-screen")
      ?.scrollIntoView({ behavior: "smooth" });
  } else {
    // fallback caso esteja em modo landscape e o iframe não esteja visível ainda
    window.open(url, "_blank");
  }
}
