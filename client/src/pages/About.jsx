import { useState } from "react";
import "../styles/Home.css";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useDispatch, useSelector } from "react-redux";
import {
  contactStart,
  contactSuccess,
  contactFailure,
} from "../../redux/user/userSlice";

export default function About() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [contactAlert, setContactAlert] = useState(false);
  const form = useRef();
  const dispatch = useDispatch();

  const sendEmail = (e) => {
    e.preventDefault();
    setContactAlert(false);
    dispatch(contactStart());
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          dispatch(contactSuccess());
          setContactAlert(true);
        },
        (error) => {
          dispatch(contactFailure(error));
        }
      );
  };

  return (
    <div
      style={{
        zIndex: "1",
        margin: "auto",
        animation: "slideInFromLeft 0.2s ease-out",
      }}
    >
      <div className="card shadow mx-2 my-5">
        <div className="row gx-4 gx-lg-5 align-items-center my-5 mx-auto ">
          <div>
            <h4 className="font-weight-light text-center ">
              .......Why and From Where This Came.......
            </h4>
            <p className="justified-text">
              Once again daily habit tracker is for easily track your habits
              daily and see the progress and decide what to do before you forget
              the progress. The system was developed by Russell Andrady. He is a
              computer science student of faculty of computing and technology in
              university of kelaniya in Srilanka. If you have any questions,
              just feel free to contact him.
            </p>
          </div>
        </div>
      </div>
      <div className="container mt-5 mx-auto" style={{ maxWidth: "500px" }}>
        <div
          className="card shadow"
          style={{
            zIndex: "1",
            margin: "auto",
            marginTop: "-50px",
            marginBottom: "50px",
            marginTop: "50px",
            animation: "slideInFromLeft 0.2s ease-out",
          }}
        >
          <div className="card-header text-center">Contact</div>
          <div className="card-body">
            <form ref={form} onSubmit={sendEmail}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control text-center"
                  id="email"
                  placeholder="Email"
                  name="user_email"
                  defaultValue={currentUser ? currentUser.email : ""}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control text-center"
                  id="username"
                  placeholder="username"
                  name="user_name"
                  defaultValue={currentUser ? currentUser.username : ""}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  type="text"
                  className="form-control text-center"
                  id="message"
                  placeholder="message"
                  name="message"
                  required
                />
              </div>
              <div className="col-md-auto d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn bg-success text-white mt-3"
                  disabled={loading}
                >
                  {loading ? "Loading.." : "Send"}
                </button>
              </div>
            </form>
            <div
              className={`alert alert-dismissible fade slideInFromLeft 0.2s ease-out ${
                error ? "alert-warning" : contactAlert ? "alert-success" : ""
              } ${error || contactAlert ? "show" : ""} mt-3`}
              role="alert"
            >
              <strong>
                {error ? "Failure!" : "Successfully sent!"}
              </strong>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => {
                  setContactAlert(false);
                  dispatch(contactSuccess());
                }}
                hidden={!error && !contactAlert}
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
