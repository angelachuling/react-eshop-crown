import React from 'react';
import {connect} from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';

import {selectCollection} from '../../redux/shop/shop.selector'

import './collection.styles.scss';

const CollectionPage = ({collection}) => {
    const {title, items} = collection;
    return (
    <div className='collection-page'>
        <h2 className='title'>{title}</h2>
        <div className='items'>
            {items.map(item=> (<CollectionItem key={item.id} item={item} />))}
        </div>
    </div>
)};

//second argument, ownProps in this case, is an object containing {match, history, location} passed from <Route exact path={`${match.path}/:collectionId`} component={CollectionPage} />. 
//match = {isExact: true, {params: {collectionId: 'hats'}, {path: '/shop/:categoryId'}, {url: '/shop/hats}'}}
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);