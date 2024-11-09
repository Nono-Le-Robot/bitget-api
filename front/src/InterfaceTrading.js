import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

function InterfaceTrading({ totalUSDTFuturesState, allCoins,sizeUSDT }) {
  const [selectedCoin, setSelectedCoin] = useState("");

  const [SL, setSL] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [symbol , setSymbol]= useState("")


  const handleClick = () => {
    const USDTCoins = allCoins.filter(p => p.symbol.slice(-4) === "USDT")
    const filtered = USDTCoins.filter(p => p.symbol.includes(selectedCoin))
    console.log(filtered)
    const cryptoPrice = filtered[0].lastPr
    const pricePerTick = Number(price) - Number(SL)
    console.log(pricePerTick);
    const sizeTrade = (Number(sizeUSDT) / Number(pricePerTick)).toFixed(2)
    setSize(sizeTrade)
    setSymbol(filtered[0].symbol.slice(0,-4))


  }

  return (
    <>
    
      <input
        type="text"
        placeholder="SYMBOL"
        id="selected-crypto"
        value={selectedCoin} // Contrôle la valeur de l'input
        onChange={(e) => setSelectedCoin(e.target.value.toUpperCase())} // Met à jour l'état à chaque changement
      />

<input
        type="number"
        id="price"
        placeholder="PRICE"
        value={price} // Contrôle la valeur de l'input
        onChange={(e) => setPrice(e.target.value)} // Met à jour l'état à chaque changement
      />

<input
        type="number"
        id="sl"
        placeholder="SL"
        value={SL} // Contrôle la valeur de l'input
        onChange={(e) => setSL(e.target.value)} // Met à jour l'état à chaque changement
      />

      <button onClick={handleClick}>CONFIRMER</button>

      <h2 id="size-value">Size : {size} {symbol}</h2>
</>
  );
}

export default InterfaceTrading;
