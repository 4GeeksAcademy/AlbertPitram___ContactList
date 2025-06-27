import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand mb-0 h1">
          📱 Agenda 2030 React
        </Link>

        <div className="d-flex gap-2">
          <Link to="/contact" className="btn btn-outline-secondary">
            See Contacts
          </Link>

          <Link to="/add-contact" className="btn btn-primary">
            + Add Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};
