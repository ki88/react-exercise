import React from 'react';
import s from './Layout.module.scss';
import {Link} from 'react-router-dom';

export const Layout = ({children}) => (
  <div className={s.main}>
    <div className={s.navbar}>
      <Link to={'/'}>
        <img className={s.logo} src={'/logo.png'} alt={''} />
      </Link>
      <ul className={s.nav}>
        <li>
          <a href={'/'}>Purchase</a>
        </li>
        <li>
          <a href={'/'}>My Orders</a>
        </li>
        <li>
          <a href={'/'}>Sell</a>
        </li>
      </ul>
    </div>
    <div>
      {children}
    </div>
    <div className={s.footer}>© AUTO1 Group 2018</div>
  </div>
)
