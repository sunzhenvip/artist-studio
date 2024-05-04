import { ethers } from 'ethers'
import { rpcUrl } from '../config'
import { trying } from './connection-service'

import { configuration } from '../config'
import NFT from "../artifacts/contracts/ArtistNFT.sol/ArtistNFT.json";
import type { Nft } from './types';
import axios from 'axios'

// 返回当前账号所拥有的全部nft
export const owned = async (): Promise<{ success: boolean, data: Nft[] }> => {
    // 首先尝试连接钱包
    const { success, provider, signer } = await trying();
    if (!success) {
        // NotificationManager.warning('', "network not right!", 6000);
        return { success: false, data: [] }
    }

    const address = await signer?.getAddress();

    const nft = new ethers.Contract(configuration().nftAddress, NFT.abi, provider);


    const count = await nft.balanceOf(address) // 拿到当前账号所拥有的nft数量
    const amount = count.toNumber();
    debugger
    // 循环获取所有的nft
    const rst = await Promise.all(
        Array.from({ length: amount }, async (v, i) => {
            const tokenId = await nft.tokenOfOwnerByIndex(address, i)
            const tokenUri = await nft.tokenURI(tokenId)
            const meta = await axios.get(tokenUri)
            return { ...meta.data, tokenId, tokenUri };

        })
    )
    debugger
    return { success: true, data: rst }

}
// 合约当前总发行量是多少
export const totalsupply = async (): Promise<number> => {
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl());

    const nft = new ethers.Contract(configuration().nftAddress, NFT.abi, provider);
    const total = await nft.totalSupply();
    return total;
}
// 使用到的主要铸币函数
export const mintNFT = async (tokenUri: String): Promise<{ success: boolean, tokenId?: number }> => {
    const { success, provider, signer } = await trying();
    if (!success || !signer) {
        // NotificationManager.warning('', "network not right!", 6000);
        return { success: false };
    }

    // nftAddress是合约地址 abi是合约abi signer是钱包中某个账户的签名
    let nft = new ethers.Contract(configuration().nftAddress, NFT.abi, signer);
    const address = await signer.getAddress();
    // {value:100000000}
    // 构造好数据
    let transaction = await nft.connect(signer).mint(address, tokenUri);
    // 才真正发起了写操作
    let tx = await transaction.wait(1);
    debugger
    let event = tx.events[0];
    let value = event.args[2];
    console.log(value);
    let tokenId = value.toNumber();
    alert(tokenId)
    return { success: true, tokenId };
}
export const ownedTypedNFT = async (type: string): Promise<{ success: boolean, data: Nft[] }> => {
    let { success, data } = await owned();
    if (!success)
        return { success, data }
    let rst = data.filter((e: Nft) => e.type === type);
    return { success: true, data: rst };
}
