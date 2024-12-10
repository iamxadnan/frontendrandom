import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavBar from './AdminNavBar';
import config from '../config';

export default function ViewATickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = () => {
    axios
      .get(`${config.url}/admin/viewalltickets`)
      .then((response) => {
        setTickets(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching ticket issues!", error);
        setLoading(false);
      });
  };

  const deleteTicket = (tid) => {
    console.log(tid);
    axios
      .delete(`${config.url}/admin/deleteticket/${tid}`)
      .then(() => {
        
        alert(`Ticket ID ${tid} deleted successfully!`);
        fetchTickets(); // Refresh the ticket list after deletion
      })
      .catch((error) => {
        console.error("There was an error deleting the ticket!", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const styles = {
    container: {
      padding: '20px',
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    cardContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center',
    },
    card: {
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '20px',
      width: '300px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    cardHeader: {
      backgroundColor: '#f5f5f5',
      padding: '10px',
      borderRadius: '8px 8px 0 0',
      marginBottom: '10px',
    },
    cardBody: {
      margin: '5px 0',
    },
    deleteButton: {
      marginTop: '10px',
      backgroundColor: '#ff4d4f',
      color: '#fff',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  return (
    <div>
      <AdminNavBar />
      <div style={styles.container}>
        <h1 style={styles.title}>All Ticket Issues</h1>
        <div style={styles.cardContainer}>
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <div style={styles.card} key={ticket.tid}>
                <div style={styles.cardHeader}>
                  <h3>Ticket ID: {ticket.tid}</h3>
                  <p><strong>User:</strong> {ticket.userid}</p>
                </div>
                <div>
                  <p><strong>Type of Issue:</strong> {ticket.typeofissue}</p>
                  <p><strong>Message:</strong> {ticket.issuemsg}</p>
                </div>
                <button
                  style={styles.deleteButton}
                  onClick={() => deleteTicket(ticket.tid)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No tickets found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
