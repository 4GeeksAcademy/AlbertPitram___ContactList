import React from "react";
import { useNavigate } from "react-router-dom";

const ContactCard = ({ contact, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{contact.name}</h5>
        <p className="card-text mb-1"><strong>Email:</strong> {contact.email}</p>
        <p className="card-text mb-1"><strong>Phone:</strong> {contact.phone}</p>
        <p className="card-text"><strong>Address:</strong> {contact.address}</p>

        <div className="d-flex justify-content-end mt-3">
          <button
            className="btn btn-sm btn-outline-primary me-2"
            onClick={() => navigate(`/add-contact?id=${contact.id}`)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(contact.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
