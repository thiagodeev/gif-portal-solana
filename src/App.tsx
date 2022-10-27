import './App.css'
import twitterLogo from "./assets/twitter-logo.svg"

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🖼 Meu Portal de GIF 🖼</p>
          <p className="sub-text">Veja sua coleção de GIF no metaverso ✨</p>
        </div>
        <div className="footer-container">
          <a className="footer-text" href="https://github.com/thiagodeev" target="_blank" rel="noopener noreferrer">
            Feito com ❤️ por @thiagodeev e pela 
          </a>
          
          <a
            className="footer-text"
            href="https://twitter.com/web3dev_"
            target="_blank"
            rel="noreferrer"
            style={{display: 'flex', alignItems: 'center'}}
          ><img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />web3dev_</a>
        </div>
      </div>
    </div>
  )
}

export default App
