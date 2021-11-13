import { noteServies } from "../services/note-service.js";

export default {
  template: `
       <div class="filter-container">    
         <input v-model="filterBy.txt" @change="filter" type="search" spellcheck="false">
         <div class="select-by-types">
           <select v-model="filterBy.type" @change="filter">
             <option value=''>All</option>
             <option value="note-img">Images</option>
             <option value="note-txt">Text</option>
             <option value="note-todos">Todos</option>
             <option value="note-vid">Videos</option>
           </select>
          </div>
       </div>
    `,
  data() {
    return {
      filterBy: {
        txt: null,
        type: '',
      },
    };
  },
  methods: {
    filter(){
          this.$emit('filters', {...this.filterBy})
      }
  },
};
