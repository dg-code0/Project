// main-rsa.js

// Функция для генерации ключей
function generateKeys() {
  const { pki } = forge;
  const keypair = pki.rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
  const publicKey = pki.publicKeyToPem(keypair.publicKey);
  const privateKey = pki.privateKeyToPem(keypair.privateKey);
  return { publicKey, privateKey };
}

// Функция для шифрования текста
function encryptText(publicKeyPem, text) {
  const { pki, util } = forge;
  const publicKey = pki.publicKeyFromPem(publicKeyPem);
  const encrypted = publicKey.encrypt(text);
  return util.encode64(encrypted);
}

// Функция для расшифрования текста
function decryptText(privateKeyPem, encryptedText) {
  const { pki, util } = forge;
  const privateKey = pki.privateKeyFromPem(privateKeyPem);
  const decoded = util.decode64(encryptedText);
  return privateKey.decrypt(decoded);
}

// Обработчик событий для кнопок
document.addEventListener("DOMContentLoaded", () => {
  const publicKeyInput = document.querySelector(".public-key-text input");
  const privateKeyInput = document.querySelector(".private-key-text input");
  const textInput = document.querySelector('.row input[type="text"]');
  const outputInput = document.querySelector(".output-text input");
  const encryptButton = document.querySelector(".var-btns button:nth-child(1)");
  const decryptButton = document.querySelector(".var-btns button:nth-child(2)");

  // Генерация ключей и установка их в поля ввода
  const { publicKey, privateKey } = generateKeys();
  publicKeyInput.value = publicKey;
  privateKeyInput.value = privateKey;

  // Шифрование текста
  encryptButton.addEventListener("click", () => {
    const text = textInput.value;
    const encryptedText = encryptText(publicKey, text);
    outputInput.value = encryptedText;
  });

  // Расшифрование текста
  decryptButton.addEventListener("click", () => {
    const encryptedText = outputInput.value;
    const decryptedText = decryptText(privateKey, encryptedText);
    outputInput.value = decryptedText;
  });
});
