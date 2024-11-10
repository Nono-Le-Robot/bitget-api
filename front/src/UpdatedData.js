import { useState, useEffect } from "react";
import axios from "axios";
import InterfacePositions from "./InterfacePositions";
import InterfaceTrading from "./InterfaceTrading";

function UpdatedData() {
  const [availableUSDTFuturesState, setAvailableUSDTFutures] = useState("");
  const [PLTotalState, setPLTotal] = useState("");
  const [sizeTradeState, setSizeTrade] = useState("");
  const [totalUSDTFuturesState, setTotalUSDTFutures] = useState("");
  const [trades, setTrades] = useState([]);
  const [allCoins, setAllCoins] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/info");
      const data = response.data;

      setAvailableUSDTFutures(data.availableUSDTFutures);
      setPLTotal(data.PLTotal);
      setSizeTrade(data.sizeTrade);
      setTotalUSDTFutures(data.totalUSDTFutures);
      setTrades(data.trades);
      setAllCoins(data.allCoins);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
    fetchData();
  }, []);

  useEffect(() => {
    console.log(allCoins);
  }, [allCoins]);
  return (
    <>
      <InterfacePositions
        availableUSDTFuturesState={availableUSDTFuturesState}
        PLTotalState={PLTotalState}
        sizeTradeState={sizeTradeState}
        totalUSDTFuturesState={totalUSDTFuturesState}
        trades={trades}
      />
      <InterfaceTrading
        totalUSDTFuturesState={totalUSDTFuturesState}
        allCoins={allCoins}
        sizeUSDT={sizeTradeState}
      />
    </>
  );
}

export default UpdatedData;
