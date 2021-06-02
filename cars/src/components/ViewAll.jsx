//components/viewAll.jsx

import React from 'react';
import './ViewAll.css';
import { Table } from 'react-bootstrap';

class ViewAll extends React.Component {
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
            ]
        };
        //this.componentDidMount = this.componentDidMount.bind(this);
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

    renderCar(car) {
        return (
            <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.seats}</td>
            </tr>
        )
    }

    render() {
        const {cars} = this.state;
        return (
            <div className="container">
                <h1>List of cars:</h1>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Number of seats</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map((car) => {
                            return (
                                this.renderCar(car)
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ViewAll;

//References:
//https://react-bootstrap.netlify.app/components/table/#tables
//https://www.youtube.com/watch?v=nV7Mf77GiOc
