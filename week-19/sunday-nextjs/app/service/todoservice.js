import axios from "axios";

const API_URL = "/api/todo"
const todoService = {
    
    getTodos: async()=>{
        try {
            const res  = await axios.get(API_URL);
            return res.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    getTodo: async (id) =>{
        try {
            const res = await axios.get(`${API_URL}/${id}`);
            return res.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}


export default todoService