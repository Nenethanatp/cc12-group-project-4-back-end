const {
  getAllPackages,
  createSubscription,
  createTransaction,
  getEndDates,
} = require('../services/subscribeService');

const { genStartEndDate } = require('../utils/formatDate');
const AppError = require('../utils/appError');
const { sequelize } = require('../models');

exports.createCharge = async (req, res, next) => {
  let t;
  try {
    t = await sequelize.transaction();
    const { email, name, amount, token, packageId, type } = req.body;

    let omise = require('omise')({
      publicKey: process.env.OMISE_PUBLIC_KEY,
      secretKey: process.env.OMISE_SECRET_KEY,
    });

    const customer = await omise.customers.create({
      email,
      description: name,
      card: token,
    });
    const charge = await omise.charges.create({
      amount,
      currency: 'thb',
      customer: customer.id,
    });

    const { startDate, endDate } = genStartEndDate(type);
    if (charge.status === 'success') {
      const subscribe = await createSubscription(
        {
          userId: req.user.id,
          packageId: packageId,
          startDate,
          endDate,
        },
        { transaction: t }
      );

      const transaction = await createTransaction(
        {
          subscriptionId: subscribe.id,
          price: Number(amount) / 100,
          omiseId: charge.id,
        },
        { transaction: t }
      );
      await t.commit();
      res.status(200).json({ amount: charge.amount, status: charge.status });
    }
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const allPackages = await getAllPackages();
    if (allPackages) {
      return res.status(200).json(allPackages);
    }
    throw new AppError('Not found any package', 404);
  } catch (err) {
    next(err);
  }
};

exports.getEndDate = async (req, res, next) => {
  const { id } = req.user;

  try {
    const endDates = await getEndDates(id);
    const convertArrayEndDates = JSON.parse(JSON.stringify(endDates));

    const arrayEndDates = convertArrayEndDates.map((item) => item.endDate);

    if (arrayEndDates.length === 0) {
      res.status(200).json({ endDate: 'expired' });
    } else {
      arrayEndDates.sort().reverse();
      res.status(200).json({ endDate: arrayEndDates[0] });
    }
  } catch (err) {
    console.log(err);
  }
};
