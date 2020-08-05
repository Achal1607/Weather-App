import React, { Component } from 'react'

class Clock extends Component {
    constructor(props) {
        super(props)

        this.state = {
            time_hour: null,
            time_min: null,
            time_sec: null
        }
    }

    async componentDidMount() {
        const URL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + this.props.lat + '&lon=' + this.props.lon + '&appid=384866654f4fc4624e3a143658f91f0e'
        const response = await fetch(URL)
        const data = await response.json()
        const offset = (data.timezone_offset) / 3600
        this.interval = setInterval(() => this.setState(() => {
            const d = new Date()
            const d_min = d.getUTCMinutes()
            let place_hour = d.getUTCHours() + offset
            let min_offset = null
            if (place_hour < 0) {
                place_hour = Math.floor(place_hour + 24)
            }
            else if (place_hour > 24) {
                place_hour = Math.floor(place_hour - 24)
            }
            if ((Math.abs(offset) % Math.floor(Math.abs(offset))) !== 0 && offset!==0) {
                min_offset = 30
            }
            else {
                min_offset = 0
            }
            let place_min = d_min + min_offset
            if (place_min > 59) {
                place_hour = place_hour + 1
                place_min = place_min - 60
            }
            else if (place_min < 0) {
                place_hour = place_hour - 1
                place_min = place_min + 60
            }
            return {
                time_sec: d.getSeconds(),
                time_hour: place_hour,
                time_min: place_min,
            }
        }), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return (
            <div className='col-lg-2' style={{ fontFamily: '"Metal Mania", cursive', fontSize: '2em' }}>
                Time: {Math.floor(this.state.time_hour)} :  {this.state.time_min} : {this.state.time_sec}
            </div>
        )
    }
}

export default Clock
