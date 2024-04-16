import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="container mt-5 mx-auto" style={{ maxWidth: "500px" }}>
      <div className="card shadow" style={{zIndex: '1' }}>
        <div className="card-header text-center">Register</div>

        <div className="card-body">
          <form>
            <div className="form-group">
              <label for="username">Username</label>
              <input
                type="text"
                className="form-control text-center"
                id="username"
                placeholder="Username"
                name="username"
              />
            </div>
            <div className="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                className="form-control text-center"
                id="email"
                placeholder="Email"
                name="email"
              />
            </div>
            <div className="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                className="form-control text-center"
                id="password"
                placeholder="Password"
                name="password"
              />
            </div>
            <div class="col-md-auto d-flex justify-content-center">
              <button type="submit" className="btn bg-success text-white mt-3">Register</button>
            </div>
          </form>
          <div className="text-center mt-3">
            <Link to={'/login'}><h6><span style={{fontSize:"0.8rem"}}>Already have an account</span></h6></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
