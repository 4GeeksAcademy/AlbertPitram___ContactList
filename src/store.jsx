import React, { createContext, useContext, useEffect, useState } from "react";

const ContactContext = createContext();

export const useContacts = () => useContext(ContactContext);

export const ContactProvider = ({ children }) => {
  const API_BASE = "https://playground.4geeks.com/contact/";
  const AGENDA = "AlbertPitram";

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}agendas/${AGENDA}/contacts`);
      if (!res.ok) throw new Error("Error cargando contactos");
      const data = await res.json();
      setContacts(data.contacts || []);
    } catch (error) {
      console.error("Error cargando contactos:", error);
      setContacts([]);
    }
    setLoading(false);
  };

 
  const addContact = async (contact) => {
    setLoading(true);
    const newContact = {
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      address: contact.address,
    };

    try {
      const res = await fetch(`${API_BASE}agendas/${AGENDA}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact),
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server Response:", errorText);
        throw new Error("Error adding contact");
      }
      await fetchContacts();
    } catch (error) {
      console.error("Error aadding contact:", error);
    }
    setLoading(false);
  };


  const updateContact = async (contact) => {
    setLoading(true);
    const updatedContact = {
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      address: contact.address,
    };

    try {
      const res = await fetch(`${API_BASE}agendas/${AGENDA}/contacts/${contact.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContact),
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Respuesta del servidor:", errorText);
        throw new Error("Error updating contact");
      }
      await fetchContacts();
    } catch (error) {
      console.error("Error updating contacts:", error);
    }
    setLoading(false);
  };

  
  const deleteContact = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}agendas/${AGENDA}/contacts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server response:", errorText);
        throw new Error("Error deleting contact");
      }
      await fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <ContactContext.Provider
      value={{
        contacts,
        loading,
        addContact,
        updateContact,
        deleteContact,
        fetchContacts,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
