import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistedStore, store } from "./store";
import { Root } from "./Root";

export function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistedStore} />
      <Root />
    </ReduxProvider>
  );
}
