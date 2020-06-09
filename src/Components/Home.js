import React, { Component } from 'react'
import Form from './Form'
import DisplayDay from './DisplayDay'
import DisplayNight from './DisplayNight'
import Location from './Location'

export class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            city: "",
            celsius: "",
            time: null,
            sunset: null,
            uvi: null,
            humidity: null,
            windSpeed: null,
            lat: null,
            lon: null,
            sunrise: null,
            weather: null,
            day: []
        }
    }

    async componentDidMount() {
        navigator.geolocation.getCurrentPosition(async (position) => {
            this.setState({ isPosition: true })
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            const URL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=384866654f4fc4624e3a143658f91f0e';  
            try {
                const response = await fetch(URL);
                const data = await response.json();
                const d = new Date()
                const h = d.getUTCHours()
                const sunset = new Date(data.current.sunset * 1000)
                const sunset_hours = sunset.getUTCHours() + (data.timezone_offset / 3600)
                const cityIs = data.timezone.split('/')
                this.setState({
                    celsius: Math.floor(data.current.temp - 273.15),
                    time: Math.floor(data.timezone_offset / 3600) + h,
                    sunset: sunset_hours,
                    city: cityIs[1]+' timezone',
                    uvi: data.current.uvi,
                    humidity: data.current.humidity,
                    weather: data.current.weather[0].main,
                    windSpeed: data.current.wind_speed,
                    lat: lat,
                    lon: lon
                })
                this.setState(() => {
                    const updated = data.daily.map(item => {
                        const dt = new Date(item.dt * 1000)
                        const str = dt.toString()
                        const str_day = str.split(' ')
                        const d = {
                            dt: str_day[0],
                            min: Math.floor(item.temp.min - 273.15),
                            max: Math.floor(item.temp.max - 273.15),
                            humidity: item.humidity,
                            weather: item.weather[0].main,
                            windSpeed: item.wind_speed,
                            uvi: item.uvi
                        }
                        return d
                    })
                    return { day: updated }
                })
            }
            catch (err) {
                alert(err)
            }
        }, async error => {
            if (error.code === error.PERMISSION_DENIED) {
                const URL = 'https://api.openweathermap.org/data/2.5/onecall?lat=0&lon=0&appid=384866654f4fc4624e3a143658f91f0e';
                const response = await fetch(URL);
                const data = await response.json();
                const d = new Date()
                const h = d.getUTCHours()
                const sunset = new Date(data.current.sunset * 1000)
                const sunset_hours = sunset.getUTCHours() + (data.timezone_offset / 3600)
                this.setState({ celsius: Math.floor(data.current.temp - 273.15), city: 'Greenwich', country: 'UK', time: Math.floor(data.timezone_offset / 3600) + h, sunset: sunset_hours, weather: data.current.weather[0].main, windSpeed: data.current.wind_speed, lat: 0, lon: 0 })
                this.setState(() => {
                    const updated = data.daily.map(item => {
                        const dt = new Date(item.dt * 1000)
                        const str = dt.toString()
                        const str_day = str.split(' ')
                        const d = {
                            dt: str_day[0],
                            min: Math.floor(item.temp.min - 273.15),
                            max: Math.floor(item.temp.max - 273.15),
                            humidity: item.humidity,
                            weather: item.weather[0].main,
                            windSpeed: item.wind_speed,
                            uvi: item.uvi
                        }
                        return d
                    })
                    return { day: updated }
                })
            }
        });
    }

    Change = (name, value) => {
        this.setState({ [name]: value })
    }
    Submit = async (temp, time, sr, ss, city, lat, lon, weather) => {
        const URL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=384866654f4fc4624e3a143658f91f0e';
        try {
            const response = await fetch(URL);
            const data = await response.json();
            this.setState({ celsius: Math.floor(temp), time: time, sunrise: sr, sunset: ss, city: city, lat: lat, lon: lon, uvi: data.current.uvi, humidity: data.current.humidity, weather: data.current.weather[0].main, windSpeed: data.current.wind_speed })
            this.setState(() => {
                const updated = data.daily.map(item => {
                    const dt = new Date(item.dt * 1000)
                    const str = dt.toString()
                    const str_day = str.split(' ')
                    const d = {
                        dt: str_day[0], min: Math.floor(item.temp.min - 273.15),
                        max: Math.floor(item.temp.max - 273.15),
                        humidity: item.humidity,
                        weather: item.weather[0].main,
                        windSpeed: item.wind_speed,
                        uvi: item.uvi
                    }
                    return d
                })
                return { day: updated }
            })
        }
        catch (err) {
            alert('City Not Found')
        }
    }

    render() {

        if (this.state.time > this.state.sunset || this.state.time < this.state.sunrise) {
            document.body.style.backgroundImage = "url('images/night.jpg')"
            document.body.style.backgroundRepeat = 'no-repeat'
            document.body.style.backgroundSize = 'cover'
            var background = '#00172D'
        }
        else {
            document.body.style.backgroundImage = "url('images/day.jpg')"
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
                        <DisplayNight temp={this.state.celsius} city={this.state.city} uvi={this.state.uvi} humidity={this.state.humidity} weather={this.state.weather} day={this.state.day} />
                        :
                        <DisplayDay temp={this.state.celsius} city={this.state.city} uvi={this.state.uvi} humidity={this.state.humidity} weather={this.state.weather} day={this.state.day} />}
                    <Location lat={this.state.lat} lon={this.state.lon} city={this.state.city} />
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
