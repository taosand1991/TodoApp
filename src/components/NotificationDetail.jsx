import React, {Fragment} from 'react';
import authContext from "../authentication/AuthContext";
import {Link} from "react-router-dom";

function NotificationDetail(props) {
    const {notifications} = React.useContext(authContext);
    return (
        <Fragment>
            <div className="notification-list">
                <h5>NOTIFICATIONS</h5>
                {notifications.map(notification => {
                    return <div key={notification.id} className='notify-me'>
                        <ul>
                            <li><Link to={`/todo/${notification.todo_item}`}>{notification.message}</Link></li>
                        </ul>
                    </div>
                })}
            </div>
        </Fragment>
    );
}

export default NotificationDetail;