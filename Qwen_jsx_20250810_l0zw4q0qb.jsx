// safarbot-web/pages/index.js
import { useState } from 'react';
import styles from '../styles/globals.css';

export default function Home() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: message }),
    });

    const data = await res.json();
    setResponse(data.text);
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <header>
        <h1>🇸🇦 SafarBot</h1>
        <p><strong>O'zbekistonliklar uchun sun'iy intellekt sayyohlik yordamchisi</strong></p>
      </header>

      <main>
        <p>Qayerga borishni xohlaysiz? Sizga to'liq reja tuzib beraman.</p>

        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Masalan: Men Toshkentdan Antalyaga 5 kunlik oilaviy sayohat qilmoqchiman"
            rows="3"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Reja tuzilmoqda...' : 'Reja tuzish'}
          </button>
        </form>

        {response && (
          <div className="response">
            <h3>✈️ Sizning sayohatingiz:</h3>
            <p>{response}</p>
          </div>
        )}
      </main>

      <footer>
        <p>© 2025 SafarBot. Barcha huquqlar himoyalangan.</p>
      </footer>
    </div>
  );
}