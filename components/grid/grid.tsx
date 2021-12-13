import { useGame } from '../../hooks/use-game'
import Square from './square'

const Grid = () => {
  const { values } = useGame()

  return (
    <div className="p-2 container mx-auto">
      <div className="flex flex-wrap mx-auto border-4 border-blue-400 rounded game-grid">
        <Square
          values={values[0]}
          borders={{ top: false, left: false, right: false, bottom: false }}
        />
        <Square values={values[1]} borders={{ top: false, bottom: false, right: false }} />
        <Square values={values[2]} borders={{ top: false, right: false, bottom: false }} />
        <Square values={values[3]} borders={{ right: false, bottom: false, left: false }} />
        <Square values={values[4]} borders={{ right: false, bottom: false }} />
        <Square values={values[5]} borders={{ right: false, bottom: false }} />
        <Square values={values[6]} borders={{ left: false, bottom: false, right: false }} />
        <Square values={values[7]} borders={{ bottom: false, right: false }} />
        <Square values={values[8]} borders={{ bottom: false, right: false }} />
      </div>
    </div>
  )
}

export default Grid
