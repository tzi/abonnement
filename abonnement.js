function abonnement() {
    var handlers = {};

    function getRegisterHandler(eventName, defaultKey) {
        defaultKey = defaultKey || "id";

        return function(filter, handler) {
            if (!handlers[eventName]) {
                handlers[eventName] = [];
            }

            // The filter argument is optional
            if (!handler) {
                handler = filter;
                filter = [];
            }

            // Filter must be an array of object
            if (!Array.isArray(filter)) {
                filter = [filter];
            }
            filter = filter.map(function(filterItem) {
                if (typeof filterItem !== 'string') {
                    return filterItem;
                }
                var objectFilterItem = {};
                objectFilterItem[defaultKey] = filterItem;

                return objectFilterItem;
            });

            handlers[eventName].push({
                filter: filter,
                callback: handler
            });

            // Allow chaining
            return this;
        };
    }

    function isEventMatch(event, filter) {
        if (!filter.length) {
            return true;
        }

        // An event match if one of the filter match
        return filter.some(function (filterItem) {

            // A filter match if every define field match
            return Object.keys(filterItem).every(function(key) {
                return filterItem[key] === event[key];
            });
        });
    }

    function trigger(eventName, event) {
        if (!handlers[eventName]) {
            return;
        }

        if (!event) {
            event = {};
        }

        handlers[eventName].forEach(function(handler) {
            if (isEventMatch(event, handler.filter)) {
                handler.callback(event);
            }
        });
    }

    return {
        getRegisterHandler: getRegisterHandler,
        trigger: trigger
    };
}