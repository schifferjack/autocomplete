import "./App.css";
import { useLoadScript } from "@react-google-maps/api";
import { Layout } from "./common/layout/layout-component";
function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "{insert google api here}", 
    libraries: ['places'],
  });
  if (!isLoaded) {
    return <div>Loading</div>;
  }
  return <Layout></Layout>;
}

export default App;
