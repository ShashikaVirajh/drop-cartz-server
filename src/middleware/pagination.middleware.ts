import { NextFunction, Response, Request } from 'express';

import { pagination } from 'constants/pagination.constants';
import { formatMongooseOperators } from 'utils';
import { Paginate } from 'types';

const Pagination =
  (model: any, Mapper: any, populate?: any) => async (req: Request, res: Response, next: NextFunction) => {
    const reqQuery = { ...req.query };
    const removeFields = pagination.REMOVE_FIELDS;
    let query: any = null;

    removeFields.forEach((param: string) => delete reqQuery[param]);

    let reqQueryString = JSON.stringify(reqQuery);
    reqQueryString = formatMongooseOperators(reqQueryString);

    const reqQueryObject = JSON.parse(reqQueryString);
    query = model.find(reqQueryObject);

    if (req.query?.select) {
      const fields = (<string>req.query.select).split(',').join(' ');
      query = query.select(fields);
    }

    if (req.query?.sort) {
      const sortBy = (<string>req.query.sort).split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    const page = parseInt(<string>req.query.page) || pagination.DEFAULT_PAGE;
    const limit = parseInt(<string>req.query.limit) || pagination.DEFAULT_LIMIT;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments(reqQuery);

    query = query?.skip(startIndex).limit(limit);

    if (populate) query = query.populate(populate);

    const result = await query;
    const mappedResult = result.map((resource: any) => new Mapper(resource));

    const paginate: Paginate = {};
    if (endIndex < total) paginate.next = { page: page + 1, limit };
    if (startIndex > 0) paginate.prev = { page: page - 1, limit };

    res.paginatedResult = {
      count: mappedResult.length,
      paginate,
      data: mappedResult,
    };

    next();
  };

export default Pagination;
