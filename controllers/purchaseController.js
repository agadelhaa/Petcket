import Purchase from "../models/PurchaseModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

export const getAllPurchase = async (req, res) => {
  const { search, month, year, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [{ brand: { $regex: search, $options: "i" } }];
  }

  if (year) { //se tiver ano
    const startYear = new Date(year, 0, 1);
    const endYear = new Date(year, 12, 0);

    if (month) { // se tiver ano e mês
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);

      queryObject.date = {
        $gte: startDate,
        $lte: endDate,
      };
    } else { // se só tiver ano
      queryObject.date = { $gte: startYear, $lte: endYear };
    }
  } else if (month) { // se só tiver mês
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Pesquisa por mês deve incluir um ano" });
    return;
  }

  const sortOptions = {
    'mais recente': '-date',
    'mais antiga': 'date',
    'a-z': 'brand',
    'z-a': '-brand',
  };
  const sortKey = sortOptions[sort] || sortOptions['mais recentes'];

  // paginação
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page -1) * limit;

  const purchases = await Purchase.find(queryObject).sort(sortKey).skip(skip).limit(limit);

  const totalPurchases = await Purchase.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalPurchases/limit);
  res.status(StatusCodes.OK).json({ totalPurchases,numOfPages, currentPage: page, purchases });
};

export const createPurchase = async (req, res) => {
  //   const { date, brand, weight, price } = req.body;
  //   const purchase = await Purchase.create({date, brand, weight, price})
  req.body.createdBy = req.user.userId;

  console.log(`Received Date: ${req.body.date}`);
    const parsedDate = new Date(req.body.date);
    req.body.date = parsedDate;
  const purchase = await Purchase.create(req.body);
  

  res.status(StatusCodes.CREATED).json({ purchase });
};

export const getPurchase = async (req, res) => {
  const { id } = req.params;
  const purchase = await Purchase.findById(id);

  res.status(StatusCodes.OK).json({ purchase });
};

export const updatePurchase = async (req, res) => {
  const { id } = req.params;
  const updatedPurchase = await Purchase.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res
    .status(StatusCodes.OK)
    .json({ msg: "Compra atualizada!", purchase: updatedPurchase });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedPurchase = await Purchase.findByIdAndDelete(id);

  res
    .status(StatusCodes.OK)
    .json({ msg: "Compra removida!", purchase: removedPurchase });
};

export const getMonthlyPrice = async (req, res, next) => {
  console.log("User Id", req.user.userId);
  try {
    const { year } = req.params;
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    const results = await Purchase.aggregate([
      {
        $match: {
          createdBy: userId,
          date: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$price" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    console.log(results);
    res.status(StatusCodes.OK).json(results);
  } catch (error) {
    console.error("Deu erradoooooooooooooo :(", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Problema no gráfico sei lá" });
  }
};
