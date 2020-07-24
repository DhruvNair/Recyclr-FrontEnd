import React from "react";
import { Card, Badge } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../components/common/CustomBootstrap";
import './common.css';

let getColor = status => {
  console.log(status)
  if (status === 'Rejected') {return 'danger'}
  else{
    if(status === 'Accepted') {return 'success'}
    else {return 'secondary'}
  }
}
const CartListView = ({ pickup, onClaim, onUnClaim }) => {
  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={pickup._id} >
        <Card
          onClick={event => {}}
          className={classnames("d-flex flex-row")}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`/pickups/pickup?id=${pickup._id}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {pickup.item.name || "Device name unavailable"}
                </p>
              </NavLink>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {pickup.item.manufacturer || "Device manufacturer unavailable"}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {'₹' + pickup.amount}
              </p>
              <div className="w-15 w-sm-100 text-capitalize">
                <Badge color={getColor(pickup.status)} pill>
                  {pickup.status}
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(CartListView);
