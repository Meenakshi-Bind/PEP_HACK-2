
let db;
let dbOpenRequest = indexedDB.open("Participants", 1);
dbOpenRequest.onupgradeneeded = function (e) {
  db = e.target.result;
  db.createObjectStore("NAME", { keyPath: "mid" }); // table will only be create when db is create first time
};
dbOpenRequest.onsuccess = function (e) {
  db = e.target.result;
  fetchMedia();
};
dbOpenRequest.onerror = function (e) {
  alert("Inside on error !!");
};


function addMedia(Name, points) {
    //   db me media add hojaega
    let txnObject = db.transaction("NAME", "readwrite"); // start transaction on mediaTable
    let NameTable = txnObject.objectStore("NAME"); // this will get access to mediaTable
  
    NameTable.add({ mid: Date.now(), type: Name, score : SCORE}); // it will add this object in mediaTable or mediaStore
  
    txnObject.onerror = function (e) {
      console.log("txn failed");
      console.log(e);
    };
  }
  function fetchMedia() {
    let txnObject = db.transaction("NAME", "readonly");
    let NameTable = txnObject.objectStore("NAME");
    let cursorObject = NameTable.openCursor(); // to iterate on all the rows / tuples
    cursorObject.onsuccess = function (e) {
      let cursor = cursorObject.result;
      if (cursor) {
        let NameObj = cursor.value;
        
        append(NameObj)
      
        cursor.continue();
      }
    };
  }
  function append(NameObj)
        {
        let table=document.querySelector(".table") 
        
        let telement=document.createElement("tr");
        telement.innerHTML=`<tr>
        <td style="position: relative;
        left: 90%;">${NameObj.type}</td>
        <td style="position: relative;left: 170%;">${NameObj.score}</td>
        </tr>`
        table.append(telement);
        }