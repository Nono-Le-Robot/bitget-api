import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

function InterfacePositions({sizeTradeState,PLTotalState,totalUSDTFuturesState,trades }) {

  return (
  <>
  <div id="infos">

    <p>
      Size / Trade : <span>{sizeTradeState}$</span>
    </p>
    {/* <p>
      Available USDT Futures : <span>{availableUSDTFuturesState}$</span>
    </p> */}
    {PLTotalState < 0 ? (
      <p>
        PL Total: <span style={{ color: "red" }}>{PLTotalState}$</span>
      </p>
    ) : (
      <p>
        PL Total: <span style={{ color: "green" }}>{PLTotalState}$</span>
      </p>
    )}
    <p>
      Total USDT Futures : <span>{totalUSDTFuturesState}$</span>
    </p>

    <button className='btns'>CLOSE ALL POSITIONS</button>

  </div>
  <div id="trades-list">
    {trades?.map((trade,index) => {
      const numberPL =  Number(trade.unrealizedPL).toFixed(2);
      return(
        <React.Fragment key={index}>
        
        {numberPL < 0 ? 
         <div className="trade" style={{backgroundColor : "rgb(244, 171, 171)"}}>    
         <p>
           Amount : {trade.total} {trade.symbol.slice(0, -4)}
         </p>
         <p>Entry : {trade.breakEvenPrice}$</p>
         <p>Liquidation : {trade.liquidationPrice}$</p>
           <p>
             P&L: <span style={{ color: "#990202" }}>{numberPL}$</span>
           </p>
          <button className='btns'>CLOSE</button>

       </div>
        : 
        <div className="trade"  style={{backgroundColor : "rgb(176, 244, 171)"}}>
        <p>
          Amount : {trade.total} {trade.symbol.slice(0, -4)}
        </p>
        <p>Entry : {trade.breakEvenPrice}$</p>
        <p>Leverage : X{trade.leverage}</p>
        <p>Liquidation : {trade.liquidationPrice} $</p>
          <p>
            P&L: <span style={{ color: "#1b9902" }}>+{numberPL}$</span>
          </p>
          <button className='btns'>CLOSE</button>
      </div>
      }
        </React.Fragment>
      )
    })}

  </div>
</>
  );
}

export default InterfacePositions;
