import React, { Component } from 'react';
import ReactTable from 'react-table';
import moment from 'moment';
import 'react-table/react-table.css';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import EditCustomer from './EditCustomer';
import AddCustomer from './AddCustomer';
import Addtraining from './AddTraining';
import EditTraining from './EdtTraining';
class TrainingList extends Component {
    constructor(props) {
        super(props);
        this.state= {trainings: [], open: false,message: ''}
    }
    componentDidMount() {
        this.fetchTrainings();

        }

    fetchTrainings = () => {

        fetch("https://customerrest.herokuapp.com/api/trainings")
        .then(res => res.json())
        .then(jsondata => this.setState({trainings: jsondata.content}))



    }


    addTraining = newTraining => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTraining)
          })

          .then(res => this.fetchCustomers())
          .catch(err => console.error(err));;


    }


    deleteTraining = (link) => {
        if (window.confirm("are u sure")){
            fetch(link, {method: 'DELETE'})
            .then(res => this. fetchTrainings())
            .then(res => this.setState({open: true,message: 'Training deleted'}))
            .catch(err => console.log(err))



        }
    }

    render() {

        const columns = [
            {
                Header: "activity",
                accessor: "activity"

            },
            {
                Header: "duration",
                accessor: "duration"

            },
            {
                Header: "date",
                accessor: "date",
                Cell: row => <span>{moment(row.value).format("D.M.YYYY- hh:mm")}</span>
            },
            {
                Header: "",
                filterable: false,
                sortable: false,
                width: 100,
                accessor: 'links[0].href',
                Cell: ({value}) => <Button color="secondary" size="small" onClick={() => this.deleteTraining(value)}>Delete</Button>

            },
            {
                Header: "",
                filterable:false,
                sortable:false,
                widt: 90,
                accessor: "links[0].href",
                Cell: ({value,row}) => (<EditTraining editTraining={this.editTraining} training={row} link={value}/>)


            },



        ]

        return (
            <div>
                <h1>trainings</h1>
                <Addtraining addTraining={this.addTraining} />
                <ReactTable filterable="true" data={this.state.trainings} columns={columns}/>
            </div>
        );
    }
}

export default TrainingList;