export default function Modules() {
    return (
        <div>
            <button>Collapse All</button>
            <button>View Progress</button>
            <select>
                <option value="publishall">Publish All</option>
            </select>
            <button>+ Module</button>

            <ul id="wd-modules">
                {/* Module 1 */}
                <li className="wd-module">
                    <div className="wd-title">
                        Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda
                    </div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">Week 1, Lecture 1</span>
                            <ul className="wd-content">
                                <li>
                                    <span className="wd-title">LEARNING OBJECTIVES</span>
                                    <ul>
                                        <li className="wd-content-item">Introduction to the course</li>
                                        <li className="wd-content-item">Learn what is Web Development</li>
                                    </ul>
                                </li>

                                <li>
                                    <span className="wd-title">READING</span>
                                    <ul>
                                        <li className="wd-content-item">
                                            Full Stack Developer - Chapter 1: Introduction
                                        </li>
                                        <li className="wd-content-item">
                                            Full Stack Developer - Chapter 2: Creating User Interface
                                        </li>
                                    </ul>
                                </li>

                                <li>
                                    <span className="wd-title">SLIDES</span>
                                    <ul>
                                        <li className="wd-content-item">Introduction to Web Development</li>
                                        <li className="wd-content-item">Creating a React Application</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>

                {/* Module 2 */}
                <li className="wd-module">
                    <div className="wd-title">
                        Week 1, Lecture 2 - Formatting User Interfaces with HTML
                    </div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">Week 1, Lecture 2</span>
                            <ul className="wd-content">
                                <li>
                                    <span className="wd-title">LEARNING OBJECTIVES</span>
                                    <ul>
                                        <li className="wd-content-item">
                                            Learn how to create user interfaces with HTML
                                        </li>
                                        <li className="wd-content-item">Deploy the assignment to Netlify</li>
                                    </ul>
                                </li>

                                <li>
                                    <span className="wd-title">READING</span>
                                    <ul>
                                        <li className="wd-content-item">
                                            Introduction to HTML and DOM
                                        </li>
                                        <li className="wd-content-item">
                                            Formatting web content with headings
                                        </li>
                                    </ul>
                                </li>

                                <li>
                                    <span className="wd-title">SLIDES</span>
                                    <ul>
                                        <li className="wd-content-item">Introduction to Web Development</li>
                                        <li className="wd-content-item">Creating a React Application</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
