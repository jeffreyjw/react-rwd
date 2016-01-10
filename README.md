# react-rwd

Small library for Responsive Web Design using React.

### Usage

```javascript
import React, { Component } from 'react';

import { RWD, Case } from './rwd';


export default class App extends Component {
  render() {
    return (
      <div style={ { height: '100%', width: '50%' } }>
        <RWD window>
          <div rwd={ function(dim){ return dim.h < 300; } }>
            I am a tiny page
          </div>
          <div rwd={ { max: 600 } }>small</div>
          <div rwd={ { min: 800, max: 1024 } }>tablet</div>
          <div rwd={ { max: 1280 } }>small desktop</div>
          <div>Aloha snackbar</div>
        </RWD>
      </div>
    );
  }
}

```

### Thanks

Repo initiated from https://github.com/krasimir/webpack-library-starter


### License

MIT
