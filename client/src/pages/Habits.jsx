import { useState, useEffect } from "react";
import "../styles/Habit.css";
import { Button, Modal } from "react-bootstrap";
import { MdFormatListBulletedAdd } from "react-icons/md";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useSelector, useDispatch } from "react-redux";
import {
  habitGotAll,
  habitSubmitStart,
  habitSubmitSuccess,
  habitSubmitFailure,
  habitSubmitUpdateStart,
  habitSubmitUpdateSuccess,
  habitSubmitUpdateFailure,
  habitDeleteStart,
  habitDeleteSuccess,
  habitDeleteFailure,
  habitResetStart,
  habitResetSuccess,
  habitResetFailure,
  habitGotAllFailure,
} from "../../redux/user/userSlice";
export default function Habits() {
  //const [habits, setHabits] = useState([]);
  const [formdata, setFormdata] = useState({});
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const { error, loading, habits, currentUser } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // console.log(habits );

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
  const [graphData, setGraphData] = useState([]);
  //console.log(graphData);
  const formatGraphData = (habit) => {
    return [
      { name: "Day 1", percentage: habit.day1 },
      { name: "Day 2", percentage: habit.day2 },
      { name: "Day 3", percentage: habit.day3 },
      { name: "Day 4", percentage: habit.day4 },
      { name: "Day 5", percentage: habit.day5 },
      { name: "Day 6", percentage: habit.day6 },
      { name: "Day 7", percentage: habit.day7 },
    ];
  };

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      dispatch(habitSubmitStart());
      e.preventDefault();
      const response = await fetch("/api/habit/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await response.json();

      if (data.success === false) {
        dispatch(habitSubmitFailure(data.message));
        return;
      }
      dispatch(habitSubmitSuccess());
      fetchData();
      handleClose();
      setFormdata({});
    } catch (error) {
      dispatch(habitSubmitFailure(error));
    }
  };

  const handleUpdateChange = (e) => {
    setFormUpdatedData({ ...formUpdatedData, [e.target.id]: e.target.value });
  };
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(habitSubmitUpdateStart());
      const res = await fetch(`/api/habit/update/${selectedHabit._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formUpdatedData),
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(habitSubmitUpdateFailure(data.message));
        return;
      }
      dispatch(habitSubmitUpdateSuccess());
      fetchData();
      handleCloseUpdateModal();
      console.log(formUpdatedData);
      setFormUpdatedData({});
      setSelectedHabit({});
    } catch (error) {
      habitSubmitUpdateFailure(error);
      console.log(error);
    }
  };

  const handleDeleteHabit = async () => {
    try {
      dispatch(habitDeleteStart());
      const res = await fetch(`/api/habit/delete/${selectedHabit._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success == false) {
        dispatch(habitDeleteFailure(data.message));
        console.log(data);
        return;
      }

      dispatch(habitDeleteSuccess());
      fetchData();
      handleCloseUpdateModal();
    } catch (error) {
      habitDeleteFailure(error);
      console.log(error);
    }
  };
  const handleResetHabit = async (e) => {
    e.preventDefault();
    try {
      dispatch(habitResetStart());
      const res = await fetch(`/api/habit/update/${selectedHabit._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          day1: null,
          day2: null,
          day3: null,
          day4: null,
          day5: null,
          day6: null,
          day7: null,
        }),
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(habitResetFailure(data.message));
        return;
      }
      dispatch(habitResetSuccess());
      fetchData();
      handleCloseUpdateModal();
      setFormUpdatedData({});
      setSelectedHabit({});
    } catch (error) {
      dispatch(habitResetFailure(error));
      console.log(error);
    }

    //setFormUpdatedData({ "day1": null, "day2": null, "day3": null, "day4": null, "day5": null, "day6": null, "day7": null });
  };
  const readyToStartANewWeek = () => {
    return graphData.every((data) => data.percentage !== null);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/api/habit/all");
      if (response.ok) {
        const data = await response.json();
        dispatch(habitGotAll(data));
      } else {
        dispatch(habitGotAllFailure("Failed to fetch data"));
      }
    } catch (error) {
      dispatch(habitGotAllFailure(error));
      console.log(error);
    }
  };

  useEffect(() => {
    if (habits.length === 0) {
      fetchData();
    }
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
    return (
      "#" +
      color
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
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
        <div className="card-header text-center">H a b i t s</div>
        <div className="card-body table-responsive">
          <table className="table table-striped">
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
              {(Array.isArray(habits) ? habits : []).map((habit) => (
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
                    setGraphData(formatGraphData(habit));
                  }}
                >
                  <td>{habit.habit}</td>
                  <td>{habit.description}</td>
                  <td
                    className="color-transition"
                    style={{
                      backgroundColor:
                        habit.day1 !== null
                          ? getColorForPercentage(habit.day1)
                          : "transparent",
                    }}
                  >
                    {habit.day1}
                  </td>
                  <td
                    className="color-transition"
                    style={{
                      backgroundColor:
                        habit.day2 !== null
                          ? getColorForPercentage(habit.day2)
                          : "transparent",
                    }}
                  >
                    {habit.day2}
                  </td>
                  <td
                    className="color-transition"
                    style={{
                      backgroundColor:
                        habit.day3 !== null
                          ? getColorForPercentage(habit.day3)
                          : "transparent",
                    }}
                  >
                    {habit.day3}
                  </td>
                  <td
                    className="color-transition"
                    style={{
                      backgroundColor:
                        habit.day4 !== null
                          ? getColorForPercentage(habit.day4)
                          : "transparent",
                    }}
                  >
                    {habit.day4}
                  </td>
                  <td
                    className="color-transition"
                    style={{
                      backgroundColor:
                        habit.day5 !== null
                          ? getColorForPercentage(habit.day5)
                          : "transparent",
                    }}
                  >
                    {habit.day5}
                  </td>
                  <td
                    className="color-transition"
                    style={{
                      backgroundColor:
                        habit.day6 !== null
                          ? getColorForPercentage(habit.day6)
                          : "transparent",
                    }}
                  >
                    {habit.day6}
                  </td>
                  <td
                    className="color-transition"
                    style={{
                      backgroundColor:
                        habit.day7 !== null
                          ? getColorForPercentage(habit.day7)
                          : "transparent",
                    }}
                  >
                    {habit.day7}
                  </td>
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
            justifyContent: "right",
            alignItems: "right",
            marginTop: "10px",
          }}
        >
          <div
            className="card shadow insert_icon"
            style={{
              fontSize: "3rem",
              color: "green",
              marginBottom: "200px",
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
                  required
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
                  required
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
            <Modal.Title>Habit Progress</Modal.Title>
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
                  className="btn bg-success text-white mt-3 btn_update"
                  disabled={loading}
                >
                  {loading ? "Loading.." : "Update"}
                </button>
              </div>
            </form>
            <div
              style={{ display: "flex", justifyContent: "center" }}
              className="bar_chart"
            >
              <BarChart
                width={500}
                height={300}
                data={graphData}
                margin={{ top: 10, right: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="percentage" fill="#8884d8" />
              </BarChart>
            </div>
            <div className="col-md-auto d-flex justify-content-center ">
              <button
                className="btn bg-warning text-white mt-3 me-3 btn_danger"
                disabled={loading || !readyToStartANewWeek()}
                onClick={handleResetHabit}
              >
                {loading ? "Loading.." : "Start a new week"}
              </button>
              <button
                className="btn bg-danger text-white mt-3 btn_danger2"
                disabled={loading}
                onClick={handleDeleteHabit}
              >
                {loading ? "Loading.." : "Delete"}
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
}
