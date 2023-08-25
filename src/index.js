//Redux

import React from "react"; 
import ReactDOM from "react-dom"; 
import { Provider, connect } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

const quotes = [
  {
    quote: 'It always seems impossible until it\'s done.',
    author: 'Nelson Mandela'
  },
  {
    quote: 'If you can dream it, you can do it.',
    author: 'Walt Disney'
  },
  {
    quote: 'You simply have to put one foot in front of the other and keep going. Put blinders on and plow right ahead.',
    author: 'George Lucas'
  },
  {
    quote: 'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    author: 'Winston Churchill'
  },
  {
    quote: 'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt'
  },
  {
    quote: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs'
  },
  {
    quote: 'In the middle of every difficulty lies opportunity.',
    author: 'Albert Einstein'
  },
];



const NEW_QUOTE = "New Quote";

const newQuote = () => {
  return {
    type: NEW_QUOTE
  }
}

const length = quotes.length+1;


const quoteReducer = (state = quotes[Math.floor(Math.random() * length)], action) => {
   switch (action.type) {
    case NEW_QUOTE:
      let random;
      do {
        random = Math.floor(Math.random() * quotes.length);
      } while (quotes[random].quote === state.quote);
      return quotes[random];
    default:
      return state;
   }
}

const store = createStore(quoteReducer);



//React

class MyComponent extends React.Component {
  constructor(props){
    super(props);
    
    this.handleClick = this.handleClick.bind(this)
  }
  
  handleClick = () => {
    this.props.newQuote();
  }
  
  render(){
  
  
    return (
         
            <div id='quote-box' className='container p-5'>
                <div id='quote-area'>
                    <h3 id='text'>"{this.props.quote}"</h3>
                  <p id='author'>-{this.props.author}</p>
                  <div id='clicks' className='container row'>
                    <button onClick={this.handleClick} id='new-quote' className='btn btn-md btn-dark col-4'>New Quote</button>
                    <a className = 'col-4 mt-auto mb-auto' href='https://www.twitter.com/intent/tweet' rel='noreferrer' target='_blank'>
                      <button id='tweet-quote' className='btn btn-sm btn-primary'><FontAwesomeIcon icon={faTwitter} /></button>
                    </a>
                  </div>
                </div>
            </div>
    
    
    )
  }
}

//react-redux

const mapStateToProps = (state) => {
  return {
    quote: state.quote,
    author: state.author
  };
};

const mapDispatchToProps = {
  newQuote
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(MyComponent);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedComponent />
  </Provider>,
  document.getElementById('root')
);
