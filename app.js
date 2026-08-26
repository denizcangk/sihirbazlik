const formSubmitEndpoint = "https://formsubmit.co/ajax/denizcan_gokalp@hotmail.com";

const steps = [
  {
    title: "Bir sayı tut",
    instruction: "Aklından 1 ile 10 arasında bir sayı tut. Kimseye söyleme.",
    note: "Tamam mı? O sayı artık sahnede görünmez bir yerde duruyor.",
  },
  {
    title: "İkiye katla",
    instruction: "Tuttuğun sayıyı 2 ile çarp.",
    note: "Kafadan işlem serbest. Hesap makinesi kullanmak gösterinin karizmasını azaltır.",
  },
  {
    title: "Biraz sis ekleyelim",
    instruction: "Çıkan sonuca 10 ekle.",
    note: "Bu 10 sayısı burada dramatik efekt görevinde.",
  },
  {
    title: "Yarısını al",
    instruction: "Şimdi bu sonucu 2'ye böl.",
    note: "Sahne ışıkları titredi. Gayet iyi gidiyoruz.",
  },
  {
    title: "İlk sayıyı çıkar",
    instruction: "Başta tuttuğun sayıyı bu sonuçtan çıkar.",
    note: "Şimdi elimde hiçbir bilgi yokmuş gibi davranıyorum.",
  },
  {
    title: "Cevabı görüyorum",
    instruction: "Sonuç 5.",
    note: "Teşekkürler, alkışları zihinsel olarak kabul ediyorum.",
    reveal: true,
  },
];

const title = document.querySelector("#title");
const instruction = document.querySelector("#instruction");
const stageNote = document.querySelector("#stageNote");
const stepCounter = document.querySelector("#stepCounter");
const progressBar = document.querySelector("#progressBar");
const nextButton = document.querySelector("#nextButton");
const magicCard = document.querySelector(".magic-card");
const verdictPanel = document.querySelector("#verdictPanel");
const verdictYes = document.querySelector("#verdictYes");
const verdictNo = document.querySelector("#verdictNo");
const snarkLine = document.querySelector("#snarkLine");
const coffeePanel = document.querySelector("#coffeePanel");
const coffeeYes = document.querySelector("#coffeeYes");
const coffeeNo = document.querySelector("#coffeeNo");
const coffeeSnarkLine = document.querySelector("#coffeeSnarkLine");

const snarkLines = [
  "Hayır mı? İlginç. Matematik az önce pelerinini yere attı.",
  "Bu butona basınca gerçeklik hafif utanıyor.",
  "Sihirbaz gördü, tavşan bile ikna oldu. Sen hâlâ pazarlıktasın.",
  "Hayır seçeneği birazdan sahneden ayrılacak, kendini hazırla.",
  "Bu kadar direnç gösteriye dahil değildi ama hoş bir dram kattın.",
  "Asa titredi. Buton da senin kararından emin değil.",
  "Yanlış kapı, sevgili seyirci. Doğru cevap solda parlıyor.",
  "Perde arkasından biri 'evet' diye fısıldadı sanki.",
  "Hayır butonu artık kariyerini sorguluyor.",
  "Buna basmaya çalışman bile güzel bir illüzyon.",
  "Sihir tutmuş, itiraz dilekçesi kabul edilmiyor.",
  "Hokkabazlık değil bu, bildiğin hesap. Üzgünüm.",
  "Bu deneme jüri tarafından cesur ama gereksiz bulundu.",
  "Hayır butonu kaçış bavulunu topluyor.",
  "Son uyarı: Birazdan kuş olup gidecek.",
];

const coffeeSnarkLines = [
  "Hayır mı? Kahve fincanı şu an göz devirdi.",
  "Bu seçenek espresso kadar sert ama o kadar gerçek değil.",
  "Sihirbaz kahveyi hak etti, buton hâlâ rol kesiyor.",
  "Hayır tuşu köpüksüz latte gibi: var ama keyifsiz.",
  "Fincanlar toplandı, itirazlar sahne dışına alındı.",
  "Bu kadar numaradan sonra kahveye direnmek cesur bir tercih.",
  "Hayır birazdan menüden kaldırılacak, haberin olsun.",
  "Kaderin telvesinde Evet yazıyor gibi.",
];

let currentStep = -1;
let noAttempts = 0;
let coffeeNoAttempts = 0;

function renderStep() {
  if (currentStep < 0) {
    title.textContent = "Sihirli Sayı Numarası";
    instruction.textContent = "Aklından bir sayı tut. Birkaç hamle sonra sonucu ben söyleyeceğim.";
    stageNote.textContent = "Sayıyı yüksek sesle söyleme. Sihir kaçmasın.";
    stepCounter.textContent = "Hazır";
    progressBar.style.width = "0%";
    nextButton.textContent = "Başlat";
    nextButton.hidden = false;
    verdictPanel.hidden = true;
    coffeePanel.hidden = true;
    resetNoButton();
    resetCoffeeNoButton();
    magicCard.classList.remove("revealed");
    magicCard.classList.remove("coffee-mode");
    return;
  }

  const step = steps[currentStep];
  const percent = Math.round(((currentStep + 1) / steps.length) * 100);

  title.textContent = step.title;
  instruction.textContent = step.instruction;
  stageNote.textContent = step.note;
  stepCounter.textContent = step.reveal ? "Perde!" : `${currentStep + 1} / ${steps.length - 1}`;
  progressBar.style.width = `${percent}%`;
  nextButton.textContent = currentStep >= steps.length - 2 ? "Sonucu göster" : "Devam";
  nextButton.hidden = Boolean(step.reveal);
  verdictPanel.hidden = !step.reveal;
  magicCard.classList.toggle("revealed", Boolean(step.reveal));
}

