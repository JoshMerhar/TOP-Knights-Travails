// Use a breadth-first search algorithm to find shortest path to target square
function knightMoves(startSquare, targetSquare) {
    const board = new Graph(64);
    board.addPossibleMoves();
    const movesList = board.AdjList;

    startSquare = `[${startSquare[0]},${startSquare[1]}]`;
    targetSquare = `[${targetSquare[0]},${targetSquare[1]}]`;
    if (startSquare === targetSquare) {
        return console.log('You\'re already on that space!');
    }

    const queue = [startSquare];
    const visitedSquares = [];
    const path = [targetSquare];
    
    while (!queue.includes(targetSquare)) {
        const currentSquare = queue.shift();
        const possibleMoves = movesList.get(currentSquare);
        if (possibleMoves.includes(targetSquare)) {
            queue.unshift(targetSquare);
        } else {
            possibleMoves.forEach(move => {
                queue.push(move);
            });
        }
        if (!visitedSquares.includes(currentSquare)) {
            visitedSquares.push(currentSquare);
        }
    }

    const visitedLength = visitedSquares.length;
    for (let i = 0; i < visitedLength; i++) { 
        let preMoves = movesList.get(visitedSquares[visitedLength - i - 1]);
        preMoves.forEach(move => {
            if (move === path[0]) {
                path.unshift(visitedSquares[visitedLength - i - 1]);
            }
        });
    }
    
    const pathLength = path.length - 1;
    console.log(`It took ${pathLength} moves to reach the target square.`);
    console.log('Here\'s the path:');
    path.forEach(move => {
        console.log(`${move}`);
    })
}

class Graph{
    constructor(numOfNodes) {
        this.numOfNodes = numOfNodes;
        this.AdjList = new Map();
    }

    buildBoard() {
        const board = [];
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                board.push([x, y]);
            }
        }
        return board;
    }

    addPossibleMoves(squares = this.buildBoard()) {
        squares.forEach((square) => {
            const possibleMoves = [];
            const allowedMoves = [];
            possibleMoves.push(
                [square[0] - 1, square[1] + 2],
                [square[0] - 1, square[1] - 2],
                [square[0] - 2, square[1] + 1],
                [square[0] - 2, square[1] - 1],
                [square[0] + 1, square[1] + 2],
                [square[0] + 1, square[1] - 2],
                [square[0] + 2, square[1] + 1],
                [square[0] + 2, square[1] - 1]
            );
            possibleMoves.forEach((move) => {
                if (move[0] >= 0 && move[0] <= 7 && move[1] >= 0 && move[1] <= 7) {
                    allowedMoves.push(`[${move[0]},${move[1]}]`);
                }
            });
            this.AdjList.set(`[${square[0]},${square[1]}]`, allowedMoves);
        })
    }
}

knightMoves([0,0], [7,7]);
