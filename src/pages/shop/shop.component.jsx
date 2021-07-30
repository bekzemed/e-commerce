import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
// import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import { fetchCollectionsStartRequest } from '../../redux/shop/shop.action';

import collectionOverviewContainer from '../../components/collection-overview/collection-overview.container';
import CollectionPageContainer from '../collection/collection.container';

class ShopPage extends React.Component {
  // state = {
  //   loading: true,
  // };
  // unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { fetchCollectionsStartRequest } = this.props;
    fetchCollectionsStartRequest();
    // const { updateCollections } = this.props;
    // const collectionRef = firestore.collection('collections');

    // using promise but it only called once when the component mounts
    // collectionRef.get().then(snapshot => {
    //   const collectionMap = convertCollectionsSnapshotToMap(snapshot);
    //   updateCollections(collectionMap);
    //   this.setState({ loading: false });
    // });

    // using native fetch method onto the firebase API
    // fetch('https://firestore.googleapis.com/v1/projects/e-commerce-clothing-8e003/databases/(default)/documents/collections').then(response => response.json()).then(collections => console.log(collections))

    // observable pattern
    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(snapshot => {
    //   const collectionMap = convertCollectionsSnapshotToMap(snapshot);
    //   updateCollections(collectionMap);
    //   this.setState({ loading: false });
    // });
  }
  render() {
    const { match } = this.props;
    // const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={collectionOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartRequest: () => dispatch(fetchCollectionsStartRequest()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
