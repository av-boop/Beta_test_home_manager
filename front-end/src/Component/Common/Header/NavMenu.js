import { Link } from "react-router-dom";

function NavMenu(params) {
    return (
      <nav className="nav flex-column">
        <Link to="/" className="nav-link link-secondary">
          Home
        </Link>
        <Link to="/profiles" className="nav-link link-secondary">
          View All Profiles
        </Link>
        <Link to="/tasks" className="nav-link link-secondary">
          View All Tasks
        </Link>
        <hr />
        <Link to="/profiles/new" className="nav-link link-secondary">
          Create New Profile
        </Link>
        <Link to="/tasks/new" className="nav-link link-secondary">
          Create New Task
        </Link>
      </nav>
    );
}

export default NavMenu;