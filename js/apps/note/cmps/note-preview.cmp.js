import notePreviewToolbar from "./note-preview-toolbar.js";

export default {
  props: ["note"],
  components:{notePreviewToolbar},
  template: `
    <section class="note-preview-each-note">
            <div class="note-preview-txt" :style="{backgroundColor:note.style.backgroundColor}" v-if="isNoteTxt">
             <div>{{note.info.txt}}</div>
             <note-preview-toolbar  @iWantNote="iNeedNote" :noteId="note.id"></note-preview-toolbar>
            </div>
            
            <div class="note-preview-img" :style="{backgroundColor:note.style.backgroundColor}" v-if="isNoteImg">
              <div class="note-preview-the-img">
                <div>{{note.info.title}}</div>
                <img :src="note.info.imgUrl"/>
                <note-preview-toolbar  @iWantNote="iNeedNote" :noteId="note.id"></note-preview-toolbar>
              </div>
            </div>
            
            <div class="note-preview-todos" :style="{backgroundColor:note.style.backgroundColor}" v-if="isNoteTodos">   
              <div>{{note.info.title}}</div>
              <p>{{note.createdAt}}</p>
              <ul v-for="todo in note.info.todos"> 
                <li>{{todo.txt}}</li>
              </ul>
              <note-preview-toolbar @getNote="getRenewNoteColor" :noteId="note.id"></note-preview-toolbar>
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
    
    getRenewNoteColor(note){
      this.$emit('getNewNote',note)
    }
  },

  computed: {
    renderDate(time) {
      return new Date(time);
    },
  },
};
