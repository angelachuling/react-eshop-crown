import React from 'react';
import {Route} from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import {firestore} from '../../firebase/firebase.utils';

// const ShopPage = ({match}) => (
//   <div className='shop-page'>
//     <Route exact path={`${match.path}`} component={CollectionsOverview} />
//     <Route exact path={`${match.path}/:collectionId`} component={CollectionPage} />
//   </div>
// );

class ShopPage extends React.Component{
  unsubscribeFromSnapShot = null;

  componentDidMount(){
    const collectionRef = firestore.collection('collections');
    //whenever the collectionRef updates or whenever this code gets run for the first time, this collectionRef will send us the snapshot representing the code of our collections objects array at the time when this code renders.
    collectionRef.onSnapShot(async snapshot => {
      console.log('snapshot', snapshot);
    })
  }
  render(){
    const {match} = this.props;
    return (
      <div className='shop-page'>
      <Route exact path={`${match.path}`} component={CollectionsOverview} />
      <Route exact path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>  
    )
  }
};


export default ShopPage;