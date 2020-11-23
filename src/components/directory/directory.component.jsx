import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {selectDirectorySections} from '../../redux/directory/directory.selectors';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';


//class component to have state stored locally
/*
class Directory extends React.Component{
    constructor(){
        super();

        this.state = {

        }
    }

    render(){
        return (
            <div className='directory-menu'>
                {
                    this.state.sections.map(({id, ...otherSectionProps}) => (
                        <MenuItem key={id} {...otherSectionProps} />
                    ))
                }
            </div>
        );
    }
}
*/

//function component to have redux state
const Directory = ({sections}) => (
  <div className='directory-menu'>
    {
      sections.map(({id, ...otherSectionProps}) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))
    }
  </div>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections 
})

export default connect(mapStateToProps)(Directory);

//'/' => HomePage homepage component => Directory directory component => MenuItem menu-item component