data = [
  {
    id: 1,
    name: "Death Valley",
    location: "the Mojave Desert, California",
    content:
      "In this below-sea-level basin, steady drought and record summer heat make Death Valley a land of extremes. Yet, each extreme has a striking contrast. Towering peaks are frosted with winter snow. Rare rainstorms bring vast fields of wildflowers. Lush oases harbor tiny fish and refuge for wildlife and humans. Despite its morbid name, a great diversity of life thrives in Death Valley.",
    fact: "Death Valley holds the record for the hottest recorded temperature on Earth, which is 134.1°F (56.7°C), record in 1913.",
    img: `https://npf-prod.imgix.net/uploads/death-valley-istock.jpg?auto=compress%2Cformat&fit=max&q=80&w=1600`,
    class: "dv",
  },
  {
    id: 2,
    name: "Lassen Volcanic",
    location: "Northern California",
    content:
      "Lassen Volcanic National Park is home to steaming fumaroles, meadows freckled with wildflowers, clear mountain lakes, and numerous volcanoes. Jagged peaks tell the story of its eruptive past while hot water continues to shape the land.",
    fact: "Lassen Volcanic National Park is one of a few places in the world where all 4 types of volcano can be found!",
    img: `https://lp-cms-production.imgix.net/2021-03/GettyRF_520295161.jpg`,
    class: "ls",
  },
  {
    id: 3,
    name: "Channel Islands",
    location: "Ventura, California",
    content:
      "Channel Islands National Park encompasses five remarkable islands and their ocean environment, preserving and protecting a wealth of natural and cultural resources. Isolation over thousands of years has created unique animals, plants, and archeological resources found nowhere else on Earth and helped preserve a place where visitors can experience coastal southern California as it once was.",
    fact: "10% of the global blue whale population gathers at Channel Islands National Park summer.",
    img: `https://visitoxnard.com/imager/s3_us-west-1_amazonaws_com/oxnard-2020/images/Channel-Islands-National-Park-Oxnard_PC-Benjamin-AdobeStock_167145759_e7f018298c4a7f7ebc2c8dcb801d1c37.jpeg`,
    class: "ci",
  },
];
const list = () => {
  return [...data];
};

const find = (id) => {
  const post = data.find((post) => post.id === +id);
  return { ...post };
};

module.exports = { list: list, find: find, data };
