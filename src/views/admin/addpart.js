import React, { Component, Fragment } from "react";
import IntlMessages from "../../helpers/IntlMessages";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import { Formik, Form, Field } from "formik";
import { Row, Label, FormGroup, Button } from "reactstrap";
import axios from 'axios';
import { NotificationManager } from "../../components/common/react-notifications";

export default class AddPart extends Component {
    addPart = (values) => {
      if (values.name && values.partType && values.description && values.variant && values.price)
      {
        axios
          .post("http://localhost:3000/shop/part", values)
          .then(() => {
            NotificationManager.success(
            "Form submitted successfully!",
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
              "Form not submitted",
              3000,
              null,
              null,
              ''
            )
          )
      }else{
        NotificationManager.warning(
          "Please fill all fields.",
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
                <Breadcrumb heading="console.addparts" match={this.props.match} />
                <Separator className="mb-5" />
              </Colxx>
            </Row>
            <Formik
                onSubmit={values => this.addPart(values)}
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
                  >
                    <option value='' disabled selected>Select Type</option>
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
                <div className="d-flex justify-content-end align-items-center">
                  <Button
                    color="primary"
                    className="btn-shadow"
                    size="lg"
                    type="submit"
                  >
                    <IntlMessages id="admin.addpart" />
                  </Button>
                </div>
              </Form>)}
              </Formik>
          </Fragment>
        )
    }
}
