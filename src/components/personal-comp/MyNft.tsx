import { useEffect, useState } from "react"
import NftBrowser from "../common/NftBrowser"
import { owned, ownedTypedNFT } from "../../service/nft-service"
import type{ Nft} from "../../service/types" 
function MyNft() {
  const [nfts, setNfts] = useState<Nft[]>([])

  // 组件加载的时候执行该函数
  useEffect(() => {
    loadNfts();

  }, []);

  const loadNfts = async () => {
    // const ns = await ownedTypedNFT("image"); 暂时注释掉
    const ns = await owned();
    if (ns.success)
      setNfts(ns.data)
    console.log("mounted!")
  }
  return (
    <div className="main">
      <NftBrowser nfts={nfts} />
    </div>
  )
}
export default MyNft