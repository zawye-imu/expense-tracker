const dateToServerFormat = (d) => {
    var datestring = d.getFullYear()+"-"+ ("0"+(d.getMonth()+1)).slice(-2) + "-" +("0" + d.getDate()).slice(-2);
    return datestring;
  }

const dateFormatted = (d) => {
    var datestring = ("0"+(d.getMonth()+1)).slice(-2) + "/"+("0" + d.getDate()).slice(-2) + "/" +
     d.getFullYear();
    return datestring;
  }

export {dateToServerFormat,dateFormatted}