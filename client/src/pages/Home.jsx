import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { useSelector } from "react-redux";


export default function Home() {
  const { currentUser } = useSelector((state) => state.user);

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
          <div className="col-lg-7 d-none d-lg-block">
            <Carousel fade>
              <Carousel.Item interval={4000} className="carousel-item-custom">
                <div className="carousel-image1 shadow"></div>
                <Carousel.Caption>
                  <h3>Daily</h3>
                  <p>The life is always about time</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={4000} className="carousel-item-custom">
                <div className="carousel-image2"></div>
                <Carousel.Caption>
                  <h3>Track</h3>
                  <p>You got to go with concentration</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={4000} className="carousel-item-custom">
                <div className="carousel-image3"></div>
                <Carousel.Caption>
                  <h3>Your Habits</h3>
                  <p>Small units that can make the road to success</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="col-lg-5">
            <h3 className="font-weight-light text-center ">
              .......Welcome.......
            </h3>
            <p>
              This is Daily Habit Tracker, which gives you ability to track your
              habits. It offers you an easy and coherent way to view your habits
              and how the progress of each habits at the end of a week. It helps
              you to identify the taste that is unique to each of your habits,
              by keep doing them daily. At the end, keep learning to identify
              the taste of habits will also become a habit. Then you will chase
              after the taste of learning, instead track the habits. Because it
              is no longer needed. That is Daily Habit Tracker's ultimate goal.
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
      <div
        className=" card shadow qnacard mx-5 my-5"
        style={{
          zIndex: "1",
          margin: "auto",
          animation: "slideInFromLeft 0.2s ease-out",
        }}
      >
        <div className="row gx-4 gx-lg-5 align-items-stretch my-5 mx-2">
          <div className="col-lg-4">
            <Accordion defaultActiveKey={currentUser ? "1" : "0"}>
              <Accordion.Item eventKey="0" className="border-0" >
                <Card className="h-100 border-0 shadow card-react">
                  <Card.Body>
                    <Accordion.Header>
                      <Card.Header className="font-weight-light text-center h5">
                        To whom
                      </Card.Header>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Card.Text>
                        You wanna build habits but you forget it sometimes and
                        it breaks the loop. Or you know you should build a
                        particular habit, but you doesn't feel pleasure while
                        doing it. Or you canot keep track it at a specific time.
                        Yeah this is for you.
                      </Card.Text>
                    </Accordion.Body>
                  </Card.Body>
                </Card>
              </Accordion.Item>
            </Accordion>
          </div>
          <div className="col-lg-4">
            <Accordion defaultActiveKey={currentUser ? "1" : "0"}>
              <Accordion.Item eventKey="0" className="border-0">
                <Card className="h-100 border-0 shadow card-react">
                  <Card.Body>
                    <Accordion.Header>
                      <Card.Header className="font-weight-light text-center h5">
                        How to use this
                      </Card.Header>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Card.Text>
                        Once you register and signed in, you can create habits
                        as much as you want. But at the beginning, we recommend
                        you to add one habit and track it daily to see the
                        progress at the end of the week, especially if you are
                        not confident enough to track multiple habits. Once you
                        finish a week, for the next week you can add the same
                        habit again without clicking start a new week. Then you
                        can even see your previous progress too. You can do this
                        again and again until you feel the taste in it. At that time, No longer focus at one habit. You
                        can just start more habits and track them. Then at the end of
                        a week, you can reset the data you stored.
                      </Card.Text>
                    </Accordion.Body>
                  </Card.Body>
                </Card>
              </Accordion.Item>
            </Accordion>
          </div>
          <div className="col-lg-4">
            <Accordion defaultActiveKey={currentUser ? "1" : "0"}>
              <Accordion.Item eventKey="0" className="border-0">
                <Card className="h-100 border-0 shadow card-react">
                  <Card.Body>
                    <Accordion.Header>
                      <Card.Header className="font-weight-light text-center h5">
                        Where is progress
                      </Card.Header>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Card.Text>
                        Progress can be seen when you click on a habit and
                        scroll down, by a nice bar graph. After seeing the
                        progress at the end of a week, you can plan how you
                        should continue the habit in the next week and reset the
                        habit for starting the new week. Remember when you reset
                        the habits, the information of the week will be
                        completely deleted. The system is designed for a easy
                        approach which lets you keep watching the progress at
                        the end of a week. Because most of the people forget
                        what they did in earlier days very quickly. So, track
                        like a month is not that efficient from our viewpoint.
                      </Card.Text>
                    </Accordion.Body>
                  </Card.Body>
                </Card>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
      <div
        className=" card shadow qnacard mx-5 my-5"
        style={{
          zIndex: "1",
          margin: "auto",
          animation: "slideInFromLeft 0.2s ease-out",
        }}
      >
        <div className="row gx-4 gx-lg-5 align-items-stretch my-5 mx-2">
          <div className="col-lg-4">
            <Accordion defaultActiveKey={currentUser ? "1" : "0"}>
              <Accordion.Item eventKey="0" className="border-0">
                <Card className="h-100 border-0 shadow card-react">
                  <Card.Body>
                    <Accordion.Header>
                      <Card.Header className="font-weight-light text-center h5">
                        Tried but feels hard
                      </Card.Header>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Card.Text>
                        If it doesn’t feel good, we recommend you to reduce the
                        time you spend and start smaller. Even though you feel
                        like you can only concentrate 1 second on a habit, start
                        by doing it for just one second. But remember whatever
                        time you choose should be closer to your best time. Not
                        the worst one. When you keep doing for that little time,
                        your strengths will be awakened, and they let you
                        improve the time on the habit. It feels like a tree
                        grows from a little tiny plant to a giant tree. Then you
                        will start to feel the taste in it and next the progress
                        will slowly start to become good.
                      </Card.Text>
                    </Accordion.Body>
                  </Card.Body>
                </Card>
              </Accordion.Item>
            </Accordion>
          </div>
          <div className="col-lg-4">
            <Accordion defaultActiveKey={currentUser ? "1" : "0"}>
              <Accordion.Item eventKey="0" className="border-0">
                <Card className="h-100 border-0 shadow card-react">
                  <Card.Body>
                    <Accordion.Header>
                      <Card.Header className="font-weight-light text-center h5">
                        Is tracking forever
                      </Card.Header>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Card.Text>
                        Not for sure. Once your progress feels good, you can
                        continue the habit and enjoy the tracking and weekly
                        results. After sometime, you may feel you are not enjoying tracking anymore.
                        Then you stop the
                        tracking and delete the habit. Don't be messed up. Your mind will keep helping to do it. The taste. Taste has ultimate energy.
                      </Card.Text>
                    </Accordion.Body>
                  </Card.Body>
                </Card>
              </Accordion.Item>
            </Accordion>
          </div>
          <div className="col-lg-4">
            <Accordion defaultActiveKey={currentUser ? "1" : "0"}>
              <Accordion.Item eventKey="0" className="border-0">
                <Card className="h-100 border-0 shadow card-react">
                  <Card.Body>
                    <Accordion.Header>
                      <Card.Header className="font-weight-light text-center h5">
                        how much I did
                      </Card.Header>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Card.Text>
                        If you feel hard to decide the exact percentage you did
                        on your habit, when comparing to the daily amount of work that you thought
                        to do, just use multiplications of 10. When you keep
                        doing your habits, you will start to see your strengths
                        and weaknesses. When you know them, you will feel like
                        "Ohh now I can give more wider percentages, instead of giving
                        multiplications of 10". That's it.
                      </Card.Text>
                    </Accordion.Body>
                  </Card.Body>
                </Card>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
