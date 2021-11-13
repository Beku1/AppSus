import { noteServies } from "../services/note-service.js";

export default {
  template: `
  <div class="note-img-container">
    <form @submit.prevent="addNoteImg">
      <div class="note-img-inputs">
        <input class="input-txt upper" v-model="inputTitle" type="text" placeholder="Title"/>
        <input class="input-txt lower" v-model="inputUrl" type="url" placeholder="Add a URL"/>
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
      if( !this.inputTitle && !this.inputUrl )return
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
