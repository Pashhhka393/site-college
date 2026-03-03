import React from 'react'
import './header.css'

const Header = () => {
  return (
    <div>
         <header className="header-card">
          <div className="icon-card">🔐</div>
          <h1>Password Strength Checker</h1>
          <p className="subtitle">Проверьте надежность вашего пароля</p>
        </header>
    </div>
  )
}

export default Header