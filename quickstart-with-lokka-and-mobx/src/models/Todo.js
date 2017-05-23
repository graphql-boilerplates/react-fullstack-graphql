import Lokka from 'lokka'
import Transport from 'lokka-transport-http'
import {observable} from 'mobx'


const todoFragment = `
  id
  complete
  text
`

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/__PROJECT_ID__'),
})


let todos = observable([])
let filter = observable('SHOW_ALL')

function fetchAll () {
  return client.query(`
    {
      allTodos {
        ${todoFragment}
      }
    }
  `)
  .then((res) => {
    todos.replace(res.allTodos)
  })
}

export default {
  todos: todos,
  filter: filter,
  addTodo: (text) => {
    return client.mutate(`
      {
        todo: createTodo(
            complete: false,
            text: "${text}",
        ) {
          ${todoFragment}
        }
      }
    `)
    .then(() => fetchAll())
  },
  renameTodo: (id, text) => {
    return client.mutate(`
      {
        todo: updateTodo(
            id: "${id}",
            text: "${text}",
        ) {
          ${todoFragment}
        }
      }
    `)
    .then(() => fetchAll())
  },
  deleteTodo: (id) => {
    return client.mutate(`
      {
        todo: deleteTodo(
            id: "${id}",
        ) {
          ${todoFragment}
        }
      }
    `)
    .then(() => fetchAll())
  },
  toggleCompleteStatus: (id, complete) => {
    return client.mutate(`
      {
        todo: updateTodo(
            id: "${id}",
            complete: ${complete},
        ) {
          ${todoFragment}
        }
      }
    `)
    .then(() => fetchAll())
  },
  fetchAll: fetchAll,
}
