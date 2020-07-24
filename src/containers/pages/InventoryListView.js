import React from "react";
import { Card, Badge, Button, ButtonGroup } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { Colxx } from "../../components/common/CustomBootstrap";
import './common.css'

const DataListView = ({ product, onAdd, onSubtract }) => {
  return (
    <Colxx xxs="12" className="mb-3">
        <Card
          className={classnames("d-flex flex-row")}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`/buy/product?id=${product._id}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {product.name}
                </p>
              </NavLink>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {''}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {'₹' + product.price}
              </p>
              <div className="w-15 w-sm-100 text-capitalize">
                <Badge color={'secondary'} pill>
                  {product.partType}
                </Badge>
              </div>
            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <ButtonGroup>
                <Button onClick={() => {onSubtract(product._id)}} color="primary">
                  -
                </Button>
                <Button color="outline-primary quantity">
                  {product.quantity}
                </Button>
                <Button onClick={() => {onAdd(product._id)}} color="primary">
                  +
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </Card>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);
