// material-ui
import Skeleton from '@mui/material/Skeleton';

// ==============================|| SKELETON IMAGE CARD ||============================== //

const ImagePlaceholder = ({ ...others } : {[x:string] : any}) => <Skeleton variant="rectangular" {...others} animation="wave" />;

export default ImagePlaceholder;
