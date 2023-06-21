import React from "react";

import logoHeader from '../images/header-logo.svg';

const Header = () => {
  return (
      <header className="header">
        <img
          className="header__logo"
          src={logoHeader}
          alt="Логотип - надпись Mesto"
        />
      </header>
  );
};

export default Header;