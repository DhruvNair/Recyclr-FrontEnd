import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import axios from "axios";

// import { servicePath } from "../../constants/defaultValues";

import PickupsListView from "../../containers/pages/PickupsListView";
import Pagination from "../../containers/pages/Pagination";
import PickupsPageHeading from "../../containers/pages/PickupsPageHeading";
import AddNewModal from "../../containers/pages/AddNewModal";
// function collect(props) {
//   console.log(console.log(props));
//   return { data: props.data };
// }
// const apiUrl = servicePath + "/cakes/paging";

class ThumbListPages extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require('mousetrap');


    this.state = {
      displayMode: "datalist",
      pageSizes: [8, 12, 24],
      selectedPageSize: 8,
      orderOptions: [
        { column: "title", label: "Product Name" },
        { column: "category", label: "Category" },
        { column: "status", label: "Status" }
      ],
      selectedOrderOption: { column: "title", label: "Product Name" },
      categories: [
        { label: "Cakes", value: "Cakes", key: 0 },
        { label: "Cupcakes", value: "Cupcakes", key: 1 },
        { label: "Desserts", value: "Desserts", key: 2 }
      ],
      dropdownSplitOpen: false,
      modalOpen: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      search: "",
      selectedItems: [],
      lastChecked: null,
      isLoading: false
    };
  }

  componentDidMount() {
    this.dataListRender();
    this.mouseTrap.bind(["ctrl+a", "command+a"], () =>
      this.handleChangeSelectAll(false)
    );
    this.mouseTrap.bind(["ctrl+d", "command+d"], () => {
      this.setState({
        selectedItems: []
      });
      return false;
    });
  }
  
  componentWillUnmount() {
    this.mouseTrap.unbind("ctrl+a");
    this.mouseTrap.unbind("command+a");
    this.mouseTrap.unbind("ctrl+d");
    this.mouseTrap.unbind("command+d");
  }


  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };

  changeOrderBy = column => {
    this.setState(
      {
        selectedOrderOption: this.state.orderOptions.find(
          x => x.column === column
        )
      },
      () => this.dataListRender()
    );
  };
  changePageSize = size => {
    this.setState(
      {
        selectedPageSize: size,
        currentPage: 1
      },
      () => this.dataListRender()
    );
  };
  changeDisplayMode = mode => {
    this.setState({
      displayMode: mode
    });
    return false;
  };
  onChangePage = page => {
    this.setState(
      {
        currentPage: page
      },
      () => this.dataListRender()
    );
  };

  onSearchKey = e => {
    if (e.key === "Enter") {
      this.setState(
        {
          search: e.target.value.toLowerCase()
        },
        () => this.dataListRender()
      );
    }
  };

  onCheckItem = (event, id) => {
    if (
      event.target.tagName === "A" ||
      (event.target.parentElement && event.target.parentElement.tagName === "A")
    ) {
      return true;
    }
    if (this.state.lastChecked === null) {
      this.setState({
        lastChecked: id
      });
    }

    let selectedItems = this.state.selectedItems;
    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter(x => x !== id);
    } else {
      selectedItems.push(id);
    }
    this.setState({
      selectedItems
    });

    if (event.shiftKey) {
      var items = this.state.items;
      var start = this.getIndex(id, items, "id");
      var end = this.getIndex(this.state.lastChecked, items, "id");
      items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...items.map(item => {
          return item._id;
        })
      );
      selectedItems = Array.from(new Set(selectedItems));
      this.setState({
        selectedItems
      });
    }
    document.activeElement.blur();
  };

  getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }

  dataListRender() {
    // const {
    //   selectedPageSize,
    //   currentPage,
    //   selectedOrderOption,
    //   search
    // } = this.state;
    axios.get(`/userSelling/userSale`)
        .then(res => {
          return res.data;
        })
        .then(res => {
          this.setState({
            totalPage: 1,
            items: res,
            selectedItems: [],
            totalItemCount: res.length,
            totalCost: res.cartValue,
            isLoading: true
          });
        });
    // axios
    //   .get(
    //     `${apiUrl}?pageSize=${selectedPageSize}&currentPage=${currentPage}&orderBy=${
    //       selectedOrderOption.column
    //     }&search=${search}`
    //   )
    //   .then(res => {
    //     return res.data;
    //   })
    //   .then(data => {
    //     this.setState({
    //       totalPage: data.totalPage,
    //       items: data.data,
    //       selectedItems: [],
    //       totalItemCount: data.totalItem,
    //       isLoading: true
    //     });
    //   });
  }

  onContextMenuClick = (e, data, target) => {
    console.log(
      "onContextMenuClick - selected items",
      this.state.selectedItems
    );
    console.log("onContextMenuClick - action : ", data.action);
  };

  onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!this.state.selectedItems.includes(clickedProductId)) {
      this.setState({
        selectedItems: [clickedProductId]
      });
    }

    return true;
  };

  myId(){
    const user = JSON.parse(localStorage.getItem('user'));
    return user._id;
  }
  render() {
    const {
      currentPage,
      items,
      displayMode,
      selectedPageSize,
      totalItemCount,
      selectedOrderOption,
      selectedItems,
      orderOptions,
      pageSizes,
      modalOpen,
      categories
    } = this.state;
    const { match } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;

    return !this.state.isLoading ? (
      <div className="loading" />
    ) : (
      <Fragment>
        <div className="disable-text-selection">
          <PickupsPageHeading
            heading="menu.availablePickups"
            displayMode={displayMode}
            changeDisplayMode={this.changeDisplayMode}
            handleChangeSelectAll={this.handleChangeSelectAll}
            handleClearCart={this.handleClearCart}
            handlePlaceOrder={this.handlePlaceOrder}
            changeOrderBy={this.changeOrderBy}
            changePageSize={this.changePageSize}
            selectedPageSize={selectedPageSize}
            totalItemCount={totalItemCount}
            selectedOrderOption={selectedOrderOption}
            match={match}
            startIndex={startIndex}
            endIndex={endIndex}
            selectedItemsLength={selectedItems ? selectedItems.length : 0}
            itemsLength={items ? items.length : 0}
            onSearchKey={this.onSearchKey}
            orderOptions={orderOptions}
            pageSizes={pageSizes}
            toggleModal={this.toggleModal}
          />
          <AddNewModal
            modalOpen={modalOpen}
            toggleModal={this.toggleModal}
            categories={categories}
          />
          <Row>
            {this.state.totalItemCount > 0 ? this.state.items.map(pickup => {
              if((!pickup.shop || pickup.shop._id === this.myId()) && pickup.seller._id !== this.myId()){
                return (
                  <PickupsListView
                    key={pickup._id}
                    pickup={pickup}
                  />
                );
              } else {
                return null
              }
            }) : <div className="no-items ml-5">
              There are no availanle pickups! 
            </div> }{" "}
            <Pagination
              currentPage={this.state.currentPage}
              totalPage={this.state.totalPage}
              onChangePage={i => this.onChangePage(i)}
            />
          </Row>
        </div>
      </Fragment>
    );
  }
}
export default ThumbListPages;
