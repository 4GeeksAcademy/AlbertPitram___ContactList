import React, { useState, useEffect } from "react";
import { useContacts } from "../store.jsx";
import { useNavigate, useLocation, Link } from "react-router-dom";

const AddContact = () => {
  const { addContact, updateContact, contacts } = useContacts();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const editingId = searchParams.get("id");

  const isEditing = !!editingId;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (isEditing) {
      const contact = contacts.find((c) => c.id === parseInt(editingId));
      if (contact) {
        setFormData({
          name: contact.name,    
          email: contact.email,
          phone: contact.phone,
          address: contact.address,
          id: contact.id,
        });
      }
    }
  }, [editingId, contacts, isEditing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateContact(formData);
    } else {
      await addContact(formData);
    }
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{isEditing ? "Edit Contact" : "Add New Contact"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-2"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          className="form-control mb-2"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          className="form-control mb-2"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          className="form-control mb-2"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-primary">
          {isEditing ? "Update Contact" : "Create Contact"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <Link to="/" className="btn btn-secondary">
          ← Back to Contact List
        </Link>
      </div>
    </div>
  );
};

export default AddContact;
