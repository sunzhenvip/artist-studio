import { useState } from "react"

import { Button, Checkbox, Form, Input } from 'antd';

import { storeNftImage, storeMeta } from "../../service/arweave-service";
import { mintNFT } from "../../service/nft-service";
import { NftMeta } from "../../service/types";
import { useNavigate } from "react-router-dom"
import { messageBox } from "../../service/message-service";
import styles from './NftMintor.module.css'
import { addToIpfs } from '../../service/ipfs-service'
const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    }
}
function NftMintor() {

    const navigate = useNavigate()
    const [meta, updateMeta] = useState<NftMeta>({ name: "", descriptipn: "", imageUri: "",uri:"",type:"" })
    const [uri, setUri] = useState("")
    const store = async (file: any) => {
        try {

            // 获取上传文件的信息存储到ipfs服务当中 返回一个唯一的hash值
            // const imageuri = await storeNftImage(file);//addToIpfs(file)
            const imageuri = await addToIpfs(file);//addToIpfs(file)
            messageBox("success", "", imageuri)
            setUri(imageuri);
        } catch (error) {
            if (error instanceof Error)
                messageBox("danger", "", error.message)
        }
    }
    // 铸币的函数调用
    const mint = async () => {
        try {
            debugger
            const data: NftMeta = { ...meta, imageUri: uri,type:"image" }
            const json = JSON.stringify(data);
            // const metauri = await storeMeta(json); //addToIpfs(json)
            const metauri = await addToIpfs(json); //
            messageBox("success", "", metauri)
            // 开始铸币
            const { success, tokenId } = await mintNFT(metauri);

            if (success && tokenId) {
                messageBox("success", "", tokenId?.toString())
                navigate("/personal/collectible-browse") // 直接导航到浏览器的nft的浏览页上
                // router.push("/mynft")
            } else {
                messageBox("danger", "", "mint failed")
            }
        } catch (error) {
            if (error instanceof Error)
                messageBox("danger", "", error.message)
        }
    }


    return (
        <div className={styles.CreatorWrapper}>
            <div className={styles.CreatorContainer}>

                <Input
                    placeholder="Asset Name"
                      className={styles.NftField}
                    onChange={(e) => updateMeta({ ...meta, name: e.target.value })}

                />


                <Input.TextArea
                    placeholder="Asset Description"
                      className={styles.NftField}
                    onChange={(e) => { updateMeta({ ...meta, descriptipn: e.target.value }) }}
                />

                <Input
                    type='file'
                    placeholder="Asset Image"
                    className={styles.NftField}
                    onChange={(e) => { e.target.files&&store(e.target.files[0]) }}
                />


                <img width="350" src={uri} className={styles.NftImage} alt="NFT图片"/>


                <Button type="primary" onClick={mint} >
                    铸币
                </Button >



            </div>

        </div>
    )
}

export default NftMintor