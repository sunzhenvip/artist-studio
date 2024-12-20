// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./openzeppelin/contracts/utils/Counters.sol";


// 该方式用于 https://remix.ethereum.org/ 网站在线测试引用库，请勿用于实际部署
// import "https://mirror.ghproxy.com/https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.8.2/contracts/token/ERC20/extensions/draft-IERC20Permit.sol";
// import "https://mirror.ghproxy.com/https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.8.2/contracts/token/ERC20/IERC20.sol";
// import "https://mirror.ghproxy.com/https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.8.2/contracts/interfaces/IERC1820Registry.sol";


contract ArtistNFT is ERC721URIStorage, ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
 
    constructor() ERC721("ArtistNFT", "AN") {
       
    }
    /**
     * @dev Mints a token to an artist.
     * @param artist 某个艺术家地址
     * @param _tokenURI 某个艺术家的tokenURI
     * @return The 返回新创建的token的id
     */
    function mint(address artist, string memory _tokenURI)
        public
        returns (uint256)
    {
  
        uint256 newItemId = _tokenIds.current();
        _mint(artist, newItemId);
        _setTokenURI(newItemId, _tokenURI);

        _tokenIds.increment();
        return newItemId;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 firstTokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, firstTokenId,batchSize);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return ERC721URIStorage.tokenURI(tokenId);
    }
}
