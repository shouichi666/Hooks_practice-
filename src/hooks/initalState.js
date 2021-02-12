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
    //映画
    searchItems: {
      results: [],
      page: 0,
      totalResult: 0,
      totalPage: 0,
    },
    day: [], //今日のトレンド
    topMovies: [],
    topPopular: [],
    week: [], //今週のトレンド
    viewItem: {}, //詳細ページ
  },

  tv: {
    //テレビ
    searchItems: {
      results: [],
      page: 0,
      totalResult: 0,
      totalPage: 0,
    },
    topTv: [], //評価の高い
    topPopular: [], // トレンド
    viewItem: {}, //詳細ページ
  },

  cast: {
    //出演者
    searchItems: {
      results: [],
      page: 0,
      totalResult: 0,
      totalPage: 0,
    },
    viewItem: {}, //詳細ページ
  },

  common: {
    searchItems: {
      results: [],
      page: 0,
      totalResult: 0,
      totalPage: 0,
    },

    favoriteList: [],
    keyword: [],
    // viewItem: {}, //詳細ページ
    searchType: "",
  },
};

export default initialState;
