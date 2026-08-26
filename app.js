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

let currentStep = -1;
let noAttempts = 0;

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
    resetNoButton();
    magicCard.classList.remove("revealed");
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
  snarkLine.textContent = "İşte beklediğim seyirci. Alkışlar iç sesinden gelsin.";
  snarkLine.classList.add("snark-line-visible");
}

nextButton.addEventListener("click", nextStep);
verdictYes.addEventListener("click", acceptVerdict);
["click", "focus", "mouseenter", "pointerdown"].forEach((eventName) => {
  verdictNo.addEventListener(eventName, moveNoButton);
});
renderStep();
