import { AiFillGithub, AiFillFacebook, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { MdEmail } from 'react-icons/md';

export const externalData = [
  {
    Icon: AiFillGithub,
    message: 'See the code',
    handle: 'sujishpatel',
    link: 'https://github.com/sujishpatel/portfolio',
  },

  {
    Icon: MdEmail,
    message: 'Send a message',
    handle: 'justjish@gmail.com',
    link: 'mailto:justjish@gmail.com?subject=Just saw your site',
  },
  {
    Icon: HiOutlineDocumentDownload,
    message: 'Get the resume',
    handle: 'naw',
    link: 'https://www.google.com/drive',
  },
  {
    Icon: AiFillInstagram,
    message: 'View some grams',
    handle: 'justjish',
    link: 'https://www.instagram.com/justjish/',
  },
  {
    Icon: AiFillLinkedin,
    message: 'Connect with me',
    handle: 'naw',
    link: 'https://www.linkedin.com/in/sujishpatel/',
  },
  {
    Icon: AiFillFacebook,
    message: 'See a timeline',
    handle: 'naw',
    link: 'https://www.facebook.com/justjish',
  }
];