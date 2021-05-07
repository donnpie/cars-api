import React from 'react';
import './EditCar.css';
import Button from './Button.jsx';
//import { Table } from 'react-bootstrap';

class EditCar extends React.Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            cars: [
                {
                    id:1,
                    make: "Landy",
                    model: "Def",
                    seats: 2
                },
                {
                    id:2,
                    make: "Land Rover",
                    model: "Defender 90",
                    seats: 6
                }
            ],
            car: undefined,
            updated: false
        };
        this.handleCarDetails = this.handleCarDetails.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    //Function to make a call to the express server and get the cars
    componentDidMount() {
        fetch('/api')
        .then(res => res.json())
        .then(
            (result) => {
                //console.log('result:', result);
                this.setState(() => {
                    return (
                        {
                            isLoaded: true,
                            cars: result
                        }
                    )
                }
                );
            },
            (error) => {
                this.setState({
                    isLoaded: false,
                    error
                });
            }
        );
    }

    //Function to update car data
    putData(url = ``, data = {name: "Sue"}) {
    // Default options are marked with *
        return fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        .then(response => response.json()); // parses response to JSON
   }

    renderCarId(car) {
        return (
            <option key={car.id}>{car.id}</option> 
        )
    }

    findCar(id) {
        //Finds a car by id
        return this.state.cars.find(car => car.id === id);
    }

    handleCarDetails(e) {
        //Find a car in the dropdown list
        const id = parseInt(e.target.value);
        const car = this.findCar(id);
        this.setState({car});
    }

    handleUpdate(e) {
        //Updates the details for a given car
        e.preventDefault();

        //Get updated details from form
        const id = parseInt(this.state.car.id);
        const make = e.target.elements.make.value ? e.target.elements.make.value : this.state.car.make;
        const model = e.target.elements.model.value ? e.target.elements.model.value : this.state.car.model;
        const seats = e.target.elements.seats.value ? e.target.elements.seats.value : this.state.car.seats;
        const car = {
            id,
            make,
            model,
            seats
        }
        this.setState((prevstate) => {
            return (
                {   
                    car,
                    updated: true
                }
            );
        });

        //Send data to db (put request)
        this.putData('/api/' + car.id, car)
            .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
            .catch(error => console.error(error));
        
        //this.componentDidMount();
    }

    render() {
        const {cars, car, updated} = this.state;
        
        return (
            <div className="container">
                <h1>Edit car details:</h1>
                
                <div>
                    <label htmlFor="id" >
                        Select car ID:
                        <select name="id" id="" 
                            onChange={this.handleCarDetails}
                            className="m-4 p-1"
                        >
                            {cars.map((car)=>{
                                return this.renderCarId(car);
                            })}
                        </select>
                    </label>
                </div>
                <form  className="form-container"  onSubmit={this.handleUpdate}>
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
                    
                    <Button label="Update"/>
                </form>
                <h3>New values:</h3>
                <ul className="list-unstyled">
                    {updated && <li>Make: {car.make}</li>}
                    {updated && <li>Model: {car.model}</li>}
                    {updated && <li>Seats: {car.seats}</li>}
                </ul>
            </div>
        );
    }
}

export default EditCar;

//References:

