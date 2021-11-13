import { storageService } from "../../../services/async-storage-service.js";
import { utilService } from "../../../services/utils-service.js";
import { basicStorageService } from "../../../services/storage-service.js";

export const noteServies = {
  query,
  createNote,
  createNewNoteTxt,
  createNewNoteImg,
  createNewNoteTodos,
  createNewNoteVid,
  changeColors,
  sortByPin,
  removeNote,
  duplicateNote,
  put,
  noteFilterBy,
};

const NOTES_KEY = "notes";

function noteFilterBy(filterBy) {
  return query().then((notes) => {
    if (filterBy.type === "") var type = "all";
    else var type = filterBy.type;
    if (filterBy.txt) var txt = filterBy.txt;
    console.log(txt);
    console.log(type);
    let filteredNotes = notes.filter((note) => {
      if (!txt && type === "all") return note;
     else if (txt && type === "note-txt") {
       if(note.info.txt && note.info.title)return (note.info.txt.includes(txt) || note.info.title.includes(txt)) && note.type === type
       else if(note.info.txt && !note.info.title)return note.info.txt.includes(txt)
       else return note.info.title.includes(txt)
      } 
      else if(type === 'all' && txt){
        console.log("type-all &" , txt);
        return note.info.title.includes(txt)
      }
      else if(type !== 'all' && txt){
        console.log(type, txt);
        return note.info.title.includes(txt) && note.type === type
      }
      else if(type !== 'all' && !txt){
        return  note.type === type
      }
    });
    return filteredNotes
  });
}

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
        txt: "With great power comes great responsibility",
        title:'Quote that spiderman stole from me'
      },
      createdAt: getDate(Date.now()),
      style: {
        backgroundColor: "white",
      },
    },
    {
      id: "n101",
      type: "note-txt",
      isPinned: false,
      info: {
        txt: "The problem is not the problem the problem is your attitude about the problem",
        title:'Problems'
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
        imgUrl: "https://www.meme-arsenal.com/memes/4dc5c2c0a73fb9ec553c3f93703a02ad.jpg",
        title: "Reality",
      },
      style: {
        backgroundColor: "white",
      },
      createdAt: getDate(Date.now()),
    },
    {
      id: "n102",
      type: "note-img",
      isPinned: false,
      info: {
        imgUrl: "https://img.devrant.com/devrant/rant/r_2028937_r7QZN.jpg",
        title: "Amazing Team",
      },
      style: {
        backgroundColor: "white",
      },
      createdAt: getDate(Date.now()),
    },
    {
      id: "n102",
      type: "note-img",
      isPinned: false,
      info: {
        imgUrl: "https://c.tenor.com/G5aS0iH1jNUAAAAC/%D0%BC%D1%83%D0%BB%D1%8C%D1%82%D1%81%D0%B1%D0%BE%D1%80%D0%BD%D0%B8%D0%BA-%D1%82%D0%BE%D0%BC%D0%B8%D0%B4%D0%B6%D0%B5%D1%80%D0%B8.gif",
        title: "Full Stack Job",
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
          {
            txt: "Driving liscence",
            doneAt: getDate(Date.now()),
            checked: false,
          },
          { txt: "Coding power", doneAt: getDate(Date.now()), checked: false },
        ],
      },
      createdAt: getDate(Date.now()),
      style: {
        backgroundColor: "white",
      },
    },
    {
      id: "n104",
      type: "note-vid",
      isPinned: false,
      info: {
        vidUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        title: "Bobi and Me",
      },
      style: {
        backgroundColor: "white",
      },
      createdAt: getDate(Date.now()),
    },
  ];
}

function createNewNoteTxt(txt, title = "") {
  let noteTxt = {
    type: "note-txt",
    isPinned: false,
    info: {
      txt,
      title,
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
function createNewNoteVid(vidUrl, title) {
  let newLink = basicStorageService.watchToEmbed(vidUrl);
  let noteVid = {
    type: "note-vid",
    isPinned: false,
    info: {
      vidUrl: newLink,
      title,
    },
    style: {
      backgroundColor: "white",
    },
    createdAt: getDate(Date.now()),
  };

  return storageService.post(NOTES_KEY, noteVid);
}

function createNewNoteTodos(title, todos = []) {
  let todosDate = todos.map((todo) => {
    todo["doneAt"] = getDate(Date.now());
    todo["checked"] = false;
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

function put(note) {
  return storageService.put(NOTES_KEY, note);
}

// understand again !
function sortByPin(note) {
  if (note.isPinned) return storageService.putFirst(NOTES_KEY, note);
  return storageService.putAfterPinned(NOTES_KEY, note).then((notes) => {
    return storageService.sortPinned(NOTES_KEY);
  });
}

function removeNote(note) {
  return storageService.remove(NOTES_KEY, note.id).then(() => {
    return storageService.query(NOTES_KEY);
  });
}

function duplicateNote(note) {
  // console.log('from service 1',note);
  return storageService.post(NOTES_KEY, note);
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
