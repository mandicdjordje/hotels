import axios from 'axios';

// async function hotelPagination(page, page_size) {
//   const pagination = await axios({
//     method: 'get',
//     url: `http://localhost:3001/api/v1/pagination?page=${page}page_size=${page_size}`,
//   });

//   console.log(pagination);

//   return pagination;
// }

export function getHotels(
  { page, pageSize, search } = { page: 1, pageSize: 10 }
) {
  const searchParam = search ? `&search=${search}` : '';

  return axios.get(
    `http://localhost:3001/api/v1/pagination?page=${page}&page_size=${pageSize}${searchParam}`
  );
}

export function searchHotel(name) {
  return axios.get(`http://localhost:3001/api/v1/hotel/search/${name}`);
}

export function getFacilities({ type } = { type: 'hotel' }) {
  return axios.get(`http://localhost:3001/api/v1/facilities/?type=${type}`);
}
