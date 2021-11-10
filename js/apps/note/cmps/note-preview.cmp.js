export default {
  props: ["note"],
  template: `
    <section>
        <div class="note-list-container">
            <div v-if="isNoteTxt">
             <p>{{note.info.txt}}</p>
            </div>
            <div v-if="isNoteImg">
                <p>{{note.info.title}}</p>
            <img :src="note.info.url"/>
            </div>
            <div v-if="isNoteTodos">   
                        <p>{{note.info.title}}</p>
                <ul v-for="todo in note.info.todos">
                    <li>{{todo.txt}} {{todo.doneAt}}</li>
                </ul>
            </div>
    </div>       
    </div>
    </section>
    `,
  data() {
    return {
      isNoteTxt: false,
      isNoteImg: false,
      isNoteTodos: false,
      timeToRender: null,
    };
  },
  created() {
    this.checkType(this.note);
  },
  methods: {
    checkType(note) {
      if (note.type === "note-txt") {
        this.isNoteTxt = true;
      } else if (note.type === "note-img") {
        this.isNoteImg = true;
      } else {
        this.isNoteTodos = true;
      }
    },

    changeDate() {
      this.timeToRender;
    },
  },

  computed: {
    renderDate(time) {
      return new Date(time);
    },
  },
};
