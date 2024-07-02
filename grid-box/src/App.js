import "./App.css";
import Shape from "./components/Shape";
import { Array } from "./utils/config";

// import className from className;

function App() {
  return (
    <div className="App">
      <header className="App-header">Color the Box</header>
      <Shape data={Array} />
    </div>
  );
}

export default App;
