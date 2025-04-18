import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bgrllwltcmfizkfnmbzj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJncmxsd2x0Y21maXprZm5tYnpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MTcyNjUsImV4cCI6MjA2MDQ5MzI2NX0.hnS5uDqGc9YhZMZ1aXQGXq2doC1j0d7Uon2NKKAr46U";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
