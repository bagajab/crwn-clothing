import React from "react";
import { Route, Routes } from "react-router-dom";

import CollectionsOverview from "../../components/collection-overiew/collections-overview.component";
import Collection from "../collection/collection.component";

import "./shop.styles.scss";

const Shop = (props) => (
  <div className="shop-page">
    <Routes>
      <Route path="/" element={<CollectionsOverview />} />
      <Route path="/:collectionId" element={<Collection />} />
    </Routes>
  </div>
);

export default Shop;
