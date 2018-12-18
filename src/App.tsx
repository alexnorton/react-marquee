import React, { Fragment } from 'react';
import styled from 'styled-components';

import Marquee from './Marquee';

interface AppProps {}

interface AppState {
  text: string;
  speed: number;
  gap: number;
}

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 800px;
`;

interface MarqueeContainerProps {
  width: number;
}

const MarqueeContainer = styled.div<MarqueeContainerProps>`
  margin-left: auto;
  margin-right: auto;
  width: ${({ width }) => width}px;
  font-size: 32px;
`;

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      text:
        'Hello!Note that the development build is not optimized. To create a production build, use yarn build.',
      speed: 60,
      gap: 30,
    };

    this.handleGapChange = this.handleGapChange.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleGapChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ gap: parseInt(e.target.value, 10) });
  }

  handleSpeedChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ speed: parseInt(e.target.value, 10) });
  }

  handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ text: e.target.value });
  }

  render() {
    const { text, speed, gap } = this.state;

    return (
      <Container>
        <h1>React Marquee</h1>
        <input type="text" value={text} onChange={this.handleTextChange} />
        <input
          type="range"
          value={speed}
          min={1}
          max={500}
          onChange={this.handleSpeedChange}
        />
        <input
          type="range"
          value={gap}
          min={0}
          max={100}
          onChange={this.handleGapChange}
        />

        {[200, 400, 600, 800].map((width, index) => (
          <MarqueeContainer width={width} key={index}>
            <Marquee gap={gap} speed={speed}>
              {text}
            </Marquee>
          </MarqueeContainer>
        ))}
      </Container>
    );
  }
}

export default App;
