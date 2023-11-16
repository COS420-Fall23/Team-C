import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Post from './Post';

describe("Post", () => {
    test("Post renders", () => {
        render(<Post />);
        // eslint-disable-next-line testing-library/no-debugging-utils
        //screen.debug();
    });
});