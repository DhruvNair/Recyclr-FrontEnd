import React, { Component, Fragment } from "react";
import IntlMessages from "../../helpers/IntlMessages";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import { Formik, Form, Field } from "formik";
import { Row, Label, FormGroup, Button } from "reactstrap";
import axios from 'axios';
import { NotificationManager } from "../../components/common/react-notifications";

export default class AddAdmin extends Component {
    addAdmin = (values) => {
        if (values.name && values.email && values.password)
        {
          axios
            .post("http://localhost:3000/admin/createAdmin", values)
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
                <Breadcrumb heading="console.addadmin" match={this.props.match} />
                <Separator className="mb-5" />
              </Colxx>
            </Row>
            <Formik
                onSubmit={values => this.addAdmin(values)}
                initialValues={initialValues}
              >
              {({ errors, touched }) => (
              <Form>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="user.fullname" />
                  </Label>
                  <Field
                    className="form-control"
                    name="name"
                  />
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="user.email" />
                  </Label>
                  <Field
                    className="form-control"
                    name="email"
                    validate={this.validateEmail}
                  />
                  {errors.email && touched.email && (
                    <div className="invalid-feedback d-block">
                      {errors.email}
                    </div>
                  )}
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="user.password" />
                  </Label>
                  <Field
                    className="form-control"
                    type="password"
                    name="password"
                    validate={this.validatePassword}
                  />
                  {errors.password && touched.password && (
                    <div className="invalid-feedback d-block">
                      {errors.password}
                    </div>
                  )}
                </FormGroup>
                <div className="d-flex justify-content-end align-items-center">
                  <Button
                    color="primary"
                    className="btn-shadow"
                    size="lg"
                    type="submit"
                  >
                    <IntlMessages id="admin.addadmin" />
                  </Button>
                </div>
              </Form>)}
              </Formik>
          </Fragment>
        )
    }
}
