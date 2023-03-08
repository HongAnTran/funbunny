import { convertPriceStringToNumber, updateDocController } from "controllers/common"
import { Wallet } from "types/main"

const updateWalletController = async (value: Wallet) =>{
try {
    const cash = convertPriceStringToNumber(value.cash)
    const saving = convertPriceStringToNumber(value.saving)
    const dataUpdate : Wallet = {
      ...value,
      cash , 
      saving,
    }
     await updateDocController("wallet",dataUpdate,dataUpdate.uid)
     
} catch (error : any) {
        throw new Error(error);   
}
}

export { updateWalletController } 