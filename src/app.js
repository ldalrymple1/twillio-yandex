import React from 'react'
import ReactDOM from 'react-dom'

import './style.scss'
import 'bulma'
import Axios from 'axios'
import { text } from 'body-parser'



class App extends React.Component {
  constructor() {
    super()

    this.state = {
      langs: '',
      message: '',
      tel: '',
      lang: ''

    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  componentDidMount() {
    Axios.get(`https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=${process.env.YANDEX_KEY}&ui=en`)
      .then(res => this.setState({ langs: res.data.langs }))
      .catch(err => console.log(err))
  }

  handleChange(e) {
    console.log(e.target.value)
    this.setState({ [e.target.name]: e.target.value })
    // Axios.post('https://translate.yandex.net/api/v1.5/tr.json/translate', this.state.message)

    // if that goed well sends textif taht goes well send resposne 
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('submitted')
  }


  render() {
    console.log(this.state, 're-render')
    console.log(Object.keys(this.state.langs))
    return (
      <>
      <div className="title">
        <h1>Text Translator!</h1>
      </div>
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Write a message to send to a friend 🤪</label>
          <div className="control">
            <textarea className="textarea" placeholder="Write your text message here" onChange={this.handleChange} name="message"></textarea>
          </div>
        </div>
        <div className="lower-area">
          <div className="field">
            <label className="label">Language 🇬🇧➡️❓</label>
            <div className="control">
              <div className="select">
                <select onChange={this.handleChange} name="lang" value={this.state.lang}>
                  <option >Select Language</option>
                  {Object.keys(this.state.langs).map((code, i) => 
                    <option name="lang" key={i}>{this.state.langs[code]}</option>
                  )}
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label"> 📞Phone Number</label>
            <div className="control">
              <input className="input phone-number" type="text" placeholder="+44 7392853066" name="tel" onChange={this.handleChange} />
            </div>
          </div>
          <div className="control">
            <button className="button">Submit</button>
          </div>
        </div>  
      </form>
      </>
    )
  }


}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)







