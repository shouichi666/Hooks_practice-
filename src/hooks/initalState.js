const initialState = {
  users: {
    email: "", //eamil
    isSignIn: false, //ログイン状況
    password: "", //password
    userName: "", // ユーザー名
  },

  search: {
    string: "", //検索名
    junle: "", //検索ジャンル
    acter: "", //検索俳優
    rating: "", //検索評価
  },

  //映画
  movie: {
    searchItems: {
      results: [],
      page: 0,
      totalResult: 0,
      totalPage: 0,
    },

    rated: {
      results: [],
      page: 0,
      totalResult: 0,
      totalPage: 0,
    },

    popular: {
      results: [],
      page: 0,
      totalResult: 0,
      totalPage: 0,
    },

    day: [], //今日のトレンド
    week: [], //今週のトレンド
    viewItem: {}, //詳細ページ
  },

  //テレビ
  tv: {
    searchItems: {
      results: [],
      page: 0,
      totalResult: 0,
      totalPage: 0,
    },

    rated: {
      results: [],
      page: 0,
      totalResult: 0,
      totalPage: 0,
    },

    popular: {
      results: [],
      page: 0,
      totalResult: 0,
      totalPage: 0,
    },
    day: [], //今日のトレンド
    viewItem: {}, //詳細ページ
  },

  //出演者
  cast: {
    searchItems: {
      results: [],
      page: 0,
      totalResult: 0,
      totalPage: 0,
    },

    people: {
      results: [],
      paghe: 0,
      totalResult: 0,
      totalPage: 0,
    },

    viewItem: {
      cast: {},
      work: [],
    }, //詳細ページ
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
