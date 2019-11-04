import React, { Component } from 'react';

export default class SizeObserver extends Component {
    constructor(props) {
        super(props)

        this.id = props.name;
    }

    componentDidMount() {
        // this.intervalUpdate = setInterval(this.updatePosition, 50);
      }

      componentWillUnmount() {
        clearInterval(this.intervalUpdate);
      }

      updatePosition = () => {
        //   console.log('hello')
        this.forceUpdate();
      };

    getBound() {
        const component = document.getElementById(this.id);
        if (!component) { 
          return {};
        }
        const rect = component.getBoundingClientRect();
        return {
          left: rect.left,
          top: rect.top + window.scrollY,
          width: rect.width || rect.right - rect.left,
          height: rect.height || rect.bottom - rect.top
        };
      }

    render() {
        return (
            this.props.children(this.id)
        )
    }
}