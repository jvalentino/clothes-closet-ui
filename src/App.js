import logo from './logo.svg';
import './App.css';

function App() {
  console.log(process.env);
  console.log(process.env.REACT_APP_HTTP_API);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {process.env.REACT_APP_HTTP_API}
        </p>
        
      </header>
    </div>
  );
}

export default App;
