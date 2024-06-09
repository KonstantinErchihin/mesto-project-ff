// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
const avatarImage = new URL('./vendor/images/avatar.jpg', import.meta.url);
const cardOneImage = new URL('./vendor/images/card_1.jpg', import.meta.url);
const cardTwoImage = new URL('./vendor/images/card_2.jpg', import.meta.url);
const cardThreeImage = new URL('./vendor/images/card_3.jpg', import.meta.url)

const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: 'avatar', link: avatarImage },
  { name: 'cardOne', link: cardOneImage },
  { name: 'cardTwo', link: cardTwoImage },
  { name: 'cardThree', link: cardThreeImage }
];

  