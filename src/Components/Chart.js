import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

export default function Chart(props) {
    // const today_date = new Date().toString().split(' ')[2]
    // console.log(props, typeof(today_date))
    // console.log(props.hours)
    if (props.hours.length > 4) {
        return (
            <div className='mt-5'>
                <AreaChart
                    width={1500}
                    height={400}
                    data={props.hours}
                    margin={{
                        top: 10, right: 30, left: 0, bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="txt" />
                    <YAxis dataKey={'temp'} />
                    <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} />
                    {props.time > props.sunset || props.time < props.sunrise ?
                        <Area type="monotone" dataKey='temp' stroke="#8884d8" fill="#8884d8" activeDot={{ r: 8 }} />
                        :
                        <Area type="monotone" dataKey='temp' stroke="#ff6363" fill="#01024e" activeDot={{ r: 8 }} />
                    }
                </AreaChart>
            </div>
        );
    }
    else {
        return (
            <h2 style={{ color: 'white', textAlign: 'center' }} className='col-3 mx-auto mt-5'>
                Sorry Data is Not Available
           </h2>
        )
    }
}
