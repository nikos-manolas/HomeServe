import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './nav.module.css';

const Nav = () => (
  <nav>
    <ul className = { styles.navUl }>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/job" activeClassName={ styles.navUlSelected }>Jobs</NavLink>
      </li>
      <li>
        <NavLink to="/tradesPeople" activeClassName={ styles.navUlSelected }>TradesPeople</NavLink>
      </li>
    </ul>
  </nav>
);

export default Nav;
