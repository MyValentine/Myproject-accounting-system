pragma solidity ^0.4.21;

contract emailstore {
    bytes32 id;
    string act;
    string emails;
    string reply;
    bool ispriv;
    struct EmailAttributes {
        string from;
        string fromOfDocument;
        string fromOfDocumentWay;
        string to;
        string subject;
        string content;
        string createDate;
        string docType;
        string dateofDoc;
        string docNumber;
        string inBound_type;
        bool isPrivate;
        string allTo;
        string timestamp;
        FileAttributes[] files;
        Actions[] actions;
    }
    
       struct FileAttributes{
        string fileName;
        string filepath;
        string uploadDate;
        string Email;
        string typeFile;   
        bytes32 EmailId;
    }  
  
      struct Actions{
        string Email;
        string Action;
        string Timestamp;
        string assignTo;
        bytes32 EmailIdA;
    }

    event actionArr(string email, string action, string timestamp , string assignto , string emailid);
    event fileArr(string fileName, string filepath, string uploadDate, string typeFile, string email, string emailId);
    mapping(bytes32 => EmailAttributes) Emails;
    event print_string(string _data);
    event print_array(bytes32[] _dataarr);
    function setEmail(bytes32 _id, string _from, string _to
    , string _subject, string _content, string _CreateDate 
    , string _docType, string _date, string _no,
    string _allto, string _timestamp
    )public {
        Emails[_id].from = _from;
        Emails[_id].to = _to;
        Emails[_id].subject = _subject;
        Emails[_id].content = _content;
        Emails[_id].createDate = _CreateDate;
        Emails[_id].docType = _docType;
        Emails[_id].dateofDoc = _date;
        Emails[_id].docNumber = _no;
        Emails[_id].allTo = _allto;
        Emails[_id].timestamp = _timestamp;
        id = keep(_id);
    }
    
    function setEmail2(string _fromOfDoc, string _fromOfDocWay, 
    string _inBound , bool _isPrivate)public{
        var _id = id;
        Emails[_id].fromOfDocument = _fromOfDoc;
        Emails[_id].fromOfDocumentWay = _fromOfDocWay;
        Emails[_id].inBound_type = _inBound;
        Emails[_id].isPrivate = _isPrivate;
    }
    
    function keep (bytes32 _id) constant returns (bytes32){
        return _id;
    }
    function setFile(string _filename, string _filepath, string _uploadDate, string _emailadd, string _typeFile ,bytes32 _emailid)public {
           Emails[_emailid].files.push(FileAttributes(_filename, 
                                                    _filepath, 
                                                    _uploadDate, 
                                                    _emailadd, 
                                                    _typeFile, 
                                                    _emailid));
    }

    function setAction(string _email, string _action, string _Timestamp, string _assignTo, bytes32 _emailida) public{
        Emails[_emailida].actions.push(Actions(_email, 
                                               _action, 
                                               _Timestamp, 
                                               _assignTo, 
                                               _emailida));
        
    }
 
function getmail(bytes32 _id)public  {
        var emails1 = getmailone(_id);
        var emails2 = getmailtwo(_id);
        emails = concatString3(emails1,emails2,'');
        emit print_string(emails);
        saveAllActionToEvent(_id);
        saveAllFileToEvent(_id);  
}

function getmailone(bytes32 _id)view returns (string) {
       string memory a = concatString3('from:\'',Emails[_id].from, "\',");
       string memory b = concatString3('to:\'',Emails[_id].to, "\',");
       string memory c = concatString3('subject:\'',Emails[_id].subject, "\',");
       string memory d = concatString3('content:\'',Emails[_id].content, "\',");
       string memory e = concatString3('createDate:\'',Emails[_id].createDate,"\',");
       string memory f = concatString3('docType:\'',Emails[_id].docType,"\',");
       string memory timestamp = concatString3('timestamp:\'',Emails[_id].timestamp,"\',");
        var em1 = concatString3(a,b,c);
        var em2 = concatString3(d,e,f);
        var emails1 = concatString3(em1,em2,timestamp);
         return emails1;
}
function getmailtwo(bytes32 _id) view returns (string){ 
       string memory g = concatString3('dateofDoc:\'',Emails[_id].dateofDoc,"\',");
       string memory h = concatString3('docNumber:\'',Emails[_id].docNumber,"\',");
       string memory i = concatString3('allTo:\'',Emails[_id].allTo,"\',");
       string memory j = concatString3('fromOfDocument:\'',Emails[_id].fromOfDocument,"\',");
       string memory k = concatString3('fromOfDocumentWay:\'',Emails[_id].fromOfDocumentWay,"\',");
       string memory l = concatString3('inBound_type:\'',Emails[_id].inBound_type,"\',");
        var emailkeep = concatString(g,h,i,j);
       var emails2 =  concatString3(emailkeep,k,l);
       return emails2;
}

function saveAllActionToEvent(bytes32 _id) public {
    for(uint i = 0; i < Emails[_id].actions.length; i++){
            string memory a1 = Emails[_id].actions[i].Email;
            string memory b1 = Emails[_id].actions[i].Action;
            string memory c1 = Emails[_id].actions[i].Timestamp;
            string memory d1 = Emails[_id].actions[i].assignTo;
            string memory e1 = bytes32ToString(Emails[_id].actions[i].EmailIdA);

            emit actionArr(a1, b1, c1, d1, e1);
    }
}

function saveAllFileToEvent(bytes32 _id) public {
    for(uint i = 0; i < Emails[_id].files.length; i++){
            string memory a2 = Emails[_id].files[i].fileName;
            string memory b2 = Emails[_id].files[i].filepath;
            string memory c2 = Emails[_id].files[i].uploadDate;
            string memory d2 = Emails[_id].files[i].typeFile;
            string memory e2 = Emails[_id].files[i].Email;
            string memory f2 = bytes32ToString(Emails[_id].files[i].EmailId);
            emit fileArr(a2, b2, c2, d2, e2, f2);
    }
}


  function bytes32ArrayToString(bytes32[] data)internal pure returns (string) {
        bytes memory bytesString = new bytes(data.length * 32);
        uint urlLength;
        for (uint i=0; i<data.length; i++) {
            for (uint j=0; j<32; j++) {
                byte char = byte(bytes32(uint(data[i]) * 2 ** (8 * j)));
                if (char != 0) {
                    bytesString[urlLength] = char;
                    urlLength += 1;
                }
            }
        }
        bytes memory bytesStringTrimmed = new bytes(urlLength);
        for (i=0; i<urlLength; i++) {
            bytesStringTrimmed[i] = bytesString[i];
        }
        return string(bytesStringTrimmed);
    }    

 function bytes32ToString(bytes32 x)internal pure returns (string) {
    bytes memory bytesString = new bytes(32);
    uint charCount = 0;
    for (uint j = 0; j < 32; j++) {
        byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
        if (char != 0) {
            bytesString[charCount] = char;
            charCount++;
        }
    }
    bytes memory bytesStringTrimmed = new bytes(charCount);
    for (j = 0; j < charCount; j++) {
        bytesStringTrimmed[j] = bytesString[j];
    }
    return string(bytesStringTrimmed);
}

function stringToBytes32(string memory source)internal pure returns (bytes32 result) {
    bytes memory tempEmptyStringTest = bytes(source);
    if (tempEmptyStringTest.length == 0) {
        return 0x0;
    }

    assembly {
        result := mload(add(source, 32))
    }
}
  
function concatString(string str_1, string str_2, string str_3, string str_4)internal pure returns (string) {
    
       bytes memory b_str_1 = bytes(str_1);
       bytes memory b_str_2 = bytes(str_2);
       bytes memory b_str_3 = bytes(str_3);
       bytes memory b_str_4 = bytes(str_4);
       string memory str_5 = new string(b_str_1.length + b_str_2.length + b_str_3.length + b_str_4.length);
       bytes memory b_str_5 = bytes(str_5);
       
       uint i = 0;
       uint j = 0;
       for (i = 0; i < b_str_1.length; i++) b_str_5[j++] = b_str_1[i];
       for (i = 0; i < b_str_2.length; i++) b_str_5[j++] = b_str_2[i];
       for (i = 0; i < b_str_3.length; i++) b_str_5[j++] = b_str_3[i];
       for (i = 0; i < b_str_4.length; i++) b_str_5[j++] = b_str_4[i];
        return string(b_str_5);
   }

function concatString3(string str_1, string str_2, string str_3)internal pure returns (string) {
       bytes memory b_str_1 = bytes(str_1);
       bytes memory b_str_2 = bytes(str_2);
       bytes memory b_str_3 = bytes(str_3);
       string memory str_4 = new string(b_str_1.length + b_str_2.length + b_str_3.length);
       bytes memory b_str_4 = bytes(str_4);
       
       uint i = 0;
       uint j = 0;
       for (i = 0; i < b_str_1.length; i++) b_str_4[j++] = b_str_1[i];
       for (i = 0; i < b_str_2.length; i++) b_str_4[j++] = b_str_2[i];
       for (i = 0; i < b_str_3.length; i++) b_str_4[j++] = b_str_3[i];
        return string(b_str_4);
   }
    
}