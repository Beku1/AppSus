import { storageService } from "../../../services/async-storage-service.js";
import { utilService } from "../../../services/utils-service.js";

export const noteServies = {
  query,
  createNote,
  createNewNoteTxt,
  createNewNoteImg,
  createNewNoteTodos,
  changeColors,
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
      createdAt: getDate(Date.now()),
      style: {
        backgroundColor: "red",
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
      createdAt: getDate(Date.now()),
    },
    {
      id: "n103",
      type: "note-todos",
      info: {
        title: "Get my stuff together",
        todos: [
          { txt: "Driving liscence", doneAt: getDate(Date.now()) },
          { txt: "Coding power", doneAt: getDate(Date.now()) },
        ],
      },
      createdAt: getDate(Date.now()),
      style: {
        backgroundColor: "#00d",
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
    createdAt: getDate(Date.now()),
    style: {
      backgroundColor: "#00d",
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
    createdAt: getDate(Date.now()),
  };
  console.log(noteImg.info.title);
  return storageService.post(NOTES_KEY, noteImg);
}

function createNewNoteTodos(title, todos = []) {
  let todosDate = todos.map((todo) => {
    console.log("from map", todo.txt);
    todo["doneAt"] = getDate(Date.now());
    return todo;
  });
  let noteTodo = {
    type: "note-todos",
    info: {
      title,
      todos: todosDate,
    },
    createdAt: getDate(Date.now()),
    style: {
      backgroundColor: "#00d",
    },
  };
  return storageService.post(NOTES_KEY, noteTodo);
}

function changeColors(noteId, color) {
 return storageService.get(NOTES_KEY, noteId)
    .then((note) => {
   note.style.backgroundColor = color
  return storageService.put(NOTES_KEY,note)
  });
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
