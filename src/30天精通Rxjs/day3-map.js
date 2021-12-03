// 試著把 newCourseList 每個元素的 { id, title } 塞到新的陣列 idAndTitlePairs
var newCourseList = [
  {
    id: 511021,
    title: "React for Beginners",
    coverPng:
      "https://res.cloudinary.com/dohtkyi84/image/upload/v1481226146/react-cover.png",
    rating: 5,
  },
  {
    id: 511022,
    title: "Vue2 for Beginners",
    coverPng:
      "https://res.cloudinary.com/dohtkyi84/image/upload/v1481226146/react-cover.png",
    rating: 5,
  },
  {
    id: 511023,
    title: "Angular2 for Beginners",
    coverPng:
      "https://res.cloudinary.com/dohtkyi84/image/upload/v1481226146/react-cover.png",
    rating: 5,
  },
  {
    id: 511024,
    title: "Webpack for Beginners",
    coverPng:
      "https://res.cloudinary.com/dohtkyi84/image/upload/v1481226146/react-cover.png",
    rating: 4,
  },
];

// 雖然 ES5 之後原生的 JavaScript 陣列有 map 方法了，但希望讀者自我實做一次，能幫助理解。
Array.prototype.map = function (callback) {
  var result = [];

  this.forEach((item, index) => {
    result.push(callback(item, index));
  });

  return result;
};

var idAndTitle = newCourseList.map((item) => {
  return { id: item.id, title: item.title };
});

console.log(idAndTitle);
