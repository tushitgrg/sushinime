import axios from "axios";

export async function fetchDataRedis(url) {
    const response = await axios.get(`https://sushinime.site/api/fetch?apiUrl=${btoa(url)}`)
    return response
    
}