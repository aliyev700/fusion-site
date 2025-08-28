const propertiesContainer = document.querySelector("#properties-list");

async function loadProperties() {
  try {
    const res = await fetch("http://localhost:3000/products");
    const products = await res.json();

    propertiesContainer.innerHTML = "";

    products.forEach((item) => {
      const card = document.createElement("div");
      card.className = "homeinmerric border shadow-2xl w-[380px] h-[500px] mt-14";

      card.innerHTML = `
        <div class="img1 w-[379px] overflow-hidden">
          <img class="w-[380px] h-[280px] transition-transform duration-500 hover:scale-110" 
               src="${item.image}" alt="${item.title}">
        </div>
        <div class="container-home pl-5">
          <h1 class="text-[20px] font-bold mt-2">${item.title}</h1>
          <p><i class="ri-map-pin-2-line text-[#793df9]"></i> ${item.location}</p>
          <div class="mt-2 bus flex gap-4">
            <p><i class="ri-bus-line text-[#793df9]"></i> ${item.bedrooms}</p>
            <p><i class="ri-showers-line text-[#793df9]"></i> ${item.showers}</p>
            <p><i class="ri-command-line text-[#793df9]"></i> ${item.sqfts} sq ft</p>
          </div>
          <div class="price flex gap-32 relative top-4">
            <p class="text-[20px] mt-[2px] font-medium">
              <i class="ri-account-circle-2-line"></i> ${item.user}
            </p>
            <p class="text-[#793df9] text-[22px] font-bold">₼${item.price}</p>
          </div>
        </div>
      `;
      propertiesContainer.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    alert("Не удалось загрузить объекты!");
  }
}

loadProperties();
