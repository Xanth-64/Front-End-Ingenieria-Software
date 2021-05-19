import React from "react";

export const userContext = React.createContext({
  userInfo: {},
  authenticate: (authInfo) => {
    this.userInfo = {};
    return;
  },
});
