import { useRef } from "react";

function Convertation(props) {
  const amount1 = useRef();
  const amount2 = useRef();
  const currency1 = useRef();
  const currency2 = useRef();

  function onChangeHandler(event) {
    if (event.target.id === "amount1" || event.target.id === "currency1") {
      props.convertRequest(event, amount1.current.value, currency1.current.value, currency2.current.value);
    } else if (event.target.id === "amount2" || event.target.id === "currency2") {
      props.convertRequest(event, amount2.current.value, currency2.current.value, currency1.current.value);
    }
  }

  return (
    <main>
      {props.isLoading && (
        <div className="load-bar">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      )}
      <div className="container">
        <h3 className="">To convert currency fill one of the following fields:</h3>
        <div className="convert-block">
          <div className="currency">
            <input className="currency-input" ref={amount1} onChange={onChangeHandler} value={props.output1} placeholder="from" autoFocus autoComplete="off" id="amount1" size="7" />
            <select onChange={onChangeHandler} ref={currency1} id="currency1">
              <option value="UAH">UAH</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
          </div>

          <div className="currency">
            <input className="currency-input" ref={amount2} onChange={onChangeHandler} value={props.output2} placeholder="to" id="amount2" autoComplete="off" size="7" />
            <select onChange={onChangeHandler} ref={currency2} id="currency2">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="UAH">UAH</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Convertation;
