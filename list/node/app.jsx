const Container = require('../component/container.jsx')
const React = require('react')

module.exports = function (columns) {
  return <Container
    sort={() => {}}
    filt={() => {}}
    columns={columns}
  />
}
