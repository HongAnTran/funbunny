import { useEffect} from 'react';

import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
// ==============================|| ELEMENT REFERENCE HOOKS  ||============================== //
const useRedux  =  (action : AnyAction) : void => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(action)
    },[dispatch , action]);

};

export default useRedux;
