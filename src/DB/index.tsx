import SQLite from 'react-native-sqlite-storage';

const getDict = () =>
  new Promise((resolve, reject) => {
    const db = SQLite.openDatabase(
      {
        name: 'vocaglory.db',
        location: 'Library',
        createFromLocation: 1,
      },
      () => {
        console.log('open success');
      },
      (error) => {
        console.log('open fail', error);
      },
    );

    const sql = 'select * from dict';

    let data = new Array();
    db.transaction(
      (tx) => {
        tx.executeSql(sql, [], (tx, result) => {
          console.log('## transaction success : selectDict ## ', result.rows);
          for (let i = 0; i < result.rows.length; i++) {
            const item = result.rows.item(i);
            data.push(item);
          }
          resolve(data);
        });
      },
      (err) => {
        console.log(err);
        reject(err);
      },
    );
  });

const saveToDict = (
  title: string,
  voca: string,
  mean: string,
  rootVoca: string,
) =>
  new Promise((resolve, reject) => {
    const db = SQLite.openDatabase(
      {
        name: 'vocaglory.db',
        location: 'Library',
        createFromLocation: 1,
      },
      () => {
        console.log('open success');
      },
      (error) => {
        console.log('open fail', error);
      },
    );

    const now = new Date();
    const pushedAt =
      now.getFullYear().toString() +
      '-' +
      now.getMonth().toString().padStart(2, '0') +
      '-' +
      now.getDay().toString().padStart(2, '0');

    db.transaction(
      (tx) => {
        tx.executeSql(
          `insert into dict(title, voca, mean, pushedAt, rootVoca) values(?, ?, ?, ?, ?)`,
          [title, voca, mean, pushedAt, rootVoca],
          (tx, result) => {
            resolve(true);
          },
        );
      },
      (err) => {
        console.log(err);
        reject(err);
      },
    );
  });

const isInDict = (voca: string) =>
  new Promise((resolve, reject) => {
    const db = SQLite.openDatabase(
      {
        name: 'vocaglory.db',
        location: 'Library',
        createFromLocation: 1,
      },
      () => {
        console.log('open success');
      },
      (error) => {
        console.log('open fail', error);
      },
    );

    db.transaction(
      (tx) => {
        tx.executeSql(
          `select voca from dict where voca='${voca}'`,
          [],
          (tx, result) => {
            resolve(result.rows.length > 0 ? true : false);
          },
        );
      },
      (err) => {
        console.log(err);
        reject(err);
      },
    );
  });

const getSettings = () =>
  new Promise((resolve, reject) => {
    const db = SQLite.openDatabase(
      {
        name: 'vocaglory.db',
        location: 'Library',
        createFromLocation: 1,
      },
      () => {
        console.log('open success');
      },
      (error) => {
        console.log('open fail', error);
      },
    );

    const sql = 'select * from settings';

    db.transaction(
      (tx) => {
        tx.executeSql(sql, [], (tx, result) => {
          resolve(result.rows.item(0));
        });
      },
      (err) => {
        console.log(err);
        reject(err);
      },
    );
  });

const getCachedWords = (title: string) =>
  new Promise((resolve, reject) => {
    const db = SQLite.openDatabase(
      {
        name: 'vocaglory.db',
        location: 'Library',
        createFromLocation: 1,
      },
      () => {
        console.log('open success');
      },
      (error) => {
        console.log('open fail', error);
      },
    );

    db.transaction(
      (tx) => {
        tx.executeSql(
          `select * from cacheWords where title='${title}'`,
          [],
          (tx, result) => {
            resolve(result.rows.length > 0 ? result.rows.item(0) : null);
          },
        );
      },
      (err) => {
        console.log(err);
        reject(err);
      },
    );
  });

