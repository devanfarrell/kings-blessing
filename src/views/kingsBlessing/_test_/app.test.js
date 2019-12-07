import React from 'react';
import ReactDOM from 'react-dom';
import KingsBlessing from '../';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<KingsBlessing />, div);
  ReactDOM.unmountComponentAtNode(div);
});
 