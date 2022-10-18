import React, { useState, useEffect, useRef } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useAppDispatch } from "../../app/hooks";
import { setAddress, setLatLng, setSearchHistory } from "../map/mapSlice";
import { store } from "../../app/store";
import classNames from "classnames/bind";
import style from "./autocomplete.module.css";
const cx = classNames.bind(style);

export function PlacesAutocomplete({ setSelected }) {
  //   const address = useAppSelector(getSelectedAddress);
  const {
    suggestions: { status, data },
    ready,
    value,
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();
  const handleSelect = async (address) => {
    dispatch(setAddress(address));
    dispatch(setSearchHistory(address))
    setValue(address, false);
    clearSuggestions();
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    dispatch(setLatLng({ lat, lng }));
    console.log(store.getState());
  };

  const dispatch = useAppDispatch();
  return (
    <div>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          className={cx("combobox-input")}
          placeholder="search an adress"
          onClick={(e)=> setValue("")}
        />
        <ComboboxPopover style={{left: "0"}}>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ description, place_id }) => (
                <ComboboxOption
                  key={place_id}
                  value={description}
                ></ComboboxOption>
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
