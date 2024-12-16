import React from "react";

export const UserContext = React.createContext({
  userId: null,
  setUserId: () => {},
  languagePreference: "English",
  setLanguagePreference: () => {},
});
