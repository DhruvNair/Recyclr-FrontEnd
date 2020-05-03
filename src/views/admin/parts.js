import React, { Component, Fragment } from "react";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import { Row , Table, Button} from "reactstrap";
import axios from 'axios';
import IntlMessages from "../../helpers/IntlMessages";

export default class Parts extends Component {
    state = {
        parts: []
    }
    deleteitem = (id) => {
        axios.delete(`/shop/part/`+id).then(
            this.getitems()
        )
    }
    getitems = () => {
        axios.get(`/shop/part/`)
            .then(res => {
                const parts = res.data;
                this.setState({ parts });
            })
    }
    addpart = () => {
        this.props.history.push('./addpart')
    }
    createTable = () => {
        let rows = [];
        var part;
        for (part in this.state.parts) {
          let children = [];
          let key = this.state.parts[part]._id
          children.push(<th onClick={() => {this.props.history.push('./editpart/?id='+key)}} scope="row" key={key + "number"}>{Number(part) + 1}</th>);
          children.push(<td onClick={() => {this.props.history.push('./editpart/?id='+key)}} key={key + "name"}>{this.state.parts[part].name}</td>);
          children.push(<td onClick={() => {this.props.history.push('./editpart/?id='+key)}} key={key + "type"}>{this.state.parts[part].partType}</td>);
          children.push(<td onClick={() => {this.props.history.push('./editpart/?id='+key)}} key={key + "price"}>{this.state.parts[part].price}</td>);
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
                    <Breadcrumb heading="console.parts" match={this.props.match} />
                    <div className="d-flex justify-content-end align-items-center mt-n5">
                        <Button
                            color="primary"
                            className="btn-shadow"
                            size="lg"
                            onClick={this.addpart}
                        >
                            <IntlMessages id="admin.addpart" />
                        </Button>
                    </div>
                    <Separator className="mb-5" />
                </Colxx>
                </Row>
                <Table id="details-list" hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Part Name</th>
                            <th>Type</th>
                            <th>Price</th>
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
