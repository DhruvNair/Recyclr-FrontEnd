import React, { Component, Fragment } from "react";
import {
  Row,
  Card,
  CardTitle,
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

class PickupDetails extends Component {
  constructor(props) {
    super(props);
    this.toggleTab = this.toggleTab.bind(this);
    this.state = {
      activeFirstTab: "1",
      isLoaded: false,
      workingParts: [],
      estimate: "Not calculated",
      parts: ['display','battery','motherboard','camera','speaker','fingerprint','vibrator','charger'],
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
    axios.get("/userSelling/userSale?_id="+this.state.id)
        .then(res => {
          return res.data[0];
        })
        .then(pickup => {
          console.log(pickup)
          this.setState({
            pickup: pickup,
            workingParts: pickup.partsWorking,
            estimate: pickup.amount,
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
  isSelected(partName){
    let isPresent = false;
    this.state.workingParts.forEach(part => {
      if (part.partType === partName){
        isPresent = true;
      }
    })
    return isPresent
  }
  myId(){
    const user = JSON.parse(localStorage.getItem('user'));
    return user._id;
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
  claim(){
    axios
    .post("/userSelling/claimUserSale", {purchaseId: this.state.pickup._id})
    .then((res) => {
      NotificationManager.success(
        "You claimed this pickup request!",
        "Success!",
        3000,
        null,
        null,
        ''
      )
      this.getData()
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
  }
  unclaim(){
    axios
    .post("/userSelling/unclaimUserSale", {purchaseId: this.state.pickup._id})
    .then((res) => {
      NotificationManager.success(
        "You unclaimed this pickup request!",
        "Success!",
        3000,
        null,
        null,
        ''
      )
      this.getData()
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
  }
  reject(){
    axios
    .post("/userSelling/rejectUserSale", {purchaseId: this.state.pickup._id})
    .then((res) => {
      NotificationManager.success(
        "You rejected this pickup request!",
        "Success!",
        3000,
        null,
        null,
        ''
      )
      this.getData()
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
  }
  accept(){
    axios
    .post("/userSelling/acceptUserSale", {purchaseId: this.state.pickup._id})
    .then((res) => {
      NotificationManager.success(
        "You accepted this pickup request!",
        "Success!",
        3000,
        null,
        null,
        ''
      )
      this.getData()
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
  }
  getColor = status => {
    console.log(status)
    if (status === 'Rejected') {return 'danger'}
    else{
      if(status === 'Accepted') {return 'success'}
      else {return 'secondary'}
    }
  }
  showLocation(){
    window.open('http://www.google.com/maps/place/'+this.state.pickup.seller.location.lat+','+this.state.pickup.seller.location.lng, '_blank')
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
              <h1>{this.state.pickup ? this.state.pickup.item.name : 'Loading'}</h1>
              <div className="text-zero top-right-button-container">
                <Badge color={this.getColor(this.state.pickup.status)} className="mb-1 mr-1 text-capitalize" pill>{this.state.pickup.status}</Badge>
              </div>
            </div>
            <Separator className="mb-5" />

            <Row>
              <Colxx xxs="12" xl="4" className="col-left">
                <Card className="mb-2">
                  <CardBody className="imageCard">
                    <img src={this.state.pickup.item.photo || 'https://www.oyorooms.com/officialoyoblog/wp-content/themes/inframe/assets/images/no-thumbnail-medium.png'} alt=""/>
                  </CardBody>
                </Card>
              </Colxx>
              <Colxx xxs="12" xl="4" className="col-right">
                <Card className="mb-2">
                  <CardBody>
                    <CardTitle>Details</CardTitle>
                    <div className="container">
                      <h3>User Details</h3>
                      <div className="container mb-5">
                        <div className="name">Name: {this.state.pickup.seller.name || 'Not Provided'}</div>
                        <div className="email">Email: {this.state.pickup.seller.email || 'Not Provided'}</div>
                        <div className="address">Address: {this.state.pickup.seller.address || 'Not Provided'}</div>
                        <div className="phone">Phone: {this.state.pickup.seller.phone || 'Not Provided'}</div>
                      </div>
                      {
                        (this.state.pickup.shop) ? (
                          <Fragment>
                            <h3>Partner Details</h3>
                            <div className="container mb-5">
                              <div className="name">Name: {this.state.pickup.shop.name || 'Not Provided'}</div>
                              <div className="email">Email: {this.state.pickup.shop.email || 'Not Provided'}</div>
                              <div className="address">Address: {this.state.pickup.shop.address || 'Not Provided'}</div>
                              <div className="phone">Phone: {this.state.pickup.shop.phone || 'Not Provided'}</div>
                            </div>
                          </Fragment>
                        ) : (' ')
                      }
                      {
                        (this.state.pickup.seller.location) ? (
                          <Fragment>
                            <div className="d-flex justify-content-center">
                              <Button color="primary" onClick={()=> {this.showLocation()}}>Find on maps</Button>
                            </div>
                          </Fragment>
                        ) : (' ') 
                      }
                    </div>
                  </CardBody>
                </Card>
              </Colxx>
              <Colxx xxs="12" xl="4">
                <Card className="mb-2">
                  <CardBody>
                    <CardTitle>What works?</CardTitle>
                    <div className="container">
                      {
                        this.state.parts.map((part, index) => {
                          return(
                            <div key={index}>
                              <CustomInput
                                className="item-check mb-0 text-capitalize"
                                type="checkbox"
                                id={part}
                                onChange={() => {}}
                                checked={this.isSelected(part)}
                                label={part}
                                value={part}/>
                            </div>
                          )
                        })
                      }
                    </div>
                    <p className="text-muted text-small mb-2">{messages["forms.tags"]}</p>
                    <div className="estimate mb-5 text-center">
                      <h3>Given estimate : {this.state.estimate !== 'Not calculated' ? '₹' : ''}{this.state.estimate}</h3>
                    </div>
                    {!this.state.pickup.shop ? (
                      this.state.pickup.seller._id !== this.myId() ? (
                        <div className="actionButtons">
                          <Button color="secondary" onClick={()=> {this.claim()}}>Claim</Button>
                        </div>
                      ) : ('')
                    ) : (
                      (this.state.pickup.shop._id === this.myId() && this.state.pickup.status === 'processing') ? (
                        <div className="actionButtons">
                          <Button color="danger" onClick={()=> {this.reject()}}>Reject</Button>
                          <Button color="outline-secondary" onClick={()=> {this.unclaim()}}>UnClaim</Button>
                          <Button color="success" onClick={()=> {this.accept()}}>Accept</Button>
                        </div>
                      ) : ('')
                    )}
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
export default injectIntl(PickupDetails);
