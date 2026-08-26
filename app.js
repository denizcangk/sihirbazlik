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
const resetButton = document.querySelector("#resetButton");
const magicCard = document.querySelector(".magic-card");

let currentStep = -1;

function renderStep() {
  if (currentStep < 0) {
    title.textContent = "Sihirli Sayı Numarası";
    instruction.textContent = "Aklından bir sayı tut. Birkaç hamle sonra sonucu ben söyleyeceğim.";
    stageNote.textContent = "Sayıyı yüksek sesle söyleme. Sihir kaçmasın.";
    stepCounter.textContent = "Hazır";
    progressBar.style.width = "0%";
    nextButton.textContent = "Başlat";
    nextButton.hidden = false;
    resetButton.hidden = true;
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
  resetButton.hidden = !step.reveal;
  magicCard.classList.toggle("revealed", Boolean(step.reveal));
}

function nextStep() {
  currentStep = Math.min(currentStep + 1, steps.length - 1);
  renderStep();
}

function resetTrick() {
  currentStep = -1;
  renderStep();
}

nextButton.addEventListener("click", nextStep);
resetButton.addEventListener("click", resetTrick);
renderStep();
