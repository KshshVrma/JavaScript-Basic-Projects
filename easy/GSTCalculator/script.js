let mode;
const gst_arr = [3, 5, 12, 18, 28];

const $ = el => document.querySelector(el);
const _ = n => (n % 1 === 0 ? n : n.toFixed(2));

const findGST = () => {
  const actual_value = parseFloat($("#actual_price").value);
  const final_value = parseFloat($("#final_price").value);
  const gst = parseFloat($("#gst_percent").innerText);

  if (mode === 1) {
    let gst_value = (actual_value * gst) / 100;
    $("#gst_value").value = _(gst_value);
    $("#cgst_value").value = _(gst_value / 2);
    $("#sgst_value").value = _(gst_value / 2);
    $("#final_price").value = _(actual_value + gst_value);
  } else if (mode === 2) {
    let actual_price = (final_value * 100) / (100 + gst);
    let gst_value = (actual_price * gst) / 100;
    $("#actual_price").value = _(actual_price);
    $("#gst_value").value = _(gst_value);
    $("#cgst_value").value = _(gst_value / 2);
    $("#sgst_value").value = _(gst_value / 2);
  }
};

$("#actual_price").addEventListener("keyup", () => {
  mode = 1;
  findGST();
});

$("#final_price").addEventListener("keyup", () => {
  mode = 2;
  findGST();
});

$("#right").addEventListener("click", () => {
  let gst_percent = parseInt($("#gst_percent").innerText);
  let index = gst_arr.indexOf(gst_percent);
  if (index === gst_arr.length - 1) index = 0;
  else index++;

  $("#gst_percent").innerText = gst_arr[index];
  findGST();
});

$("#left").addEventListener("click", () => {
  let gst_percent = parseInt($("#gst_percent").innerText);
  let index = gst_arr.indexOf(gst_percent);
  if (index === 0) index = gst_arr.length - 1;
  else index--;

  $("#gst_percent").innerText = gst_arr[index];
  findGST();
});
