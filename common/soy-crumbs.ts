import { Recipe } from "./types";

const recipe: Recipe = {
  title: "Tasty Meaty Soy Crumbs",
  preamble: [
    "Prepared properly, textured soy is a tasty and cheap ingredient you can use anywhere you would use minced meat: In a pasta sauce, in a chili con carne, in a potato casserole, lasagne, etc. You can also prepare it in bulk and freeze it.",
    "The raw ingredients keep forever so you can always have some around.",
  ],
  ingredient_steps: [
    { instruction: "Pour" },
    {
      amount: {
        weight: "150g",
        boxes: [
          {
            type: "Volume",
            text: "Soy Crumbs vary a lot in size, so a volume measurement in cups would be useless. If you don't have a scale, look at the package for how much you have. You can also just hydrate an arbitrary amount and drain the water.",
          },
        ],
      },
      ingredient: {
        name: "textured soy crumbs",
        boxes: [
          {
            type: "Info",
            text: `Consists of around 50% protein. Also called "Textured Vegetable Protein" (TVP), or "Protein Granules" or "Meatless crumbles". Out of package they smell kind of unappetizing ("like cat food"), cooked they don't taste like anything on their own. Great to have in your kitchen since it keeps basically forever.`,
          },
          {
            type: "Reason",
            text: "After cooking, these have a texture similar to minced meat and we can make them absorb water, fat, and flavourings.",
          },
          {
            type: "Considerations / Modifications",
            text: "Dry soy crumbs absorbs around 2-3 times the weight in water and then even more oil. It results in around 3g of finished product.",
          },
          {
            type: "Replacements",
            text: "Similar products exist made out of pea protein and wheat protein. Wheat protein has a stronger (bready) taste. Soy seems to be the easiest to find in stores. It's going to be hard to replace these or make them yourself.",
          },
        ],
      },
    },
    {
      instruction: "into a bowl. Add",
      boxes: [
        {
          type: "Hint",
          text: "The bowl needs to be large, enough to fit 3x the amount",
        },
      ],
    },
    {
      amount: {
        weight: "5g",
        boxes: [
          {
            type: "Info",
            text: "Use the package as a source of how much to use. The saltiness of the resulting broth should be like soup.",
          },
          { type: "Alternative", text: "1tbsp" },
        ],
      },
      ingredient: {
        name: "vegetable broth powder",
        post_span: ".",
        boxes: [
          {
            type: "Info",
            text: `Broth powder varies a lot in quality / taste. You can compare them by just adding a teaspoon to a cup of hot water and drinking it like tea. If you can find a "no-chicken" broth substitute, use that. I would recommend to use one that does have flavour enhancer (like MSG) and/or yeast extract for the savory / umami flavor. Do not use 'salt-free' broth, the main point of this is to add saltiness.`,
          },
          {
            type: "Reason",
            text: "This is our main source of salt. Depending on broth it also adds a savoury / umami component.",
          },
          {
            type: "Considerations",
            text: "If you don't do this exactly, you can always add more to taste any time later. You can also add any other flavours you want here, but it can be a waste if you drain your crumbs, and they can burn in the frying step, so I would add them later.",
          },
        ],
      },
    },
    {
      instruction: "Then soak them in",
    },
    {
      amount: {
        volume: "300ml",
      },
      ingredient: {
        name: "boiling water",
        boxes: [
          {
            type: "Info",
            text: "The water should be hot but does not need to cook during soaking",
          },
          {
            type: "Considerations / Modifications",
            text: "If you use a soy:water ratio of ~1:2.5, they will completely absorb the water. If you don't want to measure, simply use enough to cover them with two centimeters above and strain the crumbs afterwards.",
          },
        ],
      },
    },
    {
      instruction: "for 10 minutes.",
      boxes: [
        {
          type: "Info",
          text: "You can tell they are ready by eating a few - if they still have a hard core they need longer soaking.",
        },
      ],
    },
    { instruction: "Then, add them to a hot pan with" },
    {
      amount: {
        weight: "20g (a lot)",
        boxes: [
          {
            type: "Why so much?",
            text: "Remember, the soy crumbs themselves have zero fat. Minced meat has ~15% fat, so if you want to get close in tastiness to meat you need a lot of oil. For example, 150g of dry crumbs will absorb 200-300g of water, and 15% of the result would already be 50g of fat.",
          },
        ],
      },
      ingredient: {
        name: "vegetable oil",
        post_span: ".",
        boxes: [
          {
            type: "Info",
            text: "Any type of vegetable cooking oil is fine, both refined and unrefined, such as olive oil, sunflower oil, rapeseed oil or peanut oil. Unrefined oils (like extra virgin olive oil) have a lower smoke point but due to the water content of the food it's not going to get that hot. Only use an expensive oil if you prefer it due to health or similar reasons, the flavour of the oil is not going to be relevant.",
          },
        ],
      },
    },
    {
      instruction: "Fry on high heat until they are browned and crispy.",
      boxes: [
        {
          type: "Info",
          text: "Make sure you use a large enough pan so that the crumbs have space for the moisture to evaporate (layer <1cm deep). Stir frequently for even browning.",
        },
      ],
    },
    {
      amount: { weight: "xxx g" },
      ingredient: {
        name: "Worcestershire Sauce",
      },
    },
  ],
};
/*
Buttons:



*/

export default recipe;
