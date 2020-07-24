import React, { Component, Fragment } from "react";
import {
  Row,
  Card,
  CardTitle,
  CardBody,
  TabContent,
  TabPane,
  Badge,
  CardHeader,
  InputGroup,
  InputGroupAddon,
  Input,
  Button
} from "reactstrap";
import { Redirect } from "react-router-dom";
import classnames from "classnames";
import { Separator, Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { injectIntl } from "react-intl";
import { detailsQuestionsData } from "../../data/questions";
import CommentWithLikes from "../../components/pages/CommentWithLikes";
import { commentWithLikesData } from "../../data/comments";
import QuestionAnswer from "../../components/pages/QuestionAnswer";
import { NotificationManager } from "../../components/common/react-notifications";
import GalleryDetail from "../../containers/pages/GalleryDetail";
import axios from 'axios';
import './common.css';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.toggleTab = this.toggleTab.bind(this);
    this.state = {
      activeFirstTab: "1",
      isLoaded: false,
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
    axios.get("/shop/part/?_id="+this.state.id)
        .then(res => {
          return res.data[0];
        })
        .then(part => {
          this.setState({
            product: part,
            isLoaded: true
          })
        });
    this.getAllData()
  }
  getAllData() {
    axios.get("/shop/part")
        .then(res => {
          return res.data;
        })
        .then(parts => {
          this.setState({
            allProducts: parts
          })
        });
  }
  addToCart(id) {
    axios
      .post("/shop/cart", {partId: id})
      .then(() => {
        NotificationManager.success(
          "Added to cart!",
          "Success!",
          3000,
          null,
          null,
          ''
        )
        this.props.history.push('/cart')
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
              <Colxx xxs="12" xl="8" className="col-left">
                <Card className="mb-4">
                  <CardBody className="imageCard">
                    <img src={this.state.product.photo || 'https://www.oyorooms.com/officialoyoblog/wp-content/themes/inframe/assets/images/no-thumbnail-medium.png'} alt=""/>
                  </CardBody>
                </Card>
                <Card className="mb-4">
                  <CardHeader>
                    <div className="card-header-tabs">
                      <div className={classnames({
                          active: this.state.activeFirstTab === "1",
                          "nav-link": true,
                          "hoverable":true
                        })}
                        onClick={() => { this.toggleTab("1"); }}
                      >
                        <IntlMessages id="pages.reviews-title" />(6)  
                      </div>
                      <div className={classnames({
                          active: this.state.activeFirstTab === "2",
                          "nav-link": true,
                          "hoverable":true
                        })}
                        onClick={() => { this.toggleTab("2"); }}
                      >
                        <IntlMessages id="pages.questions-title" />(6)  
                      </div>
                    </div>
                  </CardHeader>

                  <TabContent activeTab={this.state.activeFirstTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Colxx sm="12">
                          <CardBody>
                            {
                              commentWithLikesData.map((item, index) => {
                                return (<CommentWithLikes data={item} key={item.key}></CommentWithLikes>);
                              })
                            }
                            <InputGroup className="comment-contaiener">
                              <Input placeholder={messages["pages.addComment"]}/>
                              <InputGroupAddon addonType="append">
                                <Button color="primary">
                                  <span className="d-inline-block">{messages["pages.send"]}</span> <i className="simple-icon-arrow-right ml-2"></i>
                                </Button>
                              </InputGroupAddon>
                            </InputGroup>
                          </CardBody>
                        </Colxx>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        <Colxx sm="12">
                          <CardBody>
                            {
                              detailsQuestionsData.map((item, index) => {
                                return (<QuestionAnswer data={item} key={item.key}></QuestionAnswer>);
                              })
                            }
                          </CardBody>
                        </Colxx>
                      </Row>
                    </TabPane>
                  </TabContent>
                </Card>

              </Colxx>

              <Colxx xxs="12" xl="4" className="col-right">
                <Card className="mb-4">
                  <CardBody>
                    <div className="mb-3">
                      <div className="post-icon mr-3 d-inline-block">
                        <div className="hoverable inline">
                          <i className="simple-icon-heart mr-1"></i>
                        </div>
                        <span>59 {messages["pages.likes"]}</span>
                      </div>

                      <div className="post-icon mr-3 d-inline-block">
                        <div className="hoverable inline">
                          <i className="simple-icon-bubble mr-1"></i>
                        </div>
                        <span>6 {messages["pages.reviews-title"]}</span>
                      </div>
                    </div>
                    <p className="mb-3 description">
                      {this.state.product.description}
                    </p>
                    <p className="text-muted text-small mb-2">{messages["forms.tags"]}</p>
                    <div className="actionButtons">
                      <Button color="secondary" onClick={()=> {this.addToCart(this.state.id)}}>Add to cart</Button>
                      <Button color="outline-secondary">Add to wishlist</Button>
                    </div>
                  </CardBody>
                </Card>
                <Card className="mb-4">
                  <CardBody>
                    <CardTitle>
                      <IntlMessages id="pages.similar-parts" />
                    </CardTitle>
                    {this.state.allProducts && <GalleryDetail items={this.state.allProducts} />}
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
