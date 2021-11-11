import { noteServies } from "../services/note-service.js";

export default {
  template: `
       <form @submit.prevent="addNoteTxt">
            <label>txt</label>
            <input v-model="inputTxt" type="text" placeholder="whats in your mind?"/>
            <button> send </button>
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
