import React from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";

import CollectionsOverviewContainer from "../../components/collection-overiew/collections-overview.container";
import { fetchCollectionsRequest } from "../../redux/shop/shop.actions";
import CollectionPageContainer from "../collection/collection.container";

import "./shop.styles.scss";

class Shop extends React.Component {
  componentDidMount() {
    const { fetchCollectionsRequest } = this.props;
    fetchCollectionsRequest();
  }

  render() {
    return (
      <div className="shop-page">
        <Routes>
          <Route path="/" element={<CollectionsOverviewContainer />} />
          <Route path="/:collectionId" element={<CollectionPageContainer />} />
        </Routes>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsRequest: () => dispatch(fetchCollectionsRequest()),
});

export default connect(null, mapDispatchToProps)(Shop);
