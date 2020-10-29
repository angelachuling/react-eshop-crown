import React from 'react';

import CollectionItem from '../collection-item/collection-item.component';

import './collection-preview.styles.scss';

const CollectionPreview = ({title, items}) => (
    <div className='collection-preview'>
        <h1 className="title">{title.toUpperCase()}</h1>
        <div className="preview">
            {items
                .filter((item, idx)=> idx < 4)
                .map(({id, ...otherItemProps}) => (
                <CollectionItem key={id} {...otherItemProps} />
                ))
            }
        </div>
    </div>
);

export default CollectionPreview;

// replace item in map function with component => collection-item

// .map(item => (
// <div key={item.id}>{item.name}</div>
// ))
 
// .map(({id, ...otherItemProps}) => (
// <CollectionPreview key={id} {...otherItemProps} />
// ))