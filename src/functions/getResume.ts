import { useAuth } from 'hooks/useFirebase';
import { useStorage } from 'hooks/useFirebase';

// Getting the resume from the 'cloud';
// Don't need to worry about this too much.
// The resume is already being gotten from the file server

export const getResume = async () => {
  await useAuth.signInAnonymously();
  const resumePath = '/docs/Resume_Sujish_Patel_04-2021.pdf';
  const resumeRef = useStorage.ref(resumePath);
  const url:string = await resumeRef.getDownloadURL();
  return url;
}