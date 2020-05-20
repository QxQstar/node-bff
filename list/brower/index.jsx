const Container = require('../component/container.jsx');
const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      columns:reactData,
      filtType:filtType,
      sortType:sortType
    }
  }
  render() {
    return (
      <Container
        columns={this.state.columns}
        sort={(sortType) => {
          fetch(`./data?sortType=${sortType}&filtType=${this.state.filtType}`)
            .then((res) => res.json())
            .then((res) => {
            this.setState({
              sortType:sortType,
              columns:res
            })
          })
        }}
        filt={(filtType) => {
          fetch(`./data?sortType=${this.state.sortType}&filtType=${filtType}`)
            .then((res) => res.json())
            .then((res) => {
              this.setState({
                filtType:filtType,
                columns:res
              })
          })
        }}
      />
    )
  }
}

ReactDOM.render(<App/>,document.getElementById('reactapp'))
