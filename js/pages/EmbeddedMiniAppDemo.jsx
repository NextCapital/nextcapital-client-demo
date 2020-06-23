import React from 'react';

import { EmbeddedMiniApp } from 'nextcapital-client';

import Page from '../components/Page';

/**
 * It is even possible to embed an entire application, with just a few lines of code!
 *
 * As we update the update the application, a consuming application would get an updates or
 * bugfixes automatically. Breaking changes to the consuming application would be extremely
 * rare.
 *
 * NOTE: This is a incomplete demo app. Some functionality may be missing or broken. This is
 * not representative of a final/shipping/real product.
 */
class EmbeddedMiniAppDemo extends React.Component {
  /**
   * We need to initialize the app when it first renders.
   */
  componentDidMount() {
    EmbeddedMiniApp.configure({
      onExit: () => window.alert('Flow exited!'),
      onEnrolled: () => window.alert('Enrolled!')
    });
  }

  /**
   * Apart from that, just a single line of code to render.
   */
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
