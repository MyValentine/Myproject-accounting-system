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
    
    uint private last_detail_id;
    uint[] private all_detail_id;
    mapping(uint => detail) _detail;

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
    
    // event logAllData2(
    //     uint id,
    //     string timeStamp
    // );
    
    function setData(
        string _date,
        string _selectedCategory,
        string _description,
        string _amount,
        string _total,
        string _selectedSource,
        string _isDelete
        // string _timeStamp
    ) public {
        last_detail_id++;
        _detail[last_detail_id].id = last_detail_id;
        _detail[last_detail_id].date = _date;
        _detail[last_detail_id].selectedCategory = _selectedCategory;
        _detail[last_detail_id].description = _description;
        _detail[last_detail_id].amount = _amount;
        _detail[last_detail_id].total = _total;
        _detail[last_detail_id].selectedSource = _selectedSource;
        _detail[last_detail_id].isDelete = _isDelete;
        // _detail[last_detail_id].timeStamp = _timeStamp;
        
        all_detail_id.push(last_detail_id);
        emit detailCreated(last_detail_id);
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
    
    // function getData2(uint id) public view returns(
    //     string timeStamp){
    //     return(
    //         timeStamp = _detail[id].timeStamp    
    //     );
    // }
    
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
    
    // function getAllData2() public {
    //     for(uint i=1 ; i<=all_detail_id.length ; i++){
    //         emit logAllData2(
    //             _detail[i].id,
    //             _detail[i].timeStamp
    //         );
    //     }
    // }
    
    function update(
        uint index,
        string _date,
        string _selectedCategory,
        string _description,
        string _amount,
        string _total,
        string _selectedSource,
        string _isDelete
    ) public {
        _detail[index].date = _date;
        _detail[index].selectedCategory = _selectedCategory;
        _detail[index].description = _description;
        _detail[index].amount = _amount;
        _detail[index].total = _total;
        _detail[index].selectedSource = _selectedSource;
        _detail[index].isDelete = _isDelete;
    }
    
    // function update2(
    //     uint index,
    //     string _timeStamp
    // ) public {
    //     _detail[index].timeStamp = _timeStamp;
    // }
}

