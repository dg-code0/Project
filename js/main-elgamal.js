// Функция для генерации ключей
function generateElGamalKeys() {
  const { pki } = forge;
  const keypair = pki.rsa.generateKeyPair({ bits: 2048 });
  const publicKey = pki.publicKeyToPem(keypair.publicKey);
  const privateKey = pki.privateKeyToPem(keypair.privateKey);
  return { publicKey, privateKey };
}

// Функция для шифрования сообщения
function encryptMessage(publicKeyPem, message) {
  const { pki, util } = forge;
  const publicKey = pki.publicKeyFromPem(publicKeyPem);
  const encrypted = publicKey.encrypt(message);
  return util.encode64(encrypted);
}

// Функция для расшифровки сообщения
function decryptMessage(privateKeyPem, encryptedMessage) {
  const { pki, util } = forge;
  const privateKey = pki.privateKeyFromPem(privateKeyPem);
  const decodedMessage = util.decode64(encryptedMessage);
  return privateKey.decrypt(decodedMessage);
}

// Обработчик событий для кнопок
window.onload = function () {
  const textInput = document.getElementById("textInput");
  const publicKeyInput = document.getElementById("publicKeyInput");
  const privateKeyInput = document.getElementById("privateKeyInput");
  const outputInput = document.getElementById("outputInput");
  const encryptButton = document.getElementById("encrypt-btn");
  const decryptButton = document.getElementById("decrypt-btn");

  // Генерация ключей и установка их в поля ввода
  const { publicKey, privateKey } = generateElGamalKeys();
  publicKeyInput.value = publicKey;
  privateKeyInput.value = privateKey;

  // Шифрование сообщения
  encryptButton.addEventListener("click", () => {
    const message = textInput.value;
    const encryptedMessage = encryptMessage(publicKey, message);
    outputInput.value = encryptedMessage; // Выводим зашифрованное сообщение
  });

  // Расшифровка сообщения
  decryptButton.addEventListener("click", () => {
    const encryptedMessage = outputInput.value;
    const decryptedMessage = decryptMessage(privateKey, encryptedMessage);
    outputInput.value = decryptedMessage; // Выводим расшифрован ное сообщение
  });
};

