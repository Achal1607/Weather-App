import React, { Component } from 'react'
import Form from './Form'
import DisplayDay from './DisplayDay'
import DisplayNight from './DisplayNight'
import Location from './Location'
import '../icons.css'
import Chart from './Chart'
import Modal from './Modal'

export class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            city: "",
            celsius: "",
            sunset: null,
            sunrise: null,
            time: null,
            lat: null,
            lon: null,
            population: null,
            active: null,
            timezone: null,
            day: [],
            current: {},
            hourly: [],
            active_hours: []
        }
    }

    async componentDidMount() {
        //Permission For Location Access

        navigator.geolocation.getCurrentPosition(async (position) => {
            this.setState({ isPosition: true })
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            //API Call
            const URL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=384866654f4fc4624e3a143658f91f0e';
            try {
                const response = await fetch(URL);
                const data = await response.json();
                // console.log(data)
                const d = new Date()
                // console.log(d.toString())
                const h = d.getUTCHours()
                const sunset = new Date(data.current.sunset * 1000)
                const sunset_hours = sunset.getUTCHours() + (data.timezone_offset / 3600)

                const sunrise = new Date(data.current.sunrise * 1000)
                const sunrise_hours = sunrise.getUTCHours() + (data.timezone_offset / 3600)

                const cityIs = data.timezone.split('/')

                //Current Day 3 Hours Gap Weather Prediction

                let hour_day = data.hourly.filter((item, index) => {
                    const dt = new Date(item.dt * 1000).toString().split(' ')[2]
                    return (d.toString().split(' ')[2] === dt && index % 3 === 0)
                })

                hour_day = hour_day.map(item => {
                    const updatedDate = new Date(item.dt * 1000).getHours()
                    let time = 0
                    if (updatedDate < 12) {
                        time = updatedDate + 'am'
                    }
                    else {
                        time = (24 - updatedDate) + 'pm'
                    }
                    item.temp = Math.floor(item.temp - 273.15)

                    return { txt: time, ...item }
                })
                // console.log(hour_day)
                this.setState({
                    time: data.timezone_offset / 3600 + h,
                    lat: lat,
                    lon: lon,
                    active: d.toString().split(' ')[2],
                    active_hours: hour_day,
                    sunset: sunset_hours,
                    sunrise: sunrise_hours,
                    timezone: data.timezone,
                    city: cityIs[1] + ' timezone',
                    current: {
                        celsius: Math.floor(data.current.temp - 273.15),
                        uvi: data.current.uvi,
                        sunset: sunset,
                        sunrise: sunrise,
                        humidity: data.current.humidity,
                        weather: data.current.weather[0].main,
                        description: data.current.weather[0].description,
                        icon: data.current.weather[0].icon,
                        wind_speed: data.current.wind_speed,
                        feels_like: Math.floor(data.current.feels_like - 273.15),
                        dew_point: data.current.dew_point,
                        visibility: (data.current.visibility / 1000).toFixed(1),
                        pressure: data.current.visibility.toFixed(2),
                    }
                })

                //Daily Weather Prediction

                this.setState(() => {
                    const updated = data.daily.map(item => {
                        const dt = new Date(item.dt * 1000)
                        const str = dt.toString()
                        const str_day = str.split(' ')
                        const d = {
                            dt: str_day[0] + " " + str_day[1] + " " + str_day[2],
                            min: Math.floor(item.temp.min - 273.15),
                            max: Math.floor(item.temp.max - 273.15),
                            humidity: item.humidity,
                            weather: item.weather[0].main,
                            icon: item.weather[0].icon,
                            windSpeed: item.wind_speed,
                            uvi: item.uvi,
                        }
                        return d
                    })
                    return { day: updated }
                })
                
                //API Call For hourly prediction for 5 days

                const URL1 = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=384866654f4fc4624e3a143658f91f0e'
                try {
                    const response = await fetch(URL1);
                    const data1 = await response.json();
                    const date_today = new Date().toString().split(' ')
                    const Hourly = data1.list.filter(item => {
                        const date_list = item.dt_txt.split('-')[2].split(' ')[0]
                        return date_today[2] < date_list
                    })
                    // console.log(Hourly)
                    const updatedHourly = Hourly.map((item) => {
                        const updatedDate = new Date(item.dt * 1000).getHours()
                        let time
                        if (updatedDate < 12) {
                            time = updatedDate + 'am'
                        }
                        else {
                            time = (24 - updatedDate) + 'pm'
                        }
                        item.main.temp = Math.floor(item.main.temp - 273.15)

                        return { txt: time, dt: item.dt, ...item.main }
                    })
                    this.setState({ hourly: [...hour_day, ...updatedHourly] })
                    // console.log(this.state.hourly)
                    // console.log(updatedHourly)
                }
                catch (err) {
                    alert(err)
                }

            }
            catch (err) {
                alert(err)
            }
        }, 
        //If Location Access Permission Denied

        async error => {
            if (error.code === error.PERMISSION_DENIED) {
                const URL = 'https://api.openweathermap.org/data/2.5/onecall?lat=0&lon=0&appid=384866654f4fc4624e3a143658f91f0e';
                const response = await fetch(URL);
                const data = await response.json();
                const d = new Date()
                const h = d.getUTCHours()
                const sunset = new Date(data.current.sunset * 1000)
                const sunset_hours = sunset.getUTCHours() + (data.timezone_offset / 3600)

                const sunrise = new Date(data.current.sunrise * 1000)
                const sunrise_hours = sunrise.getUTCHours() + (data.timezone_offset / 3600)

                let hour_day = data.hourly.filter((item, index) => {
                    const dt = new Date(item.dt * 1000).toString().split(' ')[2]
                    return (d.toString().split(' ')[2] === dt && index % 3 === 0)
                })

                hour_day = hour_day.map(item => {
                    const updatedDate = new Date(item.dt * 1000).getHours()
                    let time = 0
                    if (updatedDate < 12) {
                        time = updatedDate + 'am'
                    }
                    else {
                        time = (24 - updatedDate) + 'pm'
                    }
                    item.temp = Math.floor(item.temp - 273.15)

                    return { txt: time, ...item }
                })

                this.setState({
                    celsius: Math.floor(data.current.temp - 273.15),
                    city: 'Greenwich',
                    time: Math.floor(data.timezone_offset / 3600) + h,
                    sunset: sunset_hours,
                    timezone: data.timezone,
                    sunrise: sunrise_hours,
                    active: d.toString().split(' ')[2],
                    active_hours: hour_day,
                    lat: 0,
                    lon: 0,
                    current: {
                        celsius: Math.floor(data.current.temp - 273.15),
                        uvi: data.current.uvi,
                        sunset: sunset,
                        sunrise: sunrise,
                        humidity: data.current.humidity,
                        weather: data.current.weather[0].main,
                        description: data.current.weather[0].description,
                        icon: data.current.weather[0].icon,
                        wind_speed: data.current.wind_speed,
                        feels_like: Math.floor(data.current.feels_like - 273.15),
                        dew_point: data.current.dew_point,
                        visibility: (data.current.visibility / 1000).toFixed(1),
                        pressure: data.current.visibility.toFixed(2),
                    }
                })
                this.setState(() => {
                    const updated = data.daily.map(item => {
                        const dt = new Date(item.dt * 1000)
                        const str = dt.toString()
                        const str_day = str.split(' ')
                        const d = {
                            dt: str_day[0] + " " + str_day[1] + " " + str_day[2],
                            min: Math.floor(item.temp.min - 273.15),
                            max: Math.floor(item.temp.max - 273.15),
                            humidity: item.humidity,
                            weather: item.weather[0].main,
                            icon: item.weather[0].icon,
                            windSpeed: item.wind_speed,
                            uvi: item.uvi,
                        }
                        return d
                    })
                    return { day: updated }
                })

                const URL1 = 'https://api.openweathermap.org/data/2.5/forecast?lat=0&lon=0&appid=384866654f4fc4624e3a143658f91f0e'
                try {
                    const response = await fetch(URL1);
                    const data1 = await response.json();
                    const date_today = new Date().toString().split(' ')
                    const Hourly = data1.list.filter(item => {
                        const date_list = item.dt_txt.split('-')[2].split(' ')[0]
                        return date_today[2] < date_list
                    })
                    // console.log(Hourly)
                    const updatedHourly = Hourly.map((item) => {
                        const updatedDate = new Date(item.dt * 1000).getHours()
                        let time
                        if (updatedDate < 12) {
                            time = updatedDate + 'am'
                        }
                        else {
                            time = (24 - updatedDate) + 'pm'
                        }
                        item.main.temp = Math.floor(item.main.temp - 273.15)

                        return { txt: time, dt: item.dt, ...item.main }
                    })
                    this.setState({ hourly: [...hour_day, ...updatedHourly] })
                    // console.log(this.state.hourly)
                    // console.log(updatedHourly)
                }
                catch (err) {
                    alert(err)
                }

            }
        });
    }

    handleClick = (dt) => {
        let updatedActive = this.state.hourly.filter(item => {
            const date_active = new Date(item.dt * 1000).toString().split(' ')[2]
            // console.log(date_active, " ", dt)
            return date_active === dt.split(' ')[2]
        })
        console.log(updatedActive)
        this.setState({ active: dt.split(' ')[2], active_hours: updatedActive })
    }

    Change = (name, value) => {
        this.setState({ [name]: value })
    }
    
    Submit = async (temp, time, sr, ss, city, lat, lon, weather) => {
        const URL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=384866654f4fc4624e3a143658f91f0e';

        try {
            const response = await fetch(URL);
            const data = await response.json();
            console.log(data)
            const sunrise_time = new Date(data.sunrise).toString()
            const sunset_time = new Date(data.sunrise).toString()

            const d_date = new Date()
            let hour_day = data.hourly.filter((item, index) => {
                const dt = new Date(item.dt * 1000).toString().split(' ')[2]
                return (d_date.toString().split(' ')[2] === dt && index % 3 === 0)
            })
            //   console.log(hour_day)
            hour_day = hour_day.map(item => {
                const updatedDate = new Date(item.dt * 1000).getHours()
                let time = 0
                if (updatedDate < 12) {
                    time = updatedDate + 'am'
                }
                else {
                    time = (24 - updatedDate) + 'pm'
                }
                item.temp = Math.floor(item.temp - 273.15)

                return { txt: time, ...item }
            })

            this.setState({
                time: time,
                city: city,
                sunrise: sr,
                sunset: ss,
                lat: lat,
                lon: lon,
                timezone: data.timezone,
                active_hours: hour_day,
                current: {
                    celsius: Math.floor(temp),
                    uvi: data.current.uvi,
                    sunrise: sunset_time,
                    sunset: sunrise_time,
                    humidity: data.current.humidity,
                    weather: data.current.weather[0].main,
                    icon: data.current.weather[0].icon,
                    description: data.current.weather[0].description,
                    wind_speed: data.current.wind_speed,
                    feels_like: Math.floor(data.current.feels_like - 273.15),
                    dew_point: data.current.dew_point,
                    visibility: (data.current.visibility / 1000).toFixed(1),
                    pressure: data.current.pressure.toFixed(2),
                }
            })
            this.setState(() => {
                const updated = data.daily.map(item => {
                    const str_day = new Date(item.dt * 1000).toString().split(' ')
                    // console.log(str_day)
                    const d = {
                        dt: str_day[0] + " " + str_day[1] + " " + str_day[2],
                        min: Math.floor(item.temp.min - 273.15),
                        max: Math.floor(item.temp.max - 273.15),
                        humidity: item.humidity,
                        weather: item.weather[0].main,
                        windSpeed: item.wind_speed,
                        icon: item.weather[0].icon,
                        uvi: item.uvi
                    }
                    return d
                })
                return { day: updated }
            })

            this.setState({ active: this.state.day[0].dt.split(' ')[2] })

            const URL1 = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=384866654f4fc4624e3a143658f91f0e'
            try {
                const response = await fetch(URL1);
                const data1 = await response.json();
                const date_today = new Date().toString().split(' ')
                const Hourly = data1.list.filter(item => {
                    const date_list = item.dt_txt.split('-')[2].split(' ')[0]
                    return date_today[2] < date_list
                })
                // console.log(Hourly)
                const updatedHourly = Hourly.map((item) => {
                    const updatedDate = new Date(item.dt * 1000).getHours()
                    let time
                    if (updatedDate < 12) {
                        time = updatedDate + 'am'
                    }
                    else {
                        time = (24 - updatedDate) + 'pm'
                    }
                    item.main.temp = Math.floor(item.main.temp - 273.15)

                    return { txt: time, dt: item.dt, ...item.main }
                })
                this.setState({ hourly: [...hour_day, ...updatedHourly] })
                // console.log(this.state.hourly)
                // console.log(updatedHourly)
            }
            catch (err) {
                alert(err)
            }
        }
        catch (err) {
            alert('City Not Found')
        }
    }

    render() {
        // console.log(this.state.active)
        // console.log(this.state.active_hours)
        if (this.state.time > this.state.sunset || this.state.time < this.state.sunrise) {
            if (this.state.current.weather === 'Haze') { document.body.style.backgroundImage = "url('images/night_haze.jpg')" }
            else if (this.state.current.weather === 'Rain') { document.body.style.backgroundImage = "url('images/night_rain.jpg')" }
            else if (this.state.current.weather === 'Thunderstorm') { document.body.style.backgroundImage = "url('images/night_thunderstorm.jpg')" }
            else if (this.state.current.weather === 'Snow') { document.body.style.backgroundImage = "url('images/night_snow.jpg')" }
            else { document.body.style.backgroundImage = "url('images/night.jpg')" }
            document.body.style.backgroundRepeat = 'no-repeat'
            document.body.style.backgroundSize = 'cover'
            var background = '#00172D'
        }
        else {
            if (this.state.current.weather === 'Haze') { document.body.style.backgroundImage = "url('images/day_haze.jpg')" }
            else if (this.state.current.weather === 'Rain') { document.body.style.backgroundImage = "url('images/day_rain.jpg')" }
            else if (this.state.current.weather === 'Thunderstorm') { document.body.style.backgroundImage = "url('images/day_thunderstorm.jpg')" }
            else if (this.state.current.weather === 'Snow') { document.body.style.backgroundImage = "url('images/day_snow.jpg')" }
            else { document.body.style.backgroundImage = "url('images/day.jpg')" }

            document.body.style.backgroundRepeat = 'no-repeat'
            document.body.style.backgroundSize = 'cover'
            background = '#1B842C'
        }
        if (this.state.day.length !== 0) {
            return (
                <div>
                    <h1 style={{ opacity: '0.9', backgroundColor: background, textAlign: 'center', color: 'white' }} className='p-md-4'>Weather App</h1>

                    <Form city={this.state.city} Change={this.Change} Submit={this.Submit} />
                    {(this.state.time > this.state.sunset || this.state.time < this.state.sunrise) ?
                        <DisplayNight temp={this.state.current.celsius} city={this.state.city} day={this.state.day} lat={this.state.lat} lon={this.state.lon} current={this.state.current} handleClick={this.handleClick} active={this.state.active} />
                        :
                        <DisplayDay temp={this.state.current.celsius} city={this.state.city} day={this.state.day} lat={this.state.lat} lon={this.state.lon} current={this.state.current} handleClick={this.handleClick} active={this.state.active} />}
                    <Chart hours={this.state.active_hours} active={this.state.active} sunrise={this.state.sunrise} sunset={this.state.sunset} time={this.state.time} />
                    <div className='offset-3'>
                        <Location lat={this.state.lat} lon={this.state.lon} city={this.state.city} />
                    </div>
                    <Modal timezone={this.state.timezone} lat={this.state.lat} lon={this.state.lon} city={this.state.city} />
                </div >
            )
        }
        else {
            return (
                <div>
                    <h1 style={{ opacity: '0.9', backgroundColor: background, textAlign: 'center', color: 'white' }} className='p-md-4'>Weather App</h1>
                    <h1 className='col-3 m-auto'>Loading.....</h1>
                </div>
            )
        }
    }
}

export default Home
