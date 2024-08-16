import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CurrencyConverter.css'; // Импортируем CSS файл

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        const data = response.data;
        setCurrencies(Object.keys(data.rates)); 
      } catch (err) {
        setError('Ошибка получения списка валют');
      }
    };

    fetchCurrencies();
  }, []);

  const handleConvert = async () => {
    try {
      const response = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const rates = response.data.rates;
      const conversionRate = rates[toCurrency];
      const convertedAmount = (amount * conversionRate).toFixed(2);
      setResult(convertedAmount);
      setError(null);
    } catch (err) {
      setError('Ошибка получения данных о курсах валют');
      setResult(null);
    }
  };

  return (
    <div className="converter-container">
      <h1>Конвертер валют</h1>
      <div className="converter-form">
        <input
          className="amount-input"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Сумма"
        />
        <div className="currency-select">
          <select
            className="currency-dropdown"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <span className="to-label"> {'>'} </span>
          <select
            className="currency-dropdown"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <button className="convert-button" onClick={handleConvert}>
          Конвертировать
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {result !== null && <p className="result-message">Результат: {result} {toCurrency}</p>}
    </div>
  );
};

export default CurrencyConverter;
