import React from 'react';
import {Route} from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import {firestore, convertCollectionsSnapShotToMap} from '../../firebase/firebase.utils';

import { updateCollections } from '../../redux/shop/shop.actions';

// because of Route, {match, history, location} are passed as props to the component
// const ShopPage = ({match}) => (
//   <div className='shop-page'>
//     <Route exact path={`${match.path}`} component={CollectionsOverview} />
//     <Route exact path={`${match.path}/:collectionId`} component={CollectionPage} />
//   </div>
// );

class ShopPage extends React.Component{
  unsubscribeFromSnapShot = null;

  componentDidMount(){
    const {updateCollections} = this.props;
    const collectionRef = firestore.collection('collections');
    //whenever the collectionRef updates or whenever this code gets run for the first time, this collectionRef will send us the snapshot representing the code of our collections objects array at the time when this code renders.
    this.unsubscribeFromSnapShot = collectionRef.onSnapshot(async snapshot => {
      console.log('snapshot', snapshot);

      const collectionsMap = convertCollectionsSnapShotToMap(snapshot);
      console.log('collectionsMap', collectionsMap);
      //in case of data is edited in db, this update action make sure state is up to date hence whoever use this data will receive latest data.
      updateCollections(collectionsMap);
    })
  }
  render(){
    //match is passed from Route in App.js
    const {match} = this.props;
    console.log('shop.component, this.props', this.props)
    console.log('match', match)
    return (
      <div className='shop-page'>
      <Route exact path={`${match.path}`} component={CollectionsOverview} />
      <Route exact path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>  
    )
  }
};

//acion imported => prop: {updateCollectcions: updateCollections(collectionsMap)} created => updateCollections(collectionsMap) called inside componentDidMount
const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);