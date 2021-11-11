import { noteServies } from "../services/note-service.js";
import noteTxt from "../cmps/note-txt.cmp.js";
import noteList from "../cmps/note-list.cmp.js";
import noteImg from "../cmps/note-img.cmp.js";
import noteTodos from "../cmps/note-todos.cmp.js";

export default {
  props: [],
  components: {
    noteServies,
    noteList,
    noteTxt,
    noteImg,
    noteTodos,
    // bookDetails,
    // bookFilter,
    // bookAdd,
  },
  template: `
        <div class="note-app-main">
       <note-txt @getNewNotes="getNotes"></note-txt>
       <note-img @getNewNotes="getNotes"></note-img>
      <note-todos  @getNewNotes="getNotes"></note-todos>
            <note-list  :notes="notes"></note-list>
        </div>
      `,
  data() {
    return {
      notes: null,
      inputTitle: null,
      inputUrl: null,
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
  },
  computed: {},
};
