
import { storeMeta } from '../service/ipfs-service'
import 'react-notifications-component/dist/theme.css'
import { ArweaveWebWallet } from 'arweave-wallet-connector';
import { toArweave } from '../service/arweave-service';
function ConnectIpfs() {

    const connectArweave = async () => {
        // 存储数据到ipfs去中心化服务当中
        await storeMeta({ name: "zhangsan" });
    }

    // 还不知道这段代码为什么会有提示框弹出在界面上
    // const wallet = new ArweaveWebWallet({
    //     name:"Artist Studio",
    //     logo:"mylogo"
    // })
    // wallet.setUrl("arweave.app")
    // wallet.keepPopup = true;

    // const connectArweave = async () => {

    //     console.log("xxxxxxxxxxx");
    //     if(!wallet.connected){
    //         await wallet.connect();
    //         toArweave("hello world");

    //     }else{
    //         wallet.disconnect();
    //     }
    // }
    return (
        <div>


            <a href="javascript:void(0);" onClick={connectArweave}>
                connectArweave
            </a>

        </div>
    )
}

export default ConnectIpfs
