import React, { Component, Fragment } from "react";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import { Row , Table, Button} from "reactstrap";
import axios from 'axios';
import IntlMessages from "../../helpers/IntlMessages";

export default class Devices extends Component {
    state = {
        devices: []
    }
    deleteitem = (id) => {
        axios.delete(`/shop/device/`+id).then(
            this.getitems()
        )
    }
    getitems = () => {
        axios.get(`/shop/device/`)
            .then(res => {
                const devices = res.data;
                this.setState({ devices });
            })
    }
    adddevice = () => {
        this.props.history.push('./adddevice')
    }
    createTable = () => {
        let rows = [];
        var device;
        for (device in this.state.devices) {
          let children = [];
          let key = this.state.devices[device]._id
          children.push(<th onClick={() => {this.props.history.push('./editdevice/?id='+key)}} scope="row" key={key + "number"}>{Number(device) + 1}</th>);
          children.push(<td onClick={() => {this.props.history.push('./editdevice/?id='+key)}} key={key + "name"}>{this.state.devices[device].name}</td>);
          children.push(<td onClick={() => {this.props.history.push('./editdevice/?id='+key)}} key={key + "manufacturer"}>{this.state.devices[device].manufacturer}</td>);
          children.push(<td className="delete-icon-container" key={key + "delete"}><i onClick={() => {this.deleteitem(key)}} className="simple-icon-trash d-block swell" /></td>);
          rows.push(<tr className="details-list-item" key={key}>{children}</tr>)
        }
        return rows
      }
    componentDidMount(){
        this.getitems();
    }
    render() {
        return (
            <Fragment>
                <Row>
                <Colxx xxs="12">
                    <Breadcrumb heading="console.devices" match={this.props.match} />
                    <div className="d-flex justify-content-end align-items-center mt-n5">
                        <Button
                            color="primary"
                            className="btn-shadow"
                            size="lg"
                            onClick={this.adddevice}
                        >
                            <IntlMessages id="admin.adddevice" />
                        </Button>
                    </div>
                    <Separator className="mb-5" />
                </Colxx>
                </Row>
                <Table id="details-list" hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Device Name</th>
                            <th>Manufacturer</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.createTable()}
                    </tbody>
                </Table>
            </Fragment>
        )
    }
}
