import React, { Component } from "react";
import {
  Row,
  // UncontrolledDropdown,
} from "reactstrap";
import { injectIntl } from "react-intl";

import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
class CartPageHeading extends Component {
  constructor(props) {
    super();
    this.state = {
      dropdownSplitOpen: false,
      displayOptionsIsOpen: false
    };
  }

  toggleDisplayOptions = () => {
    this.setState(prevState => ({
      displayOptionsIsOpen: !prevState.displayOptionsIsOpen
    }));
  };
  toggleSplit =()=> {
    this.setState(prevState => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen
    }));
  }

  render() {
    // const { messages } = this.props.intl;
    const {
      // displayMode,
      // changeDisplayMode,
      // handleChangeSelectAll,
      // changeOrderBy,
      // changePageSize,
      // selectedPageSize,
      // totalItemCount,
      // selectedOrderOption,
      // match,
      // startIndex,
      // endIndex,
      // selectedItemsLength,
      // itemsLength,
      // onSearchKey,
      // orderOptions,
      // pageSizes,
      // toggleModal,
      handleClearCart,
      handlePlaceOrder,
      heading
    } = this.props;

    // const { displayOptionsIsOpen, dropdownSplitOpen } = this.state;
    return (
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id={heading} />
            </h1>

            <div className="text-zero top-right-button-container">
              {/* <Button
                color="primary"
                size="lg"
                className="top-right-button"
                onClick={()=>toggleModal()}>
                <IntlMessages id="pages.add-new" />
              </Button> */}
              {"  "}
              <div className="btn btn-outline-secondary btn-lg mr-3" onClick={() => {handleClearCart()}}>
                Empty Cart
              </div>
              <div className="btn btn-primary btn-lg" onClick={() => {handlePlaceOrder()}}>
                Place Order
              </div>
              {/* <ButtonDropdown
                isOpen={dropdownSplitOpen}
                toggle={this.toggleSplit}>
                <div className="btn btn-primary btn-lg pl-4 pr-0 check-button check-all">
                    <CustomInput
                      className="custom-checkbox mb-0 d-inline-block"
                      type="checkbox"
                      id="checkAll"
                      checked={selectedItemsLength >= itemsLength}
                      onChange={() => handleChangeSelectAll(true)}
                      label={
                        <span
                          className={`custom-control-label ${
                            selectedItemsLength > 0 &&
                            selectedItemsLength < itemsLength
                              ? "indeterminate"
                              : ""
                          }`}
                        />
                      }
                    />
                </div>
                <DropdownToggle
                  caret
                  color="primary"
                  className="dropdown-toggle-split btn-lg"/>
                <DropdownMenu right>
                  <DropdownItem>
                    <IntlMessages id="pages.delete" />
                  </DropdownItem>
                  <DropdownItem>
                    <IntlMessages id="buy.addToCart" />
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown> */}
            </div>
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
    );
  }
}

export default injectIntl(CartPageHeading);
