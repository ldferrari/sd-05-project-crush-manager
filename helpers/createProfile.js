const createProfile = ({ id, name, age, date: { datedAt, rate } }) => ({
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
