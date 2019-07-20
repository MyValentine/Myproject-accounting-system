pragma solidity ^0.4.25;

contract Expense{
    
    struct detail{
        uint id;
        string date;
        string selectedCategory;
        string description;
        string amount;
        string total;
        string selectedSource;
        string isDelete;
        // string timeStamp;
    }
    
    struct detail2{
        uint transaction_id;
        string date;
        string selectedCategory;
        string description;
        string amount;
        string total;
        string selectedSource;
        string isDelete;
        string timeStamp;
        uint expense_id;
    }
    
    
    
    uint private last_detail_id;
    uint private last_detail_transaction_id;
    uint[] private all_detail_id;
    uint[] private all_transaction_id;
    mapping(uint => detail) _detail;
    mapping(uint => detail2) _detail2;

    event detailCreated(uint id);
    event logAllData(
        uint id,
        string date,
        string selectedCategory,
        string description,
        string amount,
        string total,
        string selectedSource,
        string isDelete
    );
    
    event logAllDataTransactionID(
        uint transaction_id,
        string date,
        string selectedCategory,
        string description,
        string amount
    );
    
    event logAllDataTransactionID(
        string total,
        string selectedSource,
        string isDelete,
        string timeStamp,
        uint expense_id
    );
    
    
    function setData(
        string _date,
        string _selectedCategory,
        string _description,
        string _amount,
        string _total,
        string _selectedSource,
        string _isDelete,
        string _timeStamp
    ) public {
        
        // add new Expense.
        last_detail_id++;
        _detail[last_detail_id].id = last_detail_id;
        _detail[last_detail_id].date = _date;
        _detail[last_detail_id].selectedCategory = _selectedCategory;
        _detail[last_detail_id].description = _description;
        _detail[last_detail_id].amount = _amount;
        _detail[last_detail_id].total = _total;
        _detail[last_detail_id].selectedSource = _selectedSource;
        _detail[last_detail_id].isDelete = _isDelete;
        all_detail_id.push(last_detail_id);
        // emit detailCreated(last_detail_id);
        
        
        // add new transaction Log of Expense. 
        last_detail_transaction_id++;
        _detail2[last_detail_transaction_id].transaction_id = last_detail_transaction_id;
        _detail2[last_detail_transaction_id].date = _date;
        _detail2[last_detail_transaction_id].selectedCategory = _selectedCategory;
        _detail2[last_detail_transaction_id].description = _description;
        _detail2[last_detail_transaction_id].amount = _amount;
        _detail2[last_detail_transaction_id].total = _total;
        _detail2[last_detail_transaction_id].selectedSource = _selectedSource;
        _detail2[last_detail_transaction_id].isDelete = _isDelete;
        _detail2[last_detail_transaction_id].timeStamp = _timeStamp;
        _detail2[last_detail_transaction_id].expense_id = last_detail_id;
        all_transaction_id.push(last_detail_transaction_id);
    }
    
    function getAllTransactionID() public view returns(uint[]){
        return all_transaction_id;
    }
    
    function getAllId() public view returns(uint[]){
        return all_detail_id;
    }
    
    function getData(uint id) public view returns(
        string date,
        string selectedCategory,
        string description,
        string amount,
        string total,
        string selectedSource,
        string isDelete){
        return(
            date = _detail[id].date,
            selectedCategory = _detail[id].selectedCategory,
            description = _detail[id].description,
            amount = _detail[id].amount,
            total = _detail[id].total,
            selectedSource = _detail[id].selectedSource,
            isDelete = _detail[id].isDelete
        );
    }
    
    
    function getAllData() public {
        for(uint i=1 ; i<=all_detail_id.length ; i++){
            emit logAllData(
                _detail[i].id,
                _detail[i].date,
                _detail[i].selectedCategory,
                _detail[i].description,
                _detail[i].amount,
                _detail[i].total,
                _detail[i].selectedSource,
                _detail[i].isDelete
            );
        }
    }
    
    function getDataFromTransactionID() public{
        for(uint i=1; i<=all_transaction_id.length;i++){
            emit logAllDataTransactionID(
                _detail2[i].transaction_id,
                _detail2[i].date,
                _detail2[i].selectedCategory,
                _detail2[i].description,
                _detail2[i].amount
            );
        }
    }
    
    function getDataFromTransactionID2() public{
        for(uint i=1; i<=all_transaction_id.length;i++){
            emit logAllDataTransactionID(
                _detail2[i].total,
                _detail2[i].selectedSource,
                _detail2[i].isDelete,
                _detail2[i].timeStamp,
                _detail2[i].expense_id
            );
        }
    }
    
    function update(
        uint index,
        string _date,
        string _selectedCategory,
        string _description,
        string _amount,
        string _total,
        string _selectedSource,
        string _isDelete,
        string _timeStamp
    ) public {
        _detail[index].date = _date;
        _detail[index].selectedCategory = _selectedCategory;
        _detail[index].description = _description;
        _detail[index].amount = _amount;
        _detail[index].total = _total;
        _detail[index].selectedSource = _selectedSource;
        _detail[index].isDelete = _isDelete;
        
         // add new update transaction Log of Expense. 
        last_detail_transaction_id++;
        _detail2[last_detail_transaction_id].transaction_id = last_detail_transaction_id;
        _detail2[last_detail_transaction_id].date = _date;
        _detail2[last_detail_transaction_id].selectedCategory = _selectedCategory;
        _detail2[last_detail_transaction_id].description = _description;
        _detail2[last_detail_transaction_id].amount = _amount;
        _detail2[last_detail_transaction_id].total = _total;
        _detail2[last_detail_transaction_id].selectedSource = _selectedSource;
        _detail2[last_detail_transaction_id].isDelete = _isDelete;
        _detail2[last_detail_transaction_id].timeStamp = _timeStamp;
        _detail2[last_detail_transaction_id].expense_id = index;
        all_transaction_id.push(last_detail_transaction_id);
    }
    
    
    
    // function logAllActionToEvent(uint _id) public {
    //     for(uint i=0; i < _detail[_id].actions.length; i++){
    //         string memory a1 = _detail[_id].actions[i].date;
    //         string memory b1 = _detail[_id].actions[i].selectedCategory;
    //         string memory c1 = _detail[_id].actions[i].description;
    //         string memory d1 = _detail[_id].actions[i].amount;
    //         string memory e1 = _detail[_id].actions[i].total;
    //         string memory f1 = _detail[_id].actions[i].selectedSource;
    //         string memory g1 = _detail[_id].actions[i].isDelete;
    //     }
    // }
    
//     function saveAllActionToEvent(bytes32 _id) public {
//     for(uint i = 0; i < Emails[_id].actions.length; i++){
//             string memory a1 = Emails[_id].actions[i].Email;
//             string memory b1 = Emails[_id].actions[i].Action;
//             string memory c1 = Emails[_id].actions[i].Timestamp;
//             string memory d1 = Emails[_id].actions[i].assignTo;
//             string memory e1 = bytes32ToString(Emails[_id].actions[i].EmailIdA);

//             emit actionArr(a1, b1, c1, d1, e1);
//     }
// }
   
}