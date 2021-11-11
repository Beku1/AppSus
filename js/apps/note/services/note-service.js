import { storageService } from "../../../services/async-storage-service.js";
import { utilService } from "../../../services/utils-service.js";

export const noteServies = {
  query,
  createNote,
  createNewNoteTxt,
  createNewNoteImg,
  createNewNoteTodos
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
        imgUrl: "http://www.yo-yoo.co.il/coolpics/images/uploads/4c8498.jpeg",
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

function createNewNoteTxt(txt) {
  let noteTxt = {
    type: "note-txt",
    isPinned: false,
    info: {
      txt,
    },
  };
  return storageService.post(NOTES_KEY, noteTxt);
}

function createNewNoteImg(imgUrl, title) {
  let noteImg = {
    type: "note-img",
    info: {
      imgUrl,
      title,
    },
    style: {
      backgroundColor: "#00d",
    },
  };
  console.log(noteImg.info.title);
  return storageService.post(NOTES_KEY, noteImg);
}


function createNewNoteTodos(title, todos = []) {

  let todosDate = todos.map((todo)=>{
    console.log("from map",todo.txt);
     todo['doneAt'] = Date.now()
     return todo
      })
  let noteTodo = {
    type: "note-todos",
    info: {
      title,
      todos: todosDate,
    },
  };
  console.log('this is note todo',noteTodo);
  return storageService.post(NOTES_KEY, noteTodo);
}
