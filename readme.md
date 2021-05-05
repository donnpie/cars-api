# How to test the cars API

## Starting the server
To run in development mode (enables nodemon): `npm run dev`
To run in normal mode: `npm start`
Note that by default the server listens on port 8080

## Testing the API

- To see a list of all cars: http://localhost:8080/api. 
Type: GET

- To get the details for a specific car: http://localhost:8080/api/id, where id is the id number for the car. 
Type: GET

- To Add a new car: http://localhost:8080/api. 
Type: POST
Follow these steps to cofigure the body of the post request:
1. Under headers, add a key-value pair: KEY=Content-Type, VALUE: application.json
2. Under body, select raw, and then enter the raw json in the body field, eg
 `{
    "id": "3",
    "make": "Ford",
    "model": "Focus",
    "seats": "5"
}`

- To edit a specific car: http://localhost:8080/api/id, where id is the id number for the car. 
Type: PUT
Follow these steps to cofigure the body of the post request:
1. Under headers, add a key-value pair: KEY=Content-Type, VALUE: application.json
2. Under body, select raw, and then enter the raw json in the body field, eg
 `{
    "make": "Ford",
    "model": "Laser",
    "seats": "6"
}`
*Note: Do not include the id in the json - the id is passed as a parameter in the URL.*

- To delete a specific car: http://localhost:8080/api/id, where id is the id number for the car. 
Type: DELETE
