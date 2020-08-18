import {connect} from 'react-redux';
import App from "./App";
import {getRooms} from "../../api/rooms";


const mapStateToProps = (store: any) => ({


});

const mapDispatchToProps = {
    getRooms,

};

export default connect(mapStateToProps, mapDispatchToProps)(App);
