import { storageService } from "../../../services/async-storage-service.js";
import { utilService } from "../../../services/utils-service.js";



export const noteServies = {
  query,
  createNote,
};

const NOTES_KEY = "notes";

function query() {
  return storageService.query(NOTES_KEY).then((newNotes) => {
    if (!newNotes || !newNotes.length) {
      newNotes = createNote();
      utilService.saveToStorage("notes", newNotes);
    }
    return newNotes;
  });
}

function createNote() {
 return [
    {
      id: "n101",
      type: "note-txt",
      isPinned: true,
      info: {
        txt: "Fullstack Me Baby!",
      },
    },
    {
      id: "n102",
      type: "note-img",
      info: {
        url: "http://www.yo-yoo.co.il/coolpics/images/uploads/4c8498.jpeg",
        title: "Bobi and Me",
      },
      style: {
        backgroundColor: "#00d",
      },
    },
    {
      id: "n103",
      type: "note-todos",
      info: {
        title: "Get my stuff together",
        todos: [
          { txt: "Driving liscence", doneAt: null },
          { txt: "Coding power", doneAt: Date.now() },
        ],
      },
    },
  ];
}

//



// return [
//   {
//     id: "n101",
//     isPinned: false,
//     info: {
//       title: "test",
//       labels: [""],
//       txt: "Fullstack Me Baby!",
//       imgUrl: "http://some-img/me",
//       vidUrl: "http://some-vid/me",
//       todos: [
//         { txt: "Driving liscence", doneAt: null },
//         { txt: "Coding power", doneAt: 187111111 },
//       ],
//     },
//     style: {
//       backgroundColor: "#00d",
//     },
//   },
// ];