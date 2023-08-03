
import Loader from './Loader';
import classes from './LoadingAlert.module.css';


const LoadingAlert = () => {

    return <div className={classes.alert}>
        <p>Loading...</p>
        <Loader/>
    </div>
};


export default LoadingAlert;