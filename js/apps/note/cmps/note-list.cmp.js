import notePreview from "./note-preview.cmp.js";

export default {
  props: ["notes"],
  components: { notePreview },
  template: `
    <section>
        <div class="note-list-container">
    <div v-for ="note in notes">
    <note-preview :note="note"></note-preview>
    </div>
    </div>
    </section>
    `,
  data() {
    return {
      note: null,
    };
  },
  created() {
      
  },
  methods: {},
  //   computed:{},
};
