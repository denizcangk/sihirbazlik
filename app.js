const phoneNumber = "905302205064";
const smsNumber = "+905302205064";
const emailAddress = "denizcan_gokalp@hotmail.com";
const formSubmitEndpoint = "https://formsubmit.co/ajax/denizcan_gokalp@hotmail.com";

const sarcasticLines = [
  "Hayır butonu şu an toplantıda, sonra dene.",
  "Bu seçenek dramatik amaçlı konuldu, çalışmıyor.",
  "Kaçış sahnesi başladı. Oyunculuk fena değil.",
  "Hayır mı? Cesur bir deneme, başarısız ama cesur.",
  "Sen basmaya çalış, ben dekoru değiştireyim.",
  "Bu butonun sendromu var: bağlanma korkusu.",
  "Yönetmen 'Evet'e yakın plan istedi.",
  "Hayır butonu bile bu fikre pek inanmıyor.",
  "Alternatif evrende belki. Bu evrende sinema.",
  "Popcorn kokusu geldi, karar belli gibi.",
];

const inviteStage = document.querySelector("#inviteStage");
const dateStage = document.querySelector("#dateStage");
const doneStage = document.querySelector("#doneStage");
const noButton = document.querySelector("#noButton");
const yesButton = document.querySelector("#yesButton");
const sarcasm = document.querySelector("#sarcasm");
const selectedText = document.querySelector("#selectedText");
const saveStatus = document.querySelector("#saveStatus");
const whatsappLink = document.querySelector("#whatsappLink");
const smsLink = document.querySelector("#smsLink");
const mailLink = document.querySelector("#mailLink");
let attempts = 0;

function show(stage) {
  inviteStage.hidden = stage !== "invite";
  dateStage.hidden = stage !== "dates";
  doneStage.hidden = stage !== "done";
}

function moveNoButton(event) {
  event.preventDefault();
  attempts += 1;

  const width = noButton.offsetWidth || 132;
  const height = noButton.offsetHeight || 56;
  const padding = 18;
  const maxLeft = Math.max(padding, window.innerWidth - width - padding);
  const maxTop = Math.max(padding, window.innerHeight - height - padding);
  const left = Math.round(padding + Math.random() * (maxLeft - padding));
  const top = Math.round(padding + Math.random() * (maxTop - padding));

  noButton.classList.add("no-button-floating");
  noButton.style.left = `${left}px`;
  noButton.style.top = `${top}px`;
  sarcasm.textContent = sarcasticLines[(attempts - 1) % sarcasticLines.length];
  sarcasm.classList.add("sarcasm-visible");
}

async function notifyOwner(label, value) {
  const body = {
    _subject: "Sinema günü seçildi",
    _template: "table",
    _captcha: "false",
    "Secilen gun": value,
    "Tarih etiketi": label,
    "Gonderim zamani": new Date().toLocaleString("tr-TR"),
    "Sayfa": window.location.href,
  };

  const response = await fetch(formSubmitEndpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("E-posta bildirimi gönderilemedi.");
  }
}

async function selectDate(button) {
  const label = button.dataset.label;
  const value = button.dataset.value;
  const message = `Sinema için ${value} bana uyar. Popcorn hazır mı?`;
  const encoded = encodeURIComponent(message);

  selectedText.textContent = value;
  whatsappLink.href = `https://wa.me/${phoneNumber}?text=${encoded}`;
  smsLink.href = `sms:${smsNumber}?&body=${encoded}`;
  mailLink.href = `mailto:${emailAddress}?subject=${encodeURIComponent("Sinema günü seçildi")}&body=${encoded}`;
  show("done");

  try {
    await notifyOwner(label, value);
    saveStatus.textContent = "Seçim sana e-posta olarak gönderildi. WhatsApp da açılıyor...";
  } catch {
    saveStatus.textContent = "E-posta bildirimi takıldıysa aşağıdaki hazır mesaj seçenekleri duruyor.";
  }

  window.setTimeout(() => {
    window.location.href = whatsappLink.href;
  }, 650);
}

yesButton.addEventListener("click", () => show("dates"));
["click", "focus", "mouseenter", "pointerdown"].forEach((eventName) => {
  noButton.addEventListener(eventName, moveNoButton);
});
document.querySelectorAll(".date-button").forEach((button) => {
  button.addEventListener("click", () => selectDate(button));
});
