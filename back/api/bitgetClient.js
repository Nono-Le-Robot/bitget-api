// api/bitgetClient.js
import axios from "axios";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

// Charger les variables d'environnement
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const API_PASS = process.env.API_PASS;
const BASE_URL = "https://api.bitget.com";

// Fonction pour obtenir le timestamp
const getTimestamp = () => Date.now().toString();

// Fonction pour créer une signature pour les requêtes API
function createSignature(timestamp, method, requestPath, body = "") {
  const prehash = `${timestamp}${method}${requestPath}${body}`;
  return crypto
    .createHmac("sha256", API_SECRET)
    .update(prehash)
    .digest("base64");
}

// Fonction générique pour les requêtes à l'API Bitget
async function bitgetRequest(method, endpoint, params = {}) {
  const timestamp = getTimestamp();

  // Construction de `requestPath` et `body`
  const requestPath = `${endpoint}${
    method === "GET" ? `?${new URLSearchParams(params).toString()}` : ""
  }`;
  const body = method === "POST" ? JSON.stringify(params) : "";
  const signature = createSignature(timestamp, method, requestPath, body);

  const requestConfig = {
    method,
    url: `${BASE_URL}${endpoint}`,
    headers: {
      "ACCESS-KEY": API_KEY,
      "ACCESS-SIGN": signature,
      "ACCESS-PASSPHRASE": API_PASS,
      "ACCESS-TIMESTAMP": timestamp,
      "Content-Type": "application/json",
    },
  };

  if (method === "GET") {
    requestConfig.params = params; // Utilise `params` pour `GET`
  } else {
    requestConfig.data = params; // Utilise `data` pour `POST`
  }

  try {
    const response = await axios(requestConfig);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la requête API Bitget:", error);
    throw new Error(error.response ? error.response.data : error.message);
  }
}

// Fonction pour placer un ordre sur Bitget
export async function openOrder(orderData) {
  const params = {
    ...orderData,
    clientOid: `${Date.now()}-${Math.random()}`, // Génère un ID unique pour chaque commande
  };

  return await bitgetRequest(
    "POST",
    "/api/v2/mix/order/batch-place-order",
    params
  );
}

// Exemple de fonctions pour obtenir des données
export async function getFuturesPositions(productType, marginCoin) {
  return await bitgetRequest("GET", "/api/v2/mix/position/all-position", {
    productType,
    marginCoin,
  });
}

export async function getFuturesAccount(productType) {
  return await bitgetRequest("GET", "/api/v2/mix/account/accounts", {
    productType,
  });
}

export async function getSpotAccountAssets() {
  return await bitgetRequest("GET", "/api/v2/spot/market/tickers");
}

// Exemple d'utilisation d'openOrder
const orderData = {
  symbol: "ETHUSDT",
  productType: "USDT-FUTURES",
  marginCoin: "USDT",
  marginMode: "isolated",
  orderList: [
    {
      size: "2.53",
      price: "2980",
      side: "buy",
      tradeSide: "open",
      orderType: "limit",
      force: "gtc",
      reduceOnly: "NO",
      presetStopSurplusPrice: "4000",
      presetStopLossPrice: "2940",
    },
  ],
};

// Exécution de la requête de placement d'ordre
// (async () => {
//   try {
//     const result = await openOrder(orderData);
//     console.log('Réponse de l\'API Bitget:', result);
//   } catch (error) {
//     console.error('Erreur:', error);
//   }
// })();
