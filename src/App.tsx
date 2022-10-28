import { useEffect, useState } from "react";
import './App.css'
import twitterLogo from "./assets/twitter-logo.svg"

function App() {
  const [walletAddress, setWalletAddress] = useState<string>();
  const [inputValue, setInputValue] = useState<string>("");
  const [gifList, setGifList] = useState<string[]>([]);

  const TEST_GIFS = [
    "https://i.giphy.com/media/xUOxffMyVjqAnuJpJu/giphy.webp",
    "https://media3.giphy.com/media/26n7aJwq73ubRevoQ/giphy.gif?cid=ecf05e47gpuxzul6z0774k47hcjp5p74uwfbfaq4xfjjco0c&rid=giphy.gif&ct=g",
    "https://media3.giphy.com/media/3o7aD5euYKz5Ly7Wq4/giphy.gif?cid=ecf05e47gx235xsfy7tqmzvhwz06ztzaxr63av1f446mlluz&rid=giphy.gif&ct=g",
    "https://media2.giphy.com/media/XKwfxBDG32ayrLHfAY/giphy.gif?cid=ecf05e47he0xf0mwnfx51x1f6m0wi4hzi52ql2dh0lnfe0tk&rid=giphy.gif&ct=g",
  ];
  
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet encontrada!");

          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            "Conectado com a Chave Pública:",
            response.publicKey.toString()
          );

          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("Objeto Solana não encontrado! Instale a Phantom Wallet 👻");
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*
  * Vamos definir esse método para que nosso código não quebre.
  * Vamos escrever a lógica dele em seguida!
  */
  const connectWallet = async () => {
    const { solana } = window;
  
    if (solana) {
      const response = await solana.connect();
      console.log(
        "Conectado com a Chave Pública:",
        response.publicKey.toString()
      );
      setWalletAddress(response.publicKey.toString());
    }
  };

  const sendGif = async () => {
    if (inputValue.length > 0) {
      console.log("Gif link:", inputValue);
      setGifList([...gifList, inputValue]);
      setInputValue("");
    } else {
      console.log("Input vazio. Tente novamente.");
    }
  };

  const onInputChange = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = currentTarget;
    setInputValue(value);
  };

  const renderNotConnectedContainer = () => (
    <button
      id="connect-wallet-button"
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Conecte sua carteira
    </button>
  );

  const renderConnectedContainer = () => (
    <div className="connected-container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendGif();
        }}
      >
        <input
          type="text"
          placeholder="Entre com o link do gif!"
          value={inputValue}
          onChange={onInputChange}
        />
        <button type="submit" id="submit-gif-button" className="cta-button submit-gif-button">
          Enviar
        </button>
      </form>
      <div className="gif-grid">
        {gifList.map((gif) => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  );

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log("Obtendo lista de GIFs...");
  
      // Chama o programa da Solana aqui.
  
      // Define o estado
      setGifList(TEST_GIFS);
    }
  }, [walletAddress]);
  
  return (
    <div className="App">
      <div className={walletAddress ? "authed-container" : "container"}>
        <div className="header-container">
          <p className="header">🖼 Meu Portal de GIF 🖼</p>
          <p className="sub-text">Veja sua coleção de GIF no metaverso ✨</p>
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
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
