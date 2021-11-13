import { noteServies } from "../services/note-service.js";

export default {
  template: `
  <div class="note-todo-container">
    <form @submit.prevent="addNoteTodo">
      <div class="note-todo-inputs">
        <input class="input-txt upper" v-model="todoTitle" type="text" placeholder="Title"/>
        <input class='input-txt lower' v-model="todo" type="text" placeholder="What do you need Todo?"/>
      </div>
      <div class="note-todo-btns">
        <button class="note-todos-btn" type="submit">Send</button>
        <button class="note-todos-btn" @click.prevent="addTodo">+</button>
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
      if( !this.todoTitle && !this.todo )return
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
