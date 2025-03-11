import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { socket } from "@/plugins/websocket";

export const usetictactoeStore = defineStore("tictactoe", () => {
    const player = ref({ id: Number, name: '' });
    console.log(player.value)
    const room = ref({
        name: String,
        players: Array
    })    

    const board = ref([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]);

    const playIndex = ref(0);

    const enterRoom = (room: string) => {
        socket.emit("enterRoom", room);
    };

    const leaveRoom = (room: string) => {
        socket.emit("leaveRoom", room);
    };

    const changeSquare = (row: number, column: number, value: number) => {
        board.value[row][column] = value;
        const currentBoard = board.value;
        const currentPlayer = player.value.id;
        socket.emit("changeSquare", currentBoard, currentPlayer);
    };

    const isGameOver = computed(() => checkWinner(board.value));

    const checkWinner = (game) => {
        let isGameOver = false;
        for (let i = 0; i < 3; i++) {
            game[i][0] == game[i][1] &&
            game[i][1] == game[i][2] &&
            game[i][0] != 0
                ? (isGameOver = true)
                : (isGameOver = false);
            if (isGameOver) return isGameOver;
        }
        for (let i = 0; i < 3; i++) {
            game[0][i] == game[1][i] &&
            game[1][i] == game[2][i] &&
            game[0][i] != 0
                ? (isGameOver = true)
                : (isGameOver = false);
            if (isGameOver) return isGameOver;
        }
        game[0][0] == game[1][1] && game[1][1] == game[2][2] && game[0][0] != 0
            ? (isGameOver = true)
            : (isGameOver = false);
        if (isGameOver) return isGameOver;
        game[0][2] == game[1][1] && game[1][1] == game[2][0] && game[0][2] != 0
            ? (isGameOver = true)
            : (isGameOver = false);
        if (isGameOver) return isGameOver;
        if (playIndex.value == 9) return (isGameOver = true);
        return isGameOver;
    };

    const restartGame = () => {
        playIndex.value = 0;
        board.value = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];
        checkWinner(board.value);
    };

    return {
        player,
        board,
        playIndex,
        isGameOver,
        enterRoom,
        leaveRoom,
        changeSquare,
        checkWinner,
        restartGame,
    };
});
