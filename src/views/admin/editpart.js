import React, { Component, Fragment } from "react";
import IntlMessages from "../../helpers/IntlMessages";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import { Formik, Form, Field } from "formik";
import { Row, Label, FormGroup, Button, InputGroup, InputGroupAddon, CustomInput } from "reactstrap";
import axios from 'axios';
import { NotificationManager } from "../../components/common/react-notifications";
import setAuthToken from "../../utils/setAuthToken";

export default class AddPart extends Component {
    constructor(props) 
    { 
      super(props); 
      const id = new URLSearchParams(this.props.location.search).get("id");
      axios.get("http://localhost:3000/shop/part/?_id="+id)
      .then(res =>{
        this.state = res.data[0];
        document.getElementsByName('name')[0].value = this.state.name;
        document.getElementsByName('partType')[0].value = this.state.partType;
        document.getElementsByName('description')[0].value = this.state.description;
        document.getElementsByName('price')[0].value = this.state.price;
        document.getElementsByName('variant')[0].value = this.state.variant;
        if (this.state.photo){document.getElementsByName('photo')[0].innerHTML = "<img src='"+this.state.photo+"'alt=''></img>"}
      }).catch(error => {
        this.props.history.push("/")
        NotificationManager.warning(
          "Can't find the part you are looking for",
          "There was an error",
          3000,
          null,
          null,
          ''
        )
      })
    }
    editPart = (values) => {
      if (!values.price){values.price = this.state.price}
      if (values.name !== "" && values.partType !== "" && values.description !== "" && values.variant !== "" && values.price > 0)
      {
        if(this.state.photo){values.photo = this.state.photo};
        axios
          .put("http://localhost:3000/shop/part/"+this.state._id, values)
          .then(() => {
            NotificationManager.success(
            "Saved Changes successfully!",
            "Success!",
            3000,
            null,
            null,
            ''
          )
          this.props.history.push('/admin')
        })
          .catch(error => 
            NotificationManager.warning(
              error,
              "Changes not saved",
              3000,
              null,
              null,
              ''
            )
          )
      }else{
        NotificationManager.warning(
          "Please fill all fields properly.",
          "Form error",
          3000,
          null,
          null,
          ''
        );
      }
    }
    render() {
        return (
            <Fragment>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading="console.editpart" match={this.props.match} />
                <Separator className="mb-5" />
              </Colxx>
            </Row>
            <Formik
                onSubmit={values => this.editPart(values)}
              >
              {({ errors, touched }) => (
              <Form>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="part.name" />
                  </Label>
                  <Field
                    className="form-control"
                    name="name"
                  />
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="part.type" />
                  </Label>
                  <Field
                    className="form-control"
                    name="partType"
                    component="select"
                    defaultValue = ''
                  >
                    <option value='' disabled>Select Type</option>
                    <option value='display'>Display</option>
                    <option value='battery'>Battery</option>
                    <option value='motherboard'>Motherboard</option>
                    <option value='camera'>Camera</option>
                    <option value='speaker'>Speaker</option>
                    <option value='fingerprint'>Fingerprint</option>
                    <option value='vibrator'>Vibrator</option>
                    <option value='charger'>Charger</option>
                  </Field>
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="part.description" />
                  </Label>
                  <Field
                    component="textarea"
                    className="form-control"
                    type="textarea"
                    name="description"
                  />
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="part.variant" />
                  </Label>
                  <Field
                    className="form-control"
                    name="variant"
                  />
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="part.price" />
                  </Label>
                  <Field
                    className="form-control"
                    type="number"
                    name="price"
                  />
                </FormGroup>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend" name="photo">Image</InputGroupAddon>
                  <CustomInput
                    type="file"
                    id="imageupload"
                    accept="image/*"
                    onChange={(event) => {
                      let preimage = event.target.offsetParent.offsetParent.children[0]
                      event.target.labels[0].innerHTML = event.currentTarget.files[0].name;
                      if (event.currentTarget.files[0].type.startsWith("image")){
                        delete axios.defaults.headers.common["x-access-token"];
                        axios.post('https://api.imgur.com/3/image', event.target.files[0], {headers: {'Authorization': 'Client-ID 15930078733f17e'}, crossdomain: true})
                        .then((res) =>{
                          this.setState({photo:res.data.data.link});
                          preimage.innerHTML = "<img src='"+this.state.photo+"'alt=''></img>"
                        }).catch((err)=>{
                          console.log(err)
                        });
                        const token = localStorage.jwtToken;
                        setAuthToken(token);
                      }
                    }}
                  />
                </InputGroup>
                <div className="d-flex justify-content-end align-items-center">
                  <Button
                    color="primary"
                    className="btn-shadow"
                    size="lg"
                    type="submit"
                  >
                    <IntlMessages id="admin.savechanges" />
                  </Button>
                </div>
              </Form>)}
              </Formik>
          </Fragment>
        )
    }
}
