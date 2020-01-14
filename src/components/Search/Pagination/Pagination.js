import React from 'react';
import {Button} from 'react-bootstrap';
import s from './Pagination.module.scss';

export const Pagination = ({page, onPageChange, totalPageCount}) => {
  const onNext = () => {
    if (page === totalPageCount) {
      return;
    }
    onPageChange(page + 1);
  };

  const onPrev = () => {
    if (page === 1) {
      return;
    }
    onPageChange(page - 1);
  };

  const onFirst = () => {
    onPageChange(1);
  };

  const onLast = () => {
    onPageChange(totalPageCount);
  };

  return (
    <div className={s.pagination}>
      <Button variant={'link'} onClick={onFirst}>First</Button>
      <Button variant={'link'} onClick={onPrev}>Previous</Button>
      <div className={s.info}>{page} of {totalPageCount}</div>
      <Button variant={'link'} onClick={onNext}>Next</Button>
      <Button variant={'link'} onClick={onLast}>Last</Button>
    </div>
  )
}
