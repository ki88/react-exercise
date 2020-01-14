import React from 'react';
import {Link} from 'react-router-dom';
import s from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <div className={s.notFound}>
      <div className={s.content}>
        <img className={s.logo} src={'/logo.png'} alt={''} />
        <h2>404 - Not Found</h2>
        <p>
          Sorry, the page you are looking for does not exist.
        </p>
        <p>
          You can always go back to <Link to={'/'}>homepage</Link>.
        </p>
      </div>
    </div>
  )
}
