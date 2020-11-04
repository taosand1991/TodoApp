import React from 'react';

function Logout(props) {
    const logMeOut = () => {
        localStorage.removeItem('_userId');
        window.location.href ='/login'
    };
    return (
        <div>{logMeOut()}</div>
    );
}

export default Logout;