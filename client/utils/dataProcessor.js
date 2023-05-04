function editMyBooks(books) {
  const temp = books;
  if (books[0] === "first") {
    temp.shift();
  }
  return temp;
}

export { editMyBooks };
