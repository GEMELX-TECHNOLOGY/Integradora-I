import React from 'react';
import Dashboard from '../components/Dashboard';
import '../Styles/Estilodash.css';
import '../Styles/Chat.css'; 

function Chat() {
  return (
    <>
      <Dashboard />
      <div className="chat-container">
        <div className="sidebar">
          <div className="chat-list">
            <div className="chat-user">
              <img src="https://via.placeholder.com/40" alt="Avatar" />
              <div className="user-info">
                <h4>Michelle Ortega</h4>
                <p>Lorem ipsum...</p>
              </div>
            </div>
            <div className="chat-user">
              <img src="https://via.placeholder.com/40" alt="Avatar" />
              <div className="user-info">
                <h4>Edwin Solorza</h4>
                <p>Lorem ipsum...</p>
              </div>
            </div>
          </div>
        </div>

        <div className="chat-window">
          <div className="chat-header">
            <img src="https://via.placeholder.com/40" alt="Avatar" />
            <h3>Michelle Ortega</h3>
          </div>
          <div className="chat-body">
            <div className="message left">
              <p>Lorem ipsum has been the industry's standard dummy text.</p>
              <span className="timestamp">8:00 PM</span>
            </div>
            <div className="message right">
              <p>Lorem ipsum has been the industry's standard dummy text.</p>
              <span className="timestamp">8:00 PM</span>
            </div>
          </div>
          <div className="chat-input">
            <input type="text" placeholder="Digite un mensaje..." />
            <button>Enviar</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
