import React from 'react';
import './App.css'

class ChangeText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: '',
      fade: false
    }
  }
  componentDidMount() {
    this.fetchQuote(this.props.index)
  }
  componentDidUpdate(prevProps) {
    if(prevProps.index !== this.props.index) {
      // Trigger fade-out effect
      this.setState({
        fade: false
      });

      // Fetch the new quote and then trigger the fade-in effect
      setTimeout(() => {
        this.fetchQuote(this.props.index)
      }, 800);
    }
      
  }

  fetchQuote(index) {
    fetch("http://localhost:3001/api/data")
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        quote: data.quote[index][0],
        author: data.quote[index][1],
      }, () => {
        // การใช้ arrow function ทำให้มั่นใจว่าthisจะเป็นตัวเดิมกับ setState ก่อนหน้า
        // Trigger fade-in effect after setting the new quote
        this.setState({ 
          fade: true
        }, () => {
          this.props.comeBack(this.state.quote, this.state.author);
        });
      });
    })
    .catch((err) => {
      alert("Error fetching data:", err);
    })
  }

  render() {
    return (
      <div>
        <div className={`fade-in-text ${this.state.fade ? 'fade-in' : 'fade-out'}`}>
          <h2 id="quote"><i class="fa-solid fa-comment"></i> {this.state.quote}</h2>
          <h4 id="author">{this.state.author}</h4>
        </div>
      </div>
    )
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexColor: 0,
      indexQuote: 0,
      color: '#C4EA70',
      quote: '',
      author: ''
    };
    this.changeColor = this.changeColor.bind(this);
    this.handleQuote = this.handleQuote.bind(this);
  }
  changeColor() {
    const colors = ['#C4EA70', '#206777', '#FF8190', '#FF5563', '#FBD1D1', '#A95AF3'];
    let index1 = Math.floor(Math.random() * colors.length) % colors.length;
    let index2 = Math.floor(Math.random() * 10) % 10;
    while(this.state.indexColor===index1 || this.state.indexQuote===index2) {
      index1 = Math.floor(Math.random() * colors.length) % colors.length;
      index2 = Math.floor(Math.random() * 10) % 10;
    }

    this.setState({
      indexColor: index1,
      indexQuote: index2
    }, ()=>{
      this.setState({
        color: colors[this.state.indexColor]
      })
    });
  }
  handleQuote(quote2, author2) {
    this.setState({
      quote: quote2,
      author: author2
    })
  }

  render() {
    let text = `"${this.state.quote}" ${this.state.author}`
    let url = `https://x.com/intent/post?text=${text}`

    return (
      <div id="background" style={{backgroundColor: this.state.color}}>
        <div id="quote-box" style={{color: this.state.color}}>
          <ChangeText index={this.state.indexQuote} comeBack={this.handleQuote}/>
          <div id="bottom">
            <div id="tweet-quote"><a href={url} target="_blank"><i className="fa-brands fa-x-twitter"></i></a></div>
            <div id="button-quote"><button onClick={this.changeColor}>change {this.state.indexColor}</button></div>
          </div>
        </div>
      </div>
    )
  }
}

export default App