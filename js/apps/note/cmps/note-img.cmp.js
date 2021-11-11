import { noteServies } from "../services/note-service.js";

export default {
  template: `
    <form @submit.prevent="addNoteImg">
        <label>img</label>
         <input v-model="inputTitle" type="text" placeholder="title?"/>
         <input v-model="inputUrl" type="url" placeholder="add a url"/>
        <button> send </button>
    </form>
    `,
  data() {
    return {
      inputTitle: null,
      inputUrl: null,
    };
  },
  methods: {
    addNoteImg() {
      noteServies.createNewNoteImg(this.inputUrl, this.inputTitle).then(() => {
        noteServies.query().then((note) => {
          this.$emit("getNewNotes", [...note]);
        });
        this.inputUrl = null;
        this.title = null;
      });
    },
  },
};
