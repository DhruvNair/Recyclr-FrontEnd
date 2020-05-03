import React, { Component, Fragment } from "react";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import { Row , Table, Button} from "reactstrap";
import axios from 'axios';
import IntlMessages from "../../helpers/IntlMessages";

export default class Partners extends Component {
    state = {
        partners: []
    }
    deleteitem = (id) => {
        axios.delete(`/admin/user/`+id).then(
            this.getitems()
        )
    }
    getitems = () => {
        axios.get(`/admin/user/?userType=partner`)
            .then(res => {
                const partners = res.data;
                this.setState({ partners });
            })
    }
    addpartner = () => {
        this.props.history.push('./addpartner')
    }
    createTable = () => {
        let rows = [];
        var partner;
        for (partner in this.state.partners) {
          let children = [];
          let key = this.state.partners[partner]._id
          children.push(<th scope="row" key={key + "number"}>{Number(partner) + 1}</th>);
          children.push(<td key={key + "name"}>{this.state.partners[partner].name}</td>);
          children.push(<td key={key + "email"}>{this.state.partners[partner].email}</td>);
          children.push(<td key={key + "phone"}>{this.state.partners[partner].phone}</td>);
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
                    <Breadcrumb heading="console.partners" match={this.props.match} />
                    <div className="d-flex justify-content-end align-items-center mt-n5">
                        <Button
                            color="primary"
                            className="btn-shadow"
                            size="lg"
                            onClick={this.addpartner}
                        >
                            <IntlMessages id="admin.addpartner" />
                        </Button>
                    </div>
                    <Separator className="mb-5" />
                </Colxx>
                </Row>
                <Table id="details-list" hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
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
