import Header from "../components/Header";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function RatesLoader() {
  const [outputRates, setOutputRates] = useState({});

  const dispatch = useDispatch();
  const ratesFromState = useSelector((state) => state);
  const currencies = ["USD", "EUR", "GBP"];

  useEffect(() => {
    const rates = {};
    const urlEur = `https://api.getgeoapi.com/v2/currency/convert?api_key=904feae0b722e7df9827cc79d154b91a6975cffc&from=EUR&to=UAH&amount=1&format=json`;
    const urlUsd = `https://api.getgeoapi.com/v2/currency/convert?api_key=904feae0b722e7df9827cc79d154b91a6975cffc&from=USD&to=UAH&amount=1&format=json`;
    const urlGbp = `https://api.getgeoapi.com/v2/currency/convert?api_key=904feae0b722e7df9827cc79d154b91a6975cffc&from=GBP&to=UAH&amount=1&format=json`;

    let eurPromise = new Promise(async (resolve, reject) => {
      if (ratesFromState["USDUAH"]) {
        rates.usd = ratesFromState["USDUAH"];
        resolve();
      } else {
        try {
          const res = await axios.get(urlUsd);
          rates.usd = Number(res.data.rates["UAH"].rate_for_amount).toFixed(2);
          dispatch({ type: "ADD_CURRENCY", payload: { USDUAH: rates.usd } });
          resolve();
        } catch (err) {
          console.error(err);
        }
      }
    });

    let usdPromise = new Promise(async (resolve, reject) => {
      if (ratesFromState["EURUAH"]) {
        rates.eur = ratesFromState["EURUAH"];
        resolve();
      } else {
        try {
          const res = await axios.get(urlEur);
          rates.eur = Number(res.data.rates["UAH"].rate_for_amount).toFixed(2);
          dispatch({ type: "ADD_CURRENCY", payload: { EURUAH: rates.eur } });
          resolve();
        } catch (err) {
          console.error(err);
        }
      }
    });

    let gbpPromise = new Promise(async (resolve, reject) => {
      if (ratesFromState["GBPUAH"]) {
        rates.gbp = ratesFromState["GBPUAH"];
      } else {
        try {
          const res = await axios.get(urlGbp);
          rates.gbp = Number(res.data.rates["UAH"].rate_for_amount).toFixed(2);
          dispatch({ type: "ADD_CURRENCY", payload: { GBPUAH: rates.gbp } });
          resolve();
        } catch (err) {
          console.error(err);
        }
      }
    });

    Promise.all([eurPromise, usdPromise, gbpPromise]).then(() => {
      setOutputRates(rates);
    });
  }, []);

  return <Header outputRates={outputRates} currencies={currencies} />;
}

export default RatesLoader;
