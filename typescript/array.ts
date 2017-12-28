var array:string[];
array=['1','2','3','4'];

array.push('5'); // array의 마지막 index에 추가한다. 
array.push('6'); 

array.pop(); //array의 마지막 index를 삭제한다. 

for(var i=0;i<array.length;i++)
  console.log(array[i]);

