

export default {
  template: `
    <section class="note-list-container">
    <div class="note-toolbar">
          <div @click="openField"><i id="txt" class="fas fa-edit i-toolbar-order"></i></div>
          <div @click="openField"><i id="pic" class="far fa-image i-toolbar-order"></i></div>
          <div @click="openField"><i id="list" class="fas fa-list i-toolbar-order"></i></div>
          <div @click="openField"><i id="vid" class="fab fa-youtube i-toolbar-order"></i></div>
      </div>
    </section>
    `,
  data() {
    return {
      isTxt: false,
      isImg: false,
      isTodos: false,
      isVid: false,
    };
  },
  created() {},
  methods: {
    openField(ev) {
      if (ev.target.id === "txt") {
        this.isTxt = true;
        this.isImg = false;
        this.isTodos = false;
        this.isVid = false;
      }
      if (ev.target.id === "pic") {
        this.isTxt = false;
        this.isImg = true;
        this.isTodos = false;
        this.isVid = false;
      }
      if (ev.target.id === "list") {
        this.isTxt = false;
        this.isImg = false;
        this.isTodos = true;
        this.isVid = false;
      }
      if (ev.target.id === "vid") {
        this.isTxt = false;
        this.isImg = false;
        this.isTodos = false;
        this.isVid = true;
      }
      this.$emit(
        "openCurrField",
        this.isTxt,
        this.isImg,
        this.isTodos,
        this.isVid
      );
    },
  },
  //   computed:{},
};


