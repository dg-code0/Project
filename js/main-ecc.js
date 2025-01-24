// Генерация ключей
function generateKeys() {
  const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair({ bits: 2048 });
  document.getElementById('privateKeyInput').value = forge.pki.privateKeyToPem(privateKey);
  document.getElementById('publicKeyInput').value = forge.pki.publicKeyToPem(publicKey);
}

// Шифрование
function encrypt() {
  const publicKeyPem = document.getElementById('publicKeyInput').value;
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const textToEncrypt = document.getElementById('textInput').value;
  const encrypted = publicKey.encrypt(textToEncrypt);
  document.getElementById('outputInput').value = forge.util.encode64(encrypted);
}

// Расшифрование
function decrypt() {
  const privateKeyPem = document.getElementById('privateKeyInput').value;
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
  const encryptedText = forge.util.decode64(document.getElementById('outputInput').value);
  const decrypted = privateKey.decrypt(encryptedText);
  document.getElementById('outputInput').value = decrypted;
}

// Обработчики событий
document.getElementById('generate-keys-btn').addEventListener('click', generateKeys);
document.getElementById('encrypt-btn').addEventListener('click', encrypt);
document.getElementById('decrypt-btn').addEventListener('click', decrypt);