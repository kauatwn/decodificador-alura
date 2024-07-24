const encryptedKeys = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};

function encryptMessage() {
  const textarea = document.querySelector("textarea");
  const decryptedMessage = textarea.value;
  let encryptedMessage = "";

  for (let i = 0; i < decryptedMessage.length; i++) {
    const char = decryptedMessage[i].toLowerCase();

    // Verifica se char é uma key.
    if (char in encryptedKeys) {
      encryptedMessage += encryptedKeys[char];
    } else {
      encryptedMessage += char;
    }
  }

  return encryptedMessage;
}

function decryptMessage() {
  const textarea = document.querySelector("textarea");
  const encryptedMessage = textarea.value;
  let decryptedMessage = "";

  for (let i = 0; i < encryptedMessage.length; i++) {
    const char = encryptedMessage[i].toLowerCase();

    // Verifica se char é uma key
    if (char in encryptedKeys) {
      // Inicializa a substring (char que será concatenado com outro char em sequência)
      let subStr = char;

      // Compara o caractere subsequente ao char (next char) com o valor da key
      for (let j = 1; j < encryptedKeys[char].length; j++) {
        // Adiciona o caractere subsequente (j) de encryptedMessage à subStr
        subStr += encryptedMessage[i + j].toLowerCase();

        if (subStr === encryptedKeys[char]) {
          // Adiciona o valor da key à variável
          decryptedMessage += char;

          // Avança o index após string subsequente ter sido encontrada
          i += j;
          break;
        }
      }
    } else {
      decryptedMessage += char;
    }
  }

  return decryptedMessage;
}

function showEncryptedMessage() {
  const rightContainer = document.querySelector(".right-container");
  // Limpando os filhos de right-container.
  rightContainer.innerHTML = "";

  const encryptedMessageContainer = document.createElement("div");
  encryptedMessageContainer.className = "encrypted-message-container";

  const paragraph = document.createElement("p");
  paragraph.className = "encrypted-message";
  paragraph.textContent = encryptMessage();

  // Definindo p como filho de encrypted-message-container.
  encryptedMessageContainer.appendChild(paragraph);

  const btnCopy = document.createElement("button");
  btnCopy.className = "btn-copy";
  btnCopy.textContent = "Copiar";

  btnCopy.addEventListener("click", () => {
    navigator.clipboard.writeText(paragraph.innerText);
  });

  // Definindo btn-copy como filho de encrypted-message-container.
  encryptedMessageContainer.appendChild(btnCopy);

  // Definindo encrypted-message-container como filho de right-container.
  rightContainer.appendChild(encryptedMessageContainer);
}

function showDecryptedMessage() {
  const rightContainer = document.querySelector(".right-container");
  // Limpando os filhos de right-container.
  rightContainer.innerHTML = "";

  const encryptedMessageContainer = document.createElement("div");
  encryptedMessageContainer.className = "encrypted-message-container";

  const paragraph = document.createElement("p");
  paragraph.className = "encrypted-message";
  paragraph.textContent = decryptMessage();

  // Definindo p como filho de encrypted-message-container.
  encryptedMessageContainer.appendChild(paragraph);

  const btnCopy = document.createElement("button");
  btnCopy.className = "btn-copy";
  btnCopy.textContent = "Copiar";

  btnCopy.addEventListener("click", () => {
    navigator.clipboard.writeText(paragraph.innerText);
  });

  // Definindo btn-copy como filho de encrypted-message-container.
  encryptedMessageContainer.appendChild(btnCopy);

  // Definindo encrypted-message-container como filho de right-container.
  rightContainer.appendChild(encryptedMessageContainer);
}

const textarea = document.querySelector("textarea");
const maxCharacters = 265;

textarea.addEventListener("input", function () {
  // Removendo quebras de linha
  this.value = this.value.replace(/\n/g, "");

  // Limitando o número de caracteres
  this.value = this.value.slice(0, maxCharacters);
});

const btnEncrypt = document.querySelector(".btn-encrypt");
btnEncrypt.addEventListener("click", () => {
  encryptMessage();
  showEncryptedMessage();
});

const btnDecrypt = document.querySelector(".btn-decrypt");
btnDecrypt.addEventListener("click", () => {
  decryptMessage();
  showDecryptedMessage();
});
