const form = document.getElementById("form");
const productsContainer = document.getElementById("admin-products");

// Добавление нового свойства
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newProperty = {
    title: document.getElementById("title").value,
    user: document.getElementById("user").value,
    image: document.getElementById("image").value,
    location: document.getElementById("location").value,
    bedrooms: +document.getElementById("bedrooms").value,
    showers: +document.getElementById("showers").value,
    sqfts: +document.getElementById("sqfts").value,
    price: +document.getElementById("price").value,
  };

  try {
    const res = await fetch("http://localhost:3000/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProperty),
    });

    if (!res.ok) throw new Error("Ошибка сервера!");

    form.reset();
    loadProperties(); // обновляем список сразу
  } catch (err) {
    console.error(err);
    alert("Не удалось добавить объект!");
  }
});

// Загрузка всех свойств
async function loadProperties() {
  productsContainer.innerHTML = "";

  try {
    const res = await fetch("http://localhost:3000/properties");
    const properties = await res.json();

    properties.forEach((p) => {
      const card = document.createElement("div");
      card.className =
        "border rounded-2xl shadow-md p-4 flex flex-col gap-2 w-[300px]";

      card.innerHTML = `
        <img src="${p.image}" alt="${p.title}" class="rounded-xl h-40 w-full object-cover">
        <h3 class="text-xl font-semibold">${p.title}</h3>
        <p class="text-gray-500">👤 ${p.user}</p>
        <p class="text-gray-500">📍 ${p.location}</p>
        <p class="text-gray-500">🛏 ${p.bedrooms} | 🚿 ${p.showers} | 📐 ${p.sqfts} sqft</p>
        <p class="text-[#793cfb] font-bold text-lg">₼${p.price}</p>
      `;

      productsContainer.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    alert("Не удалось загрузить объекты!");
  }
}

// загрузка при открытии страницы
loadProperties();

