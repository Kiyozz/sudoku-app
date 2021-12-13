import type { NextPage } from 'next'
import Head from 'next/head'
import Grid from '../components/grid/grid'
import Header from '../components/header'
import PreviewModeToggle from '../components/preview-mode-toggle'
import Selectors from '../components/selectors'
import UseGameProvider from '../hooks/use-game'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sudoku</title>
      </Head>
      <UseGameProvider>
        <Header />
        <Grid />
        <PreviewModeToggle />
        <Selectors />
      </UseGameProvider>
    </>
  )
}

export default Home
