import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Profile.css";

export default function Register() {
  const [formdata, setFormdata] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      setError(false);
      e.preventDefault();
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await response.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div className="container mt-5 mx-auto" style={{ maxWidth: "500px" }}>
      <div className="card shadow" style={{ zIndex: "1", margin: "auto", animation: "slideInFromLeft 0.2s ease-out"}}>
        <div className="card-header text-center">Register</div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label for="username">Username</label>
              <input
                type="text"
                className="form-control text-center"
                id="username"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                required
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
                onChange={handleChange}
                required
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
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-auto d-flex justify-content-center">
              <button
                type="submit"
                className="btn bg-success text-white mt-3"
                disabled={loading}
              >
                {loading ? "Loading.." : "Register"}
              </button>
            </div>
          </form>
          <div className="text-center mt-3">
            <Link to={"/login"}>
              <h6>
                <span style={{ fontSize: "0.8rem" }}>
                  Already have an account
                </span>
              </h6>
            </Link>
          </div>
          <div
            className={`alert alert-warning alert-dismissible fade ${
              error ? "show" : ""
            } mt-3`}
            role="alert"
          >
            <strong>Try something different!</strong> You should check in on
            some of those fields.
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setError(false)}
              hidden={!error}
            ></button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
