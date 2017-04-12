import Game from './components/Game';
import Leaderboard from './components/Leaderboard';

export default [
    {
        path: '/',
        name: 'game',
        component: Game
    }, {
        path: '/leaderboard',
        name: 'leaderboard',
        component: Leaderboard
    }, {
        path: '*',
        redirect: '/'
    }
];
