import { useState, useEffect } from "react";
import "../styles/Habit.css";
import { Button, Modal } from "react-bootstrap";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { set } from "mongoose";
export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [formdata, setFormdata] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedHabit({});
  };
  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const [selectedHabit, setSelectedHabit] = useState({});
  const [formUpdatedData, setFormUpdatedData] = useState({});
  // console.log(selectedHabit);
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

  const handleUpdateChange = (e) => {
    setFormUpdatedData({ ...formUpdatedData, [e.target.id]: e.target.value });
  };
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/habit/update/${selectedHabit._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formUpdatedData),
      });
      const data = await res.json();
      if (data.success == false) {
        setError(true);
        setLoading(false);
        return;
      }
      setError(false);
      fetchData();
      setLoading(false);
      handleCloseUpdateModal();
      setFormUpdatedData({});
      setSelectedHabit({});
    } catch (error) {
      setError(true);
      setLoading(false);
      console.log(error);
    }
  };

  const handleDeleteHabit = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/habit/delete/${selectedHabit._id}`, {
        method: "DELETE",
      });
      
      const data = await res.json();
      if (data.success == false) {
        setError(true);
        setLoading(false);
        console.log(data);
        return;
      }

      setLoading(false);
      setError(false);
      fetchData();
      handleCloseUpdateModal();
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

  //color changing mechanism

  function interpolateColor(color1, color2, factor) {
    const result = color1.slice();
    for (let i = 0; i < 3; i++) {
      result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
  }
  function rgbToHex(color) {
    return '#' + color.map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }
  function getColorForPercentage(pct) {
    const percent = Math.max(Math.min(100, pct), 0) / 100;
    let color1, color2;
    if (percent < 0.5) {
      color1 = [255, 0, 0];
      color2 = [255, 255, 0];
      pct = percent * 2;
    } else {
      color1 = [255, 255, 0];
      color2 = [0, 255, 0];
      pct = (percent - 0.5) * 2;
    }
    const color = interpolateColor(color1, color2, pct);
    return rgbToHex(color);
  }
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
          <table className="table table-striped">
            <thead>
              <tr >
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
                <tr
                  key={habit._id}
                  className="tr-hover"
                  style={{
                    zIndex: "1",
                    margin: "auto",
                    animation: "slideInFromLeft 0.2s ease-out",
                  }}
                  onClick={() => {
                    handleShowUpdateModal();
                    setSelectedHabit(habit);

                  }}
                >
                  <td>{habit.habit}</td>
                  <td>{habit.description}</td>
                  <td className="color-transition" style={{backgroundColor: habit.day1!== null ? getColorForPercentage(habit.day1) : 'transparent'}}>{habit.day1}</td>
                  <td className="color-transition" style={{backgroundColor: habit.day2!== null ? getColorForPercentage(habit.day2) : 'transparent'}}>{habit.day2}</td>
                  <td className="color-transition" style={{backgroundColor: habit.day3!== null ? getColorForPercentage(habit.day3) : 'transparent'}}>{habit.day3}</td>
                  <td className="color-transition" style={{backgroundColor: habit.day4!== null ? getColorForPercentage(habit.day4) : 'transparent'}}>{habit.day4}</td>
                  <td className="color-transition" style={{backgroundColor: habit.day5!== null ? getColorForPercentage(habit.day5) : 'transparent'}}>{habit.day5}</td>
                  <td className="color-transition" style={{backgroundColor: habit.day6!== null ? getColorForPercentage(habit.day6) : 'transparent'}}>{habit.day6}</td>
                  <td className="color-transition" style={{backgroundColor: habit.day7!== null ? getColorForPercentage(habit.day7) : 'transparent'}}>{habit.day7}</td>
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
            className="card shadow insert_icon"
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
        <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Habit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleUpdateSubmit}>
              <div className="form-group">
                <label htmlFor="habit">Habit Name</label>
                <input
                  type="text"
                  className="form-control text-center"
                  id="habit"
                  placeholder="Ex: Music composing"
                  name="habit"
                  defaultValue={selectedHabit.habit}
                  onChange={handleUpdateChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control text-center"
                  id="description"
                  placeholder="The avg percentage of completion"
                  name="description"
                  defaultValue={selectedHabit.description}
                  onChange={handleUpdateChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="day1">Day 1</label>
                <input
                  type="number"
                  className="form-control text-center"
                  id="day1"
                  placeholder="The avg percentage of completion"
                  name="day1"
                  defaultValue={selectedHabit.day1}
                  onChange={handleUpdateChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="day2">Day 2</label>
                <input
                  type="number"
                  className="form-control text-center"
                  id="day2"
                  placeholder="The avg percentage of completion"
                  name="day2"
                  defaultValue={selectedHabit.day2}
                  onChange={handleUpdateChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="day3">Day 3</label>
                <input
                  type="number"
                  className="form-control text-center"
                  id="day3"
                  placeholder="The avg percentage of completion"
                  name="day3"
                  defaultValue={selectedHabit.day3}
                  onChange={handleUpdateChange}
                />
                
              </div>
              <div className="form-group">
                <label htmlFor="day4">Day 4</label>
                <input
                  type="number"
                  className="form-control text-center"
                  id="day4"
                  placeholder="The avg percentage of completion"
                  name="day4"
                  defaultValue={selectedHabit.day4}
                  onChange={handleUpdateChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="day5">Day 5</label>
                <input
                  type="number"
                  className="form-control text-center"
                  id="day5"
                  placeholder="The avg percentage of completion"
                  name="day5"
                  defaultValue={selectedHabit.day5}
                  onChange={handleUpdateChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="day6">Day 6</label>
                <input
                  type="number"
                  className="form-control text-center"
                  id="day6"
                  placeholder="The avg percentage of completion"
                  name="day6"
                  defaultValue={selectedHabit.day6}
                  onChange={handleUpdateChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="day7">Day 7</label>
                <input
                  type="number"
                  className="form-control text-center"
                  id="day7"
                  placeholder="The avg percentage of completion"
                  name="day7"
                  defaultValue={selectedHabit.day7}
                  onChange={handleUpdateChange}
                />
              </div>
              {/* Add more input fields for the remaining columns here */}
              <div className="col-md-auto d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn bg-success text-white mt-3 me-3"
                  disabled={loading}
                >
                  {loading ? "Loading.." : "Update"}
                </button>
                <button
                  className="btn bg-danger text-white mt-3"
                  disabled={loading}
                  onClick={handleDeleteHabit}
                >
                  {loading ? "Loading.." : "Delete"}
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
}
