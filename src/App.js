import React, { useState } from 'react';
import { DES, enc } from 'crypto-js';

const App = () => {
  const [message, setMensaje] = useState('');
  const [encryptedMessage, setMensajeEncriptado] = useState('');
  const [decryptedMessage, setMensajeDesifrado] = useState('');
  const [key, setKey] = useState('');

  const configuraArchivo = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        setMensaje(fileContent);
        setMensajeEncriptado('');
        setMensajeDesifrado('');
        setKey('');
      };
      reader.readAsText(file);
    }
  };

  const mensajeEncriptado = () => {
    if (message && key.length === 8) {
      const encrypted = DES.encrypt(message, key).toString();
      setMensajeEncriptado(encrypted);
      setMensaje('');
      setMensajeDesifrado('');
      setKey('');
    }
  };

  const mensajeDesencriptado = () => {
    if (message && key.length === 8) {
      const decrypted = DES.decrypt(message, key).toString(enc.Utf8);
      setMensajeDesifrado(decrypted);
      setMensaje('');
      setMensajeEncriptado('');
      setKey('');
    }
  };

  const guardarMensajeCifrado = () => {
    const blob = new Blob([encryptedMessage], { type: 'text/plain' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'MensajeEncriptado.txt';
    downloadLink.click();
  };

  const guardarMensajeDesifrado = () => {
    const blob = new Blob([decryptedMessage], { type: 'text/plain' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'MensajeDesifrado.txt';
    downloadLink.click();
  };

  return (
    <div className="bg-teal-900 text-white min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl mb-4">Sistema de Cifrado/Desifrado DES</h2>
      <div className="flex flex-col items-center">
        <h4>Ingrese un un archivo que desee Cifrar / Desifrar</h4>
        <input
          type="file"
          accept=".txt"
          name="Archivo"
          onChange={(event) => configuraArchivo(event)}
          className="rounded py-2 px-4 mb-4"
        />
        <input
          type="text"
          placeholder="Clave (8 caracteres)"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="rounded py-2 px-4 mb-4 text-black"
          maxLength={8}
        />
        <div>
          <button onClick={mensajeEncriptado} className="rounded py-2 bg-sky-500/75 px-4 mb-4 mr-4">
            Cifrar
          </button>
          <button onClick={mensajeDesencriptado} className="rounded py-2 px-4 mb-4 bg-sky-500">
            Descifrar
          </button>
        </div>
        {encryptedMessage && (
          <div className="flex flex-col items-center">
            <button
              onClick={guardarMensajeCifrado}
              className="rounded py-2 px-4 bg-blue-500 text-white"
            >
              Guardar archivo cifrado
            </button>
            <textarea
              value={encryptedMessage}
              readOnly
              className="rounded py-2 px-4 mb-4 text-black"
              rows={6}
              cols={40}
            />
          </div>
        )}
        {decryptedMessage && (
          <div className="flex flex-col items-center">
            <button
              onClick={guardarMensajeDesifrado}
              className="rounded py-2 px-4 bg-blue-500 text-white"
            >
              Guardar archivo descifrado
            </button>
            <textarea
              value={decryptedMessage}
              readOnly
              className="rounded py-2 px-4 mb-4 text-black"
              rows={6}
              cols={40}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;