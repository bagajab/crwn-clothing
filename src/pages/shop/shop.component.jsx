import React from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";

import CollectionsOverviewContainer from "../../components/collection-overiew/collections-overview.container";
import { fetchCollectionsRequestAsync } from "../../redux/shop/shop.actions";
import CollectionPageContainer from "../collection/collection.container";

import "./shop.styles.scss";

class Shop extends React.Component {
  componentDidMount() {
    const { fetchCollectionsRequestAsync } = this.props;
    fetchCollectionsRequestAsync();
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
  fetchCollectionsRequestAsync: () => dispatch(fetchCollectionsRequestAsync()),
});

export default connect(null, mapDispatchToProps)(Shop);
