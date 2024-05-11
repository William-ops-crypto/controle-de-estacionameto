import axios from "axios";

const api = axios.create({
   
   baseURL:"http://ec2-3-238-243-115.compute-1.amazonaws.com:8080/"
 
});




export default api ;