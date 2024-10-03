import { Link, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";

export default function CoursesNavigation() {
    const location = useLocation();  // 获取当前的页面路径

    // 用来检查当前的路径是否和 Link 的路径匹配
    const isActive = (path: string) => location.pathname === path;

    return (
        <div id="wd-kanbas-navigation" style={{ width: 110 }}
            className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2 text-center">
            
            <a id="wd-neu-link" target="_blank"
                href="https://www.northeastern.edu/"
                className="list-group-item bg-black border-0">
                <img src="/images/NEU.png" width="75px" alt="Northeastern University Logo" /></a>

            <Link to="/Kanbas/Account" id="wd-account-link"
                className={`list-group-item text-center border-0 ${isActive('/Kanbas/Account') ? 'bg-white' : 'bg-black'}`}>
                <FaRegCircleUser className="fs-1 text-white" /><br />
                <span className={`${isActive('/Kanbas/Account') ? 'text-danger' : 'text-white'}`}>Account</span>
            </Link>

            <Link to="/Kanbas/Dashboard" id="wd-dashboard-link"
                className={`list-group-item text-center border-0 ${isActive('/Kanbas/Dashboard') ? 'bg-white' : 'bg-black'}`}>
                <AiOutlineDashboard className="fs-1 text-danger" /><br />
                <span className={`${isActive('/Kanbas/Dashboard') ? 'text-danger' : 'text-white'}`}>Dashboard</span>
            </Link>

            <Link to="/Kanbas/Courses" id="wd-course-link"
                className={`list-group-item text-center border-0 ${isActive('/Kanbas/Courses') ? 'bg-white' : 'bg-black'}`}>
                <LiaBookSolid className="fs-1 text-danger" /><br />
                <span className={`${isActive('/Kanbas/Courses') ? 'text-danger' : 'text-white'}`}>Courses</span>
            </Link>

            <Link to="/Kanbas/Calendar" id="wd-calendar-link"
                className={`list-group-item text-center border-0 ${isActive('/Kanbas/Calendar') ? 'bg-white' : 'bg-black'}`}>
                <IoCalendarOutline className="fs-1 text-danger" /><br />
                <span className={`${isActive('/Kanbas/Calendar') ? 'text-danger' : 'text-white'}`}>Calendar</span>
            </Link>

            <Link to="/Kanbas/Inbox" id="wd-inbox-link"
                className={`list-group-item text-center border-0 ${isActive('/Kanbas/Inbox') ? 'bg-white' : 'bg-black'}`}>
                <FaInbox className="fs-1 text-danger" /><br />
                <span className={`${isActive('/Kanbas/Inbox') ? 'text-danger' : 'text-white'}`}>Inbox</span>
            </Link>

            <Link to="/Labs" id="wd-labs-link"
                className={`list-group-item text-center border-0 ${isActive('/Labs') ? 'bg-white' : 'bg-black'}`}>
                <LiaCogSolid className="fs-1 text-danger" /><br />
                <span className={`${isActive('/Labs') ? 'text-danger' : 'text-white'}`}>Labs</span>
            </Link>

        </div>
    );
}
