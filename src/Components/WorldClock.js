import React from 'react';
import Clock from 'react-live-clock';

export default class WorldClock extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                Date: <Clock format={'DD-MM-YYYY'} ticking={true} timezone={this.props.timezone} />
                <br />
                Time: <Clock format={'HH:mm:ss'} ticking={true} timezone={this.props.timezone} />
            </>
        )
    }
}