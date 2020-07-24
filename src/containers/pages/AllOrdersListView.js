import React from "react";
import { Card, Badge } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { Colxx } from "../../components/common/CustomBootstrap";
import './common.css';

let getColor = status => {
  if (status === 'Rejected') {return 'danger'}
  else{
    if(status === 'Accepted') {return 'success'}
    else {return 'secondary'}
  }
}
let getProperDate = date => {
  return new Date(date).toLocaleString();
}
const OrdersListView = ({ order, onClaim, onUnClaim }) => {
  console.log(order._id)
  return (
    <Colxx xxs="12" className="mb-3">
        <Card
          onClick={event => {}}
          className={classnames("d-flex flex-row")}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`/allorders/order?id=${order._id}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {((order.items.length + ' Parts') || "Order size unavailable")}
                </p>
              </NavLink>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {getProperDate(order.date) || "Order date unavailable"}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {'₹' + order.amount}
              </p>
              <div className="w-15 w-sm-100 text-capitalize">
                <Badge color={getColor(order.status)} pill>
                  {order.status}
                </Badge>
              </div>
            </div>
          </div>
        </Card>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(OrdersListView);
