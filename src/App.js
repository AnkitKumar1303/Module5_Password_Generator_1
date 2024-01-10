
import React, { useState, useRef, useCallback, useEffect } from 'react';
import './App.css';

const App = () => {
  const [password, setPassword] = useState('');
  const lengthRef = useRef(null);
  const includeNumbersRef = useRef(false);
  const includeSpecialCharsRef = useRef(false);

  const focusInput = () => {
    if (lengthRef.current) {
      lengthRef.current.focus();
    }
  };

  useEffect(() => {
    focusInput();
  }, []);

  const generateRandomPassword = (length, includeNumbers, includeSpecialChars) => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let passwordCharset = charset;
    if (includeNumbers) passwordCharset += numbers;
    if (includeSpecialChars) passwordCharset += specialChars;

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * passwordCharset.length);
      generatedPassword += passwordCharset.charAt(randomIndex);
    }

    return generatedPassword;
  };

  const generatePassword = useCallback(() => {
    const length = lengthRef.current.value || 12; // Default length is 12
    const includeNumbers = includeNumbersRef.current.checked;
    const includeSpecialChars = includeSpecialCharsRef.current.checked;

    setPassword(generateRandomPassword(length, includeNumbers, includeSpecialChars));
    focusInput();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    
  };

  return (
    <div className="app">
      <h1>Secure Password Generator</h1>
      <div>
        <label>Password Length: </label>
        <input type="number" ref={(ref) => (lengthRef.current = ref)} />

        <label>
          Include Numbers:
          <input type="checkbox" ref={includeNumbersRef} />
        </label>

        <label>
          Include Special Characters:
          <input type="checkbox" ref={includeSpecialCharsRef} />
        </label>

        <button onClick={generatePassword}>Generate Password</button>
      </div>

      {password && (
        <div className="password-display">
          <h2>Generated Password:</h2>
          <p>{password}</p>
          <button onClick={copyToClipboard}>Copy to Clipboard</button>
        </div>
      )}
    </div>
  );
};

export default App;
