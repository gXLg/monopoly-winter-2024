let lock = null;

module.exports = async callback => {
  const l = lock ?? null;
  const newLock = new Promise(async res => {
    await l;
    res(await callback());
  });
  lock = newLock;
  return newLock;
};
