import notePreviewToolbar from "./note-preview-toolbar.js";
import noteTodoPreview from "./note-todo-preview.cmp.js";
import noteEdit from "./note-edit.cmp.js";
export default {
  props: ["note"],
  components: { notePreviewToolbar, noteTodoPreview, noteEdit },
  template: `
    <section :style="{backgroundColor:note.style.backgroundColor}" @mouseover="isOnMe = true" @mouseleave="isOnMe = false" class="note-preview-each-note">

    
    <note-edit v-if="isEdit" @close="closeEditMode" :note="note"></note-edit>

            <div  class="note-preview-txt"  v-if="note.type ===  'note-txt'">
              <div @click="openEditMode">
              <div class="note-title">{{note.info.title}}</div>
                <div v-if>{{note.info.txt}}</div>
            </div>
             <note-preview-toolbar :class="hoverToolBar" class="toolbar-note-preview" :note="note"></note-preview-toolbar>
            </div>
 
            <div  class="note-preview-img"  v-if="note.type === 'note-img'">
            <div @click="openEditMode">
              <div class="note-preview-the-img">
                <div class="note-title">{{note.info.title}}</div>
                <img :src="note.info.imgUrl"/>
              </div>
            </div>
            <note-preview-toolbar :class="hoverToolBar" class="toolbar-note-preview" :note="note"></note-preview-toolbar>
            </div>

            <div  class="note-preview-vid"  v-if="note.type === 'note-vid'">
            <div @click="openEditMode">
              <div class="note-preview-the-vid">
                <div class="note-title">{{note.info.title}}</div>
                  <iframe width="230" controls :src="note.info.vidUrl" allowfullscreen></iframe>
              </div>
            </div>
                <note-preview-toolbar :class="hoverToolBar" class="toolbar-note-preview" :note="note"></note-preview-toolbar>
            </div>
            
            <div  class="note-preview-todos"  v-if="note.type === 'note-todos'">   
            <div @click="openEditMode">

              <div class="note-title">{{note.info.title}}</div>
              <p class="note-title-style">{{note.createdAt}}</p>
            </div>
              <ul class="todos-container" v-for="todo in note.info.todos"> 
                <note-todo-preview :todo="todo"></note-todo-preview>
              </ul>
          
              <note-preview-toolbar :class="hoverToolBar" class="toolbar-note-preview" :note="note"></note-preview-toolbar>
            </div>
    </section>
    `,

  data() {
    return {
      timeToRender: null,
      isEdit: false,
      isOnMe: false,
    };
  },
  created() {},
  methods: {
    changeDate() {
      this.timeToRender;
    },
    openEditMode() {
      this.isEdit = true;
    },
    closeEditMode() {
      this.isEdit = false;
    },
    changeOnMe(){
      this.isOnMe = !this.isOnMe 
    }
  },
  computed: {
    renderDate(time) {
      return new Date(time);
    },
    renderEdit() {
      return this.isEdit;
    },
    hoverToolBar() {
      return { onme: this.isOnMe };
    },
  },
  watch: {
    isEdit(newVal) {
      console.log(newVal);
    },
  },
};
