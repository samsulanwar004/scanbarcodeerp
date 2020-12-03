import AsyncStorage from '@react-native-async-storage/async-storage';

const storageSet = async(key, value) => {
    try {
      var value = await AsyncStorage.setItem(key, JSON.stringify(value));
      return value;
    } catch(error) {
      console.log(error);
    }
}

const storageGet = async(key) => {
  try {
       const retrieved = await AsyncStorage.getItem(key);
       const result = JSON.parse(retrieved);
       return result;
    } catch(error) {
      console.log(error);
    }
}

const storageClear = async() => {
  try {
    await AsyncStorage.clear();
  } catch(error) {
    console.log(error);
  }
}

const storageItemClear = async(key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch(error) {
    console.log(error);
  }
}

const storageMultiClear = async(keys) => {
  try {
    await AsyncStorage.multiRemove(keys, (err) => {
      // keys k1 & k2 removed, if they existed
      // do most stuff after removal (if you want)
    });
  } catch(error) {
    console.log(error);
  }
}

const storagePush = async(key, value) => {
  try {

    let items = await storageGet(key);

    if (items == null) {
      await storageSet(key, [value]);
    } else {
      let find = items.find(item => {
        return item === value;
      });

      if (typeof find == 'undefined') {
        items.push(value);
        console.log(items);
        await storageSet(key, items);
      }
    }  
  } catch(error) {
    console.log(error);
  }
}

export { storageSet, storageGet, storageClear, storageMultiClear, storageItemClear, storagePush};