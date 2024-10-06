import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChatComponent = (props) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [suggestions, setSuggestions] = useState([
    "¿Porque no hay agua?",
    "¿Cual es la temperatura?",
    "¿En que influye su distancia desde la tierra?",
  ]);

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (message) => {
    if (!message) return;

    const userMessage = { role: "user", content: message };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await axios.post(
        "https://3b2e-181-212-199-41.ngrok-free.app/webhook",
        { message: message }
      );

      console.log("Respuesta de OpenAI:", response.data.respuesta);

      const botMessage = {
        role: "assistant",
        content:
          response.data.respuesta || "No se recibió respuesta del asistente.",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        role: "assistant",
        content: "Lo siento, hubo un error al enviar el mensaje.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setInput("");
  };

  // Enviar el mensaje cuando se selecciona una sugerencia
  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    sendMessage(suggestion);
  };

  return (
    <div className="chat-container">
      {/* Mensajes del chat */}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Sugerencias (solo si no hay mensajes previos) */}
      {messages.length === 0 && (
        <div className="suggestions">
          <div className="suggestions-container">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="suggestion"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="chat-input">
        <input
          type="text"
          placeholder="Escribe tu consulta..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input) && setInput("")}
        />
        <button onClick={() => sendMessage(input)}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatComponent;
