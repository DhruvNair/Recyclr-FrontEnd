import React from "react";
import { Card, CardBody } from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";

const IconCard = ({className="mb-4", icon, title, goto }) => {
  const link = "/admin" + goto
  return (
    <div className={`icon-row-item ${className}`} onClick={event => window.location.href = link}>
      <Card>
        <CardBody className="text-center">
          <i className={icon} />
          <p className="card-text font-weight-semibold mb-0">
            <IntlMessages id={title} />
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default IconCard;