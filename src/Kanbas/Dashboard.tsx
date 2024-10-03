import { Link } from "react-router-dom";
import "./Dashboard.css";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2>

            <div id="wd-dashboard-course" className="row">
                <div className="row row-cols-1 row-cols-md-4 g-4">

                    <div className="wd-dashboard-corse col" style={{ width: "260px" }}>
                        <div className="card">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                                to="/Kanbas/Courses/1234/Home">
                                <img src="/images/reactjs.jpg" className="card-img-top" alt="React JS" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">
                                        CS1234 React JS
                                    </h5>
                                    <p className="card-text">
                                        Full Stack software developer
                                    </p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </Link>
                        </div>
                    </div>


                    <div className="wd-dashboard-corse col" style={{ width: "260px" }}>
                        <div className="card">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                                to="/Kanbas/Courses/1234/Home">
                                <img src="/images/reactjs.jpg" className="card-img-top" alt="React JS" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">
                                        CS4550 Web Development
                                    </h5>
                                    <p className="card-text">
                                        Learn to build websites and web applications
                                    </p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-corse col" style={{ width: "260px" }}>
                        <div className="card">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                                to="/Kanbas/Courses/1234/Home">
                                <img src="/images/reactjs.jpg" className="card-img-top" alt="React JS" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">
                                        CS5200 Database Management
                                    </h5>
                                    <p className="card-text">
                                        Master relational databases and SQL
                                    </p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-corse col" style={{ width: "260px" }}>
                        <div className="card">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                                to="/Kanbas/Courses/1234/Home">
                                <img src="/images/reactjs.jpg" className="card-img-top" alt="React JS" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">
                                        CS4100 Artificial Intelligence
                                    </h5>
                                    <p className="card-text">
                                        Explore AI concepts and applications
                                    </p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-corse col" style={{ width: "260px" }}>
                        <div className="card">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                                to="/Kanbas/Courses/1234/Home">
                                <img src="/images/reactjs.jpg" className="card-img-top" alt="React JS" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">
                                        CS5640 Machine Learning
                                    </h5>
                                    <p className="card-text">
                                        Dive into machine learning algorithms
                                    </p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-corse col" style={{ width: "260px" }}>
                        <div className="card">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                                to="/Kanbas/Courses/1234/Home">
                                <img src="/images/reactjs.jpg" className="card-img-top" alt="React JS" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">
                                        CS5008 Data structure, algos, Computer Systems
                                    </h5>
                                    <p className="card-text">
                                        Dive into C and alogs
                                    </p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-corse col" style={{ width: "260px" }}>
                        <div className="card">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                                to="/Kanbas/Courses/1234/Home">
                                <img src="/images/reactjs.jpg" className="card-img-top" alt="React JS" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">
                                        CS5004 Object-Oriented Design 
                                    </h5>
                                    <p className="card-text">
                                        An intensive tour of class-based program design.
                                    </p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </Link>
                        </div>
                    </div>


                </div>


            </div>


        </div>
    );
}










{/* 
                <div className="wd-dashboard-course">
                    <img src="/images/reactjs.jpg" width={200} />
                    <div>
                        <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/4550/Home">
                            CS4550 Web Development
                        </Link>
                        <p className="wd-dashboard-course-title">
                            Learn to build websites and web applications
                        </p>
                        <Link to="/Kanbas/Courses/4550/Home"> Go </Link>
                    </div>
                </div>

                <div className="wd-dashboard-course">
                    <img src="/images/reactjs.jpg" width={200} />
                    <div>
                        <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/5200/Home">
                            CS5200 Database Management
                        </Link>
                        <p className="wd-dashboard-course-title">
                            Master relational databases and SQL
                        </p>
                        <Link to="/Kanbas/Courses/5200/Home"> Go </Link>
                    </div>
                </div>

                <div className="wd-dashboard-course">
                    <img src="/images/reactjs.jpg" width={200} />
                    <div>
                        <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/4100/Home">
                            CS4100 Artificial Intelligence
                        </Link>
                        <p className="wd-dashboard-course-title">
                            Explore AI concepts and applications
                        </p>
                        <Link to="/Kanbas/Courses/4100/Home"> Go </Link>
                    </div>
                </div>

                <div className="wd-dashboard-course">
                    <img src="/images/reactjs.jpg" width={200} />
                    <div>
                        <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/5640/Home">
                            CS5640 Machine Learning
                        </Link>
                        <p className="wd-dashboard-course-title">
                            Dive into machine learning algorithms
                        </p>
                        <Link to="/Kanbas/Courses/5640/Home"> Go </Link>
                    </div>
                </div>

            </div>
        </div> */}