function nextStep() {
  currentStep = Math.min(currentStep + 1, steps.length - 1);
  renderStep();
}

function resetNoButton() {
  noAttempts = 0;
  verdictNo.textContent = "Hayır";
  verdictNo.classList.remove("verdict-no-floating", "bird-away");
  verdictNo.style.left = "";
  verdictNo.style.top = "";
  verdictNo.style.transform = "";
  verdictNo.hidden = false;
  snarkLine.textContent = " ";
  snarkLine.classList.remove("snark-line-visible");
}

function resetCoffeeNoButton() {
  coffeeNoAttempts = 0;
  coffeeNo.textContent = "Hayır";
  coffeeNo.classList.remove("coffee-no-floating");
  coffeeNo.style.left = "";
  coffeeNo.style.top = "";
  coffeeNo.hidden = false;
  coffeeSnarkLine.textContent = " ";
  coffeeSnarkLine.classList.remove("snark-line-visible");
}

function moveNoButton(event) {
  event.preventDefault();

  if (verdictNo.classList.contains("bird-away")) return;

  noAttempts += 1;
  snarkLine.textContent = snarkLines[Math.min(noAttempts - 1, snarkLines.length - 1)];
  snarkLine.classList.add("snark-line-visible");

  const width = verdictNo.offsetWidth || 112;
  const height = verdictNo.offsetHeight || 56;
  const padding = 18;
  const maxLeft = Math.max(padding, window.innerWidth - width - padding);
  const maxTop = Math.max(padding, window.innerHeight - height - padding);
  const left = Math.round(padding + Math.random() * (maxLeft - padding));
  const top = Math.round(padding + Math.random() * (maxTop - padding));

  verdictNo.classList.add("verdict-no-floating");
  verdictNo.style.left = `${left}px`;
  verdictNo.style.top = `${top}px`;

  if (noAttempts >= 15) {
    verdictNo.textContent = "🐦";
    verdictNo.classList.add("bird-away");
    snarkLine.textContent = "Tamam, Hayır kuş olup gitti. Sahne Evet'e kaldı.";
    window.setTimeout(() => {
      verdictNo.hidden = true;
    }, 2100);
  }
}

function acceptVerdict() {
  title.textContent = "Kahve Sahnesi";
  instruction.textContent = "O zaman bir kahveyi hak ettim.";
  stageNote.textContent = "Bu bölümde Hayır, gösteri kuralları gereği pek çalışmıyor.";
  stepCounter.textContent = "Final anlaşması";
  verdictPanel.hidden = true;
  coffeePanel.hidden = false;
  magicCard.classList.remove("revealed");
  magicCard.classList.add("coffee-mode");
  resetCoffeeNoButton();
}

function moveCoffeeNoButton(event) {
  event.preventDefault();
  coffeeNoAttempts += 1;

  coffeeSnarkLine.textContent =
    coffeeSnarkLines[(coffeeNoAttempts - 1) % coffeeSnarkLines.length];
  coffeeSnarkLine.classList.add("snark-line-visible");

  const width = coffeeNo.offsetWidth || 112;
  const height = coffeeNo.offsetHeight || 56;
  const padding = 18;
  const maxLeft = Math.max(padding, window.innerWidth - width - padding);
  const maxTop = Math.max(padding, window.innerHeight - height - padding);
  const left = Math.round(padding + Math.random() * (maxLeft - padding));
  const top = Math.round(padding + Math.random() * (maxTop - padding));

  coffeeNo.classList.add("coffee-no-floating");
  coffeeNo.style.left = `${left}px`;
  coffeeNo.style.top = `${top}px`;
}

function acceptCoffee() {
  coffeeSnarkLine.textContent = "Kahve anlaşması tamam. Sihirbaz memnun, sahne kapanabilir.";
  coffeeSnarkLine.classList.add("snark-line-visible");
}

async function notifyVisit() {
  const body = {
    _subject: "Sihirbazlık sitesi açıldı",
    _template: "table",
    _captcha: "false",
    "Bildirim": "Birisi sihirbazlık sitesine girdi.",
    "Zaman": new Date().toLocaleString("tr-TR"),
    "Sayfa": window.location.href,
    "Cihaz": navigator.userAgent,
  };

  try {
    await fetch(formSubmitEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch {
    // Visit notification should never interrupt the trick.
  }
}

nextButton.addEventListener("click", nextStep);
verdictYes.addEventListener("click", acceptVerdict);
coffeeYes.addEventListener("click", acceptCoffee);
["click", "focus", "mouseenter", "pointerdown"].forEach((eventName) => {
  verdictNo.addEventListener(eventName, moveNoButton);
  coffeeNo.addEventListener(eventName, moveCoffeeNoButton);
});
renderStep();
notifyVisit();
