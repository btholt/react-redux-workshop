import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import PetList from './PetList'
import SearchControls from './SearchControls'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className='app'>
          <img src='src/adopt-me.png' alt='adopt-me logo' />
          <SearchControls />
          <PetList
            title={'Search Results'}
          />
          <PetList
            isFavorites
            title={'Favorites'}
          />
        </div>
      </Provider>
    )
  }
}

export default App