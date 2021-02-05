const initialState = {
  users: {
    email: "", //eamil
    isSignIn: false, //ログイン状況
    password: "", //password
    userName: "hoge", // ユーザー名
  },
  movie: {
    favoriteList: [], //お気に入りリスト
    day: [],
    key: "69317ba737cb0ea86a59398a6bbc2973",
    keyword: [],
    searchName: "", //検索名
    searchJunle: "", //検索ジャンル
    seachActer: "", //検索俳優
    seachRating: "", //検索評価
    topMovies: [],
    viewItem: {},
    week: [],
  },
};

export default initialState;
