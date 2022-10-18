import Container from "@mui/material/Container";
import classNames from "classnames/bind";
import style from "./layout.module.css";
import { Map } from "../../features/map/Map";
import { PlacesAutocomplete } from "../../features/autocomplete/Autocomplete";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  currentLatLng,
  getSearchHistory,
  initLatLng,
} from "../../features/map/mapSlice";
import { List, ListItem, ListItemText } from "@mui/material";

const cx = classNames.bind(style);
interface Layout {
  fixed?: boolean;
  maxWidth?: string | false;
}
export function Layout(props: Layout) {
  // const dispatch = useAppDispatch();
  const initLatLngLocal = useAppSelector(initLatLng);
  const addressHistory = useAppSelector(getSearchHistory);
  const [selected, setSelected] = useState(initLatLngLocal);
  return (
    <Container maxWidth={false} fixed={props.fixed} className={cx("container")}>
      <PlacesAutocomplete setSelected={setSelected} />
      <br />
      <div className={cx("row")}>
        <Map selected={selected} />
        <nav  className={cx("list")}>
          <b className={cx("title")}>Search History</b>
          <List style={{height: "50vh"}}>
              {addressHistory.map((address) => (
                <ListItem><ListItemText>{address}</ListItemText></ListItem>
              ))}
          </List>
        </nav>
      </div>
    </Container>
  );
}

//<ul>
//{addressHistory.map(x => <li>{x}</li>)}
//</ul>
