import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from './Card';
import styles from './Card.module.css'

export default function Xweather() {
    const [temp, setTemp] = useState('');
    const [humidity, setHumidity] = useState('');
    const [wind, setWind] = useState('');
    const [condition, setCondition] = useState('');
    const [formdata, setFormdata] = useState({
        temp: temp,
        hum: humidity,
        cond: condition,
        wind: wind
    })
    const [city, setCity] = useState('')
    const handlesubmit = (e) => {
        e.preventDefault();
        console.log(city)
        // setCity(e.target.value)
        Callweather(city)
    }

    const Callweather = async (city) => {

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

    }


    return (
        <div>  <form onSubmit={handlesubmit}>
            <input type="text" onChange={(e) => { setCity(e.target.value) }} />
            <button type="submit">Search</button >
        </form >
            <div className={styles.card}>
                <Cards title="Temperature" value={temp} />
                <Cards title="Humidity" value={humidity} />
                <Cards title="Condition" value={condition} />
                <Cards title="Wind Speed" value={wind} />
            </div>

        </div>


    )
}