import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { setDocController , getDocController } from "controllers/common";
import { Wallet } from "types/main";
export default async function registerWithGoogleFirebase() : Promise<void> {
  try {
    const provider = new GoogleAuthProvider();
    const user =   await (await signInWithPopup(auth, provider)).user;
    const isCheckWallet =    await getDocController("wallet",user.uid)
    if(!isCheckWallet){
        await setDocController<Wallet>('wallet',{ uid :user.uid,cash:0,saving:0} , user.uid)
    }

  } catch (error: any) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;

    throw new Error(errorCode, errorMessage)
  }
}
