import React, { Component } from 'react'

class Test extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            celsius: "",
            city: "",
            lon: 0,
            lat: 0
        }
    }
    async componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            let lati = position.coords.latitude;
            let long = position.coords.longitude;
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            this.setState({ lat: lati, lon: long },
                async () => {
                    const URL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + this.state.lat + '&lon=' + this.state.lon + '&appid=384866654f4fc4624e3a143658f91f0e';
                    const response = await fetch(URL);
                    this.setState({ isLoading: false })
                    const data = await response.json();
                    console.log(data);
                    this.setState({celsius:data.current.temp-273.15})
                })
        })
    }

    getTemperature = async (city) => {
        const URL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=384866654f4fc4624e3a143658f91f0e';
        const response = await fetch(URL);
        this.setState({ isLoading: false })
        const data = await response.json();
        console.log(data);
        this.setState({ celsius: data.main.temp - 273.15 });
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }
    render() {
        return (
            <div>
                <input type='text' name='city' onChange={this.handleChange} value={this.state.city} />
                <button onClick={() => this.getTemperature(this.state.city)}>Search</button>
                {this.state.isLoading ? <div>Loading...</div> : <div style={{color:'white'}}>{parseFloat(this.state.celsius).toFixed(0)}</div>}
            </div>
        )
    }
}

export default Test
