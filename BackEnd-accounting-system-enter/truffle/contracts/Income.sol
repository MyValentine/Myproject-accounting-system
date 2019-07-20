pragma solidity ^0.4.25;

contract Income{
    
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
        uint income_id;
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
        uint income_id
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
        
        // add new Income.
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
        
        
        // add new transaction Log of Income. 
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
        _detail2[last_detail_transaction_id].income_id = last_detail_id;
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
                _detail2[i].income_id
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
        
         // add new update transaction Log of Income. 
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
        _detail2[last_detail_transaction_id].income_id = index;
        all_transaction_id.push(last_detail_transaction_id);
    }
   
}