import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import "./collection.styles.scss";
import { selectShopCollections } from "../../redux/shop/shop.selectors";
import CollectionItem from "../../components/collection-item/collection-item.component";

const Collection = ({ collections }) => {
  const { collectionId } = useParams();

  const collection = collections[collectionId];

  const { items, title } = collection;

  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectShopCollections,
});

export default connect(mapStateToProps)(Collection);
