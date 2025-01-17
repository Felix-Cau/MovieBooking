import { Link } from "react-router-dom";
import HeaderMenuItem from "./HeaderMenuItem";

function Header(): JSX.Element {
  return (
    <header>
      {/* Floating fixed navbar here */}
      <nav className="navbar navbar-expand-md fixed-top bg-light">
        <div className="container-fluid">
          <div>
            <Link className="navbar-brand" to="/">
              Movie Booker
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            {/* Navbar links */}
            <div className="navbar-nav ms-auto">
              <div className="href-style">
                <HeaderMenuItem link="/" text="Home" />
              </div>
              <div className="href-style">
                <HeaderMenuItem link="/managebookings" text="Manage Bookings" />
              </div>
              <div className="href-style">
                <HeaderMenuItem link="/admin" text="Admin" />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
