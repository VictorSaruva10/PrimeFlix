import { useEffect, useState } from 'react'
import { useParams, useNavigate, json } from 'react-router-dom'
import { toast } from 'react-toastify'


import './filme-info.css'

import api from '../../services/api'


function Filme(){

    const { id } = useParams()
    const navigate = useNavigate()

    const [filme, setFilme] = useState({})
    const [ loading,setLoading] = useState(true) 
 
    useEffect(()=>{

        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key:"47f64a8fcd0ec0ebc92622cbd50008a1",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data)
                setLoading(false)
            })
            .catch(()=>{
                navigate("/", {relative:true} )
                return
            })
        }
        loadFilme()

        return () =>{

        }
    },[navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix")


        let filmesSalvos = JSON.parse(minhaLista) || []

        const hasFilme = filmesSalvos.some((filmesSalvo)=>filmesSalvo.id === filme.id)

        if(hasFilme){
            toast.warn("Esse filme já esta na lista")
            return
        }

        filmesSalvos.push(filme)
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
        toast.success("Filme salvo")
    }

    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
             <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}alt={filme.title}></img>

             <h3>Sinopse</h3>
             <span>{filme.overview}</span>

             <strong>Avaliação: {filme.vote_average} / 10</strong>

             <div className='area-buttons'>
                <button id='salvar' onClick={salvarFilme}>Salvar</button>
                <button>
            <a target="blank" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
             </div>
        </div>
    )
}

export default Filme;