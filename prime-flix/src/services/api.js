import axios from 'axios'

// Base da URL https://api.themoviedb.org/3/
//URL DA API /movie/now_playing?api_key=47f64a8fcd0ec0ebc92622cbd50008a1


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api