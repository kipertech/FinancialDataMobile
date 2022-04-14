import { apiWrapper } from "../utils";

// region GET - Tag Data
export function getTagData(companyID, year)
{
    return apiWrapper(
        `/consumer/tags/listData?companyID=${companyID}&year=${year}`,
        'GET',
        'GET TAG DATA',
        null
    );
}
// endregion
