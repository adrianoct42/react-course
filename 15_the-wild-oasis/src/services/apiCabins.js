import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be loaded");
  }

  return data;
}

/* 
  O motivo pelo qual podemos passar "newCabin" abaixo no insert sem ter os nomes dos campos
  escritos, é porque no CreateCabinForm, estamos registrando o register com nomes iguais
  aos nomes dos campos no banco do supabase.

  Do contrário, o insert deveria ter a seguinte estrutura:

    .insert([
      { some_column: 'someValue', other_column: 'otherValue' },
    ])
*/

// Funciona tanto para CRIAR e EDITAR!
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/Edit cabin
  let query = supabase.from("cabins");

  // 1- a) CREATE
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // 1- b) EDIT
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF the was an error uploading the image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be loaded");
  }

  return data;
}
