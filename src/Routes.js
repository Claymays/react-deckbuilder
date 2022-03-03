import React from "react";

export const baseUrl = 'http://localhost:8080'

export const paths = {
    login: `${baseUrl}/api/user/login`,
    user: `${baseUrl}/api/user`,
    deck: `${baseUrl}/api/deck/`,
    card: `${baseUrl}/api/card`
}
//
// ReactDOM.render(
//     <Router>
//         <div>
//             <Route exact path={'/'}>
//                 <Login/>
//             </Route>
//         </div>
//     </Router>,
// );
