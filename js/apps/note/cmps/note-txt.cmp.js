import { noteServies } from "../services/note-service.js";

export default {
  template: `
  <div class="note-img-container">
       <form @submit.prevent="addNoteTxt">
       <div class="note-img-inputs">
            <input class="input-txt" v-model="inputTitle" type="text" placeholder="Title"/>
            <input class="input-txt" v-model="inputTxt" type="text" placeholder="What's in your mind?"/>
          </div>
          <div>
            <button class="note-txt-btn">Send</button>
</div>
      </form>
</div>
    `,
  data() {
    return {
      inputTxt: null,
      inputTitle:null
    };
  },
  methods: {
    addNoteTxt() {
      if( !this.inputTitle && !this.inputUrl )return
      noteServies.createNewNoteTxt(this.inputTxt,this.inputTitle).then(() => {
        noteServies.query().then((note) => {
          this.$emit("getNewNotes", [...note]);
        });
        this.inputTxt = null;
      });
    },
  },
};
