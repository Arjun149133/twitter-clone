async function getRandomUsers() {
  const res = await fetch(
    "https://randomuser.me/api/?results=30&inc=name,login,picture"
  );
  return res.json();
}

export default getRandomUsers;