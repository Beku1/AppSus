import { noteServies } from "../services/note-service.js";
import { eventBus } from "../../../services/event-bus-service.js";

export default {
  props: ["note"],

  template: ` 
  <section> 
    <transition name="fade">
    <div v-if="toggleColors" class="color-container">
      <div @click="changeColor('#d7aefb')" class="purple"></div>
      <div @click="changeColor('#ccff90')" class="green"></div>
      <div @click="changeColor('#a7ffeb')" class="blue"></div>
      <div @click="changeColor('#f28b82')" class="red"></div>
      <div @click="changeColor('#fff475')" class="yellow"></div>
      <div @click="changeColor('white')" class="white"></div>
  </div>
</transition>
        <div class="note-prev-navbar">

           <div class="continer"><i @click="pinToggle" :class="{pinWhite: !note.isPinned , pinBlack : note.isPinned}"  ></i></div>

            
            <div><i class="fas fa-paper-plane"></i></div>

            <div @click="toggleColor">
              <i class="fas fa-palette"></i>
          </div>

            <div><i class="fas fa-edit"></i></div>

            <div><i  @click="removeTheNote" class="fas fa-trash-alt"></i></div>
        </div>
</section>
`,
  data() {
    return {
      toggleColors: false,
      isPinned: null,
    };
  },
  created() {
    this.isPinned = this.note.isPinned;
  },
  methods: {
    removeTheNote() {
      noteServies.removeNote(this.note).then((notes)=>{
        eventBus.$emit("changeNotes",notes);
      })

    },
    toggleColor() {
      this.toggleColors = !this.toggleColors;
    },
    pinToggle() {
      this.note.isPinned = !this.note.isPinned;
      this.isPinned = this.note.isPinned;

      this.sortPined();
    },

    sortPined() {
      noteServies.sortByPin(this.note).then(() => {
        eventBus.$emit("loadNotes");
      });
    },
    changeColor(color) {
      this.color = color;
      noteServies.changeColors(this.note.id, color).then(() => {
        noteServies.query().then(() => {
          eventBus.$emit("loadNotes");
          this.toggleColor();
        });
      });
    },
  },
};
