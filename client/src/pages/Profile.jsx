import { useState } from "react";
import { useSelector } from "react-redux";
import "../styles/Profile.css";
export default function Profile() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formdata, setFormdata] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  return (
    <div className="container mt-5 mx-auto" style={{ maxWidth: "500px" }}>
      <div
        className="card shadow"
        style={{
          zIndex: "1",
          margin: "auto",
          animation: "slideInFromLeft 0.2s ease-out",
        }}
      >
        <div className="card-header text-center">Profile</div>

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
                onChange={handleChange}
                defaultValue={currentUser.username}
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
                defaultValue={currentUser.email}
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
              />
            </div>
            <div className="col-md-auto d-flex justify-content-center">
              <button
                type="submit"
                className="btn bg-success text-white mt-3"
                disabled={loading}
              >
                {loading ? "Loading.." : "Update"}
              </button>
            </div>
          </form>
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
