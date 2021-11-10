import { noteServies } from "../services/note-service.js";

import noteList from "../cmps/note-list.cmp.js";

export default {
  props: [],
  components: {
    noteServies,
    noteList
    // bookDetails,
    // bookFilter,
    // bookAdd,
  },
  template: `
        <div class="note-app-main">
            <note-list :notes="notes"></note-list>
        </div>
      `,
  data() {
    return {
      notes: null,
    };
  },
  created() {
    this.getNotes();
  },
  methods: {
    getNotes() {
      noteServies.query().then((note) => {
        this.notes = note;
        
      });
    },
  },
  computed: {


    
  },
};
