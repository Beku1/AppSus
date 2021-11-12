import notePreviewToolbar from "./note-preview-toolbar.js";

export default {
  props: ["note"],
  components: { notePreviewToolbar },
  template: `
    <section class="note-preview-each-note">
            <div class="note-preview-txt" :style="{backgroundColor:note.style.backgroundColor}" v-if="note.type ===  'note-txt'">
             <div v-if>{{note.info.txt}}</div>
             <note-preview-toolbar :note="note"></note-preview-toolbar>
            </div>
            
            <div class="note-preview-img" :style="{backgroundColor:note.style.backgroundColor}" v-if="note.type === 'note-img'">
              <div class="note-preview-the-img">
                <div>{{note.info.title}}</div>
                <img :src="note.info.imgUrl"/>
                <note-preview-toolbar :note="note"></note-preview-toolbar>
              </div>
            </div>
            
            <div class="note-preview-todos" :style="{backgroundColor:note.style.backgroundColor}" v-if="note.type === 'note-todos'">   
              <div>{{note.info.title}}</div>
              <p>{{note.createdAt}}</p>
              <ul v-for="todo in note.info.todos"> 
                <li>{{todo.txt}}</li>
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
  created() {
    // this.checkType(this.note);
  },

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
