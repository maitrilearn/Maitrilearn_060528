console.log("MaitriLearn Started 🚀");

let currentTopic = "";
let currentSubject = "";

// ---------------- UPLOAD ----------------

async function uploadNote() {

  const file =
    document.getElementById(
      "fileInput"
    ).files[0];

  if (!file) {
    alert("Select file");
    return;
  }

  const meta = {

    student_class:
      document.getElementById(
        "classInput"
      ).value,

    subject:
      document.getElementById(
        "subjectInput"
      ).value,

    topic:
      document.getElementById(
        "topicInput"
      ).value
  };

  try {

    await uploadNoteService(
      file,
      meta
    );

    alert("Upload successful ✅");

  } catch (err) {

    console.error(err);

    alert("Upload failed ❌");
  }
}

// ---------------- SEARCH ----------------

async function searchNotes() {

  const query =
    document.getElementById(
      "searchInput"
    ).value;

  const notes =
    await searchNotesService(
      query
    );

  const notesList =
    document.getElementById(
      "notesList"
    );

  notesList.innerHTML = "";

  notes.forEach(note => {

    const div =
      document.createElement("div");

    div.innerHTML = `
      <h3>${note.subject}</h3>

      <p>${note.topic}</p>

      <button onclick="
        previewNote(
          '${note.url}',
          '${note.topic}',
          '${note.subject}'
        )
      ">
        Preview
      </button>
    `;

    notesList.appendChild(div);
  });
}

// ---------------- PREVIEW ----------------

function previewNote(
  url,
  topic,
  subject
) {

  currentTopic = topic;

  currentSubject = subject;

  const previewBox =
    document.getElementById(
      "previewBox"
    );

  const previewContent =
    document.getElementById(
      "previewContent"
    );

  previewContent.innerHTML = `
    <iframe
      src="${url}"
      width="100%"
      height="400">
    </iframe>
  `;

  previewBox.style.display =
    "block";
}

function closePreview() {

  document.getElementById(
    "previewBox"
  ).style.display = "none";
}

// ---------------- DOUBT ----------------

async function askDoubt() {

  const question =
    document.getElementById(
      "doubtInput"
    ).value;

  const answerBox =
    document.getElementById(
      "answerBox"
    );

  answerBox.innerHTML =
    "Thinking...";

  const answer =
    await askDoubtService(
      question,
      currentSubject,
      currentTopic
    );

  answerBox.innerText =
    answer;
}

// ---------------- TUTOR ----------------

async function runTutor() {

  const topic =
    document.getElementById(
      "tutorInput"
    ).value;

  const tutorOutput =
    document.getElementById(
      "tutorOutput"
    );

  tutorOutput.innerHTML =
    "Teaching...";

  const result =
    await tutorService(topic);

  tutorOutput.innerText =
    result;
}

// ---------------- FEEDBACK ----------------

async function submitFeedback() {

  const msg =
    document.getElementById(
      "feedbackInput"
    ).value;

  const status =
    document.getElementById(
      "feedbackStatus"
    );

  if (!msg) {

    alert("Enter feedback");

    return;
  }

  status.innerHTML =
    "Sending...";

  try {

    await feedbackService(msg);

    status.innerHTML =
      "Thanks 🙌";

  } catch (err) {

    console.error(err);

    status.innerHTML =
      "Failed ❌";
  }
}
