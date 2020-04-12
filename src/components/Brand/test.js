import React from 'react';
import {render} from '@testing-library/react';

import Brand from './';

describe('<Brand />', () => {
  it('should match snapshot', () => {
    const {container} = render(<Brand />);
    expect(container.firstChild).toMatchInlineSnapshot(`
      <h1>
        Guess the song
      </h1>
    `);
  });
});
