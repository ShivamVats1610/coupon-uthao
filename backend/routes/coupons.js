const router = require("express").Router();
const CouponModel = require("../model/coupon.model");

function caseInsensitiveQuery(optValues) {
  var optRegexp = [];
  optValues.forEach(function(opt) {
    optRegexp.push(new RegExp(opt, "i"));
  });
  return optRegexp;
}

router.route("/").get((req, res, next) => {
  let searchFilter = req.query.searchFilter || "";
  let regex = new RegExp(searchFilter, "i");
  let oSubFilters = {};

  if (req.query.subFilters) {
    if (typeof req.query.subFilters === "object") {
      oSubFilters = req.query.subFilters;
    } else {
      try {
        oSubFilters = JSON.parse(req.query.subFilters);
      } catch (error) {
        console.error("Error parsing subFilters:", error);
      }
    }
  }

  let oQuery = searchFilter
    ? {
        $or: [
          { title: regex },
          { description: regex },
          { category: regex },
          { couponType: regex }
        ]
      }
    : {};

  if (!req.query.expired || req.query.expired === "false") {
    oQuery["validityEnd"] = {
      $gte: new Date().setHours(0, 0, 0, 0)
    };
  }

  let aSubFilters;
  for (const sKey in oSubFilters) {
    aSubFilters = caseInsensitiveQuery(oSubFilters[sKey]);
    oQuery[sKey] = aSubFilters;
  }

  CouponModel.find(oQuery)
    .sort("validityEnd")
    .then(coupons => res.json(coupons))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const {
    couponType,
    category,
    couponPrice,
    exchangePrice,
    title,
    validityStart,
    validityEnd,
    description,
    ownerID,
    sourceProductID,
    negotiable,
    exchangeType,
    quantity,
    currency,
    exchangeInfo,
    couponCode
  } = req.body;

  const newCoupon = new CouponModel({
    couponType,
    category,
    couponPrice: Number(couponPrice) || 0,
    exchangePrice: Number(exchangePrice) || 0,
    title,
    validityStart: Date.parse(validityStart),
    validityEnd: Date.parse(validityEnd),
    description,
    ownerID,
    sourceProductID,
    negotiable: negotiable || false,
    exchangeType,
    quantity: Number(quantity) || 0,
    currency,
    exchangeInfo,
    couponCode
  });

  newCoupon
    .save()
    .then(() => res.json("New Coupon Added"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
