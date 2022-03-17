export const formatMongooseOperators = (queryString: string) => {
  return queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
};
