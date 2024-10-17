import axios from "axios";

export async function fetchDataRedis(url) {
    const response = await axios.get(`/api/fetch?apiUrl=${btoa(url)}`)
    return response
    
}