const getDictByTitle = (title: string) =>
  new Promise((resolve, reject) => {
    const db = SQLite.openDatabase(
      {
        name: 'vocaglory.db',
        location: 'Library',
        createFromLocation: 1,
      },
      () => {
        console.log('open success');
      },
      (error) => {
        console.log('open fail', error);
      },
    );

    let data = new Array();
    db.transaction(
      (tx) => {
        tx.executeSql(
          `select voca from dict where title='${title}'`,
          [],
          (tx, result) => {
            for (let i = 0; i < result.rows.length; i++) {
              console.log(
                '## getDictByTitle : voca ##',
                result.rows.item(i).voca,
              );
              data.push(result.rows.item(i).voca);
            }
            resolve(data);
          },
        );
      },
      (err) => {
        console.log(err);
        reject(data);
      },
    );
  });

const cacheWords = (title: string, words: string) =>
  new Promise((resolve, reject) => {
    const db = SQLite.openDatabase(
      {
        name: 'vocaglory.db',
        location: 'Library',
        createFromLocation: 1,
      },
      () => {
        console.log('open success');
      },
      (error) => {
        console.log('open fail', error);
      },
    );

    db.transaction(
      (tx) => {
        tx.executeSql(
          `insert into cacheWords(title, words) values(?, ?)`,
          [title, words],
          (tx, result) => {
            resolve(true);
          },
        );
      },
      (err) => {
        console.log(err);
        reject(err);
      },
    );
  });

const getTitlesInCachedWords = () =>
  new Promise((resolve, reject) => {
    const db = SQLite.openDatabase(
      {
        name: 'vocaglory.db',
        location: 'Library',
        createFromLocation: 1,
      },
      () => {
        console.log('open success');
      },
      (error) => {
        console.log('open fail', error);
      },
    );

    let data = new Array();
    db.transaction(
      (tx) => {
        tx.executeSql(`select title from cacheWords`, [], (tx, result) => {
          for (let i = 0; i < result.rows.length; i++) {
            console.log(
              '## getTitlesInCachedWords : title ##',
              result.rows.item(i).title,
            );
            data.push(result.rows.item(i).title);
          }
          resolve(data);
        });
      },
      (err) => {
        console.log(err);
        reject(data);
      },
    );
  });

const deleteCache = () =>
  new Promise((resolve, reject) => {
    const db = SQLite.openDatabase(
      {
        name: 'vocaglory.db',
        location: 'Library',
        createFromLocation: 1,
      },
      () => {
        console.log('open success');
      },
      (error) => {
        console.log('open fail', error);
      },
    );

    let data = new Array();
    db.transaction(
      (tx) => {
        tx.executeSql(`delete from cacheWords`, [], (tx, result) => {
          resolve(true);
        });
      },
      (err) => {
        console.log(err);
        reject(data);
      },
    );
  });

// SETTING: isRandom
const updateSetting1 = (value: boolean) =>
  new Promise((resolve, reject) => {
    const db = SQLite.openDatabase(
      {
        name: 'vocaglory.db',
        location: 'Library',
        createFromLocation: 1,
      },
      () => {
        console.log('open success');
      },
      (error) => {
        console.log('open fail', error);
      },
    );

    let data = new Array();
    db.transaction(
      (tx) => {
        tx.executeSql(
          `update settings set isRandom=?`,
          [value ? 1 : 0],
          (tx, result) => {
            resolve(true);
          },
        );
      },
      (err) => {
        console.log(err);
        reject(data);
      },
    );
  });

// SETTING: nowShowWordInDict
const updateSetting2 = (value: boolean) =>
  new Promise((resolve, reject) => {
    const db = SQLite.openDatabase(
      {
        name: 'vocaglory.db',
        location: 'Library',
        createFromLocation: 1,
      },
      () => {
        console.log('open success');
      },
      (error) => {
        console.log('open fail', error);
      },
    );

    let data = new Array();
    db.transaction(
      (tx) => {
        tx.executeSql(
          `update settings set notShowWordInDict=?`,
          [value ? 1 : 0],
          (tx, result) => {
            resolve(true);
          },
        );
      },
      (err) => {
        console.log(err);
        reject(data);
      },
    );
  });

export default {
  getDict,
  saveToDict,
  isInDict,
  getSettings,
  getCachedWords,
  getDictByTitle,
  cacheWords,
  getTitlesInCachedWords,
  deleteCache,
  updateSetting1,
  updateSetting2,
};
