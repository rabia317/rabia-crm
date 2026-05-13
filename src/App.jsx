import { useState, useEffect } from "react";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("contacts");
    if (saved) setContacts(JSON.parse(saved));
  }, []);

  function saveContacts(list) {
    setContacts(list);
    localStorage.setItem("contacts", JSON.stringify(list));
  }

  function addContact(name, note, status) {
    const list = [{ id: Date.now(), name, note, status }, ...contacts];
    saveContacts(list);
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Rabia CRM</h1>
      <p>Toplam aday: {contacts.length}</p>
    </div>
  );
}