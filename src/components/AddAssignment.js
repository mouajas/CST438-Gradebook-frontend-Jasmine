import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import { SERVER_URL } from '../constants.js';
import TextField from '@mui/material/TextField';

class AddAssignment extends React.Component {
    constructor(props) {
        super(props);
        this.state = { assignmentName: "", dueDate: "", courseId: "" };
    }

    handleSubmit = () => {
        if ((this.state.assignmentName).length === 0) {
            toast.error("Assignment added failed", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            return;
        }
        const token = Cookies.get('XSRF-TOKEN');
        fetch(`${SERVER_URL}/assignment`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': token
                },
                body: JSON.stringify({
                    assignmentName: this.state.assignmentName,
                    dueDate: this.state.dueDate,
                    courseId: parseInt(this.state.courseId)
                })
            })
            .then(res => {
                if (res.ok) {
                    toast.success("Assignment successfully added", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                } else {
                    toast.error("Assignment added failed", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    console.error('Post http status =' + res.status);
                }
            })
            .catch(err => {
                toast.error("Assignment added failed", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                console.error(err);
            });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }


    render() {
        return (
            <div>
                <h1>Add New Assignment</h1>

                <br /><br />

                <TextField style={{ width: 200 }} label="Assignment Name" name="assignmentName" id="assignmentName"
                    onChange={this.handleChange} value={this.state.assignmentName} />

                <br /><br />

                <TextField style={{ width: 200 }} label="Due Date" name="dueDate" id="dueDate"
                    onChange={this.handleChange} value={this.state.dueDate} InputProps={{ inputProps: {} }} />

                <br /><br />

                <TextField style={{ width: 200 }} label="Course Id" name="courseId" id="courseId"
                    onChange={this.handleChange} value={this.state.courseId} />

                <br /><br />

                <Button id="Submit" variant="outlined" color="primary" style={{ margin: 10 }}
                    onClick={this.handleSubmit} >Submit</Button>
                <ToastContainer autoClose={1500} />
            </div>

        );
    }
}

export default AddAssignment;