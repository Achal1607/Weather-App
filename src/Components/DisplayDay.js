import React from 'react'

function Display(props) {
    const { temp, city, uvi, humidity, weather } = props
    const smallStyle = { fontFamily: '"Arial Black", Gadget, sans-serif', fontSize: '0.5em' }
    const divStyle = { opacity: '0.75', backgroundColor: '#9BC004', textAlign: 'center', fontSize: '2em', color: 'black', fontFamily: '"Balsamiq Sans", cursive' }
    return (
        <>
            <div style={{ opacity: '0.8', backgroundColor: '#9BC004', textAlign: 'center', fontFamily: '"Amarante", cursive', fontSize: '2em' }} className='col-lg-3 m-auto p-lg-2'>
                <h2 style={{ fontFamily: '"Aclonica",sans-serif', fontSize: '2.5em' }}>{temp + '\u00B0C'}
                </h2>
                <p style={{ fontFamily: '"Metal Mania", cursive' }}>{city.toUpperCase()}</p>
            </div>

            <div className='d-flex'>
                
                <div style={divStyle} className='col-lg-3 mx-auto mt-lg-3'>
                    <span style={{ color: 'red' }}>Today</span>
                    <br />
                    <span style={{ textAlign: 'left' }}>{props.day[0].max + '\u00B0'}/{props.day[0].min + '\u00B0'}</span>
                    <br />
                    <small style={smallStyle}>UVI: {uvi}
                        <a href='https://en.wikipedia.org/wiki/Ultraviolet_index'><button className='btn'>&#8658;</button></a></small>
                    <br />
                    <small style={smallStyle}>{weather} , Humidity: {humidity}%</small>
                    <br />
                    <small style={smallStyle}>Wind Speed: {props.day[0].windSpeed} m/s</small>
                </div>

                <div style={divStyle} className='col-lg-3 mx-auto mt-lg-3'>
                    <span style={{ color: 'red' }}>Tommorow</span>
                    <br />
                    <span style={{ textAlign: 'left' }}>{props.day[1].max + '\u00B0'}/{props.day[1].min + '\u00B0'}</span>
                    <br />
                    <small style={smallStyle}>UVI: {props.day[1].uvi}
                        <a href='https://en.wikipedia.org/wiki/Ultraviolet_index'><button className='btn'>&#8658;</button></a></small>
                    <br />
                    <small style={smallStyle}>{props.day[1].weather} , Humidity: {props.day[1].humidity}%</small>
                    <br />
                    <small style={smallStyle}>Wind Speed: {props.day[1].windSpeed} m/s</small>
                </div>

                <div style={divStyle} className='col-lg-3 mx-auto mt-lg-3'>
                    <span style={{ color: 'red' }}>{props.day[2].dt}</span>
                    <br />
                    <span style={{ textAlign: 'left' }}>{props.day[2].max + '\u00B0'}/{props.day[2].min + '\u00B0'}</span>
                    <br />
                    <small style={smallStyle}>UVI: {props.day[2].uvi}
                        <a href='https://en.wikipedia.org/wiki/Ultraviolet_index'><button className='btn'>&#8658;</button></a></small>
                    <br />
                    <small style={smallStyle}>{props.day[2].weather} , Humidity: {props.day[2].humidity}%</small>
                    <br />
                    <small style={smallStyle}>Wind Speed: {props.day[2].windSpeed} m/s</small>
                </div>
            </div>
        </>
    )
}

export default Display
