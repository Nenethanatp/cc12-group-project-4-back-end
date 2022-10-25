const { getEndDates } = require('../services/subscribeService');
const { dateToString } = require('../utils/formatDate');

module.exports = async (req, res, next) => {
  const { id } = req.user;
  try {
    const endDates = await getEndDates(id);
    const convertArrayEndDates = JSON.parse(JSON.stringify(endDates));

    const arrayEndDates = convertArrayEndDates.map((item) => item.endDate);

    let status;
    if (arrayEndDates.length === 0) {
      status = 'expired';
    } else {
      arrayEndDates.sort().reverse();
      const today = new Date();
      const todayStr = dateToString(today);
      console.log(todayStr);

      console.log(arrayEndDates[0]);
      if (todayStr >= arrayEndDates[0]) {
        status = 'expired';
      } else {
        status = 'subscribed';
      }
    }

    req.status = status;
    next();
  } catch (err) {
    next(err);
  }
};
