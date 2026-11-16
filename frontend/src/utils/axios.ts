import axios from 'axios';

const tank = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

tank.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          if (!window.location.pathname.includes('/signin')) {
            window.location.replace('/signin?sessionExpired=true');
          }
          break;
        default:
          console.error('Network error', error);
          break;
      }
    } else {
      console.error('Network connection error', error);
    }

    return Promise.reject(error);
  }
);

export default tank;
