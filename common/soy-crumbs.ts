import { Recipe } from "./types";

const recipe: Recipe = {
  title: "Tasty Meaty Soy Crumbs",
  preamble: [
    "Prepared properly, textured soy is a tasty and cheap ingredient you can use anywhere you would use minced meat: In a pasta sauce, in chili con carne, in a potato casserole, lasagne, etc. You can also prepare it in bulk and freeze it.",
    "The raw ingredients keep forever so you can always have some around.",
  ],
  main_picture: "tasty-meaty-soy-crumbs/soy-crumbs-2.jpg",
  ingredient_steps: [
    { instruction: "Pour" },
    {
      amount: {
        weight: "150g",
        detail: {
          text: "",
          detailButton: "Volume",
          detailText: [
            {
              title: "",
              text: "Soy Crumbs vary a lot in size, so a volume measurement in cups would be useless. If you don't have a scale, look at the package for how much you have. You can also just hydrate an arbitrary amount and drain the water.",
            },
          ],
        },
      },
      ingredient: {
        name: "textured soy crumbs",
        detail: {
          text: "Dry soy crumbs absorbs around 2-3 times the weight in water and then even more oil. It results in around 3g of finished product.",
          detailButton: "Details",
          detailText: [
            {
              title: "Details",
              text: `Consists of around 50% protein. Also called "Textured Vegetable Protein" (TVP), or "Protein Granules" or "Meatless crumbles". Out of package they smell kind of unappetizing ("like cat food"), cooked they don't taste like much on their own. Great to have in your kitchen since it keeps basically forever.`,
            },
            {
              title: "Reason",
              text: "After cooking, these have a texture similar to minced meat and we can make them absorb water, fat, and flavourings.",
            },
            {
              title: "Replacements",
              text: "Similar products exist made out of pea protein and wheat protein. Wheat protein has a stronger (bready) taste. Soy seems to be the easiest to find in stores. It's going to be hard to replace these or make them yourself.",
            },
          ],
        },
      },
    },
    {
      instruction: "into a bowl",
      post_span: ". Add",
      detail: {
        detailButton: "Hint",
        detailText: [
          {
            text: "The bowl needs to be large, enough to fit 3x the amount",
          },
        ],
      },
    },
    {
      amount: {
        weight: "5g",
        detail: {
          text: "Use the packaging to determine how much to use. The saltiness of the resulting broth should be like soup, taste it.",
        },
      },
      ingredient: {
        name: "vegetable broth powder",
        post_span: ".",
        detail: {
          text: `Broth powder varies a lot in quality / taste. You can compare them by just adding a teaspoon to a cup of hot water and drinking it like tea. If you can find a "no-chicken" broth substitute, use that. I would recommend to use one that does have flavour enhancer (like MSG) and/or yeast extract for the savory / umami flavor. Do not use 'salt-free' broth, the main point of this is to add saltiness.`,
          detailButton: "Details",
          detailText: [
            {
              title: "Why?",
              text: "This is our main source of salt. Depending on broth it also adds a savoury / umami component.",
            },
            {
              title: "Considerations",
              text: "If you don't do this exactly, you can always add more to taste any time later. You can also add any other flavours you want here, but it can be a waste if you need to drain your crumbs, and spices can burn in the frying step, so I would add them later.",
            },
          ],
        },
      },
    },
    {
      instruction: "Soak them in",
    },
    {
      amount: {
        volume: "300ml",
      },
      ingredient: {
        name: "boiling water",
        detail: {
          text: "If you use a solid:water ratio of around 1:2, they will completely absorb the water. If you don't want to measure, simply use enough water to cover them with two centimeters above and strain the crumbs afterwards.",
          detailButton: "Detail",
          detailText: [
            {
              text: "The water should be hot but does not need to cook during soaking",
            },
          ],
        },
      },
    },
    {
      instruction: "for 10 minutes",
      post_span: ".",
      detail: {
        detailButton: "Details",
        detailText: [
          {
            text: "You can tell they are ready by eating a few - if they still have a hard core they need longer soaking.",
          },
        ],
      },
    },
    { instruction: "Then, add them to a hot pan with" },
    {
      amount: {
        weight: "20g (a lot)",
        detail: {
          detailButton: "Why so much oil?",
          detailText: [
            {
              text: "Remember, the soy crumbs themselves have zero fat. Minced meat has ~15% fat, so if you want to get close in tastiness to meat you need a lot of oil. For example, 150g of dry crumbs will absorb 200-300g of water, and 15% of the result would already be 50g of fat. They will also get crispier with more oil.",
            },
          ],
        },
      },
      ingredient: {
        name: "vegetable oil",
        post_span: ".",
        detail: {
          detailButton: "Details",
          detailText: [
            {
              text: "Any type of vegetable cooking oil is fine, both refined and unrefined, such as olive oil, sunflower oil, rapeseed oil or peanut oil. Unrefined oils (like extra virgin olive oil) have a lower smoke point but due to the water content of the food it's not going to get that hot. Only use an expensive oil if you prefer it due to health or similar reasons, the flavour of the oil is not going to be relevant.",
            },
          ],
        },
      },
    },
    {
      instruction:
        "Fry on high heat while stirring, until they are browned and crispy",
      post_span: ".",
      detail: {
        detailButton: "Details",
        detailText: [
          {
            text: "Make sure you use a large enough pan so that the crumbs have space for the moisture to evaporate (layer <1cm deep). Stir frequently for even browning. To know they are done, take a spoon and taste a few. They should be firm and some should have crispy edges.",
          },
        ],
      },
    },
    {
      instruction: "Add",
    },
    {
      amount: { weight: "xxx g" },
      ingredient: {
        name: "Worcestershire Sauce",
        post_span: ", and",
      },
      detail: {
        detailButton: "Replacements",
        detailText: [
          {
            text: "Worcestershire Sauce gives a nice sweet, umami, meaty taste. Use soy sauce as an alternative, but it won't be as good.",
          },
        ],
      },
    },
    {
      amount: {
        count: "1 clove",
      },
      ingredient: {
        name: "minced garlic",
        post_span: ",",
      },
    },
    {
      amount: {
        count: "lots",
      },
      ingredient: {
        name: "freshly ground black pepper",
        post_span: ".",
      },
    },
    {
      instruction: "Fry for another minute, until any liquid is gone.",
    },
    {
      instruction:
        "Optionally, add black soy sauce (for color), coriander and cumin.",
    },
  ],
};
/*
Buttons:



*/

export default recipe;
