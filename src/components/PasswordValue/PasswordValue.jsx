import React from "react";
import "./passwordvalue.css";

const PasswordValue = ({ requirements, timeText }) => {
  const { length, upper, lower, number, special } = requirements;

  const renderItem = (met, text) => (
    <div className={`requirement-item ${met ? "met" : ""}`}>
      <div className={`icon ${met ? "met" : "unmet"}`}>{met ? "✓" : "✕"}</div>
      <span>{text}</span>
    </div>
  );

  return (
    <div>
      <div className="requirements">
        <div className="requirements-title">Требования к паролю:</div>

        {renderItem(length, "Минимум 8 символов")}
        {renderItem(upper, "Заглавные буквы (A-Z)")}
        {renderItem(lower, "Строчные буквы (a-z)")}
        {renderItem(number, "Цифры (0-9)")}
        {renderItem(special, "Специальные символы (!@#$%)")}
      </div>

      <div className="stats">
        <div className="stat-card">
          <div className="stat-value">{timeText}</div>
          <div className="stat-label">Время взлома</div>
        </div>
      </div>
    </div>
  );
};

export default PasswordValue;