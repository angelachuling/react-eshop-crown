import React from 'react';
import {withRouter} from 'react-router-dom';

import './menu-item.styles.scss';

// linkUrl: 'shop/womens'
//match.url: url - (string) The matched portion of the URL. Useful for building nested <Link>s
const MenuItem = ({title, imageUrl, size, history, linkUrl, match}) => (
     <div className={`${size} menu-item`} onClick={()=>history.push(`${match.url}${linkUrl}`)}> 
        <div 
          className='background-image'
          style={{backgroundImage: `url(${imageUrl})`}} 
        />
     <div className='content'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <span className='subtitle'>SHOP NOW</span>
     </div>
</div>

)

export default withRouter(MenuItem);