function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

let key = "#my$key!"; // Chave do algoritmo

// IIFE da S-BOX
let S = (function KSA(key) {
    let S = [];
    for (let i = 0; i < 8; i++) {
        S[i] = i;
    }

    let j = 0;
    for (let i = 0; i < 8; i++) {
        j = (j + S[i] + key.charCodeAt(i % key.length)) % 8;
        swap(S, i, j);
    }

    return S;
})(key);

// Key-stream
function PRGA(S, length) {
    let i = 0, j = 0;
    let keyStream = [];

    for (let k = 0; k < length; k++) {
        i = (i + 1) % 8;
        j = (j + S[i]) % 8;

        swap(S, i, j);

        let t = (S[i] + S[j]) % 8;
        keyStream.push(S[t]);
    }

    return keyStream;
}

// XOR
function applyXOR(message, keyStream) {
    let result = '';

    for (let k = 0; k < message.length; k++) {
        let encryptedChar = String.fromCharCode(message.charCodeAt(k) ^ keyStream[k]);
        result += encryptedChar;
    }

    return result;
}

let messages = ["mensagem", "msg", "mensagem 3"];

for (let i = 0; i < messages.length; i++) {
  let keyStream = PRGA(S, messages[i].length);
  let ciphertext = applyXOR(messages[i], keyStream);
  let decryptedText = applyXOR(ciphertext, keyStream);
  console.log("Mensagem original: ", messages[i]);
  console.log("Mensagem criptografada: ", ciphertext);
  console.log("Mensagem descriptografada: ", decryptedText);
}
