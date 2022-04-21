import { toSnakeKeys } from "../../utils/commonUtils";

export const prepareRegisterRequest = (params) => toSnakeKeys({
    body: {
        ...params,
    }
})