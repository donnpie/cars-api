import React from 'react';
//import './AddCar.css';
import Button from './Button.jsx';
//import { Table } from 'react-bootstrap';

class AddCar extends React.Component {
    constructor() {
        super();
        this.state = {
            car: undefined,
            updated: false
        };
        this.handleAdd = this.handleAdd.bind(this);
    }

    //Function to add car data
    postData(url = ``, data = {name: "Sue"}) {
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        .then(response => response.json()); // parses response to JSON
   }

    handleAdd(e) {
        //Adds the given car
        e.preventDefault();

        //Get updated details from form
        const make = e.target.elements.make.value ? e.target.elements.make.value : this.state.car.make;
        const model = e.target.elements.model.value ? e.target.elements.model.value : this.state.car.model;
        const seats = e.target.elements.seats.value ? e.target.elements.seats.value : this.state.car.seats;
        const car = {
            make,
            model,
            seats
        }
        

        //Send data to db (put request)
        this.postData('/api', car)
            .then(data => {
                console.log(data);
                this.setState(() => {
                    return (
                        {   
                            car: {
                                id: data.id,
                                make: data.make,
                                model: data.model,
                                seats: data.seats
                            },
                            updated: true
                        }
                    );
                });
            }) // JSON-string from `response.json()` call
            .catch(error => console.error(error));

    }

    render() {
        const {car, updated} = this.state;
        
        return (
            <div className="container">
                <h1>Add a new car:</h1>
                <form  className="form-container"  onSubmit={this.handleAdd}>
                    <label htmlFor="make">Make: 
                        <input type="text" 
                            name="make"
                            className="ml-4 p-1"
                            placeholder={car && car.make}
                        />
                    </label>
                    <label htmlFor="model">Model: 
                        <input type="text" 
                            name="model"
                            className="ml-4 p-1"
                            placeholder={car && car.model}
                        />
                    </label>
                    <label htmlFor="seats">Seats: 
                        <input type="text" 
                            name="seats"
                            className="ml-4 p-1"
                            placeholder={car && car.seats}
                        />
                    </label>
                    
                    <Button label="Add"/>
                </form>
                <h3>New values:</h3>
                <ul className="list-unstyled">
                    {updated && <li>Id: {car.id}</li>}
                    {updated && <li>Make: {car.make}</li>}
                    {updated && <li>Model: {car.model}</li>}
                    {updated && <li>Seats: {car.seats}</li>}
                </ul>
            </div>
        );
    }
}

export default AddCar;

//References:

