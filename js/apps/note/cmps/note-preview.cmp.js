import notePreviewToolbar from "./note-preview-toolbar.js";
import noteTodoPreview from "./note-todo-preview.cmp.js";

export default {
  props: ["note"],
  components: { notePreviewToolbar, noteTodoPreview },
  template: `
    <section class="note-preview-each-note">
            <div class="note-preview-txt" :style="{backgroundColor:note.style.backgroundColor}" v-if="note.type ===  'note-txt'">
             <div v-if>{{note.info.txt}}</div>
             <note-preview-toolbar :note="note"></note-preview-toolbar>
            </div>
            
            <div class="note-preview-img" :style="{backgroundColor:note.style.backgroundColor}" v-if="note.type === 'note-img'">
              <div class="note-preview-the-img">
                <div class="note-title">{{note.info.title}}</div>
                <img :src="note.info.imgUrl"/>
                <note-preview-toolbar :note="note"></note-preview-toolbar>
              </div>
            </div>
            
            <div class="note-preview-todos" :style="{backgroundColor:note.style.backgroundColor}" v-if="note.type === 'note-todos'">   
              <div class="note-title">{{note.info.title}}</div>
              <p class="note-title-style">{{note.createdAt}}</p>
              <ul class="todos-container" v-for="todo in note.info.todos"> 
                
             <note-todo-preview :todo="todo"></note-todo-preview>
              </ul>
              <note-preview-toolbar :note="note"></note-preview-toolbar>
            </div>
    </section>
    `,

  data() {
    return {
      timeToRender: null,
    };
  },
  created() {},

  methods: {
    changeDate() {
      this.timeToRender;
    },
  },

  computed: {
    renderDate(time) {
      return new Date(time);
    },
  },
};
