import React, { useState } from "react";
import Header from "./components/Header/Header";
import Password from "./components/Password/Password";
import PasswordValue from "./components/PasswordValue/PasswordValue";


const evaluatePassword = (password) => {
  const length = password.length >= 8;
  const upper = /[A-Z]/.test(password);
  const lower = /[a-z]/.test(password);
  const number = /[0-9]/.test(password);
  const special = /[!@#$%^&*().,_\-+=]/.test(password);

  const requirements = { length, upper, lower, number, special };
  const score = [length, upper, lower, number, special].filter(Boolean).length;

  let strengthText = "Очень слабая";
  let strengthClass = "weak";
  let activeBars = 1;
  let timeText = "Мгновенно";

  if (score <= 1) {
    strengthText = "Очень слабая";
    strengthClass = "weak";
    activeBars = 1;
    timeText = "Мгновенно";
  } else if (score === 2) {
    strengthText = "Слабая";
    strengthClass = "fair";
    activeBars = 2;
    timeText = "Несколько секунд";
  } else if (score === 3) {
    strengthText = "Средняя";
    strengthClass = "good";
    activeBars = 3;
    timeText = "Несколько минут";
  } else if (score >= 4) {
    strengthText = "Сильная";
    strengthClass = "strong";
    activeBars = 4;
    timeText = "Годы";
  }

  return {
    requirements,
    strengthText,
    strengthClass,
    activeBars,
    timeText,
  };
};

function App() {
  const [password, setPassword] = useState("");
  const strength = evaluatePassword(password);

  const downloadPassword = () => {
    if (!password) {
        alert("Сначала введите или сгенерируйте пароль!");
        return;
    }

    const fileText = `Ваш надежный пароль: ${password}\nДата создания: ${new Date().toLocaleString()}`;
    const blob = new Blob([fileText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'my_secure_password.txt'; 

    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const generateStrongPassword = () => {
    const length = 14;
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()_+-=,.";

    const required = [
      upperChars[Math.floor(Math.random() * upperChars.length)],
      lowerChars[Math.floor(Math.random() * lowerChars.length)],
      numberChars[Math.floor(Math.random() * numberChars.length)],
      specialChars[Math.floor(Math.random() * specialChars.length)],
    ];

    const allChars = upperChars + lowerChars + numberChars + specialChars;
    const remaining = [];

    for (let i = 0; i < length - required.length; i++) {
      remaining.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    const full = [...required, ...remaining];

    for (let i = full.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [full[i], full[j]] = [full[j], full[i]];
    }

    setPassword(full.join(""));
  };

  return (
    <div className="card">
      <div className="card-items">
        <Header />
        <Password
          password={password}
          onPasswordChange={handlePasswordChange}
          strengthText={strength.strengthText}
          strengthClass={strength.strengthClass}
          activeBars={strength.activeBars}
        />
        <PasswordValue
          requirements={strength.requirements}
          timeText={strength.timeText}
        />

       <div className="button-card">
        <button
          type="button"
          className="action-button"
          onClick={generateStrongPassword}
        >
          Сгенерировать надежный пароль
        </button>

        <button 
          onClick={downloadPassword}
          type="button"
          className="action-button-2"
        >
          Скачать пароль
        </button>
       </div>
      </div>
    </div>
  );
}

export default App;
