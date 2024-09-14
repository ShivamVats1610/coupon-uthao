import React, { Component } from "react";
import axios from "axios";
import CouponCard from "./CouponCard";
import CouponDetails from "./CouponDetails"; // Import the CouponDetails component

class SearchContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coupons: [],
      originalCoupons: [],
      currentCouponInDetail: null
    };
    this.handleMoreInfoSelected = this.handleMoreInfoSelected.bind(this);
    this.handleDetailClose = this.handleDetailClose.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentDidMount() {
    this.getCoupons();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.fireSearch !== prevProps.fireSearch ||
      this.props.selectedSubFilter !== prevProps.selectedSubFilter ||
      this.props.searchInput !== prevProps.searchInput
    ) {
      this.handleDetailClose();
      this.getCoupons(
        this.props.searchInput ? this.props.searchInput.trim() : "",
        this.props.selectedSubFilter || []
      );
    }
  }

  async getCoupons(searchText, additionalFilters) {
    try {
      let filter = {};
      if (!additionalFilters) {
        additionalFilters = this.props.selectedSubFilter || [];
      }

      if (additionalFilters && additionalFilters.length > 0) {
        additionalFilters.forEach((additional) => {
          if (!filter[additional.propertyInCouponModel]) {
            filter[additional.propertyInCouponModel] = [
              additional.filterName,
            ];
          } else {
            filter[additional.propertyInCouponModel].push(
              additional.filterName
            );
          }
        });
      }

      const response = await axios.get("http://localhost:5000/coupons/", {
        params: {
          searchFilter: searchText,
          subFilters: filter,
          expired: false,
        },
      });
      this.setState({
        coupons: response.data,
        originalCoupons: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  }

  createCouponCards() {
    return this.state.coupons.map((coupon) => (
      <CouponCard
        data={coupon}
        key={coupon._id}
        onSelectMoreInfo={this.handleMoreInfoSelected}
      />
    ));
  }

  handleMoreInfoSelected(clickedCoupon) {
    this.setState({
      currentCouponInDetail: clickedCoupon,
    });
  }

  handleDetailClose() {
    this.setState({
      currentCouponInDetail: null,
    });
  }

  handleSort(event) {
    const { id } = event.target;
    const sortButton = id === "sort" ? event.target.parentElement : event.target;
    const existingClassName = sortButton.className;

    // Toggle the selection state of the sort button
    if (
      existingClassName === "searchContentButton searchContentButtonSelected"
    ) {
      sortButton.className = "searchContentButton";
      // Perform sorting in descending order when unselecting the button
      this.setState((prevState) => ({
        coupons: prevState.coupons.sort((a, b) =>
          b.title.localeCompare(a.title)
        ),
      }));
    } else if (existingClassName === "searchContentButton") {
      sortButton.className = "searchContentButton searchContentButtonSelected";
      // Perform sorting in ascending order when selecting the button
      this.setState((prevState) => ({
        coupons: prevState.coupons.sort((a, b) =>
          a.title.localeCompare(b.title)
        ),
      }));
    }
  }

  render() {
    return (
      <div className="searchContentWrap">
        <div className="searchContentHeader">
          <div className="searchContentActions">
            <button
              id="sortButton"
              className="searchContentButton"
              onClick={this.handleSort}
              title="Alphabetical order"
            >
              <i className="large material-icons" id="sort">
                sort
              </i>
              Sort
            </button>
          </div>
        </div>
        <div className="searchContent">{this.createCouponCards()}</div>
        {this.state.currentCouponInDetail && (
          <div className="DetailsContainer">
          <div className="searchContentDetails show">
            <div className="detailsHeader">
              <div className="detailTitle">
                Detail of Coupon : {this.state.currentCouponInDetail.title}
              </div>
              <div className="detailHeaderAction">
                <button
                  className="actionIconButton"
                  onClick={this.handleDetailClose}
                >
                  <i className="large material-icons">close</i>
                </button>
              </div>
            </div>
            <CouponDetails
              coupon={this.state.currentCouponInDetail}
            />
          </div>
        </div>
        )}
        {this.props.fireSearch && this.state.coupons.length === 0 && (
          <div className="searchNoData">
            Sorry! No coupons found in search. Please change your search
            criteria.
          </div>
        )}
      </div>
    );
  }
}

export default SearchContent;
