const express = require('express');
const fs = require('fs');
const fileName = 'cars.json';


const app = express();

const port = process.env.PORT || 8080;

//Body parser
app.use(express.json());

app.get('/api', (req, res) => {
    const cars = getAllItems();
    res.json(cars);
});

app.get('/api/:id', (req, res) => {
    const car = findItem(req.params.id);
    res.json(car);
});

app.post('/api', (req, res) => {
    //const car = findItem(req.params.id);
    const id = req.body.id;
    const make = req.body.make;
    const model = req.body.model;
    const seats = req.body.seats;
    addItem(id, make, model, seats)
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
    const id = req.params.id;
    const car = findItem(id);
    if (car) {
        deleteItem(id)
    }
    res.json(car);
});

app.put('/api/:id', (req, res) => {
    const id = req.params.id;
    let car = findItem(id);
    console.log(car);
    if (car) {
        deleteItem(id);
        car.make = req.body.make ? req.body.make : car.make;
        car.model = req.body.model ? req.body.model : car.model;
        car.seats = req.body.seats ? req.body.seats : car.seats;
        addItem(id, car.make, car.model, car.seats);
    }
    res.json(car);
});

//Utility functions
//Read all items
function getAllItems(){
    try {
        const content = fs.readFileSync('cars.json');
        return JSON.parse(content);
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
//Insert new item
function addItem(id, make, model, seats) {
    const cars = getAllItems(); 
    const car = {
        id,
        make,
        model,
        seats
    };
    cars.push(car);
    fs.writeFileSync('cars.json', JSON.stringify(cars));
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




