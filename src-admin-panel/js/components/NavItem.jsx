import React from "react";
import {Link,} from 'react-router-dom';
import PropTypes from 'prop-types';

export default class NavItem extends React.Component {

    static contextTypes = {
        router: PropTypes.object
    };

    render() {
        const {router} = this.context;
        //const isActive = router.isActive(this.props.to);

        return (
            <li className={'nav-item active'}>
                <Link className={'nav-link'} {...this.props}></Link>
            </li>
        )
    }
}
