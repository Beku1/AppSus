import { noteServies } from "../services/note-service.js";

export default {
  props: ["noteId"],

  template: `
  <section>
    <div v-if="toggleColors" class="color-container">
      <div @click="changeColor('purple')" class="purple"></div>
      <!-- <div @click="changeColor('green')" class="green"></div>
      <div @click="changeColor('blue')" class="blue"></div>
      <div @click="changeColor('red')" class="red"></div>
      <div @click="changeColor('yellow')" class="yellow"></div>
      <div @click="changeColor('white')" class="white"></div> -->
  </div>
        <div class="note-prev-navbar">
            <div><i class="fas fa-thumbtack"></i></div>

            
            <div><i class="fas fa-paper-plane"></i></div>
            <div @click="toggleColor">
              <i class="fas fa-palette"></i>
          </div>

            <div><i class="fas fa-edit"></i></div>

            <div><i class="fas fa-trash-alt"></i></div>
        </div>
</section>
`,
  data() {
    return {
      toggleColors: false,
    };
  },
  created() {},
  methods: {
    toggleColor() {
      this.toggleColors = !this.toggleColors;
    },
    changeColor(color) {
      noteServies.changeColors(this.noteId, color)
      .then((res)=>{

        this.$emit('getNote',note)
      })
         
      
    },
  },
};
