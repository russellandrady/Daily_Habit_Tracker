import { useState, useEffect } from "react";
import "../styles/Profile.css";
import { Button, Modal } from "react-bootstrap";
import { MdFormatListBulletedAdd } from "react-icons/md";
export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [formdata, setFormdata] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // console.log(formdata)
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      setError(false);
      e.preventDefault();
      const response = await fetch("/api/habit/create", {
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
      fetchData();
      handleClose();

    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/api/habit/all");
      if (!response.ok) {
        setError(true);
      }
      const data = await response.json();
      setHabits(data);
    } catch (error) {
      setError(true);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-5 mx-auto" style={{ maxWidth: "1500px" }}>
      <div
        className="card shadow"
        style={{
          zIndex: "1",
          margin: "auto",
          animation: "slideInFromLeft 0.2s ease-out",
        }}
      >
        <div className="card-header text-center">Habits</div>
        <div className="card-body">
          <table className="table table-striped" >
            <thead>
              <tr>
                <th scope="col">Habit Name</th>
                <th scope="col">Description</th>
                <th scope="col">Day 1</th>
                <th scope="col">Day 2</th>
                <th scope="col">Day 3</th>
                <th scope="col">Day 4</th>
                <th scope="col">Day 5</th>
                <th scope="col">Day 6</th>
                <th scope="col">Day 7</th>
              </tr>
            </thead>
            <tbody>
              {habits.map((habit) => (
                <tr key={habit._id} style={{
                  zIndex: "1",
                  margin: "auto",
                  animation: "slideInFromLeft 0.2s ease-out",
                }}>
                  <td>{habit.habit}</td>
                  <td>{habit.description}</td>
                  <td>{habit.day1}</td>
                  <td>{habit.day2}</td>
                  <td>{habit.day3}</td>
                  <td>{habit.day4}</td>
                  <td>{habit.day5}</td>
                  <td>{habit.day6}</td>
                  <td>{habit.day7}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <div
            className="card shadow"
            style={{
              fontSize: "3rem",
              color: "green",
            }}
            onClick={handleShow}
          >
            <MdFormatListBulletedAdd />
          </div>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Habits</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="habit">Habit Name</label>
                <input
                  type="text"
                  className="form-control text-center"
                  id="habit"
                  placeholder="Ex: Music composing"
                  name="habit"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control text-center"
                  id="description"
                  placeholder="Ex: From 6pm to 8pm"
                  name="description"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-auto d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn bg-success text-white mt-3"
                  disabled={loading}
                >
                  {loading ? "Loading.." : "Insert"}
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
}
