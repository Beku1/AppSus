
import notePreviewToolbar from "./note-preview-toolbar.js";

export default {
  props: ["note"],
  template: `
    <section class="note-preview-each-note">
            <div class="note-preview-txt" v-if="isNoteTxt">
             <div>{{note.info.txt}}</div>

             <note-preview-toolbar>
            </div>
   
            <div class="note-preview-img" v-if="isNoteImg">
                <div class="note-preview-the-img">
                    <div>{{note.info.title}}</div>
                    <img :src="note.info.imgUrl"/>
                </div>

            </div>

            <div class="note-preview-todos" v-if="isNoteTodos">   
                        <div>{{note.info.title}}</div>
                        <p>{{note.createdAt}}</p>
                        <ul v-for="todo in note.info.todos"> 
                      <li>{{todo.txt}}</li>
                      
                </ul>
            </div>
    </section>
    `,
  data() {
    return {
      isNoteTxt: false,
      isNoteImg: false,
      isNoteTodos: false,
      timeToRender: null,
    };
  },
  created() {
    this.checkType(this.note);
  },
  methods: {
    checkType(note) {
      if (note.type === "note-txt") {
        this.isNoteTxt = true;
      } else if (note.type === "note-img") {
        this.isNoteImg = true;
      } else {
        this.isNoteTodos = true;
      }
    },

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
