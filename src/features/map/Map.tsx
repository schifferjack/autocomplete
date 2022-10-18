import { GoogleMap, MarkerF } from "@react-google-maps/api";
import styles from "./Map.module.css";

export function Map({selected}) {
  return (
      <GoogleMap zoom={10} center={selected} mapContainerClassName={styles.map}>
        <MarkerF position={selected}/>
      </GoogleMap>
  );
}
