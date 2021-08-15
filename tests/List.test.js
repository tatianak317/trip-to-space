import { Selector } from 'testcafe';
    
fixture `Getting Started`
    .page `http://localhost:3000`;



test('list test', async t => {
    const noteInput = Selector('.note-input');
    const noteInputExists = noteInput.exists;
    const addNote = Selector('.add-note'); 
    const addNoteExists = addNote.exists; 
    const note = 'note added';

    const renderNote = Selector('.render-note');
    const renderNoteExists = renderNote.exists; 

    // const paragraph = noteInput.withExactText("note added");
    // const extractEntries = await paragraph.textContent; 

await t
    .expect(noteInputExists).ok()
    .typeText(noteInput, note)
    .expect(noteInput.value).eql(note)

    .expect(addNoteExists).ok()
    .expect(renderNote.child().count).eql(0)
    .click(addNote)

    // .expect(renderNote.child().count).eql(1)
    // .expect(renderNoteExists).ok()
    // .expect(noteInput.value).eql(note)

    // .expect(elementInnerHTML).eql('<p>note added</p>');
        // .expect(renderNote.innerText).eql("note added")
     
});