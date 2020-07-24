import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import axios from "axios";
import { NotificationManager } from "../../components/common/react-notifications";
// import { servicePath } from "../../constants/defaultValues";

import InventoryListView from "../../containers/pages/InventoryListView";
import PickupsPageHeading from "../../containers/pages/PickupsPageHeading";

function collect(props) {
  console.log(console.log(props));
  return { data: props.data };
}
// const apiUrl = servicePath + "/cakes/paging";

class ThumbListPages extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require('mousetrap');
    this.onAdd = this.onAdd.bind(this);
    this.onSubtract = this.onSubtract.bind(this);

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
  handleChangeSelectAll = isToggle => {
    if (this.state.selectedItems.length >= this.state.items.length) {
      if (isToggle) {
        this.setState({
          selectedItems: []
        });
      }
    } else {
      this.setState({
        selectedItems: this.state.items.map(x => x._id)
      });
    }
    document.activeElement.blur();
    return false;
  };

  dataListRender() {
    // const {
    //   selectedPageSize,
    //   currentPage,
    //   selectedOrderOption,
    //   search
    // } = this.state;
    axios.get(`/shop/part/`)
        .then(res => {
          return res.data;
        })
        .then(parts => {
          parts.forEach(part => {
            part.quantity = 0;
          })
          console.log(parts)
          this.setState({
            totalPage: 1,
            items: parts,
            selectedItems: [],
            totalItemCount: parts.length,
          });
        }).then(() => {
          this.updateQuantities();
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
  updateQuantities(){
    axios.get(`/partner/inventory/`)
      .then(res => {
        return res.data.inventory;
      })
      .then(parts => {
        let allParts = this.state.items
        parts.forEach(part => {
          const samePart = allParts.find(partObj => {
            return partObj._id === part.part._id;
          })
          samePart.quantity = part.quantity;
        })
        this.setState({
          items: allParts,
          totalItemCount: allParts.length,
          isLoading: true
        });
      });
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
  onAdd(id){
    axios.post(`/partner/inventory`, {partId: id})
      .then(() => {
        this.updateQuantities()
      }).catch(error => 
        NotificationManager.warning(
          error.response.data.message,
          "Something's not right",
          3000,
          null,
          null,
          ''
        )
      )
  }
  onSubtract(id){
    axios.delete(`/partner/inventory`, {data:{partId: id}})
      .then((res) => {
        console.log(id);
        console.log(res);
        this.updateQuantities()
      }).catch(error => 
        NotificationManager.warning(
          error.response.data.message,
          "Something's not right",
          3000,
          null,
          null,
          ''
        )
      )
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
      pageSizes
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
            heading="menu.myOrders"
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
          <Row>
            {this.state.items.map(part => {
              return (
                <InventoryListView
                  key={part._id + part.quantity}
                  product={part}
                  onAdd={this.onAdd}
                  onSubtract={this.onSubtract}
                  collect={collect}
                />
              );}
            )}
          </Row>
        </div>
      </Fragment>
    );
  }
}
export default ThumbListPages;
