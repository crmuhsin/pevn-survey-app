export const searchFn = {
    filterFn(item, search, filter) {
        return (header) => {
            const value = getObjectValueByPath(item, header.value)
            return header.filter ? header.filter(value, search, item) : filter(value, search, item)
        }
    },
    searchTableItems( items, search, headersWithCustomFilters, headersWithoutCustomFilters, customFilter) {
        let filtered = items
        search = typeof search === 'string' ? search.trim() : null
        if (search && headersWithoutCustomFilters.length) {
            filtered = items.filter(item => headersWithoutCustomFilters.some(filterFn(item, search, customFilter)))
        }
        if (headersWithCustomFilters.length) {
            filtered = filtered.filter(item => headersWithCustomFilters.every(filterFn(item, search, defaultFilter)))
        }
        return filtered
    },
    mySearch(search, items){
        let input = search.toLowerCase();
        let list = [];
        let pos = -1;
        let los = -1;
        if (input == "") {
            return items;
        }
        else {
            items.forEach(item => {
                pos = item['surveyname'].indexOf(input);
                los = item['slug'].indexOf(input);
                if (pos != -1 || los != -1) {
                    list.push(item)
                }
                pos = los = -1;
            });
            return list;
        }
    },
    mySearchRes(search, items){
        let input = search.toLowerCase();
        let list = [];
        let pos = -1;
        let los = -1;
        if (input == "") {
            return items;
        }
        else {
            items.forEach(item => {
                pos = item['responder'].indexOf(input);
                los = item['email'].indexOf(input);
                if (pos != -1 || los != -1) {
                    list.push(item)
                }
                pos = los = -1;
            });
            return list;
        }
    }
}

