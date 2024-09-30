import axios from 'axios';

export async function logIn(value) {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/auth/logIn',
      {
        password: value.password,
        email: value.email,
      }
    );

    console.log(response.data.token);

    return { token: response.data.token };
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
}
