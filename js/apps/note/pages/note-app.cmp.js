import { noteServies } from "../services/note-service.js";
import noteTxt from "../cmps/note-txt.cmp.js";
import noteList from "../cmps/note-list.cmp.js";
import noteImg from "../cmps/note-img.cmp.js";
import noteTodos from "../cmps/note-todos.cmp.js";
import noteToolbar from "../cmps/note-toolbar.cmp.js";

export default {
  props: [],
  components: {
    noteServies,
    noteList,
    noteTxt,
    noteImg,
    noteTodos,
    noteToolbar,
    // bookDetails,
    // bookFilter,
    // bookAdd,
  },
  template: `
        <div class="note-app-main">
        <div class="note-app-toolbar">
          <note-toolbar @openCurrField="checkField"></note-toolbar>
      </div>
       <note-txt v-if="isTxt" @getNewNotes="getNotes"></note-txt>
       <note-img v-if="isImg" @getNewNotes="getNotes"></note-img>
       <note-todos  v-if="isTodos" @getNewNotes="getNotes"></note-todos>
            <note-list :notes="notes"></note-list>
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
  },
  methods: {
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
};
