import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      <input id="wd-signup-username" placeholder="username" className="form-control mb-2" />
      <input id="wd-signup-password" placeholder="password" type="password" className="form-control mb-2" />
      <input id="wd-verify-password" placeholder="verify password" type="password" className="form-control mb-2" />

      {/* Sign up button with blue color */}
      <Link id="wd-signup-btn" to="/Kanbas/Account/Profile" className="btn btn-primary w-100">
        Sign up
      </Link>

      <Link id="wd-signin-link" to="/Kanbas/Account/Signin" className="d-block mt-2">
        Already have an account? Sign in
      </Link>
    </div>
  );
}







// import React from "react";
// import { Link } from "react-router-dom";
// export default function Signup() {
//   return (
//     <div id="wd-signup-screen">
//       <h3>Sign up</h3>
//       <input placeholder="username" /><br/>
//       <input placeholder="password" type="password" /><br/>
//       <input placeholder="verify password" type="password" /><br/>
//       <Link to="/Kanbas/Account/Profile" > Sign up </Link><br />
//       <Link to="/Kanbas/Account/Signin" >Sign in</Link>
// </div>
// );}