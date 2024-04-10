import { create as ipfsHttpClient } from "ipfs-http-client";
import { IPFS } from "../config";
import axios from 'axios'
import { debug } from "arweave/web/lib/merkle";
const ipfs = ipfsHttpClient({
  host: IPFS.domain,
  port: 5001,
  protocol: 'http'

})

export const addToIpfs = async (entity: any): Promise<string> => {
  debugger
  const added = await ipfs.add(entity)
  const cid = added.path
  const rst = IPFS.url_prefix + cid;
  return rst;
}

export const readArticle = async (uri: string): Promise<string> => {
  const res = await axios.get(uri);
  return res.data
}
export const storeNftImage = async (file: any) => {
  return await addToIpfs(file);
}

export const storeMeta = async (meta: any) => {
  const json = JSON.stringify(meta);
  alert(json);
  try {
    const added = await ipfs.add(json);
    alert(added.path);
    // console.log(added.cid.toString());
  } catch (err) {
    alert(err);
  }
  // return await addToIpfs(meta);
}

export const storeArticle = async (article: any) => {

  return await addToIpfs(article);
}