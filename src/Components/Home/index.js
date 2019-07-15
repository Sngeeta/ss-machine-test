import React, { Component } from 'react';
import { NavLink } from "react-router-dom"
import axios from 'axios'

class HomePage extends Component {
    state = {
        isToggleOn: true,
        conversation: false,
        inputValue: '',
        dataset:{
            slip:{
                advice: '',
            }
        }
    }
    popUpClick = () => {
        this.setState({
            isToggleOn:!this.state.isToggleOn
        })
    } 
    handleClick = () => {
        this.setState({
            conversation:!this.state.conversation
        })
    }  
   
    SearchSubmit(e){
        var code = e.keyCode || e.which;
        if(code === 13) {
          document.getElementById('enter').click()
                this.setState(
                    {
                        inputValue : event.target.value
                    } 
                )
                console.log(event.target.value)

        }
    } 
    componentDidMount(){
        let url = `https://api.adviceslip.com/advice`
        axios.get(url)
        .then(response => {
          setInterval(()=>{
            this.setState({
                dataset: response.data,
              })
          }, 10000)
        }).catch(error => {
          console.log(error)
        });
      }
    render() {
        
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
                                        <button onClick={this.handleClick} className="maxeon-chatbox--conversation-buttons ">New Conversation</button>
                                    </div>
                                :
                                    <div className="maxeon-chatbox--conversation ">
                                     <div className="maxeon-chatbox--conversation-box">
                                     {this.state.inputValue ? 
                                        <div>
                                            <div className="maxeon-chatbox--conversation-left slide-left">{this.state.inputValue}</div>
                                            <div className="clearfix"></div>
                                            <div className="maxeon-chatbox--conversation-right slide-righti">{this.state.dataset.slip.advice.length !== 0 ? this.state.dataset.slip.advice : '...'}</div>
                                        </div>
                                    : ' '
                                    }
                                        </div>
                                        <div className="maxeon-chatbox--conversation-run">
                                            <NavLink  to="/products"><span>we run on surveysparrow</span></NavLink>
                                        </div>
                                        <div className="maxeon-chatbox--conversation-footer ">
                                            <input type="test" placeholder="Write a reply..." onKeyPress={(e) => this.SearchSubmit(e)} onClick={(e) => this.SearchSubmit(e)}/>
                                            <div className="enter" id='enter'></div>
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