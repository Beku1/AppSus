import { noteServies } from "../services/note-service.js";

export default {
  template: `
  <div class="note-img-container">
    <form @submit.prevent="addNoteImg">
      <div class="note-img-inputs">
        <input class="input-txt" v-model="inputTitle" type="text" placeholder="title?"/>
        <input class="input-img" v-model="inputUrl" type="url" placeholder="add a url"/>
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
