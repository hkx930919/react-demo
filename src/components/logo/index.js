import React, { Component } from "react";
import ReactDOM from "react-dom";
import logo from "@images/login.png";
import PropTypes from "prop-types";
import "./index.css";
import TweenOne from "rc-tween-one";
export default class Logo extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            children: []
        };
        // this.gatherData = this.gatherData.bind(this);
        // this.disperseData = this.disperseData.bind(this);
        // this.updateAnimation = this.updateAnimation.bind(this);
    }
    componentDidMount() {
        const { image, dw, dh } = this.props;
        const canvas = document.getElementById("canvas");
        canvas.width = dw;
        canvas.height = dh;
        const ctx = canvas.getContext("2d");
        var img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            const data = ctx.getImageData(0, 0, dw, dh).data;
            this.dom.removeChild(canvas);
            this.renderPoint(data);
        };
        img.src = image;
        // ctx.drawImage(image, dw, dh);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    renderPoint(data) {
        const { dw, dh, spaceXY, size } = this.props;
        let index,
            children = [];
        this.pointArray = [];
        for (let i = 0; i < dw; i += spaceXY) {
            for (let j = 0; j < dh; j += spaceXY) {
                index = (j * dw + i) * 4 + 3;

                if (data[index] > 155) {
                    this.pointArray.push({
                        x: i,
                        y: j
                    });
                }
            }
        }
        this.pointArray.forEach((item, i) => {
            let r = Math.random() * size + size;
            let b = Math.random() * 0.4 + 0.1;
            children.push(
                <TweenOne
                    style={{ left: item.x, top: item.y }}
                    key={i}
                    className="pointWrapped"
                >
                    <TweenOne
                        className="point"
                        style={{
                            width: r,
                            height: r,
                            opacity: 1,
                            backgroundColor: `rgba(${Math.random() * 100 +
                                155},255,255,.5)`
                        }}
                        animation={{
                            repeat: -1,
                            x: (Math.random() * 2 - 1) * 10 || 5,
                            y: (Math.random() * 2 - 1) * 5 || 2.5,
                            delay: Math.random() * 1000,
                            duration: 2000,
                            yoyo: true,
                            ease: "easeInOutQuad"
                        }}
                    />
                </TweenOne>
            );
        });
        this.setState({ children }, () => {
            this.updateAnimation();
            this.interval = setInterval(this.updateAnimation, 8000);
        });
    }
    gatherData=()=> {
        const children =
            this.state.children &&
            this.state.children.map(item =>
                React.cloneElement(item, {
                    animation: {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        delay: Math.random() * 500,
                        duration: 800,
                        ease: "easeInOutQuint"
                    }
                })
            );

        this.setState({ children });
    }
    disperseData=()=> {
        const domRect = this.dom.getBoundingClientRect();
        const animationDomRect = this.realAnimationDom.getBoundingClientRect();
        const sideTop = animationDomRect.top - domRect.top;
        const sideLeft = animationDomRect.left - domRect.left;
        const children = this.state.children.map(item =>
            React.cloneElement(item, {
                animation: {
                    x:
                        Math.random() * domRect.width -
                        sideLeft -
                        item.props.style.left,
                    y:
                        Math.random() * domRect.height -
                        sideTop -
                        item.props.style.top,
                    opacity: Math.random() * 0.5 + 0.1,
                    scale: Math.random() * 2 + 0.5,
                    delay: Math.random() * 500 + 500,
                    ease: "easeInOutQuint"
                }
            })
        );
        this.setState({ children });
    }
    updateAnimation=()=> {
        this.realAnimationDom = ReactDOM.findDOMNode(this.animationDom);
        ((this.gather && this.gatherData) || this.disperseData)();
        this.gather = !this.gather;
    }
    onMouseEnter = () => {
        if (this.gather) {
            this.updateAnimation();
        }
        // ((this.gather && this.disperseData) || this.gatherData )();
        this.componentWillUnmount();
    };
    onMouseLeave = () => {
        if (!this.gather) {
            this.updateAnimation();
        }
        this.interval = setInterval(this.updateAnimation, 8000);
    };
    render() {
        return (
            <div className="logo" ref={c => (this.dom = c)}>
                <canvas id="canvas" />
                <TweenOne
                    ref={a => (this.animationDom = a)}
                    className="animationDom"
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                >
                    {this.state.children}
                </TweenOne>
            </div>
        );
    }
}

Logo.propTypes = {
    dw: PropTypes.number,
    dh: PropTypes.number,
    image: PropTypes.string,
    spaceXY: PropTypes.number,
    size: PropTypes.number
};
Logo.defaultProps = {
    dw: 1038,
    dh: 280,
    image: logo,
    spaceXY: 25,
    size: 10
};
