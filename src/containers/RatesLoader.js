import Header from "../components/Header";
import React, { useState, useEffect } from "react";
import axios from "axios";

function RatesLoader() {
  const [outputRates, setOutputRates] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const rates = {};
    const urlEur = `https://api.getgeoapi.com/v2/currency/convert?api_key=904feae0b722e7df9827cc79d154b91a6975cffc&from=EUR&to=UAH&amount=1&format=json`;
    const urlUsd = `https://api.getgeoapi.com/v2/currency/convert?api_key=904feae0b722e7df9827cc79d154b91a6975cffc&from=USD&to=UAH&amount=1&format=json`;
    const urlGbp = `https://api.getgeoapi.com/v2/currency/convert?api_key=904feae0b722e7df9827cc79d154b91a6975cffc&from=GBP&to=UAH&amount=1&format=json`;

    let eurPromise = new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(urlEur);
        rates.eur = res.data.rates["UAH"].rate_for_amount;
        resolve();
      } catch (err) {
        console.error(err);
      }
    });

    let usdPromise2 = new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(urlUsd);
        rates.usd = res.data.rates["UAH"].rate_for_amount;
        resolve();
      } catch (err) {
        console.error(err);
      }
    });

    let gbpPromise3 = new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(urlGbp);
        rates.gbp = res.data.rates["UAH"].rate_for_amount;
        resolve();
      } catch (err) {
        console.error(err);
      }
    });

    Promise.all([eurPromise, usdPromise2, gbpPromise3]).then(() => {
      setIsLoading(false);
      setOutputRates(rates);
    });
  }, []);

  return <Header outputRates={outputRates} isLoading={isLoading} />;
}

export default RatesLoader;
