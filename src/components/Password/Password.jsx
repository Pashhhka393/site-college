import React, { useState } from "react";
import "./password.css";

const Password = ({
  password,
  onPasswordChange,
  strengthText,
  strengthClass,
  activeBars,
}) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible((prev) => !prev);

  const bars = [1, 2, 3, 4];

  return (
    <div>
      <div className="input-group">
        <div style={{ position: "relative" }}>
          <input
            type={visible ? "text" : "password"}
            className="password-input"
            placeholder="Введите пароль"
            value={password}
            onChange={onPasswordChange}
          />
          <button
            type="button"
            className="toggle-visibility"
            onClick={toggleVisibility}
          >
            👁
          </button>
        </div>
      </div>

      <div className="strength-meter">
        <div className="strength-label">
          <span>Надежность пароля</span>
          <span>{strengthText}</span>
        </div>
        <div className="strength-bars">
          {bars.map((bar) => (
            <div
              key={bar}
              className={`bar ${
                bar <= activeBars ? `active ${strengthClass}` : ""
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Password;