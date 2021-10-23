import { combineReducers } from 'redux';

export default combineReducers({
  user: userReducer,
  users: usersReducer,
  post: postReducer,
  posts: postsReducer,
  error: errorReducer,
  trending: trendingReducer,
})
