var tuple:[string, number];
tuple=['one',2,'three','four'];

tuple.push(5); // tuple의 마지막 index에 추가한다. 
tuple.push(6); 

tuple.pop(); //tuple의 마지막 index를 삭제한다. 

for(var i=0;i<tuple.length;i++){
   if(typeof tuple[i] === 'string')
       console.log('\''+tuple[i]+'\'');
   else
       console.log(tuple[i]);
}


