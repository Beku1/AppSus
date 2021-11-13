import notePreviewToolbar from "./note-preview-toolbar.js";
import { noteServies } from "../services/note-service.js";
import { eventBus } from "../../../services/event-bus-service.js";

export default {
  props: ["note"],
  components: { notePreviewToolbar, noteServies },
  template: `
    
    <section class="note-edit-container">
            <div class="close-btn i-toolbar-order" @click="closeModal">X</div>
            <div class="edit-container">
                <input @change="saveChanges" type="text" v-model="note.info.title">
                <input @change="saveChanges" v-if="note.info.txt" type="text" v-model="note.info.txt">
                <input @change="saveChanges" v-if="note.info.imgUrl" type="text" v-model="note.info.imgUrl">
                <input @change="saveChanges" v-if="note.info.vidUrl" type="text" v-model="note.info.vidUrl">

                    <div v-if="checkTodo" v-for="todo in note.info.todos" class="note-todos-edit">      
                        <input @change="saveChanges" type="text" v-model="todo.txt">
                        <input @change="saveChanges" type="checkbox" v-model="todo.checked">
                </div>  
          
</div>
   
    <note-preview-toolbar :note="note"></note-preview-toolbar>
    
    </section>
    `,
  data() {
    return {};
  },
  created() {
    eventBus.$emit("modelOpen", true);
  },
  destroyed() {
    eventBus.$emit("modelOpen", false);
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    saveChanges() {
      noteServies.put(this.note);
    },
  },

  computed: {
    checkTodo() {
      return this.note.type === "note-todos";
    },
  },
};
