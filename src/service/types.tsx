
export type Nft = {
    tokenId: string,
    tokenUri: string,
    name: string,
    descriptipn: string,
    imageUri: string,
    uri: string,
    type: string
}
// 解析token url 指向的那个数据 元数据具体存储方式 和 存储机制 后面用去中心化的方式储存
// 元数据的基本的结构
// ipfs是去中心化存储 又叫星际文件系统
export type NftMeta = {
    name: string,
    descriptipn: string,
    imageUri: string,
    uri: string,
    type: string
}

// 储存文件 锚定 服务 这种存储可能没有保障 

