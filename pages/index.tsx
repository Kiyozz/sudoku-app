import type { NextPage } from 'next'
import Head from 'next/head'
import Grid from '../components/grid/grid'
import PreviewModeToggle from '../components/preview-mode-toggle'
import Selectors from '../components/selectors'
import UseGameProvider from '../hooks/use-game'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sudoku</title>
      </Head>
      <h1 className="p-2 text-4xl text-center">Sudoku</h1>
      <UseGameProvider>
        <Grid />
        <PreviewModeToggle />
        <Selectors />
      </UseGameProvider>
    </>
  )
}

export default Home
