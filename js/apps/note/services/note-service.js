import { storageService } from "../../../services/async-storage-service.js";
import { utilService } from "../../../services/utils-service.js";

export const noteServies = {
  query,
  createNote,
  createNewNoteTxt,
  createNewNoteImg,
  createNewNoteTodos,
  changeColors,
  sortByPin,
  removeNote,
  duplicateNote
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
      isPinned: false,
      info: {
        txt: "Fullstack Me Baby!",
      },
      createdAt: getDate(Date.now()),
      style: {
        backgroundColor: "white",
      },
    },
    {
      id: "n102",
      type: "note-img",
      isPinned: false,
      info: {
        imgUrl: "http://www.yo-yoo.co.il/coolpics/images/uploads/4c8498.jpeg",
        title: "Bobi and Me",
      },
      style: {
        backgroundColor: "white",
      },
      createdAt: getDate(Date.now()),
    },
    {
      id: "n103",
      type: "note-todos",
      isPinned: false,
      info: {
        title: "Get my stuff together",
        todos: [
          { txt: "Driving liscence", doneAt: getDate(Date.now()) ,checked:false  },
          { txt: "Coding power", doneAt: getDate(Date.now()) ,checked:false  },
        ],
      },
      createdAt: getDate(Date.now()),
      style: {
        backgroundColor: "white",
      },
    },
  ];
}

function createNewNoteTxt(txt,title = '') {
  let noteTxt = {
    type: "note-txt",
    isPinned: false,
    info: {
      txt,
      title
    },
    createdAt: getDate(Date.now()),
    style: {
      backgroundColor: "white",
    },
  };
  return storageService.post(NOTES_KEY, noteTxt);
}

function createNewNoteImg(imgUrl, title) {
  let noteImg = {
    type: "note-img",
    isPinned: false,
    info: {
      imgUrl,
      title,
    },
    style: {
      backgroundColor: "white",
    },
    createdAt: getDate(Date.now()),
  };
 
  return storageService.post(NOTES_KEY, noteImg);
}

function createNewNoteTodos(title, todos = []) {
  let todosDate = todos.map((todo) => {
   
    todo["doneAt"] = getDate(Date.now());
    todo["checked"] = false
    return todo;
  });
  let noteTodo = {
    type: "note-todos",
    isPinned: false,
    info: {
      title,
      todos: todosDate,
    },
    createdAt: getDate(Date.now()),
    style: {
      backgroundColor: "white",
    },
  };
  console.log(noteTodo);
  return storageService.post(NOTES_KEY, noteTodo);
}

function changeColors(noteId, color) {
  return storageService.get(NOTES_KEY, noteId).then((note) => {
    note.style.backgroundColor = color;
    return storageService.put(NOTES_KEY, note);
  });
}

// understand again !
function sortByPin(note) {
  if (note.isPinned) return storageService.putFirst(NOTES_KEY, note);
  return storageService.putAfterPinned(NOTES_KEY, note).then((notes) => {
    return storageService.sortPinned(NOTES_KEY);
  });
}

function removeNote(note){
  return storageService.remove(NOTES_KEY,note.id).then(()=>{
    return storageService.query(NOTES_KEY)
  })
 
}

function duplicateNote(note){
  // console.log('from service 1',note);
  return storageService.post(NOTES_KEY,note)

}


function getDate(currDate) {
  const year = new Date(currDate).getFullYear();
  const month = new Date(currDate).getMonth();
  const day = new Date(currDate).getDate();
  const hours = new Date(currDate).getHours();
  const minutes = new Date(currDate).getMinutes();
  const seconds = new Date(currDate).getSeconds();
  const date = new Date(Date.UTC(year, month, day));
  const time = new Date(Date.UTC(0, 0, 0, hours, minutes, seconds));
  const optionsDate = { month: "short", day: "numeric" };
  const newDate = date.toLocaleDateString("en-GB", optionsDate);
  const newTime = time.toUTCString().substring(17, 22);
  return newDate + " " + newTime;
}
