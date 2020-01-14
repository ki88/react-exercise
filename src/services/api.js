import axios from 'axios';

const baseUrl = 'https://auto1-mock-server.herokuapp.com/api';

const request = async (data) => {
  try {
    const resp = await axios({
      ...data,
      url: `${baseUrl}/${data.url}`
    });
    return resp.data;
  } catch (e) {
    throw e.response.data;
  }
};

export const api = {
  getCars: (params) => request({
    url: 'cars',
    params
  }),

  getCar: (stockNumber) => request({
    url: `cars/${stockNumber}`
  }),

  getManufacturers: () => request({
    url: 'manufacturers'
  }),

  getColors: () => request({
    url: 'colors'
  })
};
