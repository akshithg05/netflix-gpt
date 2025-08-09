import appStore from "./store/appStore";
import Body from "./components/Body";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={appStore}>
      <div className=" text-white">
        <Body />
      </div>
    </Provider>
  );
}

export default App;
