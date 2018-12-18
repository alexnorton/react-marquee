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

  input {
    width: 100%;
    font-size: 20px;
    margin-top: 8px;
  }

  > div {
    margin-bottom: 16px;
  }
`;

const Marquees = styled.div`
  margin-bottom: 16px;

  > div {
    margin-bottom: 16px;
  }
`;

interface MarqueeContainerProps {
  width: number;
}

const MarqueeContainer = styled.div<MarqueeContainerProps>`
  margin-left: auto;
  margin-right: auto;
  width: ${({ width }) => width}px;
  font-size: 32px;
  border: 1px solid #666;

  &:last-child {
    margin-bottom: 32px;
  }
`;

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      text:
        "Missing Data - Today's analytics continue to arrive slowly, and will remain incomplete for the next hour or so. This data is from 10:23am.",
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
        <Marquees>
          {[200, 400, 600, 800].map((width, index) => (
            <MarqueeContainer width={width} key={index}>
              <Marquee gap={gap} speed={speed}>
                {text}
              </Marquee>
            </MarqueeContainer>
          ))}
        </Marquees>
        <div>
          <strong>Content:</strong>
          <input type="text" value={text} onChange={this.handleTextChange} />
        </div>
        <div>
          <strong>Speed:</strong> {speed} pixels/second
          <input
            type="range"
            value={speed}
            min={1}
            max={500}
            onChange={this.handleSpeedChange}
          />
        </div>
        <div>
          <strong>Gap:</strong> {gap}px
          <input
            type="range"
            value={gap}
            min={0}
            max={200}
            onChange={this.handleGapChange}
          />
        </div>
      </Container>
    );
  }
}

export default App;
