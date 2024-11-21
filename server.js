import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const RIOT_API_KEY = process.env.VITE_RIOT_API_KEY;

const api = axios.create({
  headers: {
    'X-Riot-Token': RIOT_API_KEY
  }
});

// Helper function for API requests
async function makeRiotRequest(url) {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

app.get('/api/player/:region/:name/:tag', async (req, res) => {
  const { region, name, tag } = req.params;

  try {
    // 1. Get Account ID
    const accountUrl = `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`;
    const accountData = await makeRiotRequest(accountUrl);

    if (!accountData?.puuid) {
      throw new Error('Invalid account data received');
    }

    // 2. Get Summoner data
    const summonerUrl = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${accountData.puuid}`;
    const summonerData = await makeRiotRequest(summonerUrl);

    if (!summonerData?.id) {
      throw new Error('Invalid summoner data received');
    }

    // 3. Get League Entries
    const leagueUrl = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerData.id}`;
    const leagueData = await makeRiotRequest(leagueUrl);

    // 4. Get Match History
    const matchlistUrl = `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${accountData.puuid}/ids?start=0&count=20`;
    const matchIds = await makeRiotRequest(matchlistUrl);

    // 5. Get Match Details
    const matchPromises = matchIds.slice(0, 5).map(matchId => 
      makeRiotRequest(`https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}`)
    );
    const recentMatches = await Promise.all(matchPromises);

    // 6. Get Champion Mastery
    const masteryUrl = `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${accountData.puuid}/top?count=5`;
    const masteryData = await makeRiotRequest(masteryUrl);

    res.json({
      account: accountData,
      summoner: summonerData,
      leagues: leagueData,
      recentMatches,
      championMastery: masteryData
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(error.status || 500).json({
      error: error.message || 'Failed to fetch player data'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});