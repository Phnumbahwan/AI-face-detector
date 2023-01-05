import './App.css';
import Options from "./components/Options";
import Camera from "./components/Camera";
import {MyContext} from "../src/hooks/MyContext";
import {useState} from "react";

function App() {
        const [state, setState] = useState("1");
          return (
              <MyContext.Provider value={{ state, setState }}>
                  <div className="App" style={{ display: "flex" }}>
                      <Camera/>
                      <Options/>
                  </div>
              </MyContext.Provider>
          );
}

export default App;
