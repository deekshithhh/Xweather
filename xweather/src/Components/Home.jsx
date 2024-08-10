import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from './Card';
// import weather-cards from './Card.module.css'

export default function Xweather() {
    const [temp, setTemp] = useState('');
    const [humidity, setHumidity] = useState('');
    const [wind, setWind] = useState('');
    const [condition, setCondition] = useState('');
    const [isloading, setIsloading] = useState(false)
    const [city, setCity] = useState('')
    const handlesubmit = (e) => {
        e.preventDefault();
        console.log(city)
        // setCity(e.target.value)
        Callweather(city)
    }

    const Callweather = async (city) => {
        setIsloading(true)
        try {
            const response = await axios.get(' https://api.weatherapi.com/v1/current.json', {
                params: {
                    key: '7ff9fee314eb485eac9173113241008',
                    q: city

                }
            })
            console.log("Test")
            console.log(response.data);

            setCondition(response.data.current.condition.text);
            setWind(response.data.current.wind_kph);
            setTemp(response.data.current.temp_c);
            setHumidity(response.data.current.humidity)


            // console.log(response.data.current.condition.text, "Text");
            // console.log(response.data.current.humidity);
            // console.log(response.data.current.wind_kph);
            // console.log(response.data.current.temp_c);



        }
        catch (e) {
            alert("Failed to fetch weather data")
        }
        finally {

            setIsloading(false)
        }
    }


    return (
        <div>  <form onSubmit={handlesubmit}>
            <input type="text" onChange={(e) => { setCity(e.target.value) }} />
            <button type="submit">Search</button >
        </form >

            {isloading ? <p>Loading data…</p> : !isloading && <div className="weather-cards" style={{
                display: 'flex', gap: '10px',
                justifyContent: 'center', marginTop: '15px', alignItems: 'Center'
            }} >
                <Cards title="Temperature" value={temp} />
                <Cards title="Humidity" value={humidity} />
                <Cards title="Condition" value={condition} />
                <Cards title="Wind Speed" value={wind} />
            </div>

            }


        </div >


    )
}