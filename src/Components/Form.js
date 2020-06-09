import React from 'react'

function Form(props) {

    const handleSubmit = async e => {
        e.preventDefault()
        const city = document.getElementById('city').value
        props.Change('city', city)
        const URL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=384866654f4fc4624e3a143658f91f0e';
        try {
            const response = await fetch(URL);
            const data = await response.json();
            let temp = data.main.temp - 273.15
            const lat = data.coord.lat
            const lon = data.coord.lon
            const d = new Date()
            const h = d.getUTCHours()
            let time = h + (data.timezone / 3600)
            if (time < 0) {
                time = 24 - Math.abs(time)
            }
            const sunset = new Date(data.sys.sunset * 1000)
            const date_sunset = sunset.getUTCDate()
            const date_today = d.getUTCDate()
            const sunrise = new Date(data.sys.sunrise * 1000)
            const date_sunrise = sunrise.getUTCDate()
            let sunset_hours = null
            let sunrise_hours = null
            if (date_sunset === date_today) {
                if (date_sunrise + 1 === date_today) {
                    if (data.timezone > 0) {
                        sunrise_hours = (sunrise.getUTCHours() + data.timezone / 3600) - 24
                    }
                    else { sunrise_hours = sunrise.getUTCHours() + data.timezone / 3600 }
                }
                sunset_hours = sunset.getUTCHours() + data.timezone / 3600
            }
            else if (date_sunset === date_today + 1) {
                if (date_sunrise + 1 === date_today) {
                    if (data.timezone > 0) {
                        sunrise_hours = (sunrise.getUTCHours() + data.timezone / 3600) - 24
                    }
                    else { sunrise_hours = sunrise.getUTCHours() + data.timezone / 3600 }
                }
                else {
                    sunrise_hours = sunrise.getUTCHours() + data.timezone / 3600
                }
                sunset_hours = 24 - Math.abs(data.timezone / 3600)
            }
            return props.Submit(temp, time, sunrise_hours, sunset_hours, city, lat, lon)
        }
        catch (err) {
            alert('City Not Found')
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input name='city' placeholder='City' id='city' className='col-lg-6 offset-lg-3 my-md-4' />
                <button type='submit' name='submit' className='btn btn-danger'>Search</button>
            </form>
        </>
    )
}

export default Form
