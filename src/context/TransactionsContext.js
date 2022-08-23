import { createContext, useEffect, useState } from "react";
import TransactionContract from '../utils/transactionsAbi.json'
import { contractAddress } from "../utils/contractDetails"; 
import {ethers} from 'ethers'

export const TransactionContext = createContext();
const {ethereum} = window;

const getContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
        contractAddress,
        TransactionContract.abi,
        signer
    )
    return contract;        
}

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
    const [formData, setFormData] = useState({
        address:"",
        amount:"",
        keyword:"",
        message:""
    })

    const handleChange = (e) => {
        setFormData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }

        })
    }

    const getAllTransactions = async () => {
        try {
            const theContract = getContract();
            const availableTransactions = await theContract.getAllTransactions();

            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
              }));
      
              console.log(structuredTransactions);
      
              setTransactions(structuredTransactions);
        } catch (error) {
            console.log(error)
        }
    }

    const checkIfWalletIsConnect  = async () => {
        try {
            if(ethereum){
                const account = await ethereum.request({method: "eth_accounts"});

                if(account.length){
                    setCurrentAccount(account[0]);

                    getAllTransactions();
                } else {
                    console.log("No accounts found!")
                }

            } else alert("Please install Metamask!")
        } catch (error) {
            console.log(error);
        }
    }

    const checkTransactions = async () => {
        try {
            const theContract = getContract();
            const transactionCounts = await theContract.getTransactionCount();

            window.localStorage.setItem("transactionCount", transactionCounts);
        } catch (error) {
            console.log(error);
        }
    }

    const connectWallet = async () => {
        try {
            if(ethereum){
                const account = await ethereum.request({method: "eth_requestAccounts"})

                setCurrentAccount(account[0]);

                window.location.reload();

            } else alert("Please install Metamask!")

        } catch (error) {
            console.log(error);
        }
    }

    const sendTransaction = async () => {
        try {
            if(!currentAccount) return alert("Please connect your Wallet!");

            const { address, amount, keyword, message } = formData;
            const theContract = getContract();
            const parsedAmount = ethers.utils.parseEther(amount);
            
            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to: address,
                    gas: "0x5208",
                    value: parsedAmount._hex
                }]
            })

            const transactionHex = await theContract.addToBlockchain(address, parsedAmount, message, keyword);

            setIsLoading(true)
            await transactionHex.wait();
            setIsLoading(false)

            const transactionCounts = await theContract.getTransactionCount();
            
            setTransactionCount(transactionCounts.toNumber());

            window.location.reload();
        } catch (error) {
            console.log(error)
        }

    }


    useEffect(() => {
        checkIfWalletIsConnect();
        checkTransactions();
    }, [transactionCount])
    

    return (
        <TransactionContext.Provider value={{
            connectWallet,
            currentAccount,
            formData,
            setFormData,
            handleChange,
            sendTransaction,
            isLoading,
            transactions
            }}>
            {children}
        </TransactionContext.Provider>
    )
}