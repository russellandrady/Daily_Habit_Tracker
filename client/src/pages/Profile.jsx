import { useState } from "react";
import { useSelector } from "react-redux";
import "../styles/Profile.css";
import { useDispatch } from "react-redux";
import {
  updateAlert,
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from "../../redux/user/userSlice";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Profile() {
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formdata, setFormdata] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleCloseDeleteModalForDeleteBegin = () => setShowDeleteModal(true);

  const handleDeleteUser = async () => {
    // Delete user logic here
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    setUpdateSuccess(false);
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
      console.log(error);
    }
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
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
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
              <label htmlFor="email">Email</label>
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
              <label htmlFor="password">Password</label>
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
            className={`alert alert-dismissible fade slideInFromLeft 0.2s ease-out ${
              error ? "alert-warning" : updateSuccess ? "alert-success" : ""
            } ${error || updateSuccess ? "show" : ""} mt-3`}
            role="alert"
          >
            <strong>
              {error ? "Try something different!" : "Successfully updated!"}
            </strong>
            {error
              ? " You should check in on some of those fields."
              : " You can now continue on your habits."}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => {
                if (error) {
                  dispatch(updateAlert());
                } else {
                  setUpdateSuccess(false);
                }
              }}
              hidden={!error && !updateSuccess}
            ></button>
          </div>

          <div className="text-center mt-3">
            <Link onClick={handleCloseDeleteModalForDeleteBegin}>
              <h6>
                <span style={{ fontSize: "0.8rem" }}>
                  wanna delete the account?
                </span>
              </h6>
            </Link>
          </div>
          <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-danger">
              Really? You wanna delete your account? You cannot revise this.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDeleteModal}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteUser}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
