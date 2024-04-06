import logo from './logo.svg';
import './App.css';
import { ethers } from "ethers";

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
  return (
    <div className="App">
      <button onClick={connect}> connect wallet </button>
    </div>
  );
}

export default App;
