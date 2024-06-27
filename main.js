function knightMoves(start, target) {
  // Directions the knight can move
  const directions = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  // Check if the position is inside the board
  function isValidPosition(x, y) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }

  // Perform BFS to find the shortest path
  function bfs(start, target) {
    let queue = [[start]];
    let visited = new Set();
    visited.add(start.toString());

    while (queue.length > 0) {
      let path = queue.shift();
      let [x, y] = path[path.length - 1];

      // Check if we have reached the target
      if (x === target[0] && y === target[1]) {
        return path;
      }

      // Explore all possible knight moves
      for (let [dx, dy] of directions) {
        let newX = x + dx;
        let newY = y + dy;

        if (isValidPosition(newX, newY)) {
          let newPos = [newX, newY];
          if (!visited.has(newPos.toString())) {
            visited.add(newPos.toString());
            queue.push([...path, newPos]);
          }
        }
      }
    }

    return null; // No path found (should not happen on a standard chessboard)
  }

  let path = bfs(start, target);
  if (path) {
    console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
    path.forEach((position) => console.log(position));
  } else {
    console.log('No path found.');
  }

  return path;
}

// Example usage
console.log(knightMoves([0, 0], [1, 2])); // [[0,0],[1,2]]
console.log(knightMoves([0, 0], [3, 3])); // Example outputs: [[0,0],[2,1],[3,3]] or [[0,0],[1,2],[3,3]]
console.log(knightMoves([3, 3], [0, 0])); // Example outputs: [[3,3],[2,1],[0,0]] or [[3,3],[1,2],[0,0]]
console.log(knightMoves([0, 0], [7, 7])); // Example outputs: [[0,0],[2,1],[4,2],[6,3],[4,4],[6,5],[7,7]] or other valid shortest paths
