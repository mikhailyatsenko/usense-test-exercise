import Convertation from "../components/Convertation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function Converter() {
  const [isLoading, setIsLoading] = useState(false);
  const [amount1, setAmount1] = useState("");
  const [amount2, setAmount2] = useState("");
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("UAH");
  const [rate, setRate] = useState();
  const [isAmount1Changed, setIsAmount1Changed] = useState(true);
  const [isCurrency1Changed, setIsCurrency1Changed] = useState(true);
  const dispatch = useDispatch();
  const ratesFromState = useSelector((state) => state);
  const currencies = ["UAH", "EUR", "USD", "GBP"];

  useEffect(() => {
    const url = `https://api.getgeoapi.com/v2/currency/convert?api_key=904feae0b722e7df9827cc79d154b91a6975cffc&from=${currency1}&to=${currency2}&amount=1&format=json`;
    let currencyCode = currency1 + currency2;

    (async function request() {
      setIsLoading(true);
      if (ratesFromState[currencyCode]) {
        setRate(ratesFromState[currencyCode]);
        setIsLoading(false);
      } else {
        try {
          const res = await axios.get(url);
          setRate(res.data.rates[currency2].rate_for_amount);
          dispatch({ type: "ADD_CURRENCY", payload: { [currencyCode]: res.data.rates[currency2].rate_for_amount } });
          setIsLoading(false);
        } catch (err) {
          console.error(err);
        }
      }
    })();
    if (amount1 || amount2) {
      if (isCurrency1Changed) {
        setAmount2(Number(rate * amount1).toFixed(2));
      } else {
        setAmount1(Number(amount2 / rate).toFixed(2));
      }
    }
  }, [currency1, currency2, rate]);

  useEffect(() => {
    if ((amount1 || amount2) && isAmount1Changed) {
      setAmount2(Number(rate * amount1).toFixed(2));
    } else if ((amount1 || amount2) && !isAmount1Changed) {
      setAmount1(Number(amount2 / rate).toFixed(2));
    }
  }, [amount1, amount2]);

  function changeCurrency(event) {
    if (event.target.id === "currency1") {
      setIsCurrency1Changed(true);
      setCurrency1(event.target.value);
    } else {
      setIsCurrency1Changed(false);
      setCurrency2(event.target.value);
    }
  }

  function changeAmount(event) {
    event.target.value = event.target.value.replace(/[^\d.]/g, "");
    if (event.target.id === "amount1") {
      setIsAmount1Changed(true);
      setAmount1(event.target.value);
    } else {
      setIsAmount1Changed(false);
      setAmount2(event.target.value);
    }
  }

  return <Convertation currency1={currency1} currency2={currency2} amount1={amount1} amount2={amount2} changeCurrency={changeCurrency} changeAmount={changeAmount} currencies={currencies} isLoading={isLoading} />;
}

export default Converter;
