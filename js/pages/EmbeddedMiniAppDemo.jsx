import React from 'react';

import { EmbeddedMiniApp } from 'nextcapital-client';

import Page from '../components/Page';

class EmbeddedMiniAppDemo extends React.Component {
  componentDidMount() {
    EmbeddedMiniApp.configure({
      onExit: () => window.alert('Flow exited!'),
      onEnrolled: () => window.alert('Enrolled!')
    });
  }

  render() {
    return (
      <Page
        title="Embedded Mini App"
        fullScreen
      >
        { EmbeddedMiniApp.render() }
      </Page>
    );
  }
}

export default EmbeddedMiniAppDemo;
