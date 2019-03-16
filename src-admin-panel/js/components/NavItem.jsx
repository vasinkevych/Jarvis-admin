import React from "react";
import {Link, IndexLink} from 'react-router';

export default class NavItem extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    render() {
        const {router} = this.context;
        const isActive = router.isActive(this.props.to);

        return (
            <li className={isActive ? 'nav-item active' : 'nav-item'}>
                <Link className={'nav-link'} {...this.props}></Link>
            </li>
        )

    }
}