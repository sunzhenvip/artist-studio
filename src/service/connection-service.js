import { ethers } from "ethers";
import { messageBox } from "../service/message-service"
import { configuration } from '../config'

// 我们的应用其实可以配置很多他支持的网络
// 可以强制指挥matemask钱包去添加这个应用支持的网络

// 链接一次
export const connectOnce = async () => {
    // debugger;
    let provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    let signer = provider.getSigner();
    let network = await provider.getNetwork();
    let address = await signer.getAddress();
    return { chainId: network.chainId, address: address, provider, signer };
}
// 尝试链接
export const trying = async () => {
    const { chainId, address, provider, signer } = await connectOnce();
    // 是不是我所支持的配置的网络id
    const supported = configuration().chainId.toString();
    if (chainId == supported) {
        messageBox("success", "", 'chainId: ' + chainId + "      account: " + address + "..")

        return { success: true, provider, signer };
    }
    messageBox("warning", "", 'chainId: ' + chainId + "      account: " + address.substring(0, 5) + "..")

    return { success: false };
}
// 如果没有配置 会请求配置对应的网络链条
export const connect = async () => {
    let { success } = await trying();//成功的意思是 matemask钱包 发送了一个链接请求 并且根据返回的信息 应用确认
    // 链接的网络是否是我们应该当中支持的网络
    if (success)
        return;
    // 如果失败 请求钱包 配置当前应用所需要的网络配置
    const conf = configuration()
    await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: conf.params

    });
    await trying();
}