import React, { Component } from 'react'
import Header from '@components/header'
import Nav from '@components/nav'
// import Routes from '../router'
import './index.less'
export default class Login extends Component {
    constructor(props) {
        super(props)
        console.log(this.props);

    }
    render() {
        return (
            <div className="layout">
                <Header />
                <div className="bottom">
                    <Nav />
                    <div className="content">
                        首页
                    </div>
                </div>



            </div>
        )
    }
}