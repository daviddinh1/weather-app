const data = { cel: 0, far: 0 };

const form = document.querySelector("#locationForm");
const location = document.querySelector("#location");
const btn = document.querySelector("#btn");
const test = document.querySelector(".test");

async function getData(val) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=8dd0626540674d9e976182509241204&q=${val}`,
    { mode: "cors" }
  );
  return response.json();
}

async function assignTemp(e) {
  e.preventDefault();
  const val = location.value || "houston";
  const weatherObj = await getData(val);

  data.cel = weatherObj.current.temp_c;
  data.far = weatherObj.current.temp_f;

  console.log(data);
}

form.addEventListener("submit", assignTemp);
