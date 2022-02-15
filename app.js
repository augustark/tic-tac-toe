const board = (() => {
    const cells = document.querySelectorAll('[sqr-index]')
    const reset = document.querySelector('#reset')
    const isOver = document.querySelector('.game-status')
    const gameStatus = document.querySelector('#game-status')
    reset.addEventListener('click', start)

    function start() {
        cells.forEach(element => {
            element.classList.remove(controller.CLASS.x)
            element.classList.remove(controller.CLASS.o)
            element.removeEventListener('click', player.move)
        })
        isOver.style.display = "none"
        cells.forEach(element => element.addEventListener('click', player.move, {once: true}))
    }

    function gameOver(sign) {
        isOver.style.display = "flex"
        gameStatus.textContent = `${sign}'s win the game`

    }

    return {
        cells,
        gameOver,
        start
    }
})()

const player = (() => {
    let turns = true
    function move(e) {
        const sign = turns ? controller.CLASS.x : controller.CLASS.o
        e.target.classList.add(sign)
        turns = !turns
        if (controller.checkWinner(sign)) {
            board.gameOver(sign === "circle" && "O" || sign === "cross" && "X")
            
        } else if (controller.draw()) {
            board.gameOver("No one")
        }
    }
    return {
        move
    }
})()

const controller = (() => {
    const CLASS = {x: "cross", o: "circle"}
    const combos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [0, 4, 8]
    ]

    function checkWinner(sign) {
        return combos.some(pattern => {
            return pattern.every(index => {
                return board.cells[index].classList.contains(sign)
            })
        })
    }

    function draw() {
        return [...board.cells].every(cell => {
            return cell.classList.contains(controller.CLASS.x) ||
            cell.classList.contains(controller.CLASS.o)
        })
    }

    return {
        checkWinner,
        draw,
        CLASS
    }
})()

board.start()
