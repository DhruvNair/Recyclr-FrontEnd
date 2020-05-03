import React, { Component, Fragment } from "react";
import IntlMessages from "../../helpers/IntlMessages";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import { Formik, Form, Field } from "formik";
import { Row , Label, FormGroup, Button } from "reactstrap";
import { NotificationManager } from "../../components/common/react-notifications";
import axios from 'axios';

export default class AddDevice extends Component {
    addDevice = (values) => {
      if (values.name && values.description && values.manufacturer && values.parts)
      {
        axios
          .post("http://localhost:3000/shop/device", values)
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
        const initialValues = '';
        return (
            <Fragment>
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading="console.adddevices" match={this.props.match} />
                <Separator className="mb-5" />
              </Colxx>
            </Row>
            <Formik
                onSubmit={values => this.addDevice(values)}
                initialValues={initialValues}
              >
              {({ errors, touched }) => (
              <Form>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="device.name" />
                  </Label>
                  <Field
                    className="form-control"
                    name="name"
                  />
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="device.description" />
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
                    <IntlMessages id="device.manufacturer" />
                  </Label>
                  <Field
                    className="form-control"
                    name="manufacturer"
                  />
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="device.parts" />
                  </Label>
                  <Field
                    className="form-control"
                    type="text"
                    name="parts"
                  />
                </FormGroup>
                <div className="d-flex justify-content-end align-items-center">
                  <Button
                    color="primary"
                    className="btn-shadow"
                    size="lg"
                    type="submit"
                  >
                    <IntlMessages id="admin.adddevice" />
                  </Button>
                </div>
              </Form>)}
              </Formik>
          </Fragment>
        )
    }
}
