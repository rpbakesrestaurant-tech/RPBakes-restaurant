(function () {
  "use strict";

  var header = document.getElementById("header");
  var yearEl = document.getElementById("currentYear");
  var highlightsGrid = document.getElementById("highlightsGrid");
  var menuGrid = document.getElementById("menuGrid");

  // ----- Scroll: add .scrolled to header -----
  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ----- Smooth scroll for anchor links -----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var targetId = this.getAttribute("href");
      if (targetId === "#") return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ----- Data: highlighted items -----
  var highlightedItems = [
    {
      name: "Chicken Biryani",
      slogan: "Aromatic basmati rice layered with tender, juicy chicken and rich spices.",
      image:
        "./images/foods/CB.jpg",
    },
    {
      name: "Chicken Rice & Noodels",
      slogan: "Wok-tossed rice and noodles with spicy chicken and flavorful sauces.",
      image:
        "./images/foods/CR1.jpg",
    },
     {
      name: "Butter Chicken Gravy",
      slogan: "Rich, buttery gravy with tender chicken.",
      image:
        "./images/foods/butter.jpg",
    },
    {
      name: "Chicken 65",
      slogan: "Crispy deep-fried chicken tossed with spicy South Indian flavors.",
      image:
        "./images/foods/Chicken65.jpg",
    },
    {
      name: "Meals",
      slogan: "Traditional South Indian veg meals served with rice, sambar, rasam, and tasty side dishes.",
      image:
        "./images/foods/meals.jpg",
    },
    {
      name: "Idly",
      slogan: "Soft, fluffy idlies with hot sambar and chutney.",
      image:
        "./images/foods/idly.jpg",
    },
    {
      name: "Dosa",
      slogan: "Crispy golden roast with ghee flavour.",
      image:
        "./images/foods/dosa.jpg",
    },
    {
      name: "Parotta",
      slogan: "Layered, flaky parotta roasted golden and served hot.",
      image:
        "./images/foods/parotta.jpg",
    },

    {
      name: "Tea",
      slogan: "Strong, aromatic chai made fresh.",
      image:
        "./images/foods/tea.jpg",
    },
    {
      name: "Coffee",
      slogan: "Hot filter coffee with perfect froth.",
      image:
        "./images/foods/coffee.jpg",
    },
    {
      name: "Fresh Juice",
      slogan: "Seasonal fruits, cold pressed and refreshing.",
      image:
        "./images/foods/FJ.jpg",
    },
    {
      name: "Mojito",
      slogan: "Minty, chilled mojitos in trending flavours.",
      image:
        "./images/foods/mojito.jpg",
    },
  ];

  // ----- Data: full menu JSON -----
  var menuData = {
    tiffen: [
      "Idly",
      "Dosa",
      "Roast",
      "Special Roast",
      "Uthappam",
      "Special Uthappam",
      "Parota",
      "Chapathi",
      "Poori",
    ],
    rice_and_noodles: [
      "Chicken Rice",
      "Egg Rice",
      "Veg Rice",
      "Paneer Rice",
      "Gobi Rice",
      "Mushroom Rice",
      "Chicken Noodels",
      "Egg Noodels",
      "Veg Noodels",
      "Paneer Noodels",
      "Gobi Noodels",
      "Mushroom Noodels",
    ],
    chicken_gravy_items: [
      "Chicken Masala",
      "Pallipalayam Chicken",
      "Chicken Kondattam",
      "Hyderabad Chicken",
      "Pepper Chicken",
      "Chettinad Chicken",
      "Butter Chicken",
    ],
    chicken_dry_items: [
      "Chilly Chicken 65",
      "Pepper Chicken Dry",
      "Chicken Manchurian",
      "Pallipalayam Dry",
      "Chicken Roast",
      "Chicken Chukka",
    ],
    egg_items: [
      "Egg Masala",
      "Egg Kheema Masala",
      "Egg Burji Masala",
      "Single Omelet",
      "Double Omelet",
    ],
    veg_items: [
      "Channa Masala",
      "Gobi Masala",
      "Mushroom Masala",
      "Paneer Butter Masala",
      "Kadai Paneer",
      "Mushroom Manchurian",
      "Mushroom Chilli",
      "Gobi Chilli",
    ],
    juice: [
      "Lemon Juice",
      "Musambi",
      "Muskmelon",
      "Apple",
      "Pomegranate",
      "Pineapple",
      "Grape",
    ],
    milk_shakes: [
      "Vanilla",
      "Butterscotch",
      "Strawberry",
      "Chocolate",
      "Apple",
      "Pineapple",
      "Mango",
    ],
    mojito: ["Blue Lemon Mojito", "Butterscotch Mojito", "Strawberry Mojito"],
    beverages: [
      "Tea",
      "Coffee",
      "Boost",
      "Horlicks",
      "Black Tea",
      "Chicken Soup",
    ],
  };

  var menuTitles = {
    tiffen: "Tiffen",
    rice_and_noodles: "Rice & Noodles",
    chicken_gravy_items: "Chicken Gravy Items",
    chicken_dry_items: "Chicken Dry Items",
    egg_items: "Egg Items",
    veg_items: "Veg Items",
    juice: "Juice",
    milk_shakes: "Milk Shakes",
    mojito: "Mojito",
    beverages: "Beverages",
  };

  // ----- Render highlighted cards -----
  function renderHighlights() {
    if (!highlightsGrid) return;

    highlightsItemsLoop: for (var i = 0; i < highlightedItems.length; i++) {
      var item = highlightedItems[i];
      var card = document.createElement("article");
      card.className = "highlight-card";
      card.setAttribute("data-animate", "");

      var imgWrap = document.createElement("div");
      imgWrap.className = "highlight-image-wrap";

      var img = document.createElement("img");
      img.className = "highlight-image";
      img.src = item.image;
      img.alt = item.name;
      imgWrap.appendChild(img);

      var body = document.createElement("div");
      body.className = "highlight-body";

      var title = document.createElement("h3");
      title.textContent = item.name;

      var slogan = document.createElement("p");
      slogan.textContent = item.slogan;

      body.appendChild(title);
      body.appendChild(slogan);

      card.appendChild(imgWrap);
      card.appendChild(body);

      highlightsGrid.appendChild(card);
    }
  }

  // ----- Render menu from JSON -----
  function renderMenu() {
    if (!menuGrid) return;

    Object.keys(menuData).forEach(function (key) {
      var items = menuData[key];
      var titleText = menuTitles[key] || key;

      var category = document.createElement("article");
      category.className = "menu-category";
      category.setAttribute("data-animate", "");

      var h3 = document.createElement("h3");
      h3.className = "menu-category-title";
      h3.textContent = titleText;

      var ul = document.createElement("ul");
      ul.className = "menu-list";

      items.forEach(function (itemName) {
        var li = document.createElement("li");
        var spanName = document.createElement("span");
        spanName.textContent = itemName;
        li.textContent = "";
        li.appendChild(spanName);
        ul.appendChild(li);
      });

      category.appendChild(h3);
      category.appendChild(ul);

      menuGrid.appendChild(category);
    });
  }

  // ----- Scroll-triggered animations (IntersectionObserver) -----
  function initScrollAnimations() {
    var animated = document.querySelectorAll("[data-animate]");
    if (!animated.length || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(animated, function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.1,
      }
    );

    animated.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ----- Current year in footer -----
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Initial render and animation setup
  renderHighlights();
  renderMenu();
  initScrollAnimations();
})();
