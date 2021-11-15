import { collection, onSnapshot } from "firebase/firestore";
import React from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";

import CollectionsOverview from "../../components/collection-overiew/collections-overview.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { convertCollectionsSnapshotToMap } from "../../firebase/add-collection-and-document";
import { db } from "../../firebase/firebase.utils";
import { updateCollections } from "../../redux/shop/shop.actions";
import Collection from "../collection/collection.component";

import "./shop.styles.scss";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionWithSpinner = WithSpinner(Collection);

class Shop extends React.Component {
  state = {
    loading: true,
  };

  unSubscribeFromSnapshot = null;
  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionsRef = collection(db, "collections");
    
    this.unSubscribeFromSnapshot = onSnapshot(collectionsRef, (snapshot) => {
      const collectionMaped = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionMaped);
      this.setState({ loading: false });
    });

  }

  componentWillUnmount() {
    this.unSubscribeFromSnapshot();
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Routes>
          <Route
            path="/"
            element={<CollectionsOverviewWithSpinner isLoading={loading} />}
          />
          <Route
            path="/:collectionId"
            element={<CollectionWithSpinner isLoading={loading} />}
          />
        </Routes>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionMaped) =>
    dispatch(updateCollections(collectionMaped)),
});

export default connect(null, mapDispatchToProps)(Shop);
