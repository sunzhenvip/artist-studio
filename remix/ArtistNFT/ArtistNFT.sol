// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// 原始的
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


// import "https://github.com/OpenZeppelin/openzeppelin-contracts/tree/v4.8.2/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/tree/v4.8.2/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.8.2/contracts/utils/Counters.sol";

// import "https://mirror.ghproxy.com/https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.8.2/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "https://mirror.ghproxy.com/https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.8.2/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "https://mirror.ghproxy.com/https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.8.2/contracts/utils/Counters.sol";


contract ArtistNFT is ERC721URIStorage, ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
 
    constructor() ERC721("ArtistNFT", "AN") {
       
    }

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
