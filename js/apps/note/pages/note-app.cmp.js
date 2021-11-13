import { noteServies } from "../services/note-service.js";
import noteTxt from "../cmps/note-txt.cmp.js";
import noteList from "../cmps/note-list.cmp.js";
import noteImg from "../cmps/note-img.cmp.js";
import noteTodos from "../cmps/note-todos.cmp.js";
import noteToolbar from "../cmps/note-toolbar.cmp.js";
import noteVid from '../cmps/note-vid.cmp.js';
import { eventBus } from "../../../services/event-bus-service.js";
import noteFilter from "../cmps/note-filter.cmp.js";

export default {
  props: [],
  components: {
    noteServies,
    noteList,
    noteTxt,
    noteImg,
    noteTodos,
    noteToolbar,
    noteVid,
    noteFilter
  },
  template: `
        <div class="note-app-main">
        <div class="note-app-toolbar">
          <note-toolbar @openCurrField="checkField"></note-toolbar>
      </div>
      <note-txt v-if="isTxt" @getNewNotes="getNotes"></note-txt>
      <note-img v-if="isImg" @getNewNotes="getNotes"></note-img>
      <note-todos  v-if="isTodos" @getNewNotes="getNotes"></note-todos>
      <note-vid  v-if="isVid" @getNewNotes="getNotes"></note-vid>

     <note-filter @filters="setFilter"></note-filter>
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
      isVid:false,
      filterBy:{
        type:null,
        txt: '',
      }
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
    setFilter(filterBy){
      this.filterBy = filterBy
      noteServies.noteFilterBy(filterBy)
      .then((notes)=>{
        this.notes = notes
      })
    },
    changeNotes(notes){
      this.notes= notes
    },
    loadNotes(notes) {
      noteServies.query().then((notes) => {

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
    checkField(isTxt, isImg, isTodos,isVid) {
      this.isTxt = isTxt;
      this.isImg = isImg;
      this.isTodos = isTodos;
      this.isVid = isVid
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
