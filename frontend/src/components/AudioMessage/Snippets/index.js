import { Fragment } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { useExtractFields } from '@/hooks/useExtractFields';

import Snippet from './Snippet';

const Snippets = () => {
  const { snippets } = useExtractFields('snippets');

  if (!snippets) return;

  return (
    <>
      {snippets.map((details) => (
        <Fragment key={uuidv4()}>
          <Snippet {...details} />
        </Fragment>
      ))}
    </>
  );
};

export default Snippets;
