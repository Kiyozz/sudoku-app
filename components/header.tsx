import { useGame } from '../hooks/use-game'

const Header = () => {
  const {
    setupNewGame,
    emptyGame,
    isSetupNewGame: [isSetupNewGame, setSetupNewGame],
  } = useGame()

  const onClickSetupNewGame = () => {
    if (!isSetupNewGame) {
      emptyGame()
      setSetupNewGame(true)
    } else {
      setupNewGame()
      setSetupNewGame(false)
    }
  }

  return (
    <div className="p-2 relative">
      <h1 className="text-4xl flex-grow text-center">Sudoku</h1>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-white"
        onClick={onClickSetupNewGame}
      >
        {isSetupNewGame ? 'Done' : 'Setup a new game'}
      </button>
    </div>
  )
}

export default Header
