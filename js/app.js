'use strict';

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

class Notepad {
  static Priority = {
    LOW: 0,
    NORMAL: 1,
    HIGH: 2,
  };
  constructor(note) {
    this._notes = note;
  }

  saveNote(note) {
    this._notes.push(note);
  }

  get notes() {
    return this._notes;
  }

  findNoteById(id) {
    for (const note of this._notes) {
      const noteFinded = note;
      if (noteFinded.id === id) {
        return noteFinded;
      }
    }
  }

  deleteNote(id) {
    const noteToDelete = this._notes.indexOf(this.findNoteById(id));
    this._notes.splice(noteToDelete, 1);
  }

  updateNoteContent(id, updatedContent) {
    const noteFinded = this.findNoteById(id);
    return Object.assign(noteFinded, updatedContent);
  }

  updateNotePriority(id, priority) {
    const noteFinded = this.findNoteById(id);
    return (noteFinded.priority = priority);
  }

  filterNotesByQuery(query) {
    const filteredNotes = [];
    for (const note of this._notes) {
      const element = note;
      if (
        element.body.toLowerCase().includes(query) ||
        element.title.toLowerCase().includes(query)
      ) {
        filteredNotes.push(element);
      }
    }
    return filteredNotes;
  }

  filterNotesByPriority(priority) {
    const filteredNotes = [];
    for (const note of this._notes) {
      const noteFinded = note;
      if (noteFinded.priority === priority) {
        filteredNotes.push(noteFinded);
      }
    }
    return filteredNotes;
  }
}

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

const initialNotes = [
  {
    id: 'id-1',
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-3',
    title: 'Get comfy with Frontend frameworks',
    body:
      'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-4',
    title: 'Winter clothes',
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];
const notepad = new Notepad(initialNotes);
const createNoteContent = function(note) {
  const note__content = document.createElement('div');
  note__content.classList.add('note__content');

  const note__title = document.createElement('h2');
  note__title.textContent = note.title;
  note__title.classList.add('note__title');

  const note__body = document.createElement('p');
  note__body.textContent = note.body;
  note__body.classList.add('note__body');
  note__content.append(note__title, note__body);
  return note__content;
};

const createNoteFooter = function(note) {
  const note__footer = document.createElement('footer');
  note__footer.classList.add('note__footer');

  const note__section = document.createElement('section');
  note__section.classList.add('note__section');
  const note__section__clone = note__section.cloneNode(true);

  const btnMore = createActionButton('expand_more');
  btnMore.dataset.action = 'decrease-priority';
  const btnLess = createActionButton('expand_less');
  btnLess.dataset.action = 'increase-priority';
  const note__priority = document.createElement('span');
  note__priority.classList.add('note__priority');
  note__priority.textContent = note.priority;
  note__section.append(btnMore, btnLess, note__priority);

  const btnEdit = createActionButton('edit');
  btnEdit.dataset.action = 'edit-note';
  const btnDelete = createActionButton('delete');
  btnDelete.dataset.action = 'delete-note';
  note__section__clone.append(btnEdit, btnDelete);

  note__footer.append(note__section, note__section__clone);
  return note__footer;
};

const createActionButton = function(text) {
  const button = document.createElement('button');
  button.classList.add('action');
  const materialIcons = document.createElement('i');
  materialIcons.classList.add('material-icons');
  materialIcons.classList.add('action__icon');
  materialIcons.textContent = text;
  button.append(materialIcons);
  return button;
};

const createListItem = function(note) {
  const noteListItem = document.createElement('li');
  noteListItem.classList.add('note-list__item');
  noteListItem.dataset.id = note.id;
  const noteWrapper = document.createElement('div');
  noteWrapper.classList.add('note');
  noteListItem.append(noteWrapper);
  noteWrapper.append(createNoteContent(note), createNoteFooter(note));
  return noteListItem;
};
const renderNoteList = (listRef, notes) => {
  notes.forEach(note => listRef.append(createListItem(note)));
};

const listRef = document.querySelector('.note-list');

renderNoteList(listRef, notepad.notes);
