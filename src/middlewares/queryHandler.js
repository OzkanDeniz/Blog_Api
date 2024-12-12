"use strict";

module.exports = async (req, res, next) => {
  //* FILTERING - SEARCHING - SORTING - PAGINATION *//

  //  console.log(req.query)

  // FILTERING:
  //URL?filter[fieldName1]=value1&filter[fieldName2]=value2
  const filter = req.query?.filter || {};
  // console.log(filter)
  // { userId: '6751e0e727ae5347fc01afd7', title: 'test 5 title' }

  // SEARCHING:
  //URL?search[fieldName1]=value1&search[fieldName2]=value2
  const search = req.query?.search || {};
  // console.log(search);
  // { title: { $regex: "test 5 title", $options: "i" } }  //22. satırdaki kodu regex hale çevirmeliyiz.
  for (let key in search) {
    // search[key] = { $regex: search[key] }; //Case-sensitive
    search[key] = { $regex: search[key], $options: "i" }; //Case-insensitive
  }
  // console.log(search);

  // SORTING:
  //URL?sort[fieldName1]=asc&sort[fieldName2]=desc  (asc: A-Z, desc: Z-A)
  const sort = req.query?.sort;
  // console.log(sort)

  //PAGINATION:
  //URL?page=3&limit=20&skip=10
  //LIMIT:
  let limit = Number(req.query?.limit);
  limit = limit > 0 ? limit : Number(process.env?.PAGE_SIZE || 20); //sayfa başı kayıt sayısı default 20 ve ayarlanabilir
  // console.log(limit, typeof limit);

  //PAGE:
  let page = Number(req.query?.page);
  page = page > 0 ? page : 1;
  // console.log(page)

  //SKIP:
  let skip = Number(req.query?.skip);
  skip = skip > 0 ? skip : (page - 1) * limit;
  // console.log(page, skip, limit);

  // const data = await BlogPost.find().populate("categoryId");
  //   const data = await BlogPost.find({ ...filter, ...search }).sort(sort).limit(limit).skip(skip).populate(["userId", "categoryId"]);

  //GetMpdelList
  res.getModelList = async function (Model, populate = null) {
    return await Model.find({ ...filter, ...search })
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .populate(populate);
  };

  next();
};
