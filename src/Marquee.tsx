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
  speed: number;
}

interface MarqueeState {
  scroll: boolean;
  width: number;
}

class Marquee extends React.Component<MarqueeProps, MarqueeState> {
  contentElement?: HTMLDivElement;
  outerElement?: HTMLDivElement;

  constructor(props: MarqueeProps) {
    super(props);

    this.state = {
      scroll: false,
      width: 0,
    };

    this.setupContentRef = this.setupContentRef.bind(this);
    this.setupOuterRef = this.setupOuterRef.bind(this);
  }

  componentDidMount() {
    this.updateScrollState();
  }

  componentDidUpdate() {
    this.updateScrollState();
  }

  shouldComponentUpdate(
    nextProps: MarqueeProps & { children?: React.ReactNode },
    nextState: MarqueeState
  ) {
    return (
      this.props.gap !== nextProps.gap ||
      this.props.speed !== nextProps.speed ||
      this.props.children !== nextProps.children ||
      this.state.scroll !== nextState.scroll ||
      this.state.width !== nextState.width
    );
  }

  setupContentRef(element: HTMLDivElement) {
    this.contentElement = element;
  }

  setupOuterRef(element: HTMLDivElement) {
    this.outerElement = element;
  }

  updateScrollState() {
    if (this.contentElement && this.outerElement) {
      const contentWidth = this.contentElement.offsetWidth;
      const outerWidth = this.outerElement.offsetWidth;

      if (outerWidth < contentWidth) {
        this.setState({ scroll: true, width: contentWidth });
        return;
      }

      if (outerWidth >= contentWidth) {
        this.setState({ scroll: false });
        return;
      }
    }
  }

  render() {
    const { gap, speed } = this.props;

    const style = this.state.scroll
      ? {
          paddingRight: gap && `${gap}px`,
          animationDuration: `${(this.state.width + (gap || 0)) / speed}s`,
        }
      : {
          animation: 'none',
        };

    return (
      <Outer ref={this.setupOuterRef}>
        <Content ref={this.setupContentRef} style={style}>
          {this.props.children}
        </Content>
        {this.state.scroll && (
          <Content style={style}>{this.props.children}</Content>
        )}
      </Outer>
    );
  }
}

export default Marquee;
