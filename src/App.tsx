import logo from './logo.svg';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BuildBurger from './components/pages/build-burger/build-burger';

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <BuildBurger/>
    </div>
  );
}

export default App;
