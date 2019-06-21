import React from 'react'
import Routes from 'js/routes'

class App extends React.Component {
  componentWillMount () {
    console.log('mounted')
  }

  render () {
    return (
      <div>
        <Routes />
      </div>
    )
  }
}

export default App
