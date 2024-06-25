import axios from "axios";

const api = axios.create({
   
   baseURL:"https://5c8d-18-206-58-63.ngrok-free.app/",
   //baseURL:"http://localhost:8080/",
   headers: {
      'ngrok-skip-browser-warning': 'application/x-www-form-urlencoded',
    
    }
 
});




export default api ;