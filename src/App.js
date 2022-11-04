import Converter from "./containers/Converter";
import RatesLoader from "./containers/RatesLoader";

function App() {
  return (
    <>
      <RatesLoader />
      <Converter />
    </>
  );
}

export default App;
