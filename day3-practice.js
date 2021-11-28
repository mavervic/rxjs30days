/*
var result = courseList
不得直接使用索引 covers[0]，請用 concatAll, map, filter, forEach 完成
result 結果為 [
    {
      id: 511019,
      title: "React for Beginners",
      cover: "http://placeimg.com/150/200/tech"
    }, {
      id: 511020,
      title: "Front-End automat workflow",
      cover: "http://placeimg.com/150/200/arch"
    }, {
      id: 511022,
      title: "Vue2 for Beginners",
      cover: "http://placeimg.com/150/200/nature"
    }, {
      id: 511023,
      title: "Angular2 for Beginners",
      cover: "http://placeimg.com/150/200/people"
    },
 ]
*/
var courseLists = [
  {
    name: "My Courses",
    courses: [
      {
        id: 511019,
        title: "React for Beginners",
        covers: [
          {
            width: 150,
            height: 200,
            url: "http://placeimg.com/150/200/tech",
          },
          {
            width: 200,
            height: 200,
            url: "http://placeimg.com/200/200/tech",
          },
          {
            width: 300,
            height: 200,
            url: "http://placeimg.com/300/200/tech",
          },
        ],
        tags: [
          {
            id: 1,
            name: "JavaScript",
          },
        ],
        rating: 5,
      },
      {
        id: 511020,
        title: "Front-End automat workflow",
        covers: [
          {
            width: 150,
            height: 200,
            url: "http://placeimg.com/150/200/arch",
          },
          {
            width: 200,
            height: 200,
            url: "http://placeimg.com/200/200/arch",
          },
          {
            width: 300,
            height: 200,
            url: "http://placeimg.com/300/200/arch",
          },
        ],
        tags: [
          {
            id: 2,
            name: "gulp",
          },
          {
            id: 3,
            name: "webpack",
          },
        ],
        rating: 5,
      },
    ],
  },
  {
    name: "New Release",
    courses: [
      {
        id: 511022,
        title: "Vue2 for Beginners",
        covers: [
          {
            width: 150,
            height: 200,
            url: "http://placeimg.com/150/200/nature",
          },
          {
            width: 200,
            height: 200,
            url: "http://placeimg.com/200/200/nature",
          },
          {
            width: 300,
            height: 200,
            url: "http://placeimg.com/300/200/nature",
          },
        ],
        tags: [
          {
            id: 1,
            name: "JavaScript",
          },
        ],
        rating: 5,
      },
      {
        id: 511023,
        title: "Angular2 for Beginners",
        covers: [
          {
            width: 150,
            height: 200,
            url: "http://placeimg.com/150/200/people",
          },
          {
            width: 200,
            height: 200,
            url: "http://placeimg.com/200/200/people",
          },
          {
            width: 300,
            height: 200,
            url: "http://placeimg.com/300/200/people",
          },
        ],
        tags: [
          {
            id: 1,
            name: "JavaScript",
          },
        ],
        rating: 5,
      },
    ],
  },
];

// var result = courseLists
//   .map((list) => {
//     return list.courses.map((cource) => {
//       return {
//         id: cource.id,
//         title: cource.title,
//         cover: cource.covers.find((item) => {
//           return item.url.includes("/150/200");
//         }).url,
//       };
//     });
//   })
//   .flat();
// console.log(result);

var result2 = courseLists.flatMap((list) => {
  return list.courses.flatMap((course) => {
    return course.covers
      .filter((cover) => {
        return cover.width === 150;
      })
      .map((item) => {
        return {
          id: course.id,
          title: course.title,
          cover: item.url,
        };
      });
  });
});

console.log(result2);
