const asyncHandler = (requestHandler) => async (request, response, next) => {
    try {
        return await Promise.resolve(requestHandler(request, response, next));
    } catch (error) {
        next(error);
    }
};

export default asyncHandler;
