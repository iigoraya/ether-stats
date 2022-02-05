import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import Web3 from 'web3'

const web3 = new Web3('https://mainnet.infura.io/v3/89d3c44c36f94bf38ce03475f40e5524');

const Home: NextPage = () => {
  
  const [requestAllowed, setRequestAllowed] = useState(true)
  const [blockNumber, setBlockNumber] = useState(0)
  const [transactionsCount, setTransactionsCount] = useState(0)
  const [miner, setMiner] = useState('')
  const [difficulty, setDifficulty] = useState(0)

  const switchRequestMode = () => requestAllowed ? setRequestAllowed(false) : setRequestAllowed(true)

  setTimeout(() => {
    if (requestAllowed)
      updateEtherInfo()
  }, 13000)

  const updateEtherInfo = async () => {
    try {
      let blockNumber = await web3.eth.getBlockNumber()
      let block = await web3.eth.getBlock(blockNumber)
      setBlockNumber(block.number)
      setDifficulty(block.totalDifficulty)
      setMiner(block.miner)
      setTransactionsCount(block.transactions.length)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Ether Stats</title>
        <meta name="description" content="Ethereum Live Stats" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h5 className={styles.title}>
          Current Block Number: <a href="#">{blockNumber}</a>
        </h5>
        <br/>
        <h5 className={styles.title}>
          Number of Transactions: <a href="#">{transactionsCount}</a>
        </h5>
        <br/>
        <h5 className={styles.title}>
          Miner: <a href="#">{miner}</a>
        </h5>
        <br/>
        <h5 className={styles.title}>
          Difficulty: <a href="#">{difficulty}</a>
        </h5>
        <br/><br/>
        <div className={styles.grid}>
          <a onClick={switchRequestMode} className={styles.card}>
            {requestAllowed ? <h2>Turn Off Requests</h2> : <h2>Turn On Requests</h2>}
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        Request Allowed : {requestAllowed ? 'YES' : 'NO'}
      </footer>
    </div>
  )
}

export default Home
