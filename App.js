


import React, { useState, useEffect, useCallback } from 'react';


import { Provider } from "react-redux"


import { store } from './src/store/store';
import Navigation from './src/component/Navigation';
import { SafeAreaView } from 'react-native-safe-area-context';





export default function App() {



  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}  >

        <Navigation />
      </SafeAreaView>

    </Provider>

  );
}

