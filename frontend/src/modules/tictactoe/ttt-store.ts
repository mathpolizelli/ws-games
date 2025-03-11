import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { socket } from "@/plugins/websocket";
import { useAppStore } from "@/app.store";

type Board = number[][];

export const usetictactoeStore = defineStore("tictactoe", () => {
    const appStore = useAppStore();

    const currentRoom = ref({
        name: "",
        players: [],
    });

    const rooms = ref({
        room1: 0,
        room2: 0,
        room3: 0,
        room4: 0,
        room5: 0,
    });

    const board = ref<Board>([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]);

    const playIndex = ref(0);

    const enterRoom = (room: string) => {
        socket.emit("enterRoom", room);
        currentRoom.value.name = room;
        currentRoom.value.players.push(appStore.player);
        board.value = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];
        playIndex.value = 0;
        console.log(currentRoom.value.name);
        console.log(currentRoom.value.players);
        // rooms.value[room]++;
    };

    const leaveRoom = (room: string) => {
        socket.emit("leaveRoom", room);
        currentRoom.value.name = "";
        currentRoom.value.players = [];
        board.value = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];
        playIndex.value = 0;
    };

    const changeSquare = (row: number, column: number, value: number) => {
        board.value[row][column] = value;
        const currentBoard = board.value;
        const currentPlayer = appStore.player.id;
        socket.emit("changeSquare", currentBoard, currentPlayer);
    };

    const isGameOver = computed(() => checkWinner(board.value));

    const checkWinner = (game: Board) => {
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
        player: computed(() => appStore.player),
        currentRoom,
        rooms,
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
