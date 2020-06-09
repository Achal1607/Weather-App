import React, { Component } from 'react'
import Script from 'react-load-script'

export class Search extends Component {
    constructor(props) {
        super(props)

        this.state = {
            city: '',
            query: ''
        }
    }

    handleScriptLoad = () => {
        //Options for autocomplete 
        const options = { types: ['(cities)'] };
        this.autocomplete = new window.google.maps.places.Autocomplete(
            document.getElementById('search'),
            options);
        this.autocomplete.setFields([
            'formatted_address']);
        //Event Fired when suggested name is selected 
        this.autocomplete.addListener('place_changed',
            this.handlePlaceSelect);
    }

    handlePlaceSelect = () => {

        // Extract City From Address Object
        const addressObject = this.autocomplete.getPlace();
        const address = addressObject.address_components;
        console.log(addressObject);
        console.log(addressObject.address_components);              
        // Check if address is valid
        if (address) {
          // Set State
          this.setState(
            {
              city: address[0].long_name,
              query: addressObject.formatted_address,
            }
          );
        }
      }

      handleChange=(e)=>{
           this.setState({query:e.target.value})
      }

    render() {
        return (
            <div>
                <Script url='https://maps.googleapis.com/maps/api/js?key=AIzaSyDpmeAplwPaRYNbezXNtGGORM2hwj-ZT70&libraries=places' onLoad={this.handleScriptLoad} />
                <input type='text' name='search' placeholder='City Name' id='search' value={this.state.query} onChange={this.handleChange}/>
            </div>
        )
    }
}

export default Search
