import { useAuth } from 'hooks/useFirebase';
import { useStorage } from 'hooks/useFirebase';

// If I decided to get the resume from firebase's cloud storage.
// Not used atm, the static hosting server is more than capable of 
// holding onto the static resume.
export const getResume = async () => {
  // Sign the user in from the app. 
  await useAuth.signInAnonymously();
  const resumePath = '/docs/Resume_Sujish_Patel_04-2021.pdf';
  const resumeRef = useStorage.ref(resumePath);
  // Get the url and send it to the component that is ready to consume it.
  const url:string = await resumeRef.getDownloadURL();
  return url;
}