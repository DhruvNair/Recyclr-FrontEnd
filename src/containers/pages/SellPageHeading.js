import React, { Component } from "react";
import {
  Row,
  // Button,
  // ButtonDropdown,
  // UncontrolledDropdown,
  // DropdownMenu,
  // DropdownItem,
  // DropdownToggle,
  // CustomInput,
  // Collapse
} from "reactstrap";
import { injectIntl } from "react-intl";

import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";

class ListPageHeading extends Component {
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
      heading
    } = this.props;

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
            </div>
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
    );
  }
}

export default injectIntl(ListPageHeading);
