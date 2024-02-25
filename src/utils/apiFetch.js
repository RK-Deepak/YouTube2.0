import axios from 'axios';


const baseUrl="https://youtube138.p.rapidapi.com";
const options = {
  method: 'GET',
 params: {
    
    hl: 'en',
    gl: 'US',
    
  
    
  },

  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_APP_YOUTUBE_RAPID_KEY,
    'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
  }
};

export const fetchData=async (url)=>
{
    const {data}=await axios.get(`${baseUrl}/${url}`,options);

    return data;
    

}