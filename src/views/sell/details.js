import React, { Component, Fragment } from "react";
import {
  Row,
  Card,
  // CardTitle,
  CardBody,
  // TabContent,
  // TabPane,
  Badge,
  CustomInput,
  // CardHeader,
  // InputGroup,
  // InputGroupAddon,
  // Input,
  Button
} from "reactstrap";
import { Redirect } from "react-router-dom";
import { Separator, Colxx } from "../../components/common/CustomBootstrap";
import { injectIntl } from "react-intl";
import { NotificationManager } from "../../components/common/react-notifications";
import axios from 'axios';
import './common.css';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.toggleTab = this.toggleTab.bind(this);
    this.state = {
      activeFirstTab: "1",
      isLoaded: false,
      workingParts: [],
      estimate: "Not calculated",
      id: new URLSearchParams(this.props.location.search).get("id")
    };
    this.getData();
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeFirstTab: tab
      });
    }
  }
  getData() {
    axios.get("/shop/device/?_id="+this.state.id)
        .then(res => {
          return res.data[0];
        })
        .then(part => {
          this.setState({
            product: part,
            isLoaded: true
          })
        });
  }
  onChange(part) {
    const workingParts = this.state.workingParts
    let index
    if (!this.isSelected(part)) {
      workingParts.push(part)
    } else {
      index = workingParts.indexOf(part)
      workingParts.splice(index, 1)
    }
    this.setState({ workingParts: workingParts })
  }
  isSelected(part){
    return this.state.workingParts.includes(part)
  }
  getEstimate(){
    axios
      .post("/userSelling/estimate", {partsWorking: this.state.workingParts})
      .then((res) => {
        this.setState({
          estimate: res.data.estimate
        })
      }).catch(error => 
        NotificationManager.warning(
          error.response.data.message,
          "Something's not right",
          3000,
          null,
          null,
          ''
        )
      )
  }
  sell(){
    if(this.state.workingParts.length > 0){
      axios
      .post("/userSelling/userSale", {device: this.state.product._id, partsWorking: this.state.workingParts})
      .then((res) => {
        NotificationManager.success(
          "We received your sale request!",
          "Success!",
          3000,
          null,
          null,
          ''
        )
        this.props.history.push('/buy')
      }).catch(error => 
        NotificationManager.error(
          error.response.data.message,
          "Something's not right",
          3000,
          null,
          null,
          ''
        )
      )
    } else {
      NotificationManager.error(
        "We can't accept such a device!",
        "Sorry",
        3000,
        null,
        null,
        ''
      )
    }
  }
  render() {
    const { messages } = this.props.intl;
    if (this.state.id === '' || this.state.id === null) {
      return <Redirect to="/error" />
    }
    return !this.state.isLoaded ? (
      <div className="loading" />
    ) : (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <div className="heading">
              <h1>{this.state.product ? this.state.product.name : 'Loading'}</h1>
              <div className="text-zero top-right-button-container">
                <Badge color="outline-secondary" className="mb-1 mr-1 text-capitalize" pill>{this.state.product.partType}</Badge>
              </div>
            </div>
            <Separator className="mb-5" />

            <Row>
              <Colxx xxs="12" xl="4" className="col-left">
                <Card className="mb-2">
                  <CardBody className="imageCard">
                    <img src={this.state.product.photo || 'https://www.oyorooms.com/officialoyoblog/wp-content/themes/inframe/assets/images/no-thumbnail-medium.png'} alt=""/>
                  </CardBody>
                </Card>
              </Colxx>

              <Colxx xxs="12" xl="8" className="col-right">
                <Card className="mb-2">
                  <CardBody>
                    <h1>What works?</h1>
                    <div className="container">
                      {
                        this.state.product.parts.map((part, index) => {
                          return(
                            <div key={index} onClick={() => {this.onChange(part)}}>
                              <CustomInput
                                className="item-check mb-0 text-capitalize"
                                type="checkbox"
                                id={`check_${part._id}`}
                                onChange={() => {}}
                                checked={this.isSelected(part)}
                                label={part.partType}
                                value={part.name}/>
                            </div>
                          )
                        })
                      }
                    </div>
                    <p className="text-muted text-small mb-2">{messages["forms.tags"]}</p>
                    <div className="actionButtons">
                      <Button color="outline-secondary" onClick={()=> {this.getEstimate()}}>Get Estimate</Button>
                      <Button color="secondary" onClick={()=> {this.sell()}}>Place Sell Request</Button>
                    </div>
                    <div className="estimate mt-5 text-center">
                    <h3>Estimate for a device in this conditon : {this.state.estimate !== 'Not calculated' ? '₹' : ''}{this.state.estimate}</h3>
                    </div>
                  </CardBody>
                </Card>
              </Colxx>
            </Row>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(ProductDetails);
