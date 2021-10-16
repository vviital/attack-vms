const vms = [
  "vm-9ea3998",
  "vm-5f3ad2b",
  "vm-d9e0825",
  "vm-59574582",
  "vm-f00923",
  "vm-575c4a",
  "vm-0c1791",
  "vm-2987241",
  "vm-ab51cba10",
  "vm-a3660c",
  "vm-864a94f",
];

function getRandomVM() {
  const index = Math.floor(Math.random() * vms.length);
  return vms[index];
}

export { vms, getRandomVM };
