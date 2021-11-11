import notePreview from "./note-preview.cmp.js";

export default {
  props: ["notes"],
  components: { notePreview },
  template: `
    <section class="note-list-container">
      
        <div class="note-list-notes">
    <div v-for ="note in notes">
    <note-preview @getNewNote="getRenewNote" :note="note"></note-preview>
    </div>
    </div>
    </section>
    `,
  data() {
    return {
      note: null,
    };
  },
  methods: {
    getRenewNote(note) {
      this.$emit("getNote",note);
    },
  },
  created() {},
  methods: {},
  //   computed:{},
};
