const checkboxes = document.querySelectorAll("input[type='checkbox']");
const notes = document.querySelectorAll(".note");

/* LOAD SAVED STATE */
checkboxes.forEach((checkbox, index)=>{

    checkbox.checked = localStorage.getItem("qc_"+index) === "true";

    checkbox.addEventListener("change", ()=>{

        localStorage.setItem("qc_"+index, checkbox.checked);

        updateProgress();

    });

});

notes.forEach((note, index)=>{

    note.value = localStorage.getItem("note_"+index) || "";

    note.addEventListener("input", ()=>{

        localStorage.setItem("note_"+index, note.value);

        collectNotes();

    });

});

/* COLLAPSIBLE SECTIONS */
function toggleSection(header){

    const section = header.nextElementSibling;

    section.style.display =
        section.style.display === "none" ? "block" : "none";

}

/* COLLECT NOTES */
function collectNotes(){

    let text = "";

    notes.forEach(note=>{

        if(note.value.trim() !== ""){
            text += "- " + note.value + "\n";
        }

    });

    document.getElementById("notesOutput").value = text;

}

/* COPY NOTES */
function copyNotes(){

    const textarea = document.getElementById("notesOutput");

    textarea.select();
    document.execCommand("copy");

    alert("QC notes copied!");

}

/* RESET */
function resetChecklist(){

    checkboxes.forEach((checkbox, index)=>{

        checkbox.checked = false;

        localStorage.removeItem("qc_"+index);

    });

    notes.forEach((note, index)=>{

        note.value = "";

        localStorage.removeItem("note_"+index);

    });

    collectNotes();
    

}
collectNotes();