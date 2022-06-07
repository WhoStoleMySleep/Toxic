const variables = {
  firstVariable: (itemCount: any, totalItems: number) => {
    if (totalItems > 0) {
      return `${totalItems} гостей`;
    }

    return 'Сколько гостей';
  },

  twoVariable: (itemCount: any) => {
    let resultStr: string = '';

    const dataName = [
      'спальни',
      'кровати',
      'ванные комнаты',
    ];

    for (let index = 0; index < 3; index += 1) {
      if (itemCount[index] > 0) {
        resultStr += `, ${itemCount[index]} ${dataName[index]}`;
      }
    }

    resultStr = resultStr.slice(2);

    if (resultStr.length === 0) {
      resultStr = 'Какие удобства';
    } else if (resultStr.length > 20) {
      resultStr = `${resultStr.slice(0, 20)}...`;
    }

    return `${resultStr}`;
  },
};

export default variables;
