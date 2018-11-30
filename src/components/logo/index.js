import React, { Component } from "react";
import logo from "@images/login.png";
import PropTypes from "prop-types";
import TweenOne from "../../../node_modules/_rc-tween-one@2.2.18@rc-tween-one";
export default class Logo extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            children: []
        };
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
            this.renderPoint(data);
        };
        img.src = image;
        // ctx.drawImage(image, dw, dh);
    }
    renderPoint(data) {
        const { dw, dh, spaceXY, size } = this.props;
        let index,
            children = [];
        this.pointArray = [];
        for (let i = 0; i < dw; i+=spaceXY) {
            for (let j = 0; j < dh; j+=spaceXY) {
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
                <TweenOne style={{ left: item.x, top: item.y }} key={i}>
                    <TweenOne
                        style={{
                            width: r,
                            height: r,
                            opacity: b,
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
        this.setState({ children });
    }
    render() {
        return (
            <div className="logo">
                <canvas id="canvas" />
                {this.state.children}
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
