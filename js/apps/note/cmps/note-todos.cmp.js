import { noteServies } from "../services/note-service.js";

export default {
  template: `
  <div class="note-todo-container">
    <form @submit.prevent="addNoteTodo">
      <div class="note-todo-inputs">
        <input class="input-txt" v-model="todoTitle" type="text" placeholder="title?"/>
        <input  class='input-img' v-model="todo" type="text" placeholder="todo?"/>
      </div>
      <div class="note-todo-btns">
        <button @click.prevent="addTodo">+</button>
        <button type="submit">Send</button>
      </div>
    </form>
  </div>

    `,
  data() {
    return {
      todoTitle: null,
      todo: null,
      todos: [],
    };
  },
  methods: {
    addNoteTodo() {
      noteServies.createNewNoteTodos(this.todoTitle, this.todos).then(() => {
        noteServies.query().then((note) => {
          this.$emit("getNewNotes", [...note]);
        });
        this.todoTitle = null;
        this.todo = null;
        this.todos = [];
      });
    },
    addTodo() {
      let newTodoTxt = { txt: this.todo };
      this.todos.push(newTodoTxt);
      this.todo = null;
    },
  },
};
