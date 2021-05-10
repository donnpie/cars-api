import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
//import Welcome from './components/Welcome.jsx'
//import HangmanApp from './components/HangmanApp.jsx'
//import Help from './components/Help.jsx'
import Header from './components/Header.jsx';
import ViewAll from './components/ViewAll.jsx';
import ViewCar from './components/ViewCar.jsx';
import EditCar from './components/EditCar.jsx';
import AddCar from './components/AddCar.jsx';
import DeleteCar from './components/DeleteCar.jsx';

//For Heroku deployment
// if (process.env.NODE_ENV === 'production'){
//   app.use(express.static(path.join(__dirname, 'cars/build')));
//   app.get('*',(req,res)=> {res.sendFile(path.resolve(__dirname,
//   'cars', 'build','index.html'));
//   });
// }
  


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Route exact={true} path="/" component={ViewAll} />
        <Route  path="/view" component={ViewCar} />
        <Route  path="/edit" component={EditCar} />
        <Route  path="/add" component={AddCar} />
        <Route  path="/delete" component={DeleteCar} />
      </BrowserRouter>
    </div>
  );
}

export default App;
