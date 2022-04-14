import { apiWrapper } from "../utils";

// region GET - Tag Data
export function searchCompany(keyword = '')
{
    return apiWrapper(
        `/consumer/company/search?keyword=${keyword}`,
        'GET',
        'SEARCH COMPANY',
        null
    );
}
// endregion
