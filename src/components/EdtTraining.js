import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class EdtTraining extends Component {
    state = {
        open: false, date: '',duration: '',activity: '',customer: '',
      };
      handleClickOpen = () => {
        this.setState({ open: true });
        this.setState({
         date: this.props.training.date,
          duration: this.props.training.duration,
          activity: this.props.training.activity,
          customer: this.props.training.customer,
        })
      };

      handleClose = () => {
        this.setState({ open: false });
      };

      handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});


      }

      saveTraining = () => {
        const training = {
            date: this.props.training.date,
            duration: this.props.training.duration,
            activity: this.props.training.activity,
            customer: this.props.training.customer,


        }
        this.props.addTraining(this.props.link,training);
        this.handleClose();

      }






    render() {
        return (
            <div>
            <Button size="small"  color="primary" onClick={this.handleClickOpen}>
    edit Training
  </Button>
            <Dialog
    open={this.state.open}
    onClose={this.handleClose}
    aria-labelledby="form-dialog-title"
  >
    <DialogTitle id="form-dialog-title">Add new customer</DialogTitle>
    <DialogContent>

      <TextField
        autoFocus
        margin="dense"
        name="date"
        value={this.state.date}
         onChange= {this.handleChange}
        label="date"
        type="date"
        fullWidth
      />
        <TextField

        margin="dense"
        name="duration"
        value={this.state.duration}
         onChange= {this.handleChange}
        label="duration"
        type="number"
        fullWidth
      />
        <TextField

        margin="dense"
        name="activity"
        value={this.state.activity}
         onChange= {this.handleChange}
        label="activity"
        type="text"
        fullWidth
      />
        <TextField

        margin="dense"
        name="customer"
        value={this.state.customer}
         onChange= {this.handleChange}
        label="customer"
        type="text"
        fullWidth
      />


    </DialogContent>
    <DialogActions>
      <Button onClick={this.handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={this.saveTraining} color="primary">
    save
      </Button>Save
    </DialogActions>
  </Dialog>
      </div>
        );
    }
}

export default EdtTraining;