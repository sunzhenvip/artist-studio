import logo from './logo.svg';
import './App.css';
import { ethers } from "ethers";
import Lock from "./artifacts/contracts/Lock.sol/Lock.json";


function App() {
  const connect = async () => {
    /**
     * 新版本  "ethers": "^6.11.1" 配套  下面两个版本
     * "@nomicfoundation/hardhat-toolbox": "^5.0.0",
     * "hardhat": "^2.22.2"
     */
    /**
     * 旧版本  "ethers": "^5.7.2" 配套  下面两个版本
     * "@nomicfoundation/hardhat-toolbox": "^2.0.0",
     * "hardhat": "^2.13.0"
     */
    // 可能更改 5.7 版本才能使用该函数 npm install ethers@5.7.2
    // const provider = new ethers.providers.Web3Provider(window.ethereum) // 老版本代码 5.7.2
    // window.ethereum 是由一个浏览器metamask钱包插件注入给浏览器window对象中添加一个ethereum属性的
    const provider = new ethers.providers.Web3Provider(window.ethereum); // 新版本代码    "ethers": "^6.11.1",
    // 向钱包请求授权
    await provider.send("eth_requestAccounts", []);
    // 获取钱包的账户信息
    const signer = provider.getSigner();

    const address = await signer.getAddress();
    console.log("账号地址", address);
  }
  const readMessage = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    // 属于一个拨号资源
    // 部署的合约地址
    const lock = new ethers.Contract("0xa513E6E4b8f2a923D98304ec87F64353C4D5C853", Lock.abi, provider);
    const message = await lock.message();
    console.log(message);
  }
  const setMessage = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner()
    // 部署的合约地址
    let lock = new ethers.Contract("0xa513E6E4b8f2a923D98304ec87F64353C4D5C853", Lock.abi, signer);

    // 拿到了一个交易结构
    let transaction = await lock.connect(signer).setMessage("world hello!");
    let tx = await transaction.wait(1);// 才真正发起了操作
    debugger
    let event = tx.events[0];
    let value = event.args[0];

    let message = value.toString();
    console.log(message);
  }
  return (
    <div className="App">
      <button onClick={connect}> connect wallet </button>
      <button onClick={readMessage}> readMessage </button>
      <button onClick={setMessage}>setMessage</button>
    </div>
  );
}

export default App;
