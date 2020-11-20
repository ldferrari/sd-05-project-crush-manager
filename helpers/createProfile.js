const createProfile = ({ name, age, date: { datedAt, rate } }, id) => ({
  age,
  date: {
    datedAt,
    rate,
  },
  id,
  name,
});

module.exports = {
  createProfile,
};
