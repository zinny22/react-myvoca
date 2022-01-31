import{createStore, combineReducers, applyMiddleware} from "redux";
import voca from "./modules/voca";
import thunk from "redux-thunk"

//미들웨어 묶어주는 작업
const middlewares = [thunk];

//리듀서 묶어주는 작업
const rootReducer = combineReducers({voca});

const enhancer = applyMiddleware(...middlewares)

const store = createStore(rootReducer, enhancer);

export default store;