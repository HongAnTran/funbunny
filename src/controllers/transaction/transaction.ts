import { Transaction, Wallet } from "types/main";
import { addDocController , updateDocController , getDocController, deleteDocController } from "controllers/common";
async function updateWalletByTransaction(transaction:Transaction){
    const wallet : Wallet = await getDocController('wallet' , transaction.uid)
    // xử lí nếu chọn ví tiền mặt
    if(transaction.wallet === 'cash'){
        if(transaction.typeTransaction==='income'){
            wallet.cash += transaction.value
        }else if(transaction.typeTransaction==='spending'){
            wallet.cash -= transaction.value
        }
    }
    // xử lí nếu chọn ví tiết kiệm
    else if(transaction.wallet === 'saving'){
        if(transaction.typeTransaction==='income'){
            wallet.saving += transaction.value
        }else if(transaction.typeTransaction==='spending'){
            wallet.saving -= transaction.value
        }
    
    }
    await updateDocController('wallet' ,wallet , wallet.uid)
}
/**
 * Hàm thêm 1 giao dịch
 * 
 * @param {object} transaction truyền vào giao dịch cần thêm
 */
async function addTransactionController(transaction: Transaction) {
        await addDocController<Transaction>("transactions", transaction);
        await updateWalletByTransaction(transaction)

}

async function editTransactionController(transaction: Transaction ,idTransaction: string) {
    await updateDocController<Transaction>("transactions", transaction , idTransaction);
// lấy ra ví của user
   await updateWalletByTransaction(transaction)
}
async function deleteTransactionController(transaction: Transaction ,idTransaction: string) {
    await deleteDocController<Transaction>("transactions", idTransaction);
    const wallet : Wallet = await getDocController('wallet' , transaction.uid)
    // xử lí nếu chọn ví tiền mặt
    if(transaction.wallet === 'cash'){
        if(transaction.typeTransaction==='income'){
            wallet.cash -= transaction.value
        }else if(transaction.typeTransaction==='spending'){
            wallet.cash += transaction.value
        }
    }
    // xử lí nếu chọn ví tiết kiệm
    else if(transaction.wallet === 'saving'){
        if(transaction.typeTransaction==='income'){
            wallet.saving -= transaction.value
        }else if(transaction.typeTransaction==='spending'){
            wallet.saving += transaction.value
        }
    
    }
    await updateDocController('wallet' ,wallet , wallet.uid)
}

/**
 * Hàm tính tổng value trong 1 mảng các giao dịch
 * 
 * @param {array} arr truyền vào array chứa các giao dịch
 */
function caculateTotalValueTransactions(arr: Transaction[]) : number {
    return arr.reduce((pre , item) => { 
        return pre + item.value
    }, 0)     
}

export { addTransactionController ,caculateTotalValueTransactions , editTransactionController ,deleteTransactionController}