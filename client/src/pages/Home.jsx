import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="card shadow mx-2 my-5" style={{
      zIndex: "1",
      margin: "auto",
      animation: "slideInFromLeft 0.2s ease-out",
    }}>
      <div className="row gx-4 gx-lg-5 align-items-center my-5 mx-auto ">
        <div className="col-lg-7 ">
          <Carousel fade>
            <Carousel.Item className="carousel-item-custom" interval={4000}>
              <div className="carousel-image1 shadow"></div>
              <Carousel.Caption>
                <h3>Daily</h3>
                <p>
                  The life is always about time.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="carousel-item-custom" interval={4000}>
            <div className="carousel-image2"></div>
              <Carousel.Caption>
                <h3>Track</h3>
                <p>You got to go with concentration</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="carousel-item-custom" interval={4000}>
            <div className="carousel-image3"></div>
              <Carousel.Caption>
                <h3>Your Habits</h3>
                <p>
                  Small units that can make the road to success
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="col-lg-5">
          <h3 className="font-weight-light text-center ">Welcome</h3>
          <p>
            This is Daily Habit Tracker, which gives you ability to track your
            habits. It offers you an easy and coherent way to view your habits
            and how the progress of each habits at the end of a week. It helps
            you to identify the taste that is unique to each of your habits, by
            keep doing them daily. At the end, keep learning to identify the
            taste of habits will also become a habit. Then you will chase after
            the taste of learning, instead track the habits. Because it is no
            longer needed. That is Daily Habit Tracker's ultimate goal.
          </p>
          <Link
            className="btn btn-success d-flex justify-content-center"
            to="/register"
          >
            Lets Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
