import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Match, MatchParticipant } from '../types/riot';

ChartJS.register(ArcElement, Tooltip, Legend);

interface MatchStatsProps {
  matches: Match[];
  puuid: string;
}

const MatchStats: React.FC<MatchStatsProps> = ({ matches, puuid }) => {
  const getPlayerStats = () => {
    let wins = 0;
    let totalKills = 0;
    let totalDeaths = 0;
    let totalAssists = 0;
    let totalCS = 0;
    let totalGold = 0;

    matches.forEach(match => {
      const player = match.info.participants.find(p => p.puuid === puuid);
      if (player) {
        if (player.win) wins++;
        totalKills += player.kills;
        totalDeaths += player.deaths;
        totalAssists += player.assists;
        totalCS += player.totalMinionsKilled + player.neutralMinionsKilled;
        totalGold += player.goldEarned;
      }
    });

    const games = matches.length;
    return {
      winRate: (wins / games) * 100,
      avgKDA: ((totalKills + totalAssists) / Math.max(totalDeaths, 1)).toFixed(2),
      avgCS: (totalCS / games).toFixed(1),
      avgGold: (totalGold / games / 1000).toFixed(1),
      chartData: {
        labels: ['Wins', 'Losses'],
        datasets: [{
          data: [wins, games - wins],
          backgroundColor: ['rgba(34, 197, 94, 0.6)', 'rgba(239, 68, 68, 0.6)'],
          borderColor: ['rgb(34, 197, 94)', 'rgb(239, 68, 68)'],
          borderWidth: 1
        }]
      }
    };
  };

  const stats = getPlayerStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-800/40 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-400 mb-3">Win Rate</h4>
        <div className="w-48 h-48 mx-auto">
          <Doughnut 
            data={stats.chartData}
            options={{
              plugins: {
                legend: {
                  display: true,
                  position: 'bottom',
                  labels: {
                    color: '#9CA3AF'
                  }
                }
              }
            }}
          />
        </div>
      </div>

      <div className="bg-gray-800/40 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-400 mb-3">Average Stats</h4>
        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-400">KDA Ratio</div>
            <div className="text-xl font-bold text-yellow-500">{stats.avgKDA}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">CS per Game</div>
            <div className="text-xl font-bold text-yellow-500">{stats.avgCS}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Gold per Game</div>
            <div className="text-xl font-bold text-yellow-500">{stats.avgGold}k</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchStats;