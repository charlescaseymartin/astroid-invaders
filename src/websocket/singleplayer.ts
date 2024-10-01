import { type Socket } from 'socket.io';

const singleplayerHandler = (socket: Socket) => {
    socket.on('singleplayer', () => {
        socket.emit('singleplayer:connected', 'connected to singleplayer channel');

        // === create sinplayer ===
        // auth player
        // create singleplayer lobby
        // create player
        // update player jwt cookie
        // send jwt to player

        // === update singleplayer name ===
        // auth player
        // get player name
        // update player name

        // === update singleplayer pilot ===
        // auth player
        // get player pilot
        // update player pilot

        // === create singleplayer game ===
        // auth player
        // send initial game state
        // get player keystrokes
        // update game state
        // send game state

        // === handle game over ===
        // auth player
        // end game
        // add player to leaderboard if appropriate

    });
}

export default singleplayerHandler;
