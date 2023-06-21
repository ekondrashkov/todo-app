import React from 'react';
import { Layout } from './Layout';
import { Header } from './Layout/Header';
import { Main } from './Layout/Main';
import { composeWithDevTools } from '@redux-devtools/extension';
import { SEARCH, rootReducer } from '../store/store';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync';

const syncConfig = {
  blacklist: [SEARCH],
}

const middlewares = [thunk, createStateSyncMiddleware(syncConfig)];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
initMessageListener(store);

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Header titleName='To Do List'/>
        <Routes>
          <Route path="/tasks/" element={<Main />} />
          <Route path="/" element={<Navigate to="/tasks/" replace />} />
          <Route path="/tasks/:tag" element={<Main />} />
          <Route path="/*" element={<Navigate to="/tasks/" replace />} />
        </Routes>
      </Layout>
    </Provider>
  );
}

export default App;
