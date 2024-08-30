import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://localhost:8800/api",
  withCredentials: true,
});
// const newRequest = axios.create({
//   baseURL: "https://demodeploy-2-as1i.onrender.com/api",
//   withCredentials: true,
// });

export default newRequest;
