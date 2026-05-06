async function uploadNoteService(file, meta) {

  const fileName =
    Date.now() + "-" + file.name;

  const { error } =
    await supabaseClient.storage
      .from("notes")
      .upload(fileName, file);

  if (error) {
    console.error(error);
    throw error;
  }

  const { data } =
    supabaseClient.storage
      .from("notes")
      .getPublicUrl(fileName);

  const insertResponse =
    await supabaseClient
      .from("notes_metadata")
      .insert([{
        student_class:
          meta.student_class,

        subject:
          meta.subject,

        topic:
          meta.topic,

        url:
          data.publicUrl
      }]);

  console.log(insertResponse);
}

async function searchNotesService(query) {

  const { data, error } =
    await supabaseClient
      .from("notes_metadata")
      .select("*")
      .or(
        `topic.ilike.%${query}%,subject.ilike.%${query}%`
      );

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}
