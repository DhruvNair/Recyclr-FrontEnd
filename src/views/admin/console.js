import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import IconCards from "../../containers/ui/IconCards";

export default class Console extends Component {
    render() {
        return (
            <Fragment>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading="menu.adminconsole" match={this.props.match} />
                <Separator className="mb-5" />
              </Colxx>
            </Row>
            <IconCards />
          </Fragment>
        )
    }
}
