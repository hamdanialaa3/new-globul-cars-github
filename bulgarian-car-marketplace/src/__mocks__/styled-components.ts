// src/__mocks__/styled-components.ts
// Mock for styled-components

const mockStyled = (tag: any) => {
  return jest.fn().mockImplementation((styles: any) => {
    return jest.fn().mockImplementation((props: any) => {
      return {
        type: tag,
        props: { ...props, className: 'mock-styled-component' },
        key: null,
        ref: null
      };
    });
  });
};

const createGlobalStyle = jest.fn().mockImplementation((styles: any) => {
  return jest.fn().mockImplementation((props: any) => {
    return {
      type: 'style',
      props: { ...props, 'data-styled-global': true },
      key: null,
      ref: null
    };
  });
});

const styled = Object.assign(mockStyled, {
  createGlobalStyle,
  // Add common HTML elements
  div: mockStyled('div'),
  span: mockStyled('span'),
  p: mockStyled('p'),
  h1: mockStyled('h1'),
  h2: mockStyled('h2'),
  h3: mockStyled('h3'),
  h4: mockStyled('h4'),
  h5: mockStyled('h5'),
  h6: mockStyled('h6'),
  button: mockStyled('button'),
  input: mockStyled('input'),
  textarea: mockStyled('textarea'),
  form: mockStyled('form'),
  label: mockStyled('label'),
  img: mockStyled('img'),
  a: mockStyled('a'),
  ul: mockStyled('ul'),
  li: mockStyled('li'),
  ol: mockStyled('ol'),
  nav: mockStyled('nav'),
  header: mockStyled('header'),
  footer: mockStyled('footer'),
  section: mockStyled('section'),
  article: mockStyled('article'),
  aside: mockStyled('aside'),
  main: mockStyled('main'),
  details: mockStyled('details'),
  summary: mockStyled('summary'),
  pre: mockStyled('pre'),
  code: mockStyled('code'),
  blockquote: mockStyled('blockquote'),
  table: mockStyled('table'),
  thead: mockStyled('thead'),
  tbody: mockStyled('tbody'),
  tr: mockStyled('tr'),
  th: mockStyled('th'),
  td: mockStyled('td'),
});

export { createGlobalStyle };
export default styled;