import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import EditCustomer from './EditCustomer';
import AddCustomer from './AddCustomer';

class List extends Component {
    constructor(props) {
        super(props);
        this.state= {customers: [], open: false,message: '',training: []}
    }

    componentDidMount() {
        this.fetchCustomers();

        }
    fetchCustomers = () => {

        fetch("https://customerrest.herokuapp.com/api/customers")
        .then(res => res.json())
        .then(jsondata => this.setState({customers: jsondata.content}))



    }
    deletecustomer = (link) => {
        if (window.confirm("are u sure")){
            fetch(link, {method: 'DELETE'})
            .then(res => this.fetchCustomers())
            .then(res => this.setState({open: true,message: 'customer deleted'}))
            .catch(err => console.log(err))



        }
    }


    addCustomer = newCustomer => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCustomer)
          })

          .then(res => this.fetchCustomers())
          .catch(err => console.error(err));;


    }


    editCustomer = (link, customer) => {
        fetch(link, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
          })

          .then(res => this.fetchCustomers())
          .then(res => this.setState({open: true,message: 'edited deleted'}))
          .catch(err => console.error(err));;


    }

    viewTraining = (link) => {

        fetch("https://customerrest.herokuapp.com/api/customers/"+{link}+"/trainings")
        .then(res => res.json())
        .then(jsondata => this.setState({training: jsondata.content}))


    }




    handleClose = () => {
        this.setState({open: false})
    }


    render() {
        const columns = [
            {
                Header: "firstname",
                accessor: "firstname"

            }
            ,
            {
                Header: "lastname",
                accessor: "lastname"

            },
            {
                Header: "streetaddress",
                accessor: "streetaddress"

            },
            {
                Header: "phone",
                accessor: "phone"

            },
            {
                Header: "phone",


            },
            {
                Header: "",
                filterable:false,
                sortable:false,
                widt: 90,
                accessor: "links[0].href",
                Cell: ({value,row}) => (<EditCustomer editCustomer={this.editCustomer} customer={row} link={value}/>)


            },
            {
                Header: "",
                filterable: false,
                sortable: false,
                width: 100,
                accessor: 'links[0].href',
                Cell: ({value}) => <Button color="secondary" size="small" onClick={() => this.deletecustomer(value)}>Delete</Button>

            },

            {
                Header: "",
                filterable: false,
                sortable: false,
                width: 100,
                accessor: 'links[2].href',
                Cell: ({value}) => <Button color="secondary" size="small" onClick={() => this.viewTraining(value)}>Trainings</Button>

            },









        ]



        return (
            <div>
                   <AddCustomer addCustomer={this.addCustomer} />
                 <ReactTable filterable="true" data={this.state.customers} columns={columns}/>
            </div>
        );
    }
}

export default List;