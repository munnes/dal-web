
import React from "react";
const Home = ({ ...props }) => {
    if (props.isLoading)
        return <div></div>
    else if (props.errMess)
        return <div>{props.errMess}</div>
    else {
        if (props.users.length === 0) {
            props.signupUser({
                username: 'sysAdmin',
                password: 'Sys@2023'
            });
            props.signupUser({
                username: 'stationAdmin',
                password: 'Station@2023'
            })
        }
        return <div className="container">Welcome</div>
    }
}
export default Home