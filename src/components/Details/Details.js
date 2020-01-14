import React, {useEffect, useState} from 'react';
import {api} from '../../services/api';
import {NotFound} from '../NotFound/NotFound';
import {useFavourites} from '../../hooks/useFavourites';
import {Button} from 'react-bootstrap';
import s from './Details.module.scss';

export const Details = (props) => {
  const [car, setCar] = useState();
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  const [stockNumber] = useState(props.match.params.stockNumber);

  useEffect(() => {
    fetch();

    async function fetch() {
      try {
        const {car} = await api.getCar(stockNumber);
        setCar(car);
      } catch (e) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
  }, [stockNumber]);

  const [favourites, setFavourites] = useFavourites();

  if (loading) {
    return (<></>)
  }

  if (notFound) {
    return (
      <NotFound />
    )
  }

  return (
    <div className={s.details}>
      <div className={s.top} style={{backgroundImage: `url("${car.pictureUrl}")`}} />
      <div className={s.bottom}>
        <div className={'row'}>
          <div className={'col-7'}>
            <div className={s.mainDetails}>
              <h3>{car.modelName}</h3>
              <div className={s.info}>
                Stock # {car.stockNumber} - {car.mileage.number} {car.mileage.unit} - {car.fuelType} - {car.color}
              </div>
              <div>
                This car is currently available and can be delivered as soon as tomorrow morning. Please be aware that
                delivery times shown in this page are not definitive and may change due to bad weather conditions.
              </div>
            </div>
          </div>
          <div className={'col-5'}>
            <div className={s.save}>
              {favourites.includes(stockNumber) &&
              <>
                This car in your collection of favourite items. Click button to remove it.
                <div className={s.footer}>
                  <Button variant={'primary'} className={s.button} onClick={() => setFavourites(favourites.filter(item => item !== stockNumber))}>Unsave</Button>
                </div>
              </>
              }
              {!favourites.includes(stockNumber) &&
              <>
                If you like this car, click the button and save it in your collection of favourite items.
                <div className={s.footer}>
                  <Button variant={'primary'} className={s.button} onClick={() => setFavourites([...favourites, stockNumber])}>Save</Button>
                </div>
              </>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
