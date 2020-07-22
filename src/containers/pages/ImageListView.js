import React from "react";
import {
  Row,
  Card,
  CardBody,
  CardSubtitle,
  CardImg,
  CardText,
  CustomInput,
  Badge
} from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../components/common/CustomBootstrap";
import './common.css'

const ImageListView = ({ product, isSelect, collect, onCheckItem }) => {
  return (
    <Colxx sm="6" lg="4" xl="3" className="mb-3" key={product._id}>
      <ContextMenuTrigger id="menu_id" data={product._id} collect={collect}>
        <Card
          onClick={event => onCheckItem(event, product._id)}
          className={classnames({
            active: isSelect
          })}
        >
          <div className="position-relative">
            <NavLink to={`/buy/product?id=${product._id}`} className="w-40 w-sm-100">
              <CardImg className='cardImg' height='300px' top alt={product.name} src={product.photo || 'https://www.oyorooms.com/officialoyoblog/wp-content/themes/inframe/assets/images/no-thumbnail-medium.png' } />
            </NavLink>
            <Badge
              color={'secondary'}
              pill
              className="position-absolute badge-top-left text-capitalize"
            >
              {product.partType}
            </Badge>
          </div>
          <CardBody>
            <Row>
              <Colxx xxs="2">
                <CustomInput
                  className="item-check mb-0"
                  type="checkbox"
                  id={`check_${product._id}`}
                  checked={isSelect}
                  onChange={() => {}}
                  label=""/>
              </Colxx>
              <Colxx xxs="10">
                <CardSubtitle>{product.name}</CardSubtitle>
                <CardText className="text-muted text-small mb-0 font-weight-light">
                  {'₹' + product.price}
                </CardText>
              </Colxx>
            </Row>
          </CardBody>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ImageListView);
