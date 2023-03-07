import { AiFillGithub, AiFillFacebook, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';
import { HiOutlineDocumentDownload } from 'react-icons/hi';
import { MdEmail } from 'react-icons/md';
export const externalData = [
  {
    Icon: AiFillGithub,
    message: 'See the code',
    handle: 'justjish',
    link: 'https://github.com/justjish/jish-dev',
    download: false,
  },
  {
    Icon: MdEmail,
    message: 'Send a message',
    handle: 'justjish@gmail.com',
    link: 'mailto:justjish@gmail.com?subject=Just saw your site',
    download: false,
  },
  {
    Icon: HiOutlineDocumentDownload,
    message: 'Get the resume',
    handle: 'naw',
    link: '/Resume_Sujish_Patel_02-2023.pdf',
    download: true,
  },
  {
    Icon: AiFillInstagram,
    message: 'View some grams',
    handle: 'justjish',
    link: 'https://www.instagram.com/justjish/',
    download: false,
  },
  {
    Icon: AiFillLinkedin,
    message: 'Connect with me',
    handle: 'naw',
    link: 'https://www.linkedin.com/in/sujishpatel/',
    download: false,
  },
  {
    Icon: AiFillFacebook,
    message: 'See a timeline',
    handle: 'naw',
    link: 'https://www.facebook.com/justjish',
    download: false,
  },
];
