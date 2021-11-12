export default {
  props: ["todo"],
  template: `
              <li  class="todos-checkbox"> 
                 <label :for="todo.txt" class="checkbox-box">
                   <p :class="checkedTodo">{{todo.txt}}</p></label>
                 <input @click="flipTodo" type="checkbox" :id="todo.txt" v-model="todo.checked">
                </li>
    `,
  created() {},

  methods: {
    flipTodo() {
        this.todo.checked = !this.todo.checked;
    },
},
computed: {
  checkedTodo() {
    return {checked : this.todo.checked}
  },
},
};
