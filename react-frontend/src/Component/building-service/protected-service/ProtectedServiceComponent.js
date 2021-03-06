import React, { Component } from 'react';
import ProtectedServiceService from "./ProtectedServiceService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ProtectedService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProtectedService: {
                name: "",
                price: 0,
                any: "bao ve",
            },
            newProtectedService : {
                name: "",
                price: 0,
                any: "bao ve",
            },
        }
        toast.configure();
    }
    componentDidMount() {
        ProtectedServiceService.getCurrentProtectedService().then((response) => {
            if(response.data.code !== 404) {
                this.setState({currentProtectedService: response.data.data});
                this.setState({newProtectedService: response.data.data})
            }
        });
    }

    handleChanged = (event) => {
        let protectedService = this.state.newProtectedService;
        const name = event.target.name;
        const value = event.target.value;
        if(name === "name") {
            protectedService.name = value;
        } else if(name === "price"){
            protectedService.price = value;
        }
        else if(name === "any"){
            protectedService.any = value;
        }
        this.setState( {
            newProtectedService: protectedService
        })
    }


    addNewProtectedService() {
        if (this.state.newProtectedService.name === "" || this.state.newProtectedService.price === "" || this.state.newProtectedService.any === "") {
            toast.error('Please fill all the empty!!');
        } else {
        ProtectedServiceService.createProtectedService(this.state.newProtectedService)
            .then(() => this.componentDidMount());
        toast.success('Updated Protected Service successfully!!!');
        }
    }

    render() {
        return (
            <div>
                <div className="modal fade" id="formProtectedService" tabIndex="-1" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Protected Service Information</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"/>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">T??n</label>
                                        <input type="text" onChange={event => this.handleChanged(event)} className="form-control" name="name" id="name"
                                               value={this.state.newProtectedService.name}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="price" className="form-label">Gi??</label>
                                        <input type="number" onChange={event => this.handleChanged(event)} className="form-control"  name="price" id="price"
                                               value={this.state.newProtectedService.price}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="times" className="form-label">Kh??c</label>
                                        <input type="number"  onChange={event => this.handleChanged(event)} className="form-control"  name="any" id="any"
                                               value={this.state.newProtectedService.time}/>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                </button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                        onClick={(event) => this.addNewProtectedService(event)}>Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <main>
                    <div className="container-fluid px-4">
                        <h1 className="mt-4">Protected Service</h1>
                        <div className="card mb-4">
                            <div className="card-body">
                                <button type="button" className="btn btn btn-success" data-bs-toggle="modal"
                                        data-bs-target="#formProtectedService">Update
                                </button>
                            </div>
                        </div>
                        <div className="card mb-4">
                            <div className="card-header">
                                Th??ng tin d???ch v???
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered text-center">
                                    <tbody>
                                    <tr>
                                        <td> <b>T??n:</b></td>
                                        <td>{this.state.currentProtectedService.name}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Gi??:</b></td>
                                        <td>{this.state.currentProtectedService.price} vn??</td>
                                    </tr>
                                    <tr>
                                        <td><b>T???n su???t</b></td>
                                        <td>Lu??n lu??n</td>
                                    </tr>
                                    <tr>
                                        <td><b>B???t bu???c:</b></td>
                                        <td>C??</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

}

export default ProtectedService;
