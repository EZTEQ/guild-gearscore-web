export default {
    get(realm) {
        return realm.replace('\'', '').replace(' ', '-').toLowerCase();
    },
};
