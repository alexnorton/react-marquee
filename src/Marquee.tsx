import React from 'react';
import styled, { keyframes } from 'styled-components';

const Outer = styled.div`
  width: 100%;
  border: 3px solid #333;
  overflow: hidden;
  white-space: nowrap;
`;

const animation = keyframes`
  from {
    transform: translateX(0%);
  }

  to {
    transform: translateX(-100%);
  }
`;

const Content = styled.div`
  display: inline-block;
  animation-name: ${animation};
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

interface MarqueeProps {
  gap?: number;
  duration: number;
}

interface MarqueeState {}

class Marquee extends React.Component<MarqueeProps, MarqueeState> {
  contentElement?: HTMLDivElement;
  outerElement?: HTMLDivElement;
  width?: number;

  constructor(props: MarqueeProps) {
    super(props);

    this.setupContentRef = this.setupContentRef.bind(this);
    this.setupOuterRef = this.setupOuterRef.bind(this);
  }

  componentDidMount() {
    if (this.contentElement && this.outerElement) {
      const contentWidth = this.contentElement.offsetWidth;

      const { gap } = this.props;

      this.width = contentWidth + (gap || 0);
    }
  }

  setupContentRef(element: HTMLDivElement) {
    this.contentElement = element;
  }

  setupOuterRef(element: HTMLDivElement) {
    this.outerElement = element;
  }

  render() {
    const { gap, duration } = this.props;

    return (
      <Outer ref={this.setupOuterRef}>
        <Content
          ref={this.setupContentRef}
          style={{
            paddingRight: gap && `${gap}px`,
            animationDuration: `${duration}s`,
          }}
        >
          {this.props.children}
        </Content>
        <Content
          style={{
            paddingRight: gap && `${gap}px`,
            animationDuration: `${duration}s`,
          }}
        >
          {this.props.children}
        </Content>
      </Outer>
    );
  }
}

export default Marquee;
