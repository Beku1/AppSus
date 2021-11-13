import { noteServies } from "../services/note-service.js";
import noteTxt from "../cmps/note-txt.cmp.js";
import noteList from "../cmps/note-list.cmp.js";
import noteImg from "../cmps/note-img.cmp.js";
import noteTodos from "../cmps/note-todos.cmp.js";
import noteToolbar from "../cmps/note-toolbar.cmp.js";
import { eventBus } from "../../../services/event-bus-service.js";

export default {
  props: [],
  components: {
    noteServies,
    noteList,
    noteTxt,
    noteImg,
    noteTodos,
    noteToolbar,
  },
  template: `
        <div class="note-app-main">
        <div class="note-app-toolbar">
          <note-toolbar @openCurrField="checkField"></note-toolbar>
      </div>
       <note-txt v-if="isTxt" @getNewNotes="getNotes"></note-txt>
       <note-img v-if="isImg" @getNewNotes="getNotes"></note-img>
       <note-todos  v-if="isTodos" @getNewNotes="getNotes"></note-todos>

       <!-- note-filter - you have empty file in note -> cmps -> note-filter.cmp.js -->
       <div class="filter-container">    
         <input type="text">
         <div class="select-by-types">
           <select>
             <option>All</option>
             <option>Images</option>
             <option>Text</option>
             <option>Todos</option>
             <option>Videos</option>
           </select>
          </div>
       </div>
       <!--  -->
            <note-list v-if="notes" :notes="notes"></note-list>
        </div>
      `,
  data() {
    return {
      notes: null,
      inputTitle: null,
      inputUrl: null,
      isTxt: true,
      isImg: false,
      isTodos: false,
    };
  },
  created() {
    this.getNotes();
    eventBus.$on("loadNotes", this.getNotes);
    eventBus.$on("changeNotes", this.changeNotes);
  },
  destroyed() {
    eventBus.$off("loadNotes");
  },
  methods: {
    changeNotes(notes){
      this.notes= notes
    },
    loadNotes(notes) {
      noteServies.query().then((notes) => {
        console.log(notes);
        this.notes = notes;
      });
    },
    getNotes(newNote) {
      if (newNote) {
        this.notes = newNote;
      } else {
        noteServies.query().then((note) => {
          this.notes = note;
        });
      }
    },
    checkField(isTxt, isImg, isTodos) {
      this.isTxt = isTxt;
      this.isImg = isImg;
      this.isTodos = isTodos;
    },
  },
  computed: {},
  watch:{
    '$route.params': {
      handler() {
        //BUG Can be duplicated if you dont change URL
              if(!this.$route.query.type) return

              let query = this.$route.query
              let type = query.type

   
              if(type === 'note-txt') noteServies.createNewNoteTxt(query.content,query.title)
              if(type === 'note-img') noteServies.createNewNoteImg(query.content,query.title) 
                
              this.$nextTick(()=>{
                this.loadNotes()
              })
              
              
      },
      immediate : true,
    },
  }
};
