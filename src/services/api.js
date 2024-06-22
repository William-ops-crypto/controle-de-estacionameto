import axios from "axios";

const api = axios.create({
   
   baseURL:"https://c07d-18-206-58-63.ngrok-free.app/",
   headers: {
      'ngrok-skip-browser-warning': 'application/x-www-form-urlencoded',
    
    }
 
});




export default api ;