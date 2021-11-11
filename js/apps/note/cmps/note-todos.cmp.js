import { noteServies } from "../services/note-service.js";

export default {
  template: `
   <form @submit.prevent="addNoteTodo">
        <label>todo</label> 
    <input v-model="todoTitle" type="text" placeholder="title?"/>
    <input v-model="todo" type="text" placeholder="todo?"/>
    <button @click.prevent="addTodo">add Todo</button>
    <button type="submit"> send </button>
    </form>

    `,
  data() {
    return {
        todoTitle:null,
        todo:null,
        todos:[]
    };
  },
  methods: {
    addNoteTodo() {
      noteServies
        .createNewNoteTodos(this.todoTitle, this.todos)
        .then(() => {
          noteServies.query().then((note) => {
            this.$emit("getNewNotes", [...note]);
          });
          this.todoTitle = null;
          this.todo = null;
          this.todos = [];
        });
    },
    addTodo(){
        let newTodoTxt = {txt : this.todo}
        this.todos.push(newTodoTxt)
        this.todo = null  
    }
  },
};
