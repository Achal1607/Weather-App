import React from 'react'
// import Clock from './Clock'

function Display(props) {
    const { temp, city } = props
    const smallStyle = { fontFamily: '"Arial Black", Gadget, sans-serif', fontSize: '0.5em' }
    const divStyle = { textAlign: 'center', fontSize: '2em', color: 'black', fontFamily: '"Balsamiq Sans", cursive' }
    const seven_days = props.day.filter((item, index) => index < 6)
    const activeStyle = { textAlign: 'center', fontSize: '1.75em', color: 'black', fontFamily: '"Balsamiq Sans", cursive', backgroundColor: '#87ceeb' }
    return (
        <>
            {/* <div className='col-lg-12 offset-5 mb-lg-1'>
                <Clock lat={props.lat} lon={props.lon} />
            </div> */}

            {/* Current Weather Card */}

            <div style={{ textAlign: 'center', fontFamily: '"Balsamiq Sans", cursive', fontSize: '2em' }} className='col-lg-3 m-auto p-lg-2'>
                <p>{city.toUpperCase()}</p>
                <h2 style={{ fontSize: '2.5em' }}>
                    <img src={"http://openweathermap.org/img/wn/" + props.current.icon.toString() + "@2x.png"} alt='Weather Icon' />
                    {temp + '\u00B0C'}
                </h2>
                <p>{props.current.weather}<span style={{ fontSize: '0.7em' }}>{'(' + props.current.description + ')'}</span></p>
                <div className='d-flex' style={{ fontSize: '0.44em' }}>
                    <p style={{ fontWeight: '100px' }}>Feels Like :{props.current.feels_like + '\u00B0C'}</p>
                    <p className='ml-2' style={{ fontWeight: '100px' }}>Wind :{props.current.wind_speed} m/s</p>
                    <p className='ml-2' style={{ fontWeight: '100px' }}>Visibility :{props.current.visibility} km</p>
                </div>
                <div className='d-flex' style={{ fontSize: '0.44em' }}>
                    <p style={{ fontWeight: '100px' }}>Barometer :{props.current.pressure}mb</p>
                    <p className='ml-2' style={{ fontWeight: '100px' }}>Humidity :{props.current.humidity}%</p>
                    <p className='ml-2' style={{ fontWeight: '100px' }}>Dew Point :{(props.current.dew_point - 273.15).toFixed(1) + '\u00B0C'}</p>
                </div>
            </div>

            {/* Daily Weather Card */}

            <div className='row'>
                {seven_days.map(item => {
                    return (
                        <>
                            <div style={item.dt.toString().split(' ')[2] === props.active ? activeStyle : divStyle} className='col-xl-2 mx-auto mt-lg-5  col-md-6 col-sm-12 col-lg-3' id='daily_day' onClick={() => props.handleClick(item.dt)}>
                                <span>{item.dt}</span>
                                <br />
                                <span style={{ textAlign: 'left' }}>{item.max + '\u00B0'}/{item.min + '\u00B0'}</span>
                                <br />
                                <img src={"http://openweathermap.org/img/wn/" + item.icon.toString() + "@2x.png"} alt='Daily Weather Icon' />
                                <br />
                                <small style={smallStyle}>{item.weather} , Humidity: {item.humidity}%</small>
                                <br />
                                <small style={smallStyle}>Wind Speed: {item.windSpeed} m/s</small>
                                <br />
                            {item.dt.toString().split(' ')[2] === props.active?
                                <span style={{ fontSize: '2em' }}>&#8659;</span>:null}
                            </div>
                        </>
                    )
                }
                )}
            </div>
        </>
    )
}

export default Display
