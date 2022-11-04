import Convertation from "../components/Convertation";
import { useState } from "react";
import axios from "axios";

function Converter() {
  const [isLoading, setIsLoading] = useState(false);
  const [output1, setOutput1] = useState("");
  const [output2, setOutput2] = useState("");

  function convertRequest(event, amount, from, to) {
    if (amount === "") {
      setOutput1("");
      setOutput2("");
    } else if (event.target.id === "amount1") {
      setOutput1(event.target.value);
      getConvertedAmount(event, amount, from, to);
    } else if (event.target.id === "amount2") {
      setOutput2(event.target.value);
      getConvertedAmount(event, amount, from, to);
    } else if (event.target.id === "currency1" || event.target.id === "currency2") {
      getConvertedAmount(event, amount, from, to);
    }
  }

  async function getConvertedAmount(event, amount, from, to) {
    setIsLoading(true);
    const url = `https://api.getgeoapi.com/v2/currency/convert?api_key=904feae0b722e7df9827cc79d154b91a6975cffc&from=${from}&to=${to}&amount=${amount}&format=json`;

    try {
      const res = await axios.get(url);

      if (event.target.id === "amount1" || event.target.id === "currency1") {
        setOutput2(res.data.rates[to].rate_for_amount);
      } else if (event.target.id === "amount2" || event.target.id === "currency2") {
        setOutput1(res.data.rates[to].rate_for_amount);
      }

      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  return <Convertation convertRequest={convertRequest} output1={output1} output2={output2} isLoading={isLoading} />;
}

export default Converter;
