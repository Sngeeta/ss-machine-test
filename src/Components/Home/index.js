import React, { Component } from 'react';
import { NavLink } from "react-router-dom"
import axios from 'axios'

function randomString(length = 20) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 

class HomePage extends Component {
    state = {
        isToggleOn: true,
        conversation: false,
        inputValue: '',
        chats: [],//array of objects
        botInAction: false,
    }
    // to click the popup button
    popUpClick = () => {
        this.setState({
            isToggleOn:!this.state.isToggleOn
        })
    } 
    // to start the new conversation
    handleClick = () => {
        this.setState({
            conversation:!this.state.conversation
        })
    } 
    // to set the value to inputvalue from input
    onChangeHandler = (e) => {
        this.setState({
            inputValue : e.target.value
        })        
    }
    // create the chat with id, type as default human and value that we enter from the inut field
    createChatEntry(chatValue, chatType = 'human',) {
        return {
            id: randomString(),
            type: chatType,
            value: chatValue,
        };
    }

    addChatAndCollectApiReply(chat) {
        const { chats } = this.state;
        // create a new chat entry
        //Now new chat contains chat with random id, type and value
        const newChat = this.createChatEntry(chat);
        // update the chat state; reset inpu field.
        this.setState({
            inputValue : '',
            chats: [...chats, newChat]
        }, () => {
            // collect bot response only after the chat state updated
            this.adviceslipResponse();
        });
    }
   
    SearchSubmit(e){
        var code = e.keyCode || e.which;
        if(code === 13 && event.target.value) {
            this.addChatAndCollectApiReply(event.target.value)
        }
    }

    onClickButtonHandler = (e) => {
        e.preventDefault();
        const submitButton = document.getElementById('submitButton');
        if (submitButton) {
            this.addChatAndCollectApiReply(submitButton.value);
        }
    }

    adviceslipResponse = () => {
        const { chats } = this.state;
        const url = `https://api.adviceslip.com/advice`; 
        // chat response is going to collect
        this.setState({ botInAction: true });
        axios.get(url)
        .then(response => {
            if (response.status === 200 && response.data && response.data.slip && response.data.slip.advice) {
                // create bot chat entry and update chats state
                const botChat = this.createChatEntry(response.data.slip.advice, 'bot');
                this.setState({
                    chats: [...chats, botChat],
                    botInAction: false,
                });
            }
        }).catch(error => {
          console.log(error);
        });
    }

    render() {
        const { chats, botInAction } = this.state;
        let chatWithBot = <React.Fragment />;
        let botTalking = <React.Fragment />;

        // this means, bot response is picking up
        if (botInAction) {
            botTalking =  <div className="maxeon-chatbox--conversation-right slide-righti">...</div>
        }

        // preparing chat list
        if (chats.length) {
            const chatList = chats.map(chat => {
                let chatBoxClass = '';

                if (chat.type === 'human') {
                    chatBoxClass = 'maxeon-chatbox--conversation-left slide-left';
                } else {
                    chatBoxClass = 'maxeon-chatbox--conversation-right slide-righti';
                }

                return (
                    <React.Fragment key={chat.id}>
                        <div className={chatBoxClass}>{chat.value}</div>
                        <div className="clearfix"></div>
                    </React.Fragment>
                );
            });

            chatWithBot = <div>{chatList}{botTalking}</div>;
        }
        
        return (
            <div className="maxeon">
                <section className="maxeon-banner">
                    <div className="container">
                        <div className="maxeon-banner--text">
                            <h1 className="maxeon-banner-title text-shadow-drop-tr slide-right">Where words fail, Music speaks. </h1>
                        </div>
                        <button onClick={this.popUpClick} className={"maxeon-chatbox--button " + (this.state.isToggleOn ? "button-on " : "button-close ")}  ></button>
                        <div className={(this.state.isToggleOn ? "maxeon-chatbox--popup-close " : "maxeon-chatbox--popup-open ") + (this.state.conversation ? "height-incresed " : 'height-decreased') }>
                            <div className="maxeon-chatbox--popup-body" >
                                <div className="maxeon-chatbox--popup-header">
                                    <h1>Hi There</h1>
                                    <h2>Hello Ask Us Anything, Share Your Feedback.</h2>
                                </div>
                                {!this.state.conversation ? 
                                    <div className="maxeon-chatbox--popup-conversation">
                                        <h2>Start a Conversation</h2>
                                        <p>The team typically replies in a few minutes.</p>
                                        <button onClick={this.handleClick} className="maxeon-chatbox--conversation-buttons "> New Conversation <i className="mdi-content-send" /></button>
                                    </div>
                                :
                                    <div className="maxeon-chatbox--conversation ">
                                     <div className="maxeon-chatbox--conversation-box">{chatWithBot}</div>
                                        <div className="maxeon-chatbox--conversation-run">
                                            <NavLink  to="/products"><span>we run on surveysparrow</span></NavLink>
                                        </div>
                                        <div className="maxeon-chatbox--conversation-footer ">
                                            <input type="text" id="submitButton" value={this.state.inputValue} placeholder="Write a reply..." onKeyPress={(e) => this.SearchSubmit(e)} onChange={(e) => this.onChangeHandler(e)} autoComplete="off" />
                                            <div className="enter mdi-content-send" onClick={(e) => this.onClickButtonHandler(e)} id='enter'></div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </div>  
        );
    }
}

export default HomePage;