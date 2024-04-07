import { Card } from 'antd';
import type { Nft } from '../../service/types';
const { Meta } = Card;

function NftCard({nft}:{nft:Nft}){
    return(
        <Card
       
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src={nft.imageUri} />}
      >
        <Meta title={nft.name} description={nft.descriptipn} />
      
    </Card>
    )
}
export default NftCard

// 同质化资产 erc20 那个 balance of 他是某个外部账号或者某个合约账号的余额
//  erc721 balance of 是收藏品的个数 独一无二的