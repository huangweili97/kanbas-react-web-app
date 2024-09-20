import { Link } from "react-router-dom";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> 
            <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> 
            <hr />
            <div id="wd-dashboard-courses">
                
                <div className="wd-dashboard-course">
                    <img src="/images/reactjs.jpg" width={200} />
                    <div>
                        <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/1234/Home">
                            CS1234 React JS
                        </Link>
                        <p className="wd-dashboard-course-title">
                            Full Stack software developer
                        </p>
                        <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
                    </div>
                </div>

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
        </div>
    );
}
