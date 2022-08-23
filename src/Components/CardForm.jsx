import React, { useContext } from 'react'
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { TransactionContext } from '../context/TransactionsContext';
import Loader from './Loader';

const CardForm = () => {
    const {formData, handleChange, sendTransaction, currentAccount, isLoading} = useContext(TransactionContext);

    const commonStyles = 'text-white p-1 outline-none rounded w-full bg-transparent mt-4'

    const handleClick = () => {
      const { address, amount, keyword, message } = formData;

      if (!address || !amount || !keyword || !message) return alert("Please fill the full Form!");

      sendTransaction();
    }
  return (
    <div className="forming col-span-8 md:col-span-3 py-4">
        <div className="card-gradient h-48 max-w-[385px] rounded-2xl relative mx-auto mt-4">
            <SiEthereum className='absolute top-4 left-4 text-white text-xl' />
            <BsInfoCircle className='absolute top-4 right-4 text-white text-xl' />
            {currentAccount && <h1 className='absolute bottom-12 left-4 text-white text-lg'>{currentAccount.slice(0,5)}.....{currentAccount.slice(currentAccount.length - 4)}</h1> }
            <h1 className='absolute bottom-4 left-4 text-white text-xl'>Ethereum</h1>
        </div>
        <div className="w-60 pb-4 glass-window mx-auto mt-8 px-4 py-2 rounded-2xl">
            <input onChange={handleChange} type="text" name='address' value={formData.address} placeholder='Address to' className={`${commonStyles}`} />
            <input onChange={handleChange} type="text" name='amount' value={formData.amount} placeholder='Amount (ETH)' className={`${commonStyles}`} />
            <input onChange={handleChange} type="text" name='keyword' value={formData.keyword} placeholder='Keyword (Gif)' className={`${commonStyles}`} />
            <input onChange={handleChange} type="text" name='message' value={formData.message} placeholder='Enter Message' className={`${commonStyles}`} />
            <hr className='my-4' />
            {isLoading ? (
              <Loader />
            ) : (
              <button onClick={handleClick} className='text-white w-full border py-1 rounded-3xl z-5'>Send Now</button>
            )}
        </div>
    </div>
  )
}

export default CardForm