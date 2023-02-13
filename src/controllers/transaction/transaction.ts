import { Transaction, Wallet } from "types/main";
import { addDocController , updateDocController , getDocController } from "controllers/common";
async function addTransactionController(transaction: Transaction) {
    
    await addDocController<Transaction>("transactions", transaction);
    const wallet : Wallet = await getDocController('wallet' , transaction.uid)
    if(transaction.wallet === 'cash'){
        if(transaction.typeTransaction==='income'){
            wallet.cash += transaction.value
        }else if(transaction.typeTransaction==='spending'){
            wallet.cash -= transaction.value
        }
    }
    else if(transaction.wallet === 'saving'){
        if(transaction.typeTransaction==='income'){
            wallet.saving += transaction.value
        }else if(transaction.typeTransaction==='spending'){
            wallet.saving -= transaction.value
        }

    }

    wallet.total = wallet.saving + wallet.cash
    await updateDocController('wallet' ,wallet , wallet.uid)
}

function caculateTotalValueTransactions(arr: Transaction[]) : number {
    return arr.reduce((pre , item) => { 
        return pre + item.value
    }, 0)     
}

export { addTransactionController ,caculateTotalValueTransactions}