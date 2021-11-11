import { noteServies } from "../services/note-service.js";

export default {
  template: `
       <form @submit.prevent="addNoteTxt">
            <input class="input-txt" v-model="inputTxt" type="text" placeholder="whats in your mind?"/>
            <button>Send</button>
      </form>
    `,
  data() {
    return {
      inputTxt: null,
    };
  },
  methods: {
    addNoteTxt() {
      noteServies.createNewNoteTxt(this.inputTxt).then(() => {
        noteServies.query().then((note) => {
          this.$emit("getNewNotes", [...note]);
        });
        this.inputTxt = null;
      });
    },
  },
};
