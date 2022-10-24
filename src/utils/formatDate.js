exports.genStartEndDate = (type) => {
  const monthlyEndDate = () => {
    const today = new Date();
    const startDate = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;

    const genNextNewDate = (fullDate) => {
      const endNextMonth = new Date(
        fullDate.getYear(),
        fullDate.getMonth() + 2,
        0
      );
      if (fullDate.getDate() > endNextMonth.getDate()) {
        return endNextMonth.getDate();
      } else {
        return fullDate.getDate();
      }
    };

    const date = genNextNewDate(today);

    const checkMonth = () => {
      if (today.getMonth !== 11) {
        const endDate = `${today.getFullYear()}-${
          today.getMonth() + 2
        }-${date}`;
        return endDate;
      }
      const endDate = `${today.getFullYear() + 1}-${01}-${date}`;
      return endDate;
    };
    const endDate = checkMonth();
    return { startDate, endDate };
  };

  const annualyEndDate = () => {
    const today = new Date();
    const startDate = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;

    const endDate = `${today.getFullYear() + 1}-${
      today.getMonth() + 1
    }-${today.getDate()}`;

    return { startDate, endDate };
  };

  if (type === 'annually') {
    const result = annualyEndDate();
    return result;
  } else {
    const result = monthlyEndDate();
    return result;
  }
};

exports.dateToString = (date) => {
  const dateString = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  return dateString;
};
