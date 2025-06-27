import React, { useState } from "react";
import { useContacts } from "../store.jsx";
import ContactCard from "../components/ContactCard";
import ConfirmModal from "../components/ConfirmModal";

const Contact = () => {
  const { contacts, deleteContact, loading } = useContacts();

  const [modalVisible, setModalVisible] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const openModal = (id) => {
    setContactToDelete(id);
    setModalVisible(true);
  };

  const closeModal = () => {
    setContactToDelete(null);
    setModalVisible(false);
  };

  const handleConfirmDelete = () => {
    if (contactToDelete) {
      deleteContact(contactToDelete);
      closeModal();
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">📇 All contacts</h2>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && contacts && Array.isArray(contacts) && contacts.length > 0 ? (
        <div className="row justify-content-center">
          <div className="col-md-8">
            {contacts.map((c) => (
              <ContactCard key={c.id} contact={c} onDelete={openModal} />
            ))}
          </div>
        </div>
      ) : (
        !loading && <p className="text-muted mt-4">No hay contacts yet.</p>
      )}

      <ConfirmModal
        show={modalVisible}
        onClose={closeModal}
        onConfirm={handleConfirmDelete}
        message="¿Are you sure you want to delete this contact?"
      />
    </div>
  );
};

export default Contact;
