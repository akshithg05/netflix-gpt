import appStore from "../store/appStore";
import Body from "./components/Body";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={appStore}>
      <div className="min-h-screen bg-black text-white">
        <Body />
      </div>
    </Provider>
  );
}

export default App;
