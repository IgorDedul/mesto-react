import React from "react";

import logoHeader from '../images/logo-header.svg';

const Header = () => {
  return (
      <header className="header page__header">
        <img
          className="header__logo"
          src={logoHeader}
          alt="Логотип - надпись Mesto"
        />
      </header>
  );
};

export default Header;