import React, { Component, Fragment } from "react";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import { Row , Table, Button} from "reactstrap";
import axios from 'axios';
import IntlMessages from "../../helpers/IntlMessages";

export default class Admins extends Component {
    state = {
        admins: []
    }
    deleteitem = (id) => {
        axios.delete(`/admin/user/`+id).then(
            this.getitems()
        )
    }
    getitems = () => {
        axios.get(`/admin/user/?userType=admin`)
            .then(res => {
                const admins = res.data;
                this.setState({ admins });
            })
    }
    addadmin = () => {
        this.props.history.push('./addadmin')
    }
    createTable = () => {
        let rows = [];
        var admin;
        for (admin in this.state.admins) {
          let children = [];
          let key = this.state.admins[admin]._id
          children.push(<th scope="row" key={key + "number"}>{Number(admin) + 1}</th>);
          children.push(<td key={key + "name"}>{this.state.admins[admin].name}</td>);
          children.push(<td key={key + "email"}>{this.state.admins[admin].email}</td>);
          children.push(<td key={key + "phone"}>{this.state.admins[admin].phone}</td>);
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
                    <Breadcrumb heading="console.admins" match={this.props.match} />
                    <div className="d-flex justify-content-end align-items-center mt-n5">
                        <Button
                            color="primary"
                            className="btn-shadow"
                            size="lg"
                            onClick={this.addadmin}
                        >
                            <IntlMessages id="admin.addadmin" />
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
