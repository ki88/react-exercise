import React, {useEffect, useState} from 'react';
import {api} from '../../../services/api';
import {Button, Form} from 'react-bootstrap';
import s from './Filter.module.scss';

export const Filter = ({initialValue, onChange}) => {
  const [filter, setFilter] = useState(initialValue);
  const [manufacturers, setManufacturers] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    fetch();

    async function fetch() {
      const {manufacturers} = await api.getManufacturers();
      setManufacturers(manufacturers);
    }
  }, []);

  useEffect(() => {
    fetch();

    async function fetch() {
      const {colors} = await api.getColors();
      setColors(colors);
    }
  }, []);

  return (
    <div className={s.filter}>
      <Form.Group controlId={'Filter.Color'}>
        <Form.Label>Color</Form.Label>
        <Form.Control as={'select'} value={filter.color} onChange={e => setFilter({
          ...filter,
          color: e.target.value
        })}>
          <option value={''}>None</option>
          {colors.map(color => (
            <option key={color} value={color}>{color}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId={'Filter.Manufacturer'}>
        <Form.Label>Manufacturer</Form.Label>
        <Form.Control as={'select'} value={filter.manufacturer} onChange={e => setFilter({
          ...filter,
          manufacturer: e.target.value
        })}>
          <option value={''}>None</option>
          {manufacturers.map(manufacturer => (
            <option key={manufacturer.name} value={manufacturer.name}>{manufacturer.name}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <div className={s.footer}>
        <Button className={s.button} variant={'primary'} onClick={() => onChange(filter)}>Filter</Button>
      </div>
    </div>
  )
}
