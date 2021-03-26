import { FC, useRef, useEffect, useCallback, useMemo } from 'react';
import { section } from 'styles/section.style';
import { a, SpringValue, useSpring, config } from 'react-spring';
import useMeasure from 'react-use-measure';
import mergeRefs from 'react-merge-refs';
import { css } from '@emotion/react';
import { box } from 'styles/box.style';
import useBounds from 'hooks/useBounds';
import { h1, h3, h4, h3Inline } from 'styles/typography.style';
import { AiFillGithub, AiFillFacebook, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';
import { FaGithub, FaReact } from 'react-icons/fa';
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { MdEmail } from 'react-icons/md';
import viteSvg from 'assets/logos/vite.svg';
import reactSvg from 'assets/logos/react.svg';
import heartSvg from 'assets/icons/love.svg';
import screenSizes from 'data/screenSizes';
import { useMedia } from 'hooks/useMedia';
import useInteract from 'hooks/useInteract';
import { noop } from 'lodash';
import { IconBase, IconType } from 'react-icons/lib';
import { row } from 'styles/row.style';

const Heading = () => {
  const mqFont = useMedia(screenSizes, ['4rem', '3.5rem', '3rem'], '1rem');
  const [{ fontSize }] = useSpring({ fontSize: mqFont, config: config.wobbly }, [mqFont]);
  return (
    <a.div css={h3} style={{ fontSize }}>
      More<div css={h3Inline}> Coming </div>Soon!
    </a.div>
  );
};

const Message: FC<{ show?: boolean }> = () => (
  <div
    css={css`
      ${h4};
      color: white;
      font-size: 1.5rem;
    `}
  >
    In the meantime ...
  </div>
);

const ExternalItem: FC<{ Icon: IconType; message: string; link: string }> = ({ Icon, message, link}) => {
  const mqFont = useMedia(screenSizes, ['3rem', '2.5rem', '2rem'], '1.5rem');
  const [{ fontSize }] = useSpring({ fontSize: mqFont, config: config.wobbly }, [mqFont]);
  const onClick = useCallback(async () => window.open(link, "_blank"), []);
  const { bind, interactStyles } = useInteract({ onClick: onClick });
  return (
    <a.div {...bind()} css={box} style={{ ...interactStyles }}>
      
      <a.div
        css={css`
          ${h4};
          color: white;
        `}
        style={{ fontSize }}
      >
          <Icon
            css={css`
              vertical-align: middle;
            `}
          />{' '}
        <div
          css={css`
            ${h4};
            font-size: .5em;
          `}
        >
          {' '}
          {message}
        </div>{' '}
      </a.div>
    </a.div>
  );
};

const ViteLogo = () => <img src={viteSvg} alt="vitejs" width="32px" />;
const ReactLogo = () => <img src={reactSvg} alt="reactjs" width="32px" />;
const HeartIcon = () => (
  <img
    css={css`
      display: inline;
    `}
    src={heartSvg}
    alt="love"
    width="32px"
  />
);
const Closing = () => (
  <div
    css={css`
      ${row};
      ${h4};
    `}
  >
     <div>Made with</div> <ReactLogo /> +<HeartIcon />+<ViteLogo />
  </div>
);

const externalData = [
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
const Learn: FC<{ offset: SpringValue<number> }> = ({ offset }) => {
  const [ref, bounds] = useMeasure();
  const localRef = useRef<HTMLDivElement>(null);
  const updateBounds = useCallback(
    useBounds((state) => state.setLearn),
    [],
  );
  useEffect(() => updateBounds({ ...bounds, absoluteTop: localRef.current?.offsetTop ?? 0 }), [bounds, updateBounds]);

  /** Animations on the box **/
  const [{ opacity, scale, y }] = useSpring(
    {
      opacity: offset.to([1.5, 4], [0, 1]),
      scale: offset.to([2.5, 4], [0.5, 1]),
      y: offset.to([3, 4], [-200, 0]),
      config: config.wobbly,
    },
    [],
  );
  const ExternalLinks = useMemo(() => externalData.map((props, i) => <ExternalItem {...props} key={i} />), []);

  return (
    <div css={section} ref={mergeRefs([localRef, ref])}>
      <a.div
        css={css`
          ${box};
          z-index: 2;
        `}
        style={{ opacity, scale, y }}
      >
        <Heading />
        <Message />
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
          `}
        >
          {...ExternalLinks}
        </div>
        <Closing />
      </a.div>
    </div>
  );
};

export default Learn;
