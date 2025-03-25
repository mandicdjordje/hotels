import axios from 'axios';

export function getHotels(
  { page, pageSize, search } = { page: 1, pageSize: 10 }
) {
  const searchParam = search ? `&search=${search}` : '';

  return axios.get(
    `http://localhost:3001/api/v1/pagination/hotel?page=${page}&page_size=${pageSize}${searchParam}`
  );
}

export function searchHotel(name) {
  return axios.get(`http://localhost:3001/api/v1/hotel/search/${name}`);
}

export function getFacilities(
  { page, pageSize, type } = { page: 1, pageSize: 10, type: 'hotel' }
) {
  return axios.get(
    `http://localhost:3001/api/v1/pagination/facilities?page=${page}&page_size=${pageSize}&type=${type}`
  );
}

export function getCountries({ name } = { name: '' }) {
  const queryString = name ? `?name=${name}` : '';
  return axios.get(
    `http://localhost:3001/api/v1/location/countries${queryString}`
  );
}

export function getCitiesFromCountries(
  { country_code } = { country_code: '' }
) {
  const queryString = country_code ? `?country_code=${country_code}` : '';

  return axios.get(
    `http://localhost:3001/api/v1/location/cities${queryString}`
  );
}

export function CreateHotel(hotelForm) {
  console.log(hotelForm);

  return axios.post('http://localhost:3001/api/v1/hotel/createHotel', {
    hotel: hotelForm.hotel,
    location: hotelForm.location,
  });
}
