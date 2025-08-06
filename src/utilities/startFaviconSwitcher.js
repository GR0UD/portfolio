let currentIcon = 1;

export function startFaviconSwitcher(interval = 1000) {
  const icon1 = "/images/website-icon/icon.png";
  const icon2 = "/images/website-icon/icon2.png";

  setInterval(() => {
    let link = document.querySelector("link[rel='icon']");

    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    const icon = currentIcon === 1 ? icon2 : icon1;
    link.href = icon + "?v=" + Date.now();
    currentIcon = currentIcon === 1 ? 2 : 1;
  }, interval);
}
