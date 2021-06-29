type Heroes = "Hulk" | "Cap" | "Thor";
type HeroAges = { [K in Heroes]: number };
const ages: HeroAges = {
  Hulk: 33,
  Cap: 100,
  Thor: 1000,
};
