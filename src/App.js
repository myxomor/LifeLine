import React from 'react';
import connect from "@vkontakte/vkui-connect";
import "./index.css";
import SwipeableTemporaryDrawer from "./components/temp";
import axios from 'axios';

import GoalList from "./components/list";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            person: {},
            aInfo: [],
            personInfo: {}
        };
    }

    componentDidMount() {
        connect.subscribe((e) => {
            console.log(e);
            if (e.detail.type == "VKWebAppGetUserInfoResult") {
                this.setState({
                    person: e.detail.data
                });
            };
            if (e.detail.type == "VKWebAppStorageGetFailed") {
                console.log("creating new storage");
                let dateNow = new Date();
                let sDateNow = dateNow.getDate() + "." + dateNow.getMonth() + "." + dateNow.getFullYear();
                let personInfo = {
                    succeed: 0,
                    snoozed: 0,
                    overdue: 0,
                    goals : [
                        {
                            header: "Создать первую цель",
                            date: sDateNow,
                            ok: false
                        }
                    ],
                };
                let sPersonInfo = JSON.stringify(personInfo);
                console.log(sPersonInfo);
                connect.send("VKWebAppStorageSet", {
                    "key": "goals",
                    "value": sPersonInfo,
                });
                this.setState({
                    personInfo: personInfo,
                })
            }
            if (e.detail.type == "VKWebAppStorageGetResult") {
                console.log("loading storage");
                this.setState({
                    aInfo: e.detail.data.keys
                });
                let aInfo = this.state.aInfo;
                this.setState({
                    personInfo: JSON.parse(this.state.aInfo[0].value)
                })
            }
        });

// Init VK App
        connect.send('VKWebAppInit', {});

        connect.send("VKWebAppGetUserInfo", {});

        connect.send("VKWebAppStorageGet", {"keys": ["goals"], "global": false});


    }

    render() {
        return (
            <div className="profile">
                <div className="header">
                    <SwipeableTemporaryDrawer/>
                </div>
                <div className="upper">
                    <img src={this.state.person.photo_200} className="avatar" alt="фото профиля"/>
                    <div className="person" >{this.state.person.first_name} {this.state.person.last_name}</div>
                    <div className="status">Отлично! Вы завершили на 6% больше задач в этом месяце.</div>
                </div>
                <div className="info">

                </div>
            </div>

        );
    }
}

export default App;
