// app/api/anime/route.js
import redis from '@/lib/redis';


import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req) {
    
  const { searchParams } = new URL(req.url);
  const apiUrl = atob( searchParams.get('apiUrl'));
 console.log(apiUrl)
if(!apiUrl) return
  
  try {

    try{
      const cachedData = await redis.get(apiUrl);
      if (cachedData) {
        console.log('Returning cached data');
  
      return  NextResponse.json(JSON.parse(cachedData))
      // Return cached data
      }
    }catch{
      
    }
     
   

     
    
    

    // If no cached data, fetch from external API
    const response = await axios.get(apiUrl);
 console.log('fetching again')

    // Cache the new data in Redis with an expiry time (e.g., 1 hour)

    try{
      await redis.set(apiUrl, JSON.stringify(response.data), 'EX', 1200);
    }
    catch(e){
      console.log(e)
    }
   
   
    return  NextResponse.json(response.data)
   
    // Return fresh data
  } catch (error) {
    console.error('Error fetching data:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
