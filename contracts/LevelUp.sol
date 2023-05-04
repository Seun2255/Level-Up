// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Prime.sol";

contract LevelUp is ERC721, Ownable {
    using Counters for Counters.Counter;
    using Base64 for bytes;

    Counters.Counter private _tokenIdCounter;

    mapping(address => Class[10000]) internal hostsClasses;
    uint256 public currentClassToken = 1;

    struct Class {
        uint256 class_id;
        string title;
        string about;
        address owner;
        string cover;
        uint256 questionPrice;
    }

    event ClassUploaded(address _user, uint256 _tokenId);

    Prime public token;

    constructor(Prime _addr) ERC721("LevelUp", "LVP") {
        token = _addr;
    }

    /**
     * @notice Uploads a new file
     * @param cover url for the cover
     */
    function uploadClass(
        string calldata title,
        string calldata about,
        string calldata cover
    ) public returns (uint256) {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(msg.sender, tokenId);
        Class storage newHostClass = hostsClasses[msg.sender][tokenId];
        newHostClass.class_id = tokenId;
        newHostClass.title = title;
        newHostClass.about = about;
        newHostClass.owner = msg.sender;
        newHostClass.cover = cover;
        emit ClassUploaded(msg.sender, tokenId);
        currentClassToken = tokenId;
    }

    
    function payForQuestion(uint256 tokenId) public {
        uint256 price = hostsClasses[msg.sender][tokenId].questionPrice;
        bool succes = token.sendToken(hostsClasses[msg.sender][tokenId].owner, price);
        require(succes, "Tokens weren't transfered");
    }

    /**
     * @notice Emergency stop contract in a case of a critical security flaw.
     */
    function destroy() public onlyOwner {
        selfdestruct(payable(owner()));
    }
}
