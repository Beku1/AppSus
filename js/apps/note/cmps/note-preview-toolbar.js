import { noteServies } from "../services/note-service.js";
import { eventBus } from "../../../services/event-bus-service.js";
import { router } from "../../../routes.js";

export default {
  props: ["note"],

  template: ` 
  <section class="pos-re"> 
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

            
            <div @click="composeMail" ><i class="fas fa-paper-plane"></i></div>

            <div @click="toggleColor">
              <i class="fas fa-palette"></i>
          </div>

            <div><i @click="duplicateNote" class="fas fa-edit"></i></div>

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
    duplicateNote() {
      noteServies.duplicateNote(this.note).then(() => {
        eventBus.$emit("loadNotes");
      });
    },
    removeTheNote() {
      noteServies.removeNote(this.note).then((notes) => {
        eventBus.$emit("changeNotes", notes);
      });
    },
    toggleColor() {
      this.toggleColors = !this.toggleColors;
    },
    pinToggle() {
      this.note.isPinned = !this.note.isPinned;
      this.isPinned = this.note.isPinned;

      this.sortPined();
    },
    composeMail(){
      let type = this.note.type.split('-')
      type = type[1]
      let title = 'No title'
      let content = ''
     
    
      if(type === 'img')  content = this.note.info.imgUrl
      if(type === 'txt')  content = this.note.info.txt
      if(type === 'vid')  content = this.note.info.vidUrl
      if(type === 'todos') {
        this.note.info.todos.forEach(todo=>{
          if(todo.checked) var check = ' DONE   '
          else var check = ' NEED TO DO   '
          content += todo.txt + check 
        })
        
      } 
      if(this.note.info.title) title = this.note.info.title
      let query = `mail/compose/?type=${type}&content=${content}&title=${title}`
      router.push(query)
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
