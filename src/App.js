import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from './firebaseconfig/firebase';

function App() {
  useEffect(()=>{
    const fetch=async()=>{
      const citiesCol = collection(db, 'cities');
      const citySnapshot = await getDocs(citiesCol);
      const cityList = citySnapshot.docs.map(doc => doc.data());
      console.log(cityList,'AAAAAAAAAAAAAAAAAAAAAA')
    }
    fetch()
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
