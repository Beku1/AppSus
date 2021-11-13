import { noteServies } from "../services/note-service.js";

export default {
  template: `
  <div class="note-img-container">
    <form @submit.prevent="addNoteVid">
      <div class="note-img-inputs">
        <input class="input-txt" v-model="inputTitle" type="text" placeholder="Title"/>
        <input class="input-txt" v-model="inputUrl" type="url" placeholder="Add a URL"/>
    </div>
    <div>
      <button class="note-img-btn">Send</button>
    </div>
  </form>
</div>
    `,
  data() {
    return {
      inputTitle: null,
      inputUrl: null,
    };
  },
  methods: {
    addNoteVid() {
      noteServies.createNewNoteVid(this.inputUrl, this.inputTitle).then(() => {
        noteServies.query().then((note) => {
          this.$emit("getNewNotes", [...note]);
        });
        this.inputUrl = null;
        this.title = null;
      });
    },
  },
};
