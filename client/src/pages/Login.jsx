import { useState } from "react";
import {Link} from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
  signInAlert,
} from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formdata, setFormdata] = useState({});
  //const [error, setError] = useState(false);
  //const [loading, setLoading] = useState(false);
  const { error, loading } = useSelector((state) => state.user); //we are using now useSelector to get the state from the store.Instead use usestate to get the state.
  console.log(error);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    //async use here because we need to wait until the form fills
    e.preventDefault();
    try {
      dispatch(signInStart()); //instead these dispatching, we earlier did like this "setLoading(true);setError(false);"
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await response.json();

      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error)); //pass the error as the payload.
    }
  };
  return (
    <div className="container mt-5 mx-auto" style={{ maxWidth: "500px" }}>
      <div className="card shadow" style={{ zIndex: "1" }}>
        <div className="card-header text-center">Register</div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                className="form-control text-center"
                id="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
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
                {loading ? "Loading.." : "Login"}
              </button>
            </div>
          </form>
          <div className="text-center mt-3">
            <Link to={"/register"}>
              <h6>
                <span style={{ fontSize: "0.8rem" }}>Need to register</span>
              </h6>
            </Link>
          </div>
          <div
            className={`alert alert-warning alert-dismissible fade ${
              error ? "show" : ""
            } mt-3`}
            role="alert"
          >
            <strong>{error.message||"Try something different!"}.</strong> You should check in on
            some of those fields.
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => dispatch(signInAlert())}
              hidden={!error}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}
