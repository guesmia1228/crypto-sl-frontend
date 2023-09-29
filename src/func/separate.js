const separateText = (string) => {
  let list = string.split("\n");

  let renderList = [];

  for (let i = 0; i < list.length; i++) {
    renderList.push(list[i]);

    if (i < list.length - 1) {
      renderList.push(<br />);
    }
  }

  return renderList;
};

export default separateText;
