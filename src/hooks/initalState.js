const initialState = {
  users: {
    email: "", //eamil
    isSignIn: false, //ログイン状況
    password: "", //password
    userName: "hoge", // ユーザー名
  },

  search: {
    string: "", //検索名
    junle: "", //検索ジャンル
    acter: "", //検索俳優
    rating: "", //検索評価
  },

  movie: {
    day: [],
    topMovies: [],
    topPopular: [],
    week: [],
  },

  tv: {
    topTv: [],
    topPopular: [],
  },

  common: {
    searchItems: {
      page:0,
      results: [],
      totalResult: 0,
      totalPage: 0,
    },
    favoriteList: [], //お気に入りリスト
    keyword: [],
    viewItem: {},
    searchType: "",
  },
};

export default initialState;
