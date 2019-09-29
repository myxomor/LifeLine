import React from 'react';
import connect from "@vkontakte/vkui-connect";
import "./index.css";
import SwipeableTemporaryDrawer from "./components/temp";
import axios from 'axios';

import List from "./components/list";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {person: {}};
    }
    requestBtn () {
        let socket = new WebSocket("ws://83.166.252.73");
        socket.onopen = function(e) {
            console.log("[open] Соединение установлено");
            console.log("Отправляем данные на сервер");
            socket.send("Меня зовут Джон");
        };

        socket.onmessage = function(event) {
            console.log(`[message] Данные получены с сервера: ${event.data}`);
        };

        socket.onclose = function(event) {
            if (event.wasClean) {
                console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
            } else {
                // например, сервер убил процесс или сеть недоступна
                // обычно в этом случае event.code 1006
                console.log('[close] Соединение прервано');
            }
        };

        socket.onerror = function(error) {
            console.log(`[error] ${error.message}`);
        };
        //socket.close(1000, "работа закончена");
        /* axios({
             method: 'get',
             timeout: 10000,
             url: 'http://83.166.252.73',
             responseType: 'arraybuffer',
             params: {
                 ID: 12345
             }
         })
             .then(function (response) {

                 console.log(response);
                 console.log('response');
             })
             .catch(function (error) {
                 // handle error
                 console.log(error);
                 console.log(error.data);
                 console.log('error');
             })*/
//        axios.delete("http://83.166.252.73")


    }
    componentDidMount() {
        connect.subscribe((e) => {
            if (e.detail.type == "VKWebAppGetUserInfoResult") {
                this.setState({
                    person: e.detail.data
                });
            }
        });

// Init VK App
        connect.send('VKWebAppInit', {});

        connect.send("VKWebAppGetUserInfo", {});


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
