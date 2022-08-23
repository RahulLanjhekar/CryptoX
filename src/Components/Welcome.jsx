import React, { useContext } from 'react'
import { AiFillPlayCircle } from "react-icons/ai";
import { TransactionContext } from '../context/TransactionsContext';
import CardForm from './CardForm';

const Welcome = () => {
  const commonStyles = "border-[0.5px] border-grey text-center py-2 md:py-4 md:px-4";

  const {connectWallet, currentAccount} = useContext(TransactionContext);
  return (
    <div className='grid grid-cols-8 py-4 px-16 lg:px-40'>
      <div className="written col-span-8 md:col-span-5 mt-16">
        <h1 className='text-white md:text-5xl text-4xl text-gradient'>Send Crypto<br/> anywhere in the World!</h1>
        <h3 className='mt-8 text-white text-lg text-gradient'>Explore the Crypto World.<br/> Buy and sell crypto with CryptoX.</h3>
        { !currentAccount && <button onClick={connectWallet} className='bg-[royalblue] mt-8 py-3 px-4 rounded-full text-white flex items-center justify-between'><AiFillPlayCircle className='mr-2'/>Connect Wallet</button>}
        <div className="grid md:grid-cols-3 grid-cols-2 max-w-[400px] features mx-auto md:mx-0 mb-12 mt-12 text-white font-light">
          <h1 className={`${commonStyles} rounded-tl-2xl`}>Reliability</h1>
          <h1 className={`${commonStyles}`}>Security</h1>
          <h1 className={`${commonStyles}`}>Decentralized</h1>
          <h1 className={`${commonStyles}`}>Web 3.0</h1>
          <h1 className={`${commonStyles}`}>Low Fees</h1>
          <h1 className={`${commonStyles} rounded-br-2xl`}>Blockchain</h1>
        </div>
      </div>
      <CardForm />
    </div>
  )
}

export default Welcome