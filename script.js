const form = document.getElementById("leadForm");
const success = document.getElementById("formSuccess");
const successWhatsapp = document.getElementById("successWhatsapp");

function track(eventName, data={}) {
  if (typeof window.fbq === "function") window.fbq("track", eventName, data);
  if (typeof window.gtag === "function") window.gtag("event", eventName, data);
  console.log("[Elite tracking]", eventName, data);
}

document.querySelectorAll("[data-track]").forEach(el => {
  el.addEventListener("click", () => track(el.dataset.track));
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  if (!data.name || !data.phone || !data.course) return;

  track("Lead", {course: data.course});

  const message =
    `Hi Elite Education, I would like course guidance.%0A%0A` +
    `Name: ${encodeURIComponent(data.name)}%0A` +
    `Mobile: ${encodeURIComponent(data.phone)}%0A` +
    `Programme: ${encodeURIComponent(data.course)}`;

  successWhatsapp.href = `https://wa.me/919400771970?text=${message}`;
  form.style.display = "none";
  success.style.display = "block";
  success.scrollIntoView({behavior:"smooth", block:"nearest"});
});

successWhatsapp.addEventListener("click", () => track("Contact", {method:"whatsapp"}));

const params = new URLSearchParams(window.location.search);
["utm_source","utm_medium","utm_campaign","utm_content","utm_term","gclid","fbclid"].forEach(k => {
  const v = params.get(k);
  if (v) sessionStorage.setItem(k, v);
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", () => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) target.focus({preventScroll:true});
  });
});
