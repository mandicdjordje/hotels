import axios from 'axios';

export default async function register(firstName, lastName, email, password) {
  try {
    await axios.post('http://localhost:3001/api/v1/auth/register', {
      firstName,
      lastName,
      password,
      email,
    });
    return {
      isSuccess: true,
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
  // return response.json();
}
