import React from 'react';
import './App.css';
import Worksheet from './components/Worksheet';

function App() {
  return (
    <div className="App" style={{
      backgroundImage: `url(${process.env.PUBLIC_URL + '/background.jpg'})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <header className="App-header">
        <h1>Round 'Em Up</h1>
      </header>
      <main>
        <Worksheet />
      </main>
      <footer>
        <p className='copyright'>© 2024 Math Worksheet App. All rights reserved.</p>
      </footer>
      <div className="bottom-right-text">
        <p>Here's a little rhyme to help you remember how to round numbers:</p>
        <p className='highlight'><strong>5 or more, raise the score</strong></p>
        <p className='highlight'><strong>4 or less, let it rest</strong></p>
      </div>
    </div>
  );
}

export default App;
