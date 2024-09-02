import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="mb-5 py-5 bg-dark text-light">
      <header className="container">
        <Link to="/" className="link-underline-opacity-0 link-light">
          <h1>Home Schedule Manager</h1>
        </Link>
      </header>
    </div>
  );
}

export default Header;
