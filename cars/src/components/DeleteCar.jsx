import React from 'react';
import Button from './Button';
import './DeleteCar.css';
//import { Table } from 'react-bootstrap';

class DeleteCar extends React.Component {
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
            deleted: false
        };
        this.handleCarDetails = this.handleCarDetails.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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

    fetchCar(id) {
        //Fetch car details from server
        fetch('/api/' + id)
        .then(res => res.json())
        .then(
            (result) => {
                //console.log('result:', result);
                this.setState(() => {
                    return (
                        {
                            isLoaded: true,
                            car: result
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
    deleteData(url = ``, data = {name: "Sue"}) {
        return fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())  // parses response to JSON
        .then(data => {
            this.setState({deleted: true});
        });
    }

    renderCarId(car) {
        return (
            <option key={car.id}>{car.id}</option> 
        )
    }

    findCar(id) {
        //Finds a car by id from state
        //return this.state.cars.find(car => car.id === id);

        //Find car by id from api
        this.fetchCar(id);

    }

    handleCarDetails(e) {
        //Find a car in the dropdown list
        const id = parseInt(e.target.value);
        this.findCar(id);
    }

    handleDelete() {
        console.log("handleDelete");
        this.deleteData('/api/' + this.state.car.id);

    }

    render() {
        const {cars, car, deleted} = this.state;
        
        return (
            <div className="container">
                <h1>Delete a car:</h1>
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
                <ul className="list-unstyled">
                    {car && <li>Make: {car.make}</li>}
                    {car && <li>Model: {car.model}</li>}
                    {car && <li>Seats: {car.seats}</li>}
                </ul>
                {car && <Button label="Delete" handler={this.handleDelete}/>}
                {deleted && <p className="warning">Car has been deleted</p>}
            </div>
        );
    }
}

export default DeleteCar;

//References:

