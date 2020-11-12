import React from 'react';

import CollectionItem from '../collection-item/collection-item.component';

import './collection-preview.styles.scss';

const CollectionPreview = ({title, items}) => (
    <div className='collection-preview'>
        <h1 className="title">{title.toUpperCase()}</h1>
        <div className="preview">
            {items
                .filter((item, idx)=> idx < 4)
                .map((item) => (
                <CollectionItem key={item.id} item={item} />
                ))
            }
        </div>
    </div>
);

export default CollectionPreview;

//route '/shop' => ShopPage shop.component => CollectionPreview collection-preview component => CollectionItem collection-item component

// replace item in map function with component => collection-item

// .map(item => (
// <div key={item.id}>{item.name}</div>
// ))
 
// .map(({id, ...otherItemProps}) => (
// <CollectionPreview key={id} {...otherItemProps} />
// ))