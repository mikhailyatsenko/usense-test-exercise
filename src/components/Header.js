function Header(props) {
  return (
    <header className="header">
      <div className="container">
        <div className="currencies">
          <div className="currency">
            <p>
              <span className="material-icons-outlined">attach_money</span>
            </p>
            <p>1 USD = {props.outputRates.usd ? props.outputRates.usd : <i className="c-inline-spinner"></i>} UAH</p>
          </div>
          <div className="currency">
            <p>
              <span className="material-icons-outlined">euro</span>
            </p>
            <p>1 EUR = {props.outputRates.usd ? props.outputRates.eur : <i className="c-inline-spinner"></i>} UAH</p>
          </div>
          <div className="currency">
            <p>
              <span className="material-icons-outlined">currency_pound</span>
            </p>
            <p>1 GBP = {props.outputRates.usd ? props.outputRates.gbp : <i className="c-inline-spinner"></i>} UAH</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
