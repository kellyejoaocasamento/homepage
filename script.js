function setup() {
  readUrlData();
  setBanner();
  checkUserConfirmation();
}

const readUrlData = () => {
  this.data = new URLSearchParams(window.location.search).get("data");
  this.data = JSON.parse(atob(this.data));
};

const setBanner = () => {
  const banner = document.querySelector(".welcome-banner h1");
  banner.innerHTML = "Olá, " + decodeURI(this.data.name) + "!";
};

const checkUserConfirmation = () => {
  fetch(
    `https://script.google.com/macros/s/AKfycby95a9TKslsMjORM2xGMeTF3uB7rc4kKnT0nckbsNRg7wwh6b30opc8Q8D7gztF1PvbeQ/exec?id=${this.data.id}&token=${this.data.token}`,
  )
    .then((result) => result.json())
    .then((resultJson) => {
      if (!resultJson.registered) {
        document.querySelector("#confirm-button").classList.remove("hidden");
        document.querySelector("#confirm-section").classList.remove("hidden");
      }
    });
};

const scrollToConfirmation = () => {
  document.querySelector(".form-screen").scrollIntoView();
};

const sendConfirmation = () => {
  const obsField = document.querySelector("textarea#obs").value;
  const prsField = document.querySelector("#presenca").value;

  fetch(
    "https://script.google.com/macros/s/AKfycby95a9TKslsMjORM2xGMeTF3uB7rc4kKnT0nckbsNRg7wwh6b30opc8Q8D7gztF1PvbeQ/exec",
    {
      method: "POST",
      body: JSON.stringify({
        id: this.data.id,
        token: this.data.token,
        value: prsField,
        obs: obsField,
      }),
    },
  ).then((result) => {
    result.json().then((readableJson) => {
      if (readableJson.success) {
        document.querySelector("#confirm-form").classList.add("hidden");
        document.querySelector("#success-msg").classList.remove("hidden");
      } else window.alert("Erro inesperado. Contate os noivos!");
    });
  });
};
