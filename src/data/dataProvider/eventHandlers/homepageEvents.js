import Roles from "../../../config/Roles";
import { isDefined, isDefinedAndNotVoid } from "../../../helpers/utils";

export const updateHomepage = (homepage, setHomepage, data, setData) => {

    const newData = data.map(entity => {
        const newHomepage = entity['@id'].includes('homepages') ? entity : entity.homepage;
        let updatedHomepage = newHomepage;
        if (newHomepage.selected) {
            if (entity['@id'].includes('banners') && newHomepage.id === homepage.id) {
                const bannerIndex = homepage.banners.findIndex(b => b['@id'] === entity['@id']);
                updatedHomepage = !isDefined(entity.id) ? {...homepage, banners: homepage.banners.filter(b => b['@id'] !== entity['@id'])} :
                                    bannerIndex !== -1 ? {...homepage, banners: homepage.banners.map(b => b['@id'] !== entity['@id'] ? b : entity)} : [...homepage.banners, entity];
            } else if (entity['@id'].includes('heroes') && newHomepage.id === homepage.id) {
                const heroIndex = homepage.heroes.findIndex(h => h['@id'] === entity['@id']);
                updatedHomepage = !isDefined(entity.id) ? {...homepage, banners: homepage.banners.filter(b => b['@id'] !== entity['@id'])} :
                                  heroIndex !== -1 ? {...homepage, heroes: homepage.heroes.map(h => h['@id'] !== entity['@id'] ? h : entity)} : [...homepage.heroes, entity];
            } else if (entity['@id'].includes('countdowns') && newHomepage.id === homepage.id) {
                const countdownIndex = homepage.countdowns.findIndex(b => b['@id'] === entity['@id']);
                updatedHomepage = !isDefined(entity.id) ? {...homepage, countdowns: homepage.countdowns.filter(c => c['@id'] !== entity['@id'])} :
                                  countdownIndex !== -1 ? {...homepage, countdowns: homepage.countdowns.map(c => c['@id'] !== entity['@id'] ? c : entity)} : [...homepage.countdowns, entity];
            }
            setHomepage(updatedHomepage);
        }
        return {...entity, treated: true};
    });
    setData(newData.filter(d => !isDefined(d.treated)));

    return new Promise((resolve, reject) => resolve(false));
};