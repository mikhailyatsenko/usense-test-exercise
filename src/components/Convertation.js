function Convertation(props) {
  const { currencies, currency1, currency2, changeCurrency, changeAmount, amount1, amount2, isLoading } = props;
  return (
    <main>
      {isLoading && (
        <div className="load-bar">
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      )}
      <div className="container">
        <h3 className="">To convert currency fill one of the following fields:</h3>
        <div className="convert-block">
          <div className="currency">
            <input className="currency-input" onChange={changeAmount} value={amount1} placeholder="from" autoFocus autoComplete="off" id="amount1" size="7" />
            <select value={currency1} onChange={changeCurrency} id="currency1">
              {currencies.map((currency, index) => (
                <option key={index} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div className="currency">
            <input className="currency-input" onChange={changeAmount} value={amount2} placeholder="to" id="amount2" autoComplete="off" size="7" />
            <select value={currency2} onChange={changeCurrency} id="currency2">
              {currencies.map((currency, index) => (
                <option key={index} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Convertation;
