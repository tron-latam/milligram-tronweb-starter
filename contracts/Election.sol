pragma solidity >=0.4.23 <0.6.0;

contract Election{

    struct Candidate{
        uint id;
        bytes32 name;
        uint voteCount;
    }
    mapping (uint => Candidate) public candidates;
    uint public candidatecount;
    mapping (address => bool) public voter;

    event eventVote(
        uint indexed _candidateid
    );

    constructor () public {
        addCandidate("Alice");
        addCandidate("Bob");
        addCandidate("Cryptouru");
    }

    function addCandidate(bytes32 name) private {
        candidates[candidatecount] = Candidate(candidatecount, name, 0);
        candidatecount++;
    }

    function vote(uint _candidateid) public {

        require(!voter[msg.sender], 'Adress already voted');

        require(_candidateid >= 0 && _candidateid <= candidatecount, 'Candidate does not exist');

        voter[msg.sender] = true;

        candidates[_candidateid].voteCount ++;

        emit eventVote(_candidateid);

    }

}