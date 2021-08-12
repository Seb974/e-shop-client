import { isDefined } from "../../../helpers/utils";

export const updateArticles = (articles, setArticles, data, setData) => {

    const newData = data.map(entity => {;
        const articleIndex = articles.findIndex(a => a['@id'] === entity['@id']);
        const updatedArticles = !isDefined(entity.id) ? articles.filter(a => a['@id'] !== entity['@id']) :
                                articleIndex !== -1 ? (entity.visible ? articles.map(a => a['@id'] !== entity['@id'] ? a : entity) : articles.filter(a => a['@id'] !== entity['@id'])) :
                                entity.visible ? [...articles, entity] : articles;
        setArticles(updatedArticles);
        return {...entity, treated: true};
    });

    setData(newData.filter(d => !isDefined(d.treated)));

    return new Promise((resolve, reject) => resolve(false));
};