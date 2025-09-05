/**
 * Se você veio até aqui, é curioso suficiente para saber que este site
 * foi feito exclusivamente para uso pessoal, por isso o código aqui não é nada bom.
 * O site foi feito de maneira rápida, e não tem muita utilidade nem nadas muito expansível.
 * Tudo aqui é bem básico e eu fiz nos minutos livres entre uma pendência e outra.
 *
 * Se caso você for eu mesmo, só que no futuro, se lembre que a gente se divertiu fazendo
 * esse site, foi bom descobrir como usar o AppScript do Google como "backend", foi legal
 * fazer o design baseado em um convite real, foi bacana fazer tudo sem ter que fazer o setup de um
 * framework ou alguma coisa super complexa cheia de regras de negócio e bla bla bla.
 * Projetos como esse são o verdadeiro motivo de termos entrado nessa profissão, nunca se esqueça.
 */

function setup() {
  readUrlData();
  setBanner();
  checkUserConfirmation();
}

const readUrlData = () => {
  this.data = new URLSearchParams(window.location.search).get("data");
  if (this.data) this.data = JSON.parse(atob(this.data));
};

const setBanner = () => {
  const banner = document.querySelector(".welcome-banner a");
  if (this.data) banner.innerHTML = "Olá, " + decodeURI(this.data.name) + "!";
};

const checkUserConfirmation = () => {
  if (this.data)
    fetch(
      `https://script.google.com/macros/s/AKfycbxn-UGTbUH504R9XutxB6A11M4Ul88tSQlR9mYZ_HEHBmmeJ7RPG1Qy0uj3v9Ei0EqMSQ/exec?id=${this.data.id}&token=${this.data.token}`,
    )
      .then((result) => result.json())
      .then((resultJson) => {
        const heartsLoad = document.querySelector(
          ".button-section .hearts-loading",
        );
        heartsLoad.classList.add("hidden");
        if (resultJson.registered === "SIM") {
          const infoBanner = document.querySelector(".info-banner.confirmed");
          infoBanner.classList.remove("hidden");
        } else {
          document
            .querySelector(".info-banner.denied")
            .classList.remove("hidden");
        }
      });
};

const scrollToConfirmation = () => {
  document.querySelector(".form-screen").scrollIntoView();
};

const scrollToMain = () => {
  document.querySelector(".buttons-screen").scrollIntoView();
};

const sendConfirmation = () => {
  const obsField = document.querySelector("textarea#obs");
  const prsField = document.querySelector("#presenca");

  if (!prsField?.value) {
    prsField.classList.add("error");
    return;
  } else prsField.classList.remove("error");

  toggleConfirmButtonLoading();

  fetch(
    "https://script.google.com/macros/s/AKfycbxn-UGTbUH504R9XutxB6A11M4Ul88tSQlR9mYZ_HEHBmmeJ7RPG1Qy0uj3v9Ei0EqMSQ/exec",
    {
      method: "POST",
      body: JSON.stringify({
        id: this.data.id,
        token: this.data.token,
        value: prsField.value,
        obs: obsField.value,
      }),
    },
  ).then((result) => {
    result.json().then((readableJson) => {
      if (readableJson.success) {
        finishConfirmSend();
      } else window.alert("Erro inesperado. Contate os noivos!");

      toggleConfirmButtonLoading();
    });
  });
};

const toggleConfirmButtonLoading = (forcestate = undefined) => {
  const cnfrmBtn = document.querySelector("#confirm-button");
  cnfrmBtn.querySelector("label").classList.add("hidden");
  cnfrmBtn.querySelector("section.hearts-loading").classList.remove("hidden");
};

const finishConfirmSend = () => {
  const cnfrForm = document.querySelector("#confirm-form");
  const scsMsg = document.querySelector("#success-msg");

  cnfrForm.classList.toggle("out");
  setTimeout(() => {
    cnfrForm.classList.toggle("hidden");
    scsMsg.classList.toggle("hidden");
    scsMsg.classList.toggle("in");

    setTimeout(() => {
      document.querySelector("#open-confirm-button").classList.add("hidden");
      const infoBanner = document.querySelector(".buttons-screen .info-banner");
      infoBanner.classList.remove("hidden");
      scrollToMain();
    }, 1200);
  }, 300);
};
