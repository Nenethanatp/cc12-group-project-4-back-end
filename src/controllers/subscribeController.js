const {
  getAllPackages,
  createSubscription,
  createTransaction,
} = require('../services/subscribeService');

const { genStartEndDate } = require('../utils/formatDate');
const AppError = require('../utils/appError');

exports.createCharge = async (req, res, next) => {
  try {
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

    const subscribe = await createSubscription({
      userId: req.user.id,
      packageId: packageId,
      startDate,
      endDate,
    });

    const transaction = await createTransaction({
      subscriptionId: subscribe.id,
      price: Number(amount) / 100,
      omiseId: charge.id,
    });
    res.status(200).json({ amount: charge.amount, status: charge.status });
  } catch (err) {
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
