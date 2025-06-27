import { useContacts } from "../store.jsx";
import { Link } from "react-router-dom";

const Home = () => {
  const { contacts, loading, deleteContact } = useContacts();

  const contactList = Array.isArray(contacts) ? contacts : [];

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este contacto?")) {
      await deleteContact(id);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">📒 My contacts</h2>
        <Link to="/add-contact" className="btn btn-primary">
          + Add Contact
        </Link>
      </div>

      {loading && <p>Loading Contact...</p>}

      {!loading && contactList.length === 0 && (
        <p className="text-muted">No contacts yet.</p>
      )}

      {!loading && contactList.length > 0 && (
        <ul className="list-group">
          {contactList.map((contact) => (
            <li key={contact.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  
                  <img
                    src="https://enoughproject.org/wp-content/uploads/2017/04/Ryan_Gosling-e1493121669188-300x300.jpg"
                    alt="Profile"
                    className="rounded-circle me-3"
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      border: "1px solid #ccc"
                    }}
                  />
                  
                  <div>
                    <h5 className="mb-1">{contact.name}</h5>
                    <p className="mb-1"><i class="fa-solid fa-envelope"></i>{contact.email}</p>
                    <p className="mb-1"><i class="fa-solid fa-phone"></i>{contact.phone}</p>
                    <p className="mb-0"><i class="fa-solid fa-location-dot"></i>{contact.address}</p>
                  </div>
                </div>
                <div>
                  <Link to={`/add-contact?id=${contact.id}`} className="btn btn-sm btn-outline-secondary me-2">
                    <i class="fa-solid fa-pencil"></i>
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(contact.id)}
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
