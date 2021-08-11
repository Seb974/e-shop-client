import Roles from "../../../config/Roles";
import { isDefined, isDefinedAndNotVoid } from "../../../helpers/utils";

export const updateHomepage = (homepage, setHomepage, data, setData) => {

    const newData = data.map(entity => {
        if (entity.selected) {
            setHomepage(entity);
        }
        return {...entity, treated: true};
    });
    setData(newData.filter(d => !isDefined(d.treated)));

    return new Promise((resolve, reject) => resolve(false));
};