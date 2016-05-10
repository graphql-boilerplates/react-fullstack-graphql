import Lokka from 'lokka'
import Transport from 'lokka-transport-http'


const todoFragment = `
  id
  complete
  text
`

export default class Model {
  constructor () {
    this.client = new Lokka({
      transport: new Transport('https://api.graph.cool/simple/v1/UHJvamVjdDpjaW55dHNwNjQwMDJvMDFxcDkwejI5MGhs'),
    })
  }

  addTodo (text) {
    return this.client.mutate(`
      {
        todo: createTodo(
            complete: false,
            text: "${text}",
        ) {
          ${todoFragment}
        }
      }
    `)
    .then(data => data.todo)
  }

  renameTodo (id, text) {
    return this.client.mutate(`
      {
        todo: updateTodo(
            id: "${id}",
            text: "${text}",
        ) {
          ${todoFragment}
        }
      }
    `)
      .then(data => data.todo)
  }

  deleteTodo (id) {
    return this.client.mutate(`
      {
        todo: deleteTodo(
            id: "${id}",
        ) {
          ${todoFragment}
        }
      }
    `)
    .then(data => data.todo)
  }

  toggleCompleteStatus (id, complete) {
    return this.client.mutate(`
      {
        todo: updateTodo(
            id: "${id}",
            complete: ${complete},
        ) {
          ${todoFragment}
        }
      }
    `)
    .then(data => data.todo)
  }

  // get all the items but we clone the content inside the promise
  getAll () {
    return this.client.query(`
      {
        allTodos {
          ${todoFragment}
        }
      }
    `)
    .then(res => res.allTodos)
  }
}
