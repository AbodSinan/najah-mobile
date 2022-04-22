const apiStatusEnum =  Object.freeze({
    ERROR: -1,
    INITIAL: 0,
    AWAITING: 1,
    REQUESTED: 2,
    SUCCESS: 3,
    RELOADING: 4,
});

export default apiStatusEnum;