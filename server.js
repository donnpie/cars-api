//cars-api server.js

const express = require('express');
const fs = require('fs');
const fileName = 'cars.json';
const path = require('path');
//const cors = require('cors');

const app = express();

const port = process.env.PORT || 8080;

//For Heroku deployment
if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'cars/build')));
    app.get('*',(req,res)=> {res.sendFile(path.resolve(__dirname,
    'cars', 'build','index.html'));
    });
  }

//Body parser
app.use(express.json());

//Cross origin permission
// app.use(cors({
//     origin: ['*','http://localhost:3000', process.env.PORT]
// }));

app.get('/api', (req, res) => {
    //Get all cars
    const cars = getAllItems();
    res.json(cars);
});

app.get('/api/:id', (req, res) => {
    //View a specific car
    const car = findItem(req.params.id);
    res.json(car);
});

app.put('/api/:id', (req, res) => {
    //Update an existing car
    const id = parseInt(req.params.id);
    let car = findItem(id);
    console.log(car);
    if (car) {
        deleteItem(id);
        car.make = req.body.make ? req.body.make : car.make;
        car.model = req.body.model ? req.body.model : car.model;
        car.seats = req.body.seats ? req.body.seats : car.seats;
        addItemWithId(id, car.make, car.model, car.seats);
    }
    res.json(car);
});

app.post('/api', (req, res) => {
    //Add a new car
    //console.log('processing post request');
    const make = req.body.make;
    const model = req.body.model;
    const seats = req.body.seats;
    const id = addItem(make, model, seats)
    console.log('id: ', id);
    res.json(
        {
            id: id,
            make: make,
            model: model,
            seats: seats
        }
    );
});

app.delete('/api/:id', (req, res) => {
    //Delete a car
    console.log('processing delete request');
    const id = req.params.id;
    const car = findItem(id);
    if (car) {
        deleteItem(id)
    }
    res.json(car);
});


//Utility functions
//Read all items
function getAllItems(){
    try {
        let content = fs.readFileSync('cars.json');
        let data = JSON.parse(content);
        data = data.sort((x, y) => x.id - y.id);
        return data;
    }catch(e){ // file non-existent
        fs.writeFileSync('cars.json', '[]')
        return []
    }
}

//Find specific item by id
function findItem(id) {
    const cars = getAllItems();
    const item = cars.find(car => car.id == id)
    if (item) {
        return item;
    } else {
        return [];
    }
}

function getMaxId(cars) {
    //Finds the max id for the given list of cars
    let maxSoFar = 0;
    cars.forEach(car => {
        //console.log('id', car.id)
        if (car.id > maxSoFar) maxSoFar = car.id;
    });
    return  maxSoFar;
}

//Insert new item
function addItem(make, model, seats) {
    const cars = getAllItems(); 
    const maxId = getMaxId(cars);
    //console.log('max', maxId)
    const car = {
        id: maxId + 1,
        make,
        model,
        seats
    };
    cars.push(car);
    fs.writeFileSync('cars.json', JSON.stringify(cars));
    return car.id;
}

function addItemWithId(id, make, model, seats) {
    const cars = getAllItems(); 
    const car = {
        id: id,
        make,
        model,
        seats
    };
    cars.push(car);
    fs.writeFileSync('cars.json', JSON.stringify(cars));
    return car.id;
}

//Delete an item
function deleteItem(id) {
    const cars = getAllItems();
    const updatedCars = cars.filter(car => car.id != id);
    fs.writeFileSync('cars.json', JSON.stringify(updatedCars));
}

app.listen(port, () => {
    console.log(`Server listenining on port ${port}`);
})
