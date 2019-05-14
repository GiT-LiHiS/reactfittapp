import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from './components/List';
import TrainingList from './components/TrainingList';
import { Link,BrowserRouter,Route,Switch } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Calender from './components/Calender';


class App extends Component {
    render() {
      return (
        <div className="App">
            <BrowserRouter>
            <div className="Frame" style={{ marginLeft: 24 }}>
            <Link to="/customers" style={{ textDecoration: "none" }}>
              <Button
                style={{ marginTop: 10, marginBottom: 10, marginRight: 5 }}
                variant="outlined"
              >
                Customers
              </Button>
            </Link>
            <Link to="/trainings" style={{ textDecoration: "none" }}>
              <Button
                style={{ marginTop: 10, marginBottom: 10, marginRight: 5 }}
                variant="outlined"
              >
                Trainings
              </Button>
            </Link>
            <Link to="/calender" style={{ textDecoration: "none" }}>
              <Button
                style={{ marginTop: 10, marginBottom: 10, marginRight: 5 }}
                variant="outlined"
              >
                calender
              </Button>
            </Link>



            <Switch>
              <Route exact path="/customers" component={List} />
              <Route path="/trainings" component={TrainingList} />
              <Route path="/calender" component={Calender} />

            </Switch>
          </div>

          </BrowserRouter>

        </div>
      );



    }


}

export default App;
