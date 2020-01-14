import React, {useEffect, useState} from 'react';
import {api} from '../../services/api';
import {Link} from 'react-router-dom';
import {Filter} from './Filter/Filter';
import {Pagination} from './Pagination/Pagination';
import {Container, Form} from 'react-bootstrap';
import s from './Search.module.scss';

export const Search = () => {
  const [cars, setCars] = useState([]);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [totalCarsCount, setTotalCarsCount] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [filter, setFilter] = useState({
    manufacturer: '',
    color: ''
  });

  useEffect(() => {
    fetch();

    async function fetch() {
      try {
        const {cars, totalPageCount, totalCarsCount} = await api.getCars({
          page: currentPage,
          sort: sortBy || null,
          manufacturer: filter.manufacturer || null,
          color: filter.color || null
        });
        setCars(cars);
        setTotalPageCount(totalPageCount);
        setTotalCarsCount(totalCarsCount);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  }, [currentPage, sortBy, filter]);

  const onFilterChange = (filter) => {
    setFilter(filter);
    setCurrentPage(1);
  };

  if (error) {
    return (
      <div className={s.search}>
        <Container>
          <h3>Something went wrong</h3>
        </Container>
      </div>
    )
  }

  return (
    <div className={s.search}>
      <Container>
        <div className={s.content}>
          <div className={s.left}>
            <Filter initialValue={filter} onChange={onFilterChange} />
          </div>
          <div className={s.right}>
            <div className={s.header}>
              <div className={'row'}>
                <div className={'col-8'}>
                  <h3>Available cars</h3>
                  Showing {cars.length} of {totalCarsCount} results
                </div>
                <div className={'col-4'}>
                  <Form.Group controlId={'Search.SortBy'}>
                    <Form.Label>Sort by</Form.Label>
                    <Form.Control as={'select'} value={sortBy} onChange={e => setSortBy(e.target.value)}>
                      <option value={''}>None</option>
                      <option value={'ask'}>Mileage - ask</option>
                      <option value={'des'}>Mileage - des</option>
                    </Form.Control>
                  </Form.Group>
                </div>
              </div>
            </div>
            <div className={s.items}>
              {cars.map((car, index) => (
                <div key={index} className={s.item}>
                  <div className={s.image} style={{backgroundImage: `url("${car.pictureUrl}")`}} />
                  <div className={s.details}>
                    <h3>{car.modelName}</h3>
                    <div className={s.info}>
                      Stock # {car.stockNumber} - {car.mileage.number} {car.mileage.unit} - {car.fuelType} - {car.color}
                    </div>
                    <div>
                      <Link to={`/cars/${car.stockNumber}`}>Details</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {!loading &&
            <Pagination page={currentPage} onPageChange={setCurrentPage} totalPageCount={totalPageCount} />
            }
          </div>
        </div>
      </Container>
    </div>
  )
};
