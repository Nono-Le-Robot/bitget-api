// api/routes.js
import express from 'express';
import { getFuturesPositions, getSpotAccountAssets, getFuturesAccount, openOrder } from './bitgetClient.js';

const router = express.Router();

// Route pour obtenir les positions futures ouvertes et les soldes du compte Spot
router.get('/api/info', async (req, res) => {
  try {
    // Récupère les positions ouvertes en futures
    const futuresPositions = await getFuturesPositions('USDT-FUTURES', 'USDT');
    const futuresAccount = await getFuturesAccount('USDT-FUTURES');
    const getAllCoins = await getSpotAccountAssets();

    // Calculs pour les informations du compte futures
    const PLTotal = Number(futuresAccount.data[0].unrealizedPL).toFixed(2);
    const trades = futuresPositions.data;
    const totalUSDTFutures = Number(futuresAccount.data[0].accountEquity).toFixed(2);
    const sizeTrade = (totalUSDTFutures * 5 / 100).toFixed(2);
    const availableUSDTFutures = Number(futuresAccount.data[0].available).toFixed(2);
    const allCoins = getAllCoins.data;

    // Envoyer les données au client
    res.json({
      trades,
      availableUSDTFutures,
      PLTotal,
      totalUSDTFutures,
      sizeTrade,
      allCoins,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la récupération des informations',
      error: error.message,
    });
  }
});

export default router;
