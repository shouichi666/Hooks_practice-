const appState = {
  users: {
    isSignIn: false, //ログイン状況
    userName: "", // ユーザー名
    id: "",
  },

  search: {
    string: "", //検索名
    searchWords: "",
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

    words: {
      id: 0,
      keyword: "",
      page: 0,
      results: [],
      totalPage: 0,
      totalResult: 0,
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

    words: {
      id: 0,
      keyword: "",
      page: 0,
      results: [],
      totalPage: 0,
      totalResult: 0,
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
      page: 0,
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
    youtubekey: "",
  },
};

export default appState;
